import express, { Request, Response, NextFunction } from 'express';
import taskRoute from './taskRoute';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors({
  origin: process.env.BASE_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use('/tasks', taskRoute)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`)
})