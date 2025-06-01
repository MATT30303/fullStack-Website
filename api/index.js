import express from 'express';
import cors from 'cors';
const app = express();
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
const port = 3001;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'https://flan-s-todo-list.web.app',
    credentials: true,
  })
);
// ROUTERS
import cardRouter from './routes/card.js';
app.use('/card', cardRouter);

import userRouter from './routes/user.js';
app.use('/user', userRouter);

import logRouter from './routes/log.js';
app.use('/log', logRouter);

import getUserRouter from './routes/getUser.js';
app.use('/getUser', getUserRouter);

import db from './models/index.js';
import initializeDatabase from './utils/initDB.js';

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log(' Conectado a la base de datos');

    await db.sequelize.sync({ alter: true });
    console.log(' Tablas sincronizadas');

    await initializeDatabase();

    app.listen(port, () => {
      console.log(`Server running en el puerto ${port}`);
    });
  } catch (err) {
    console.error(' Error al iniciar el servidor o la base de datos:', err);
  }
})();
