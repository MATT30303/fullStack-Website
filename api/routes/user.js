import express from "express";
const router = express.Router();
import db from "../models/index.js";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET } from "./config.js";

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
      return res.status(400).json("error");
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
    const token = req.cookies.access_token;
    if(!token) res.status(401).json({message: "Token missing"});
    const data = jwt.verify(token, SECRET);
    const userID = data.userID;
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

router.post("/userCookie", async (req, res) => {
  try {
    const token = req.cookies.access_token;
    if (!token){ 
     res.json("unauthorized");
    }
    else{
      res.json("authorized");    
    }
  } catch (e) {
    console.error(e);
  }
});
router.post("/logout", (req, res) => {
  res.cookie('access_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: new Date(0)  // Set expiration date to a past time
  }).json({ message: "Logged out successfully" });
});

router.post("/userData", async (req, res) => {
  try {
    

    const { email, password } = req.body;

    if (!email || !password) {
      return res.json("error");
    }
    const query = `
    SELECT email, password, userID
    from users 
    where email = :email`;
    const result = await sequelize.query(query, {
      replacements: { email },
      type: sequelize.QueryTypes.SELECT,
    });
    if (!result[0]) res.json("incorrect");
    bcrypt.compare(password, result[0].password).then((match) => {
      if (!match)res.json("incorrect");
      const userID = result[0].userID
      const token = jwt.sign({userID: userID }, SECRET, {
        expiresIn: '7d',
      })
      res.cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',  // Usar secure solo en producción
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000
      })
      .json("authorized");
    });
  } catch (e) {
    console.error(e);
  }
});

router.post("/userUpdate", async (req, res) => {
  try {
    const { username, email, updatedAt, firstName, lastName, pic } = req.body;
    const token = req.cookies.access_token;
    if(!token) res.status(401).json({message: "Token missing"});
    const data = jwt.verify(token, SECRET);
    const userID = data.userID;

    if (!username || !email || !updatedAt || !firstName || !lastName || !pic || !userID) {
      return res.status(400).json("error");
    }

    
    const query = `
      UPDATE users
      SET username = :username, email = :email, updatedAt = :updatedAt, firstName = :firstName, lastName = :lastName, pic = :pic
      WHERE userID = :userID
    `;
    sequelize.query(query, {
      replacements: { username, email, updatedAt, firstName, lastName, pic, userID },
      type: sequelize.QueryTypes.UPDATE,
    });
    res.json("correct");
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
});


router.post("/userPassword", async (req, res) => {
  try {
    const { password } = req.body;
    const token = req.cookies.access_token;
    if(!token) res.status(401).json({message: "Token missing"});
    const data = jwt.verify(token, SECRET);
    const userID = data.userID;
    
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
    const { password } = req.body;
    const token = req.cookies.access_token;
    if(!token) res.status(401).json({message: "Token missing"});
    const data = jwt.verify(token, SECRET);
    const userID = data.userID;

    if (!userID || !password) {
      return res.status(400).json("error");
    }

    bcrypt.hash(password, 10).then((hash) => {
      const query = `
        update users
        set password = :hash
        where userID = :userID
        `;
      sequelize.query(query, {
        replacements: { hash, userID },
        type: sequelize.QueryTypes.UPDATE,
      });
    });
    res.json("correct");
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
});

export default router;
