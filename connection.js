import mongoose from 'mongoose'

const connectMongoDB = async (url)=>{
    const db = await mongoose.connect(`${url}`) 
    return db;
}

export default connectMongoDB