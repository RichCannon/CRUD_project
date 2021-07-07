

export const CREATE_PROFILE_URL = `/api/profiles/create`
export const GET_PROFILES_URL  = `/api/profiles/`
export const PATCH_PROFILE_URL  = `/api/profiles/modify`
export const DELETE_PROFILE_URL  = `/api/profiles/delete`
export const GET_USER_URL = `/api/user`



export type CreateProfileBody = {
   name: string,
   gender: `male` | 'female'
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