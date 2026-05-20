const express = require('express');
const Student = require('../models/Student');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Get all students for logged-in teacher
router.get('/', protect, async (req, res) => {
  try {
    const { class: className, status } = req.query;
    const query = { teacher: req.user.id };

    if (className) {
      query.class = className;
    }

    if (status) {
      query.status = status;
    }

    const students = await Student.find(query).sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new student record
router.post('/', protect, async (req, res) => {
  try {
    req.body.teacher = req.user.id;
    const student = new Student(req.body);
    await student.save();

    res.status(201).json({
      success: true,
      data: student
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get specific student
router.get('/:id', protect, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Check if user is the owner
    if (student.teacher.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to access this student' });
    }

    res.status(200).json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update student
router.put('/:id', protect, async (req, res) => {
  try {
    let student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Check if user is the owner
    if (student.teacher.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this student' });
    }

    student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: student });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete student
router.delete('/:id', protect, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Check if user is the owner
    if (student.teacher.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this student' });
    }

    await Student.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: 'Student record deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
