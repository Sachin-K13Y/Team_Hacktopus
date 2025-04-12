import express from 'express'
import { addExperience, addUpvote, deleteExperience, GetAllExperiences } from '../Controllers/experience.controller.js';


const experienceRoutes = express.Router();

experienceRoutes.post('/add-experience',addExperience);
experienceRoutes.get('/delete-experience/:id',deleteExperience);
experienceRoutes.post('/add-upvote/:id',addUpvote);
experienceRoutes.get('/find-all-experiences', GetAllExperiences);

export default experienceRoutes;