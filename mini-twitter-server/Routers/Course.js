const express = require("express");
const Course = require("../models/Course");
const router = express.Router();

router.use(express.json());

router.post("/create", async (req, res) => {
  try {
    const {
      Title,
      Description,
      InstructorName,
      Price,
      Category,
      EnrolledStudents,
    } = req.body;

    const newCourse = await Course.create({
      Title,
      Description,
      InstructorName,
      Price,
      Category,
      EnrolledStudents,
    });

    res.json(newCourse);
  } catch (error) {
    res.status(500).json({ message: "Error creating course", error });
  }
});

router.delete("/deleteOne/:title", async (req, res) => {
  try {
    const { title } = req.params;

    const result = await Course.deleteOne({ Title: title });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "course not found" });
    }

    res.json({ message: "Course deleted successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Error deleting course", error });
  }
});

router.put("/updateOne/:Title", async (req, res) => {
  try {
    const filtername = req.params.Title;
    const updateData = req.body;

    const result = await Course.findOneAndUpdate(
      { Title: filtername },
      updateData,
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: "course not found" });
    }

    res.json({ message: "Course updated successfully", updatedCourse: result });
  } catch (error) {
    res.status(500).json({ message: "Error updating course", error });
  }
});

router.get("/", async (req, res) => {
  try {
    const allCourses = await Course.find();
    res.json(allCourses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error });
  }
});

module.exports = router;
