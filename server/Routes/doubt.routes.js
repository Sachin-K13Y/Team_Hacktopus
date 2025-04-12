import express from "express"
import { addAnswer, addDoubt, deleteDoubt, upvoteDoubt } from "../Controllers/doubt.controller.js";
import { hasToken } from "../Utils/verifyToken.js";
import { GetAllDoubts } from "../Controllers/doubt.controller.js";
const doubtRoutes = express.Router();

doubtRoutes.post('/add-doubt',hasToken,addDoubt);
doubtRoutes.get('/delete-doubt/:id',deleteDoubt);
doubtRoutes.post('/add-answer/:id',hasToken,addAnswer);
doubtRoutes.get('/find-all-Doubts', GetAllDoubts);

doubtRoutes.post('/add-upvote/:id', hasToken, upvoteDoubt);
export default doubtRoutes;