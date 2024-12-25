const express = require('express');
const zod = require('zod');
const jwt = require("jsonwebtoken");
const JWT_SECRET = require('../config');
const router = express.Router();
const { User, Account } = require("../db");


//signup route
const signupBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstname: zod.string(),
  lastname: zod.string(),
})

router.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs"
    })
  }

  const existingUser = await User.findOne({
    username: req.body.username
  })
  if (existingUser) {
    return res.status(411).json({
      message: "User email exists"
    })
  }

  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  })

  const userId = user._id;

  // await Account.create({
  //   userId,
  //   balance: 1 + Math.random() * 10000
  // })

  const token = jwt.sign({
    userId
  }, JWT_SECRET);

  res.json({
    message: "User created successfully",
    token: token
  })
})

module.exports = router;