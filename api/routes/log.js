import express from "express";
const router = express.Router();
import db from "../models/index.js";

const { sequelize } = db;

router.get("/", async (req, res) => {
  try {
    const query = `SELECT * from log`;
    const result = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });
    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const { userID, activity, timeStamp } = req.body;

    if (!userID || !activity || !timeStamp) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const query = `INSERT INTO log(userID, activity, timeStamp) VALUES( :userID, :activity, :timeStamp)`;
    await sequelize.query(query, {
      replacementes: { userID, activity, timeStamp },
      type: sequelize.QueryTypes.INSERT,
    });
    res.json({ message: "log created" });
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
});
export default router;
