import { useCallback, useEffect, useState } from "react"


export type LoginParams = {
   jwtToken: string
   id: string
}

type UserDataToStore = {
   token: string,
   userId: string,
   createdAt: number
}

const STORAGE_NAME = `userData`

export const useAuth = () => {
   const [token, setToken] = useState<string | null>(null)
   const [userId, setUserId] = useState<string | null>(null)
   const [isReady, setIsReady] = useState(false)


   const login = useCallback(({ jwtToken, id }: LoginParams) => {
      setToken(jwtToken)
      setUserId(id)

      const dataToStore: UserDataToStore = {
         token: jwtToken,
         userId: id,
         createdAt: Date.now()
      }

      localStorage.setItem(STORAGE_NAME, JSON.stringify(dataToStore))
   }, [])


   const logout = useCallback(() => {
      setToken(null)
      setUserId(null)
      localStorage.removeItem(STORAGE_NAME)
   }, [])

   useEffect(() => {
      const storeData: UserDataToStore = JSON.parse(localStorage.getItem(STORAGE_NAME) || "{\"token\":null,\"userId\":null}")



      if (storeData && storeData.token) {

         if (Date.now() - storeData.createdAt >= 60 * 60 * 24 * 30) {
            logout()
         }
         else {
            //TODO: Refresh token and createdAt 
         }

         setToken(storeData.token)
         setUserId(storeData.userId)
         //login({ jwtToken: storeData.token, id: storeData.userId })
      }

      setIsReady(true)
      
   }, [login, logout])

   return { login, logout, token, userId, isReady }
}