import express from 'express';
import cors from 'cors';

import userRouter from './routes/userRoute.js';

import { getUsers } from './queries/index.js';
import { verify } from './controllers/userController.js';
import databaseConnection from './database/index.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

databaseConnection.getConnect();

app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'hello world',
  });
});

//create

//read
app.use('/users', userRouter);

//update

//delete
export default app;
