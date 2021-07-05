import { useCallback, useState } from "react"

type RequestT = {
   url: string,
   method?: `GET` | `POST` | `PUT` | `DELETE`,
   body?: any
   headers?: any;
}

type ErrorT = {
   message: string
}

export const useHttp = () => {

   const [isLoading, setIsLoading] = useState(false)
   const [error, setError] = useState(null)


   const request = useCallback(async ({ url, method = `GET`, body = null, headers = {} }: RequestT) => {
      setIsLoading(true)
      try {
         if (body) {
            body = JSON.stringify(body)
            headers[`Content-Type`] = `application/json`
         }


         const response = await fetch(url, { method, body, headers })

         const data: ErrorT = await response.json()

         if (!response.ok) {
            throw new Error(data.message)
         }

         setIsLoading(false)
      } catch (e) {
         setIsLoading(false)
         setError(e.message)
         throw e

      }
   }, [])

   const clearError = () => setError(null)


   return { isLoading, request, clearError, error }
}