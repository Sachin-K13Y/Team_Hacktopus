import express from 'express'
import { addExperience, addUpvote, deleteExperience, GetAllExperiences } from '../Controllers/experience.controller.js';
import { hasToken } from '../Utils/verifyToken.js';


const experienceRoutes = express.Router();

experienceRoutes.post('/add-experience',hasToken,addExperience);
experienceRoutes.get('/delete-experience/:id',hasToken,deleteExperience);
experienceRoutes.post('/add-upvote/:id',hasToken,addUpvote);
experienceRoutes.get('/find-all-experiences', GetAllExperiences);

export default experienceRoutes;