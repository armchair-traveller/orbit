/**
 * Automatically takes care sending JSON if object, and parsing JSON responses.
 * @param {string} route - path after base route
 * @param {object} init
 * @returns {object|Response}
 */
export default async function query(route, { ...init } = {}) {
  if (init.body && typeof init.body == 'object') {
    init.body = JSON.stringify(init.body)
    init.headers ??= {}
    init.headers['Content-type'] = 'application/json'
  }

  const resp = await fetch(
    `${
      import.meta.env.PROD
        ? import.meta.env.VITE_API_URL
        : import.meta.env.VITE_DEV_API_URL
    }${route}`,
    init
  )
  if (resp.headers.get('Content-type') == 'application/json')
    return await resp.json()

  return resp
}
