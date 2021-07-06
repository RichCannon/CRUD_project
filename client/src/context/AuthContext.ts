import { createContext } from "react";
import { LoginParams } from "../hooks/useAuth";

type ContextT = {
   token: null | string,
   userId: null | string,
   login: (args: LoginParams) => void,
   logout: (...args: any) => void,
   isAuth: boolean
}


const context: ContextT = {
   token: null,
   userId: null,
   login: () => { },
   logout: () => { },
   isAuth: false
}

export const AuthContext = createContext(context)