const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const cmpnySchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 255,
  },
  address: {
    type: String,
    minlength: 3,
    maxlength: 255,
  },
  webLink: {
    type: [String],
    maxlength: 255,
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1024,
  },
  contactno: {
    type: String,
    minlength: 5,
    maxlength: 20,
  },
  
});

//FOR GENERATING WEB-TOKEN
cmpnySchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email, name: this.name },
    config.get("jwtPrivateKey")
  );
  return token;
};
const Cmpny = mongoose.model("Cmpny", cmpnySchema);

function validateCmpny(cmpny) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required().alphanum(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(8).max(255).required(),
    address: Joi.string().min(3).max(255).required(),
    webLink: Joi.array().max(255),
    contactno: Joi.string().min(5).max(20).required(),
  });
  return schema.validate(cmpny);
}

exports.cmpnySchema = cmpnySchema;
exports.Cmpny = Cmpny;
exports.validateCmpny = validateCmpny;
