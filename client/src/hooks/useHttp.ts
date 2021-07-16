import { useCallback, useState } from "react"

type RequestT<B> = {
   url: string,
   method?: `GET` | `POST` | `PUT` | `DELETE` | `PATCH`,
   body?: B | null
   headers?: Headers | {};
}

type ErrorResponseT = {
   message: string
   errors: {
      location: string
      msg: string
      param: string
      value: string
   }[]
}

type ErrorFormattedT = {
   [key: string]: string
}

export const useHttp = () => {

   const [isLoading, setIsLoading] = useState(false)
   const [error, setError] = useState<ErrorFormattedT | null>(null)

  
  // const BASE_URL =  `http://localhost:5000`
 //  const BASE_URL =  `http://api_server:5000`

   const request = useCallback(async function <T, B = any>({ url, method = `GET`, body = null, headers = {} }: RequestT<B>): Promise<T> {
      setIsLoading(true)
      try {

         let jsonBody = null
         if (body) {
            jsonBody = JSON.stringify(body)
            headers = { "content-type": "application/json", ...headers }
         }


         const response = await fetch(url, { method, body: jsonBody, headers })

         const data: ErrorResponseT | T = await response.json()


         if (!response.ok) {
            const newData = data as ErrorResponseT
            const errorObj: ErrorFormattedT = {}

            newData.errors.map(d => errorObj[d.param] = d.msg)
            if (response.status >= 500) {
               alert(`Some problems on server`)
            }
            throw errorObj
         }
         setIsLoading(false)

         return data as T

      } catch (e) {

         setIsLoading(false)
         setError(e)
         throw e

      }
   }, [])

   const clearError = (key?: string) => {
      if (error) {
         if (key) {
            const newError = { ...error }
            delete newError[key]
            setError(newError)
         }
         else {
            setError(null)
         }
      }

   }

   return { isLoading, request, clearError, error, setError }
}