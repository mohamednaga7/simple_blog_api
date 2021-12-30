import { Schema, model, connect } from 'mongoose';
import {hash, compare} from 'bcryptjs';

// 1. Create an interface representing a document in MongoDB.
interface User {
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    phoneNumber: string,
    birthDate: Date,
    compare(password: string): Promise<boolean>,
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<User>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    phoneNumber: { type: String, required: true, unique: true},
    birthDate: { type: Date, required: true}
}, {
    timestamps: true,
    versionKey: false,
});

schema.pre('save', async function(next) {
    if (this.isModified) {
        this.password = await hash(this.password, 12);
    }
    next();
});

schema.methods.compare = async function(password: string) : Promise<boolean> {
    return await compare(password, this.password);
}

// 3. Create a Model.
export const UserModel = model<User>('User', schema);