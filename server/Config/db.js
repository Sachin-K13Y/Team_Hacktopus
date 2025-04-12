import mongoose from "mongoose"

export const connectDB = async()=>{
    try {
        mongoose.connect(process.env.MONGO_URI)
        .then(()=>{
            console.log("MongoDB Connection Successful!!");
        })
    } catch (error) {
        console.log("MongoDB Connection Failed");
    }
    
}