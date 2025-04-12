import express from 'express'
import { createNews, getAllNews } from '../Controllers/news.controller.js';

const newsRouter = express.Router();

newsRouter.post('/add-news',createNews)
newsRouter.get('/get-all',getAllNews)

export default newsRouter;