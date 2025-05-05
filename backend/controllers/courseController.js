const Course = require('../models/Course');

// Get all courses
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single course
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a course
const createCourse = async (req, res) => {
  const { courseName } = req.body;

  try {
    const course = await Course.create({
      courseName
    });
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getCourses,
  getCourseById,
  createCourse
};