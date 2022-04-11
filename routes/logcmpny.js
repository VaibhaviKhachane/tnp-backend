const { Cmpny } = require("../models/cmpny");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Joi = require("joi");
const auth = require("../middelware/auth");


router.get('/', async(req,res) => {
  const cmpny = await Cmpny.find();
  res.send(cmpny);
});

//access given on the basis of token generated after login
//need to send x-auth-token in header
//while sending request
router.get('/me',auth, async (req,res)=> {
  const user = await Cmpny.findById(req.user._id).select('-password');
  res.send(user);
})

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let cmpny = await Cmpny.findOne({ email: req.body.email , name: req.body.name});
  if (!cmpny) return res.status(400).send("Invalid Email, Password or Name");

  const validPassword = await bcrypt.compare(req.body.password, cmpny.password);
  if (!validPassword) return res.status(400).send("Invalid Email or Password");

  const token = cmpny.generateAuthToken();
  res.send(token);
  
});

function validate(req) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required().alphanum(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(8).max(255).required(),
  });
  return schema.validate(req);
}

module.exports = router;
