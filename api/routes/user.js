import express from "express";
const router = express.Router();
import db from "../models/index.js";

const { sequelize } = db;

router.get("/", async (req, res) => {
  try {
    const query = `SELECT * from users`;
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
    const { username, password, email, createdAt, firstName, lastName } = req.body;

    if (!username || !password || !email || !createdAt || !firstName || !lastName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const query = `
      INSERT INTO login ( username, password, email, createdAt, firstName, lastName )
      VALUES (:username, :password, :email, :createdAt, :firstName, :lastName)
    `;
    await sequelize.query(query, {
      replacements: { username, password, email, createdAt, firstName, lastName },
      type: sequelize.QueryTypes.INSERT,
    });

    res.json({ message: "User created successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
});

export default router;
