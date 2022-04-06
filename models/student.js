const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
// const {driveSchema} = require('../models/drive');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 1024,
  },
  instituteName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  contactno: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20,
  },
  tenPercentage: {
    type: Number,
    min: 0,
    max: 100,
    required:true
  },
  twelvePercentage: {
    type: Number,
    min: 0,
    max: 100,
    required:true
  },
  cgpa:{
    type: Number,
    required: true
  },
  socialLinks: [String],

  
});



studentSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id },
    config.get("jwtPrivateKey")
  );
  return token;
};
const Student = mongoose.model("Student", studentSchema);
function validateStu(student) {
  const schema = Joi.object({
    name: Joi.string().max(255).required().alphanum(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(8).max(255).required(),
    instituteName: Joi.string().min(3).max(255).required(),
    contactno: Joi.string().min(5).max(20).required(),
    tenPercentage: Joi.number().min(0).max(100).required(),
    twelvePercentage: Joi.number().min(0).max(100).required(),
    cgpa: Joi.number().required(),
    socialLinks: Joi.array(),
  });
  return schema.validate(student);
}

exports.Student = Student;
exports.studentSchema = studentSchema;
exports.validateStu = validateStu;
