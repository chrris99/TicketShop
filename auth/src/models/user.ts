import mongoose from 'mongoose' 
import { Password } from '../services/password'

interface IUser {
    email: string
    password: string
}

interface IUserModel extends mongoose.Model<IUserDocument> { 
    build(attributes: IUser): IUserDocument
}

interface IUserDocument extends mongoose.Document {
    email: string
    password: string
}

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
})

UserSchema.pre('save', async function() {
    if (this.isModified('password')) {
        const hashedPassword = await Password.hash(this.get('password'))
        this.set('password', hashedPassword)
    }
})

UserSchema.static('build', (attributes: IUser) => {
    return new User(attributes)
})

const User = mongoose.model<IUserDocument, IUserModel>('User', UserSchema)

const user = User.build({
    email: 'test@test.com',
    password: 'password'
})

export { User }