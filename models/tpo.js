const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const tpoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
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
    required: true,
    minlength: 5,
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
});

//FOR GENERATING WEB-TOKEN
tpoSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email },
    config.get("jwtPrivateKey")
  );
  return token;
};
const TPO = mongoose.model("Tpo", tpoSchema);

function validateTpo(tpo) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required().alphanum(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(8).max(255).required(),
    instituteName: Joi.string().min(3).max(255).required(),
    contactno: Joi.string().min(5).max(20).required(),
  });
  return schema.validate(tpo);
}

exports.TPO = TPO;
exports.validateTpo = validateTpo;
