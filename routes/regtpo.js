const bcrypt = require('bcrypt');
const {TPO, validateTpo} = require('../models/tpo');
const express = require('express');
const router = express.Router();

//FOR REGISTRATION OF TPO

router.post('/', async(req,res)=> {
    const {error} = validateTpo(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let tpo = await TPO.findOne({email: req.body.email});
    if(tpo) return res.status(400).send('TPO already registered');

    tpo = new TPO({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        instituteName: req.body.instituteName,
        contactno: req.body.contactno
    });

    const salt = await bcrypt.genSalt(15);
    tpo.password = await bcrypt.hash(tpo.password,salt);

    await tpo.save();

    const token = tpo.generateAuthToken();
    res.header('x-auth-token', token).send({
        _id: tpo._id,
        name: tpo.name,
        instituteName: tpo.instituteName,
        email: tpo.email,
        contactno: tpo.contactno
    });
});

module.exports = router;