import mongoose from 'mongoose';


export const dbConnect = async () => {
    return await mongoose.connect(process.env.MONGO_CONNECTION_STRING!).then(value => value.connection);
}