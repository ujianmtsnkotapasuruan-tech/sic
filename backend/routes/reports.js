const express = require('express');
const JournalEntry = require('../models/JournalEntry');
const Student = require('../models/Student');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Get teaching summary report
router.get('/summary', protect, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const matchStage = { teacher: require('mongoose').Types.ObjectId(req.user.id) };

    if (startDate && endDate) {
      matchStage.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const stats = await JournalEntry.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: null,
          totalLessons: { $sum: 1 },
          totalHours: { $sum: '$duration' },
          avgParticipation: { $avg: { $cond: [{ $eq: ['$studentParticipation', 'excellent'] }, 1, { $cond: [{ $eq: ['$studentParticipation', 'good'] }, 0.75, { $cond: [{ $eq: ['$studentParticipation', 'average'] }, 0.5, 0.25] }] }] } },
          categoryCounts: {
            $push: '$category'
          }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: stats[0] || { totalLessons: 0, totalHours: 0, avgParticipation: 0 }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get student progress report
router.get('/student/:studentId', protect, async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Check if user is the owner
    if (student.teacher.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to access this report' });
    }

    const entries = await JournalEntry.find({
      teacher: req.user.id,
      class: student.class
    }).sort({ date: -1 }).limit(20);

    res.status(200).json({
      success: true,
      student: {
        id: student._id,
        name: student.name,
        class: student.class,
        performanceLevel: student.performanceLevel,
        attendanceRate: student.attendanceRate
      },
      recentLessons: entries.length,
      data: {
        student,
        recentEntries: entries
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get class performance report
router.get('/class/:className', protect, async (req, res) => {
  try {
    const entries = await JournalEntry.find({
      teacher: req.user.id,
      class: req.params.className
    }).sort({ date: -1 });

    const students = await Student.find({
      teacher: req.user.id,
      class: req.params.className
    });

    res.status(200).json({
      success: true,
      data: {
        className: req.params.className,
        totalLessons: entries.length,
        totalStudents: students.length,
        lessons: entries,
        students
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
