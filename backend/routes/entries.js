const express = require('express');
const JournalEntry = require('../models/JournalEntry');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Get all entries for logged-in teacher
router.get('/', protect, async (req, res) => {
  try {
    const { startDate, endDate, class: className, status } = req.query;
    const query = { teacher: req.user.id };

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    if (className) {
      query.class = className;
    }

    if (status) {
      query.status = status;
    }

    const entries = await JournalEntry.find(query)
      .sort({ date: -1 })
      .populate('teacher', 'name email');

    res.status(200).json({
      success: true,
      count: entries.length,
      data: entries
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new entry
router.post('/', protect, async (req, res) => {
  try {
    req.body.teacher = req.user.id;
    const entry = new JournalEntry(req.body);
    await entry.save();
    await entry.populate('teacher', 'name email');

    res.status(201).json({
      success: true,
      data: entry
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get specific entry
router.get('/:id', protect, async (req, res) => {
  try {
    const entry = await JournalEntry.findById(req.params.id)
      .populate('teacher', 'name email');

    if (!entry) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    // Check if user is the owner
    if (entry.teacher._id.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to access this entry' });
    }

    res.status(200).json({ success: true, data: entry });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update entry
router.put('/:id', protect, async (req, res) => {
  try {
    let entry = await JournalEntry.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    // Check if user is the owner
    if (entry.teacher.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this entry' });
    }

    entry = await JournalEntry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('teacher', 'name email');

    res.status(200).json({ success: true, data: entry });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete entry
router.delete('/:id', protect, async (req, res) => {
  try {
    const entry = await JournalEntry.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    // Check if user is the owner
    if (entry.teacher.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this entry' });
    }

    await JournalEntry.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: 'Entry deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
