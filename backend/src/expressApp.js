import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './db.js';
import router from './userRoutes.js';

const app = express();
app.use(cors());

app.use(express.json());

connectToDatabase();

app.use('', router);

export default app;