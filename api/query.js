import { createClient, fetchExchange } from '@urql/core'

const client = createClient({
  url: 'https://graphql.fauna.com/graphql',
  exchanges: [fetchExchange], // we never send duplicate queries, we also do not need caching
  fetchOptions: {
    headers: {
      Authorization: `Bearer ${ORBIT_FAUNA_SECRET}`,
      'X-Schema-Preview': 'partial-update-mutation',
    },
  },
})

export default function query(query, variables) {
  return client.query(query, variables).toPromise()
}
