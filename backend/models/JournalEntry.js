const mongoose = require('mongoose');

const journalEntrySchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  subject: {
    type: String,
    required: [true, 'Please specify the subject/topic'],
    trim: true
  },
  class: {
    type: String,
    required: [true, 'Please specify the class'],
    trim: true
  },
  duration: {
    type: Number,
    required: true,
    description: 'Duration in minutes'
  },
  content: {
    type: String,
    required: [true, 'Please provide lesson content'],
    trim: true
  },
  objectives: [{
    type: String,
    trim: true
  }],
  activities: [{
    description: String,
    duration: Number,
    type: String
  }],
  studentParticipation: {
    type: String,
    enum: ['excellent', 'good', 'average', 'poor'],
    default: 'average'
  },
  attendance: {
    present: Number,
    absent: Number,
    late: Number
  },
  notes: {
    type: String,
    trim: true
  },
  challenges: [{
    type: String,
    trim: true
  }],
  improvements: [{
    type: String,
    trim: true
  }],
  resourcesUsed: [{
    type: String,
    trim: true
  }],
  homeworkAssigned: {
    description: String,
    dueDate: Date
  },
  category: {
    type: String,
    enum: ['lecture', 'practical', 'discussion', 'assessment', 'fieldwork', 'other'],
    default: 'lecture'
  },
  status: {
    type: String,
    enum: ['draft', 'completed', 'reviewed'],
    default: 'draft'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
journalEntrySchema.index({ teacher: 1, date: -1 });
journalEntrySchema.index({ class: 1 });

module.exports = mongoose.model('JournalEntry', journalEntrySchema);
