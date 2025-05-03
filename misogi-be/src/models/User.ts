import { Document, Schema, model } from 'mongoose'

export interface IUser extends Document {
  name: string
  email?: string
  password: string
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
  },
  { timestamps: true, versionKey: false }
)


export const UserModel = model<IUser>('User', UserSchema)
