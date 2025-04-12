import express from 'express'
import { getCodeforcesStats } from '../Controllers/codeforces.controller.js';

const rankingRouter = express.Router();

rankingRouter.get('/ranking',getCodeforcesStats);

export default rankingRouter;