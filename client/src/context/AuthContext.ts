import { createContext } from "react";
import { LoginParams } from "../hooks/useAuth";
import { RoleT } from "../types/types";


export type UserDataT = {
   userName: string
   role: RoleT
}


type ContextT = {
   token: null | string,
   userId: null | string,
   login: (args: LoginParams) => void,
   logout: (...args: any) => void,
   isAuth: boolean
   userData: UserDataT
}



const context: ContextT = {
   token: null,
   userId: null,
   login: () => { },
   logout: () => { },
   isAuth: false,
   userData: {
      userName: ``,
      role: `user`,
   }
}

export const AuthContext = createContext(context)