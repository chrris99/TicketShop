import mongoose from 'mongoose' 
import { Password } from '../services/password'

interface IUser {
    email: string
    password: string
}

interface IUserModel extends mongoose.Model<IUserDocument> { 
    build(user: IUser): IUserDocument
}

interface IUserDocument extends mongoose.Document {
    email: string
    password: string
}

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
})

UserSchema.set('toJSON', {
    transform(doc: any, ret: { password: any, __v: any, _id: any, id: any }) {
        ret.id = ret._id
        delete ret._id
        delete ret.password
        delete ret.__v
    }
})

UserSchema.pre('save', async function() {
    if (this.isModified('password')) {
        const hashedPassword = await Password.hash(this.get('password'))
        this.set('password', hashedPassword)
    }
})

UserSchema.static('build', (user: IUser) => {
    return new User(user)
})

const User = mongoose.model<IUserDocument, IUserModel>('User', UserSchema)

export { User }