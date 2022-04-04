const express = require("express");
const router = express.Router();
const {
  Drive,
  validateDrive,
  validateDriveUpdate,
  validateAppliedStu,
} = require("../models/drive");
const { Cmpny } = require("../models/cmpny");
const { Student } = require("../models/student");

router.get("/", async (req, res) => {
  const drive = await Drive.find().sort("-endDate");
  res.send(drive);
});

router.post("/", async (req, res) => {
  const { error } = validateDrive(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const cmpny = await Cmpny.findById(req.body.companyId);
  if (!cmpny)
    return res
      .status(404)
      .send("Do not found record of company which you have requested");

  let drive = new Drive({
    cmpny: {
      _id: cmpny._id,
      name: cmpny.name,
      email: cmpny.email,
      contactno: cmpny.contactno,
    },
    title: req.body.title,
    percentage: req.body.percentage,
    endDate: req.body.endDate,
    jobDescript: req.body.jobDescript,
    branch: req.body.branch,
    gap: req.body.gap,
    ctc: req.body.ctc,
    loc: req.body.loc,
    batchYear: req.body.batchYear,
    applyLink: req.body.applyLink,
  });
  drive = await drive.save();
  res.send(drive);
});

router.put("/appliedStudent/:id", async (req, res) => {
  const { error } = validateAppliedStu(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const appliedStudent = await Student.findById(req.body.appliedStudentId);
  if (!appliedStudent) return res.status(400).send("Invalid Student");

  const drive = await Drive.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        appliedStudent: {
          _id: appliedStudent._id,
          name: appliedStudent.name,
          email: appliedStudent.email,
          instituteName: appliedStudent.instituteName,
          contactno: appliedStudent.contactno,
          tenPercentage: appliedStudent.tenPercentage,
          twelvePercentage: appliedStudent.twelvePercentage,
          cgpa: appliedStudent.cgpa,
        },
      },
    },
    { new: true }
  );

  res.send(drive);
});

router.put("/:id", async (req, res) => {
  const { error } = validateDriveUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const drive = await Drive.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      percentage: req.body.percentage,
      endDate: req.body.endDate,
      jobDescript: req.body.jobDescript,
      branch: req.body.branch,
      gap: req.body.gap,
      ctc: req.body.ctc,
      loc: req.body.loc,
      batchYear: req.body.batchYear,
      applyLink: req.body.applyLink,
    },
    { new: true }
  );

  if (!drive) return res.status(400).send("Not found any drive");
  res.send(drive);
});

router.delete("/:id", async (req, res) => {
  const drive = await Drive.findById(req.params.id);
  if (!drive)
    return res.status(404).send("The drive with the given id not found");
  res.send({
    title: drive.title,
  });
});

module.exports = router;
