const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Student = require('./models/Student');
const Course = require('./models/Course');

dotenv.config();

const connectDB = require('./config/db');

connectDB();

const studentData = [
  {
    name: "Alice Johnson",
    age: 22,
    email: "alice@example.com",
    courses: []
  },
  {
    name: "Bob Smith",
    age: 20,
    email: "bob@example.com",
    courses: []
  }
];

const courseData = [
  {
    courseName: "Web Development"
  },
  {
    courseName: "Data Science"
  }
];

const importData = async () => {
  try {
    // Clear existing data
    await Student.deleteMany();
    await Course.deleteMany();

    // Import courses first
    const importedCourses = await Course.insertMany(courseData);
    console.log('Courses imported!');

    // Update student data with course IDs
    const studentsToImport = studentData.map(student => ({
      ...student
    }));

    // Import students
    await Student.insertMany(studentsToImport);
    console.log('Students imported!');

    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();