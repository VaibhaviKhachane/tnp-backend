const { Student } = require("../models/student");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let stu = await Student.findOne({ email: req.body.email });
  if (!stu) return res.status(400).send("Invalid Email or Password");

  const validPassword = await bcrypt.compare(req.body.password, stu.password);
  if (!validPassword) return res.status(400).send("Invalid Email or Password");

  const token = stu.generateAuthToken();
  res.send(token);
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(8).max(255).required(),
  });
  return schema.validate(req);
}

module.exports = router;
