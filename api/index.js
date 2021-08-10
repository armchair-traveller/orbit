import jwt from '@tsndr/cloudflare-worker-jwt'
import { gql } from '@urql/core'
import { Router } from 'itty-router'

import query from './query'
import { createToken, rejoinder, preflight, parseBody } from './util'
import dashboardData from './dashboard'

addEventListener('fetch', (e) => {
  // TODO: consider refactoring parsebody to middleware? Though it's not too tedious to use it right now..
  e.respondWith(
    rejoinder(preflight(e.request)(handleRequest), {
      request: e.request,
    })
  )
})

/**
 * @param {Request} req
 */
async function handleRequest(req) {
  req = await parseBody(req)
  const app = Router({ base: '/orbit' })

  app.post('/authenticate', async (req) => {
    // Uses Fauna's built-in authentication system, the preferred method b/c other DBs don't have that option
    // * which is why in those cases you'd have to roll your own by hashing the PW (harder & most of the time less secure)
    // * due to CFW CPU limits, bcrypt / web crypto isn't an option. Fauna stores PWs via BCrypt hash internally.
    const { email, password } = req.body

    const { data: { result: secret } = {} } = await query(
      gql`
        mutation UserLogin($email: String!, $password: String!) {
          result: loginUser(input: { email: $email, password: $password })
        }
      `,
      { email, password }
    )
    // There is no need to differentiate whether email/pass was wrong. For good security reasons.
    if (!secret)
      return [{ message: 'Wrong email or password' }, { status: 403 }]
    // Authenticated!
    // While we can build the user data into the FQL login UDF so that there won't be two fetches, we're not going to do
    // that here as most access should be through the GraphQL API for convenience's sake
    const {
      data: { result: userInfo },
    } = await query(
      gql`
        query FindUser($email: String!) {
          result: userByEmail(email: $email) {
            email
            role
            firstName
            lastName
            _id
          }
        }
      `,
      { email }
    )

    const token = await createToken(userInfo)
    return [
      {
        message: 'Authentication successful!',
        token,
        userInfo,
        expiresAt: jwt.decode(token).exp,
      },
    ]
  })

  app.post('/signup', async (req) => {
    const { email, firstName, lastName, password } = req.body

    const userInfo = {
      email: email.toLowerCase(),
      firstName,
      lastName,
      role: 'ADMIN',
    }
    const userData = {
      userInfo,
      password,
    }

    const { data: createUserData, error: { message: errMsg } = {} } =
      await query(
        gql`
          mutation CreateUser($input: CreateUserInput!) {
            result: createUser(input: $input) {
              _id
            }
          }
        `,
        {
          input: userData,
        }
      )

    if (!errMsg) {
      const token = await createToken({
        ...userInfo,
        _id: createUserData.result._id,
      })

      return [
        {
          message: 'User created!',
          token,
          userInfo,
          expiresAt: jwt.decode(token).exp,
        },
      ]
    } else if (errMsg == '[GraphQL] Instance is not unique.')
      return [{ message: 'Email already exists' }, { status: 400 }]
    else
      return [
        { message: 'There was a problem creating your account' },
        { status: 400 },
      ]
  })

  app.get('/dashboard-data', () => [dashboardData])

  app.patch('/user-role', async (req) => {
    const { role } = req.body
    const allowedRoles = ['USER', 'ADMIN']

    if (!allowedRoles.includes(role))
      return [{ message: 'Role not allowed' }, { status: 400 }]

    await query(
      gql`
        mutation UpdateRole($id: ID!, $role: UserRole!) {
          result: partialUpdateUser(id: $id, data: { role: $role }) {
            role
            _id
          }
        }
      `,
      { id: req.user.sub, role }
    )
    return [
      {
        message:
          'User role updated. You must log in again for the changes to take effect.',
      },
    ]
  })

  app.get('/inventory', async () => {
    const {
      data: {
        result: { data },
      },
    } = await query(gql`
      query AllInventoryItems {
        result: allInventoryItems {
          data {
            name
            itemNumber
            unitPrice
            image
            _id
          }
        }
      }
    `)
    return [{ data }]
  })

  app.post('/inventory', async (req) => {
    const { result: inventoryItem } = await query(
      gql`
        mutation CreateInventoryItem($input: InventoryItemInput!) {
          result: createInventoryItem(data: $input) {
            name
            itemNumber
            image
            unitPrice
            _id
          }
        }
      `,
      {
        input: {
          image:
            req.body.image ||
            'https://images.unsplash.com/photo-1580169980114-ccd0babfa840?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop&ixid=eyJhcHBfaWQiOjF9',
          ...req.body,
        },
      }
    )

    return [
      { message: 'Inventory item created!', inventoryItem },
      { status: 201 },
    ]
  })

  app.delete('/inventory/:id', async ({ params: { id } }) => {
    const { data } = await query(
      gql`
        mutation DeleteInventoryItem($id: ID!) {
          result: deleteInventoryItem(id: $id) {
            _id
          }
        }
      `,
      { id }
    )
    if (data)
      return [
        {
          message: 'Inventory item deleted!',
          deletedItem: { _id: data.result._id },
        },
        { status: 201 },
      ]
    else
      return [
        { message: 'There was a problem deleting the item' },
        { status: 400 },
      ]
  })

  app.get('/users', async () => {
    const {
      data: {
        result: { data: users },
      },
    } = await query(gql`
      query AllUsers {
        result: allUsers {
          data {
            _id
            bio
            lastName
            firstName
          }
        }
      }
    `)
    if (users) return [{ users }]
    else
      return [
        { message: 'There was a problem getting the users.' },
        { status: '400' },
      ]
  })

  // TODO: Find out how it's getting the user... from a JWT? Is this related to the urlencoded parsing? Might consider
  // making a middleware for this if so
  app.get('/bio', async (req) => {
    const { sub } = req.user
    const {
      data: { result: user },
    } = await query(
      gql`
        query GetBio($id: ID!) {
          result: findUserByID(id: $id) {
            bio
          }
        }
      `,
      { id: sub }
    )
    if (user) return [{ bio: user.bio }]
    else
      return [
        { message: 'There was a problem updating your bio' },
        { status: 400 },
      ]
  })

  app.patch('/bio', async (req) => {
    try {
      const { sub } = req.user
      const { bio } = req.body
      const {
        data: {
          result: { bio: updatedBio },
        },
      } = await query(
        gql`
          mutation UpdateUser($id: ID!, $bio: String!) {
            result: partialUpdateUser(id: $id, data: { bio: $bio }) {
              bio
            }
          }
        `,
        { id: sub, bio }
      )
      return [{ message: 'Bio updated!', bio: updatedBio }]
    } catch (err) {
      return [
        {
          message: 'There was a problem updating your bio',
        },
        { status: 400 },
      ]
    }
  })

  app.all('*', () => ['Invalid operation', { status: 400 }])

  return app.handle(req)
}
