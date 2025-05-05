const Student = require('../models/Student');

// Get all students
const getStudents = async (req, res) => {
  try {
    const students = await Student.find({}).populate('courses');
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single student
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('courses');
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a student
const createStudent = async (req, res) => {
  const { name, age, email } = req.body;

  try {
    const student = await Student.create({
      name,
      age,
      email,
      courses: []
    });
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a student
const updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    
    if (student) {
      student.name = req.body.name || student.name;
      student.age = req.body.age || student.age;
      student.email = req.body.email || student.email;
      
      const updatedStudent = await student.save();
      res.json(updatedStudent);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a student
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    
    if (student) {
      await student.deleteOne();
      res.json({ message: 'Student removed' });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Assign course to student
const assignCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const student = await Student.findById(req.params.id);
    
    if (student) {
      // Check if course is already assigned
      if (student.courses.includes(courseId)) {
        return res.status(400).json({ message: 'Course already assigned to this student' });
      }
      
      student.courses.push(courseId);
      const updatedStudent = await student.save();
      await updatedStudent.populate('courses');
      res.json(updatedStudent);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  assignCourse
};
