import { goto } from '$app/navigation'
import { writable } from 'svelte/store'

export default function createAuth() {
  if (typeof window == 'undefined') return writable()

  const store = writable({
    token: localStorage.getItem('token'),
    userInfo: ((userInfo) => (userInfo ? JSON.parse(userInfo) : {}))(
      localStorage.getItem('userInfo')
    ),
    expiresAt: localStorage.getItem('expiresAt'),
  })
  const { set } = store

  return {
    ...store,
    setAuthInfo({ token, userInfo, expiresAt }) {
      localStorage.setItem('token', token)
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
      localStorage.setItem('expiresAt', expiresAt)

      set({
        token,
        userInfo,
        expiresAt,
      })
    },
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      localStorage.removeItem('expiresAt')
      set({})
      goto('/login')
    },
    isAuthenticated() {
      // * you can consider derived stores for booleans, this is just using get() for convenience
      const authState = get(store)
      if (!authState.token || !authState.expiresAt) {
        return false
      }
      return new Date().getTime() / 1000 < authState.expiresAt
    },
    isAdmin() {
      const authState = get(store)
      return authState.userInfo?.role === 'admin'
    },
  }
}
