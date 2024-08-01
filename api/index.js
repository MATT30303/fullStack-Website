import express from "express";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());
// ROUTERS
import cardRouter from "./routes/card.js";
app.use("/card", cardRouter);

import userRouter from "./routes/user.js";
app.use("/user", userRouter);

import logRouter from "./routes/log.js";
app.use("/log", logRouter);

import db from "./models/index.js";
db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("server working");
  });
});
