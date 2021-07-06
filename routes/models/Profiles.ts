import { Schema, model, Types } from 'mongoose'

export type ProfilesT = {
   name: string,
   gender: `male` | 'female'
   birthdate: number
   city: string
}

const schema = new Schema<ProfilesT>({
   name: { type: String, requires: true },
   gender: { type: String, requires: true },
   birthdate: { type: Number, requires: true },
   city: { type: String, requires: true },
   owner: { type: Types.ObjectId, ref: `User` }

})

const modelSchema = model<ProfilesT>(`Profiles`, schema)

export { modelSchema as Profiles }