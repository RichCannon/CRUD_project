import { Schema, model, Types } from 'mongoose'
import { ProfilesT } from './Profiles'

type UserT = {
   userName: string
   email: string
   password: string
   role: `admin` | `user`
   profiles: string[]
}

const schema = new Schema<UserT>({
   userName: { type: String, requires: true, unique: true },
   email: { type: String, requires: true, unique: true },
   password: { type: String, requires: true },
   role: { type: String, requires: true },
   profiles: [{ type: Types.ObjectId, ref: `Profiles` }]

})

const modelSchema = model<UserT>(`User`, schema)

export { modelSchema as User }