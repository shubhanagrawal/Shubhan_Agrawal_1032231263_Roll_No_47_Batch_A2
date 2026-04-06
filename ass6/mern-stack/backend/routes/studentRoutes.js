const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

router.post('/add', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.send('Student Added');
  } catch (error) {
    res.status(500).send('Error adding student: ' + error.message);
  }
});

router.get('/view', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).send('Error fetching students: ' + error.message);
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    await Student.findByIdAndUpdate(req.params.id, req.body);
    res.send('Student Updated');
  } catch (error) {
    res.status(500).send('Error updating student: ' + error.message);
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.send('Student Deleted');
  } catch (error) {
    res.status(500).send('Error deleting student: ' + error.message);
  }
});

module.exports = router;
