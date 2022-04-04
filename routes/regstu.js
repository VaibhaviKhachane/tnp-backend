const bcrypt = require("bcrypt");
const { Student, validateStu } = require("../models/student");
const express = require("express");
const router = express.Router();

//FOR REGISTRATION OF Student

router.post("/", async (req, res) => {
  const { error } = validateStu(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let stu = await Student.findOne({ email: req.body.email });
  if (stu) return res.status(400).send("Student already registered");

  stu = new Student({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    instituteName: req.body.instituteName,
    contactno: req.body.contactno,
    socialLinks: req.body.socialLinks,
    tenPercentage: req.body.tenPercentage,
    twelvePercentage: req.body.twelvePercentage,
    cgpa: req.body.cgpa,
  });

  const salt = await bcrypt.genSalt(10);
  stu.password = await bcrypt.hash(stu.password, salt);

  await stu.save();

  const token = stu.generateAuthToken();
  res.header("x-auth-token", token).send({
    _id: stu._id,
    name: stu.name,
    email: stu.email,
    contactno: stu.contactno,
    instituteName: stu.instituteName,
    tenPercentage: stu.tenPercentage,
    twelvePercentage: stu.twelvePercentage,
    cgpa: stu.cgpa,
  });
});

module.exports = router;
