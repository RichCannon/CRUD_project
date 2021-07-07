import { useCallback, useState } from "react"

type RequestT = {
   url: string,
   method?: `GET` | `POST` | `PUT` | `DELETE` | `PATCH`,
   body?: any
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


   const request = useCallback(async function <T>({ url, method = `GET`, body = null, headers = {} }: RequestT): Promise<T> {
      setIsLoading(true)
      try {
         if (body) {
            body = JSON.stringify(body)
            headers = { "content-type": "application/json", ...headers }
         }


         const response = await fetch(url, { method, body, headers })

         const data: ErrorResponseT | T = await response.json()


         if (!response.ok) {
            const newData = data as ErrorResponseT
            const errorObj: ErrorFormattedT = {}
            newData.errors.map(d => errorObj[d.param] = d.msg)
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

   return { isLoading, request, clearError, error }
}