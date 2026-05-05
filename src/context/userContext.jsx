import { createContext, useEffect, useState } from 'react'

export const UserContext = createContext()

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    return localStorage.getItem('currentUser') || 'guest'
  })

  useEffect(() => {
    localStorage.setItem('currentUser', currentUser)
  }, [currentUser])

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  )
}
