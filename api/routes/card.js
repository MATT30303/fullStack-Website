import express from "express";
const router = express.Router();
import db from "../models/index.js";

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

router.post("/", async (req, res) => {
  try {
    const { userID, title, description, status, priority, dueDate, dueTime, createdAt } = req.body;

    if (!userID || !title || !description || !status || !priority || !dueDate || !createdAt) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const query = `
      INSERT INTO card (userID, title, description, status, priority, dueDate, dueTime, createdAt)
      VALUES (:userID, :title, :description, :status, :priority, :dueDate, :dueTime, :createdAt)
    `;
    await sequelize.query(query, {
      replacements: { userID, title, description, status, priority, dueDate, dueTime, createdAt },
      type: sequelize.QueryTypes.INSERT,
    });

    res.json({ message: "Card created successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
});

export default router;
