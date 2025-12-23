const mongoose = require("mongoose");

const Course = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  InstructorName: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  Category: {
    type: String,
    enum: ["Web Development", "Design", "Marketing"],
    required: true,
  },
  EnrolledStudents: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Course", Course);
