import { goto } from '$app/navigation'
import { get, writable } from 'svelte/store'

function createAuth() {
  if (typeof window == 'undefined')
    return writable({ token: null, expiresAt: null, userInfo: {} })

  const userInfo = localStorage.getItem('userInfo')
  const store = writable({
    token: localStorage.getItem('token'),
    expiresAt: localStorage.getItem('expiresAt'),
    userInfo: userInfo ? JSON.parse(userInfo) : {},
  })
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
      get
      return true
    },
  }
}

export default createAuth()
