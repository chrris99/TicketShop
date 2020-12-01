import mongoose from 'mongoose' 

interface IUser {
    email: string
    password: string
}

interface IUserModel extends IUser, mongoose.Document { }

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
})

UserSchema.static('create', (attributes: IUser) => {
    return new User(attributes)
})

const User = mongoose.model<IUserModel>('User', UserSchema)

User.create({
    email: "hello",
    password: 'password'
})

export { User }