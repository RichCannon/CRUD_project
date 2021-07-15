

export const CREATE_PROFILE_URL = `/api/profiles/create`
export const GET_PROFILES_URL  = `/api/profiles`
export const PATCH_PROFILE_URL  = `/api/profiles/modify`
export const DELETE_PROFILE_URL  = `/api/profiles/delete`
export const GET_USER_URL = `/api/user`
export const PATCH_USER_URL = `/api/user/modify`
export const DELETE_USER_URL = '/api/user/delete'
export const NEW_TOKEN_URL = '/api/auth/newToken'



export type CreateProfileBody = {
   name: string,
   gender: GenderT
   birthdate: string
   city: string
   _id?: string
   owner?: string
}

export type GenderT = `male` | `female`

export type RoleT = `admin` | `user`

export type UserT = {
   userName: string
   email: string
   role: RoleT
   numOfProfiles: number
   _id: string
}

export type LoginResponseT = {
   token: string
   userId: string
   createdAt: number
}

export type UserDataToStore = {
   token: string,
   userId: string,
   createdAt: number
}