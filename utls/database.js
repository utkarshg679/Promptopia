import mongoose from "mongoose";

let isConnected = false;

export const connectToDb = async () => {
    mongoose.set('strictQuery',true);

    if (isConnected){
        console.log("MongoDB is already connected" );
        return ;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        isConnected = true;
        console.log("MongoDB connected");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        throw new Error("Failed to connect to MongoDB");    
    }

} 