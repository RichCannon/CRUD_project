import { useCallback, useEffect, useState } from "react"

import { LoginResponseT, NEW_TOKEN_URL, UserDataToStore } from "../types/types"
import { useHttp } from "./useHttp"


export type LoginParams = {
   jwtToken: string
   id: string
   createdAt: number
}


const STORAGE_NAME = `userData`

export const useAuth = () => {
   const [token, setToken] = useState<string | null>(null)
   const [userId, setUserId] = useState<string | null>(null)
   const [isReady, setIsReady] = useState(false)

   const { request, error, clearError } = useHttp()





   const login = useCallback(({ jwtToken, id, createdAt }: LoginParams) => {
      setToken(jwtToken)
      setUserId(id)

      const dataToStore: UserDataToStore = {
         token: jwtToken,
         userId: id,
         createdAt
      }

      localStorage.setItem(STORAGE_NAME, JSON.stringify(dataToStore))
   }, [])


   const logout = useCallback(() => {
      setToken(null)
      setUserId(null)
      localStorage.removeItem(STORAGE_NAME)
   }, [])


   useEffect(() => {
      if (error && error.auth) {
         alert(error.auth)
         logout()
         setIsReady(true)
         clearError()
      }
   }, [error])




   useEffect(() => {
      const storeData: UserDataToStore = JSON.parse(localStorage.getItem(STORAGE_NAME) || "{\"token\":null,\"userId\":null}")



      if (storeData && storeData.token) {

         if (Date.now() - storeData.createdAt >= 60 * 60 * 24 * 30) {
            logout()
            setIsReady(true)
         }
         else {
            (async () => {
               const dataToken = await request<LoginResponseT>({
                  url: NEW_TOKEN_URL, headers: {
                     authorization: `Bearer ${storeData.token}`
                  }
               })

               login({ jwtToken: dataToken.token, id: dataToken.userId, createdAt: dataToken.createdAt })
               setIsReady(true)
            })()

         }

      }
      else {
         setIsReady(true)
      }

   }, [login, logout])

   return { login, logout, token, userId, isReady }
}