import express from "express";
import dotenv from 'dotenv';
import { connectDB } from "./Config/db.js";
import newsRouter from "./Routes/news.routes.js";
import experienceRoutes from "./Routes/experience.routes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.listen(process.env.PORT,()=>{
    console.log(`Server is Running at Port ${process.env.PORT}`);
})

app.use('/news',newsRouter);
app.use('/experience',experienceRoutes);
connectDB();