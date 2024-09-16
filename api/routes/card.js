import express from "express";
const router = express.Router();
import db from "../models/index.js";
import { SECRET } from "./config.js";
import jwt from "jsonwebtoken";


const { sequelize } = db;

router.get("/", async (req, res) => {
  try {
    const query = `SELECT * from card`;
    const result = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });
    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
});

router.post("/createCard", async (req, res) => {
  try {
    const {title, description, status, priority, category, dueDate, dueTime } = req.body;

    const token = req.cookies.access_token;
    if(!token) res.status(401).json({message: "Token missing"});
    const data = jwt.verify(token, SECRET);
    const userID = data.userID;
    if (!userID || !title || !description || !status || !priority || !category || !dueDate || !dueTime) {
      return res.status(400).json("incorrect");
    }

    const query = `
      INSERT INTO card (userID, title, description, status, priority, category, dueDate, dueTime)
      VALUES (:userID, :title, :description, :status, :priority, :category, :dueDate, :dueTime)
    `;
    await sequelize.query(query, {
      replacements: { userID, title, description, status, priority, category, dueDate, dueTime },
      type: sequelize.QueryTypes.INSERT,
    });

    res.json("correct");
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
});

router.post("/getCards", async (req, res) => {

  try {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json({ message: "No token, authorization denied" });
    const data = jwt.verify(token, SECRET)
    const userID = data.userID;
    const query = `
    SELECT *
    from card
    where userID = :userID`;
    const result = await sequelize.query(query, {
      replacements: { userID },
      type: sequelize.QueryTypes.SELECT,
    });
    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
  
});

router.post("/updateCard", async (req, res) => {
  try {
    const { taskID, title, description, status, priority, category, dueDate, dueTime, updatedAt } = req.body;

    if (!taskID || !title || !description || !status || !priority || !category || !dueDate || !updatedAt) {
      return res.json("incorrect");
    }

    const query = `
      UPDATE card
      set title = :title, description = :description, status = :status, priority = :priority, category = :category, dueDate = :dueDate, dueTime = :dueTime, updatedAt = :updatedAt
      WHERE taskID = :taskID
    `;
    await sequelize.query(query, {
      replacements: { title, description, status, priority, category, dueDate, dueTime, updatedAt, taskID },
      type: sequelize.QueryTypes.UPDATE,
    });

    res.json("correct");
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
});

router.post("/deleteCard", async (req, res) => {
  try {
    const { taskID } = req.body;

    if (!taskID) {
      return res.status(400).json("incorrect");
    }

    const query = `
      DELETE from card where taskID = :taskID
    `;
    await sequelize.query(query, {
      replacements: { taskID },
      type: sequelize.QueryTypes.DELETE,
    });

    res.json("correct");
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
});

router.post("/statusCard", async (req, res) => {
  try {
    const { taskID, status } = req.body;

    if (!taskID || !status) {
      return res.json("incorrect");
    }

    const query = `
      UPDATE card
      set status = :status
      WHERE taskID = :taskID
    `;
    await sequelize.query(query, {
      replacements: { taskID, status },
      type: sequelize.QueryTypes.UPDATE,
    });

    res.json("correct");
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
});

export default router;
