const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Please provide student name'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  studentId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  class: {
    type: String,
    required: [true, 'Please specify the class'],
    trim: true
  },
  email: {
    type: String,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address'
    ]
  },
  parentContact: {
    type: String,
    trim: true
  },
  enrollmentDate: {
    type: Date,
    default: Date.now
  },
  performanceLevel: {
    type: String,
    enum: ['excellent', 'good', 'average', 'below-average'],
    default: 'average'
  },
  attendanceRate: {
    type: Number,
    default: 100,
    min: 0,
    max: 100,
    description: 'Percentage'
  },
  notes: {
    type: String,
    trim: true
  },
  academicHistory: [{
    subject: String,
    grade: String,
    semester: String,
    date: Date
  }],
  strengths: [{
    type: String,
    trim: true
  }],
  areasForImprovement: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    enum: ['active', 'inactive', 'graduated'],
    default: 'active'
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
studentSchema.index({ teacher: 1, class: 1 });
studentSchema.index({ studentId: 1 });

module.exports = mongoose.model('Student', studentSchema);
