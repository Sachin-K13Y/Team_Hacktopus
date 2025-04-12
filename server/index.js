import express from "express";
import dotenv from 'dotenv';
import { connectDB } from "./Config/db.js";

dotenv.config();
const app = express();

app.listen(process.env.PORT,()=>{
    console.log(`Server is Running at Port ${process.env.PORT}`);
})

connectDB();