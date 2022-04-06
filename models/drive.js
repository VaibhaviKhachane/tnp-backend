const { string } = require("joi");
const Joi = require("joi");
const mongoose = require("mongoose");
const { cmpnySchema } = require("./cmpny");
const {studentSchema} = require('./student');

const driveSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 3,
    maxlength: 255,
  },
  cmpny: {
    type: new mongoose.Schema({
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
        minlength: 3,
        maxlength: 255,
      },
      email: {
        type: String,
        minlength: 5,
        maxlength: 255,
      },
      contactno: {
        type: String,
        minlength: 5,
        maxlength: 20,
      },
    })
  },

  percentage: {
    type: Number,
    
    min: 0,
    max: 100,
  },
  endDate: {
    type: Date,
  },

  jobDescript: {
    type: String,
  },
  branch: {
    type: [String],
  },
  gap: {
    type: String,
  
  },
  ctc: String,
  loc: String,
  batchYear: {
    type: String,
  },
  applyLink: String,
  appliedStudent: [{
    type: new mongoose.Schema({
      name: {
        type: String,
        minlength: 3,
        maxlength: 100
      },
     
      email: {
        type: String,
        unique: true,
        minlength: 5,
        maxlength: 255,
      },
      instituteName: {
        type: String,
        minlength: 3,
        maxlength: 255,
      },
      contactno: {
        type: String,
        minlength: 5,
        maxlength: 20,
      },
      tenPercentage: {
        type: Number,
        min: 0,
        max: 100,
      },
      twelvePercentage: {
        type: Number,
        min: 0,
        max: 100,
        
      },
      cgpa:{
        type: Number,
  
      },
      
    })
  }]
});



const Drive = mongoose.model("Drive", driveSchema);

function validateDrive(drive) {
  const schema = Joi.object({
    
    title: Joi.string().min(3).max(255).required(),
    companyId: Joi.string().required(),
    percentage: Joi.number().min(0).max(100).required(),
    endDate: Joi.date().required(),
    jobDescript: Joi.string().required(),
    branch: Joi.array().required(),
    gap: Joi.string().required(),
    ctc: Joi.string(),
    loc: Joi.string(),
    batchYear: Joi.string().required(),
    applyLink: Joi.string(),
    appliedStudentId: Joi.string(),
  });

  return schema.validate(drive);
}

function validateDriveUpdate(drive) {
  const schema = Joi.object({
    
    title: Joi.string().min(3).max(255),
    companyId: Joi.string(),
    percentage: Joi.number().min(0).max(100),
    endDate: Joi.date(),
    jobDescript: Joi.string(),
    branch: Joi.array(),
    gap: Joi.string(),
    ctc: Joi.string(),
    loc: Joi.string(),
    batchYear: Joi.string(),
    applyLink: Joi.string(),
    appliedStudentId: Joi.string(),
  });

  return schema.validate(drive);
}

function validateAppliedStu(stu){
  const schema = Joi.object({
    appliedStudentId: Joi.string().required()
  });
  return schema.validate(stu);
}

exports.Drive = Drive;
exports.driveSchema = driveSchema;
exports.validateDrive = validateDrive;
exports.validateDriveUpdate = validateDriveUpdate;
exports.validateAppliedStu = validateAppliedStu;
