import { goto } from '$app/navigation'
import { get, writable } from 'svelte/store'

function createAuth() {
  const init = { token: null, expiresAt: null, userInfo: {} }
  if (typeof window != 'undefined') {
    var userInfo = localStorage.getItem('userInfo')
    var store = writable({
      token: localStorage.getItem('token'),
      expiresAt: localStorage.getItem('expiresAt'),
      userInfo: userInfo ? JSON.parse(userInfo) : {},
    })
  } else var store = writable(init)
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
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      localStorage.removeItem('expiresAt')
      set(init)
      goto('/login')
    },
    isAdmin: () => get(store).userInfo?.role === 'admin',
  }
}

export default createAuth()
