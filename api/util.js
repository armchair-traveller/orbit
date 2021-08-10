import jwt from '@tsndr/cloudflare-worker-jwt'

export const createToken = (user) =>
  // Sign the JWT
  jwt.sign(
    {
      sub: user._id,
      email: user.email,
      role: user.role,
      iss: 'api.orbit',
      aud: 'api.orbit',
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // Expires: Now + 1h
    },
    ORBIT_JWT_SECRET
  )

const initCorsHeaders = {
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Origin': '*',
}

/** Responds with preflight or forwards args to second call
 * * According to brief research, preflight was made for legacy reasons. So it's fine to just respond w/ whatever.
 * * This works as a universal preflight response.
 * * There's no security implications w/ preflight. It's just to indicate the server can accept more than legacy methods.
 * @param {Request} request - first arg must be request */
export const preflight =
  (request, ...args) =>
  /**
   * @param {Function} cb
   * @returns {Response}
   */
  (cb) =>
    request.method == 'OPTIONS'
      ? new Response('OK', { headers: initCorsHeaders })
      : cb(request, ...args)

/**
 * Modifies response returning handler to allow an easier format for writing responses. Like automating JSON and default
 * headers, which're easily overridden should you pass them in.
 * @param {Array|Response} response - A tuple containing a body and headers, similar to `Response` args. Headers object
 * props resides with status/statusText. e.g.
 * ```js
 * rejoinder(['OK', {status: 200, 'Content-type': 'text/html'}])
 * ```
 * * Any preconstructed `Response`s will be forwarded.
 * * Also accepts promises, allowing async which resolves into the value.
 * @param {Object} opts
 * @param {Request} opts.request - Required for defaults like CORS and POST status 201
 */
export async function rejoinder(response, { request, autoCors = true } = {}) {
  // passthrough if response is already constructed
  const resp = await Promise.resolve(response)
  if (resp instanceof Response) return resp

  // second arg is a ResponseInit obj, but w/ merged headers/status b/c namespace doesn't conflict
  const [
    body,
    {
      status = request && request.method == 'POST' ? 201 : undefined,
      statusText,
      ...headers
    } = {},
  ] = resp

  const defaultHeaders = { ...initCorsHeaders }
  if (autoCors && request) {
    let origin = request.headers.get('Origin')
    origin && (defaultHeaders['Access-Control-Allow-Origin'] = origin)
  }

  let respBody
  if (typeof body == 'object') {
    defaultHeaders['Content-type'] = 'application/json'
    respBody = JSON.stringify(body)
  } else respBody = body

  return new Response(respBody, {
    status,
    statusText,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
  })
}

/**
 * Essentially monkey patches `.body` onto a `Request` obj. b/c normal `Request`s can't have already parsed `.body`s.
 * If `.bodyUsed` is `true` (mutated `Request` w/ `.body` as it was parsed), you can't make a `new Request` or `.clone`
 * if you want `.body` to be preserved. You will need to add the `.body` prop to the new `Request`.
 * * A utility func can be made to do this `delete req.body` then appending... maybe call it `addBody(req)`?
 * * Or a cloning utility that spreads everything that isn't a standard request property
 * @param {Request} request
 */
export async function parseBody(request) {
  // GET/HEAD reqs can't have a body, see https://developer.mozilla.org/en-US/docs/Web/API/Request/body
  if (!request.body || request.method == 'GET' || request.method == 'HEAD')
    return request
  const { headers } = request
  const contentType = headers.get('content-type')

  // * If you plan to make this into a middleware for composition of body parsers, you'll have to check `.bodyUsed`

  let body
  switch (contentType) {
    case 'application/json':
      body = await request.json()
      break
    case 'application/text':
    case 'text/html':
      body = await request.text()
      break
    case 'form':
      const formData = await request.formData()
      body = {}
      for (let entry of formData.entries()) {
        body[entry[0]] = entry[1]
      }
      break
    default:
      // we're not sure what came in so we're just going to let it pass though by doing nothing.
      // bodyUsed will be false as the body wasn't consumed... it's untouched.

      // body = URL.createObjectURL(await request.blob())
      // * not sure what this is for, obviously outputs errors.
      break
  }

  // while request.body is read-only, it can be deleted. Also Request can have props created b/c it's an object
  if (request.bodyUsed) {
    delete request.body
    request.body = body
  }
  return request
}
