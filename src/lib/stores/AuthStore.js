import { goto } from '$app/navigation'
import { get, writable } from 'svelte/store'

function createAuth() {
  if (typeof window != 'undefined') {
    var userInfo = localStorage.getItem('userInfo')
    var store = writable({
      token: localStorage.getItem('token'),
      expiresAt: localStorage.getItem('expiresAt'),
      userInfo: userInfo ? JSON.parse(userInfo) : {},
    })
  } else var store = writable({ token: null, expiresAt: null, userInfo: {} })
  const { set } = store

  return {
    ...store,
    setAuthState({ token, userInfo, expiresAt }) {
      localStorage.setItem('token', token)
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
      localStorage.setItem('expiresAt', expiresAt)

      set({ token, userInfo, expiresAt })
    },
    isAuthenticated() {
      const { token, expiresAt } = get(store)
      return !token || !expiresAt
        ? false
        : new Date().getTime() / 1000 < expiresAt
    },
  }
}

export default createAuth()
