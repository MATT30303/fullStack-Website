import express from "express";
const router = express.Router();
import db from "../models/index.js";
import bcrypt, { hash } from "bcrypt";

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
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json("incorrect");
    }

    const query = `
    SELECT email, password
    from users 
    where email = :email`;
    const result = await sequelize.query(query, {
      replacements: { email },
      type: sequelize.QueryTypes.SELECT,
    });
    if (!result[0]) res.json("incorrect");
    bcrypt.compare(password, result[0].password).then((match) => {
      if (!match) {
        res.json("incorrect");
      } else {
        res.json("correct");
      }
    });
  } catch (e) {
    console.error(e);
  }
});

export default router;
