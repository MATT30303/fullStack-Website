import express from "express";
import cors from "cors";
const app = express();
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true  
}));
// ROUTERS
import cardRouter from "./routes/card.js";
app.use("/card", cardRouter);

import userRouter from "./routes/user.js";
app.use("/user", userRouter);

import logRouter from "./routes/log.js";
app.use("/log", logRouter);

import getUserRouter from "./routes/getUser.js";
app.use("/getUser", getUserRouter);

import db from "./models/index.js";
db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("server working");
  });
});
