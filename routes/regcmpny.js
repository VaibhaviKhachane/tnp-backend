const bcrypt = require('bcrypt');
const {Cmpny, validateCmpny} = require('../models/cmpny');
const express = require('express');
const router = express.Router();

//FOR REGISTRATION OF COMPANY

router.post('/', async(req,res)=> {
    const {error} = validateCmpny(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let cmpny = await Cmpny.findOne({email: req.body.email, name: req.body.name});
    if(cmpny) return res.status(400).send('Company Already Registered');

    cmpny = new Cmpny({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        webLink: req.body.webLink,
        contactno: req.body.contactno
    });

    const salt = await bcrypt.genSalt(10);
    cmpny.password = await bcrypt.hash(cmpny.password,salt);

    await cmpny.save();

    const token = cmpny.generateAuthToken();
    res.header('x-auth-token', token).send({
        _id: cmpny._id,
        name: cmpny.name,
        address: cmpny.address,
        email: cmpny.email,
        contactno: cmpny.contactno,
        webLink: cmpny.webLink
    });
});

module.exports = router;