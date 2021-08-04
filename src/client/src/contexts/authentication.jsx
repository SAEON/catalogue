import { useState, useEffect, createContext } from 'react'
import { CATALOGUE_CLIENT_ADDRESS, API_PUBLIC_ADDRESS } from '../config'

export const context = createContext()

export default ({ children }) => {
  const [userInfo, setUserInfo] = useState(false)
  const [authenticating, setAuthenticating] = useState(false)

  const authenticate = () => {
    if (userInfo) {
      return true
    } else {
      window.location.href = `${CATALOGUE_CLIENT_ADDRESS}/login?redirect=${window.location.href}`
    }
  }

  useEffect(() => {
    const abortController = new AbortController()

    ;(async () => {
      setAuthenticating(true)
      try {
        const response = await fetch(`${API_PUBLIC_ADDRESS}/authenticate`, {
          credentials: 'include',
          mode: 'cors',
          signal: abortController.signal,
        })
        const userInfo = await response.json()
        setUserInfo(userInfo)
        setAuthenticating(false)
      } catch (error) {
        throw new Error('Error authenticating user ::' + error.message)
      }
    })()

    return () => {
      abortController.abort()
    }
  }, [])

  return (
    <context.Provider
      value={{
        userInfo,
        authenticating,
        authenticate,
      }}
    >
      {children}
    </context.Provider>
  )
}
