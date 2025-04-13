
import express from "express"
import mongoose, { mongo } from "mongoose";
import dotenv from 'dotenv';
import { connectDB } from "./Config/db.js";
import userRoutes from "./Routes/user.routes.js";
import experienceRoutes from "./Routes/experience.routes.js";
import doubtRoutes from "./Routes/doubt.routes.js";
import cookieParser from "cookie-parser";
import rankingRouter from "./Routes/ranking.routes.js";
import cors from 'cors';
import { getAllNews } from "./Controllers/news.controller.js";
import newsRouter from "./Routes/news.routes.js";
dotenv.config();
const app = express();
app.use(cookieParser());
app.use(cors({
    origin: true,
    credentials: true
}));
app.listen(process.env.PORT,()=>{
    console.log("Server is Running at Port 3000");
})


//MONGO DB Connection
connectDB();
app.use(express.json())
app.use('/user',userRoutes);
app.use('/experience',experienceRoutes);
app.use('/doubts',doubtRoutes);
app.use('/',rankingRouter);
app.use('/news',newsRouter);
