import { goto } from '$app/navigation'
import { writable } from 'svelte/store'

function createAuth() {
  if (typeof window == 'undefined')
    return writable({ token: null, expiresAt: null, userInfo: {} })

  const store = writable({
    token: null,
    expiresAt: null,
    userInfo: {},
  })
  const { set } = store

  return {
    ...store,
  }
}

export default createAuth()
