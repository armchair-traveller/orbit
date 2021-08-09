export default async function query(route, { ...init } = {}) {
  if (init.body && typeof init.body == 'object') {
    init.body = JSON.stringify(body)
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
