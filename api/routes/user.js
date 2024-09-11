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
    const { username, password, email, firstName, lastName } = req.body;

    if (!username || !password || !email || !firstName || !lastName) {
      return res.status(400).json("incorrect");
    }

    bcrypt.hash(password, 10).then((hash) => {
      const query = `
        INSERT INTO users ( username, password, email, firstName, lastName )
        VALUES (:username, :hash, :email, :firstName, :lastName)
      `;
      sequelize.query(query, {
        replacements: { username, hash, email, firstName, lastName },
        type: sequelize.QueryTypes.INSERT,
      });
    });

    res.json("correct");
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
});
router.post("/check", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.json("empty");
    }

    const query = `
    SELECT email, password
    from users 
    where email = :email`;
    const result = await sequelize.query(query, {
      replacements: { email },
      type: sequelize.QueryTypes.SELECT,
    });
    if (!result[0]) res.json("correct");
    else {
      res.json("incorrect");
    }
  } catch (e) {
    console.error(e);
  }
});
router.post("/userCard", async (req, res) => {
  try {
    const { userID } = req.body;

    if (!userID) {
      return res.json("incorrect");
    }

    const query = `
    SELECT *
    from users 
    where userID = :userID`;
    const result = await sequelize.query(query, {
      replacements: { userID },
      type: sequelize.QueryTypes.SELECT,
    });
    if (!result[0]) res.json("incorrect");
    else {
      res.json(result);
    }
  } catch (e) {
    console.error(e);
  }
});

router.post("/userData", async (req, res) => {
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
router.post("/userPassword", async (req, res) => {
  try {
    const { password, userID } = req.body;

    if (!password || !userID) {
      return res.json("error");
    }

    const query = `
    SELECT password
    from users 
    where userID = userID`;
    const result = await sequelize.query(query, {
      replacements: { userID },
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
router.post("/passUpdate", async (req, res) => {
  try {
    const { userID, password } = req.body;

    if (!userID || !password) {
      return res.status(400).json("error");
    }

    bcrypt.hash(password, 10).then((hash) => {
      const query = `
        update users
        set password :hash
        where userID = :userID
        `;
      sequelize.query(query, {
        replacements: { hash, userID },
        type: sequelize.QueryTypes.INSERT,
      });
    });
    res.json("correct");
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
});

export default router;
