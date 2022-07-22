import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password })
      })
      
      const json = await response.json()

      if(!response.ok) {
        setIsLoading(false)
        setError(json.error)
        return
      }

      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))
      
      dispatch({ type: 'LOGIN', payload: json })

      setError(null)
      setIsLoading(false)
    } catch (err) {
      console.log(err.message);
      setIsLoading(false)
      setError(err.error)
    }
  }

  return { error, isLoading, login }
}
