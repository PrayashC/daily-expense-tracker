import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './db.js';
import router from './userRoutes.js';

const app = express();
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json());


  
connectToDatabase();

app.use('/', router);

export default app;