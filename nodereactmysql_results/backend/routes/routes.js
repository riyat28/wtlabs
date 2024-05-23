import { createRequire } from "module";
const require = createRequire(import.meta.url);

import express from 'express';
const mysql = require('mysql'); // npm module to connect to mysql
const router = express.Router(); // to create express router

// Function to connect to mysql database
// Required before every request hence created a seperate function
// Make sure to change the data inside the connection object to your database name and username
async function connectToDatabase(req, res, next) {
  let conn;
  try {
    conn = mysql.createConnection({
      host: 'localhost', // This should not be changed
      user: 'root', // This is dependent on the system configuration
      password: '', // This is dependent on the system configuration
      database: 'result_website' // This is the name of the database
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  // This is for connection purposes
  res.conn = conn;

  // This is for using the different API routes (middleware)
  next();
}

// A GET method at http://localhost:5000/ : Gives list of all students
router.get('/', connectToDatabase, async (req,res) => {
  res.conn.connect(function(err){
    if(err) throw err;

    res.conn.query('SELECT * FROM student', (err,rows) => {
      console.log('Data received from Db:', rows);
      res.status(200).json({ students: rows });
    })
  })
})

// POST method at http://localhost:5000/getStudent to get name of a single student given the id of the student
router.post('/getStudent', connectToDatabase, async (req,res) => {
  res.conn.connect(function(err){
    if(err) throw err;

    res.conn.query(`SELECT * FROM student where student_id=${req.body.student_id}`, (err,rows) => {
      console.log('Data received from Db:', rows);
      res.status(200).json({ students: rows });
    })
  })
})

// POST method at http://localhost:5000/getStudentESEMarks to get ESE marks of a single student given the id of the student
router.post('/getStudentESEMarks', connectToDatabase, async (req,res) => {
  res.conn.connect(function(err){
    if(err) throw err;

    res.conn.query(`SELECT student.student_name, ese_marks.subject_1_marks_received, ese_marks.subject_1_marks_max, ese_marks.subject_2_marks_received, ese_marks.subject_2_marks_max,
    ese_marks.subject_3_marks_received, ese_marks.subject_3_marks_max,
    ese_marks.subject_4_marks_received, ese_marks.subject_4_marks_max FROM student INNER JOIN ese_marks ON student.student_id = ese_marks.student_id WHERE student.student_id = ${req.body.student_id}`, (err,rows) => {
      console.log(rows);
      res.status(200).json({ students: rows });
    })
  })
})

// POST method at http://localhost:5000/addStudent to add a new student to the list of students
router.post('/addStudent', connectToDatabase,  async (req, res) => {
  res.conn.connect(function(err){
    if(err) throw err;

    const student = { student_name: req.body.student_name }

    res.conn.query(`INSERT INTO student SET ?`, student, () => {

      res.status(200).json({ message: "Successfully added student with name: " + student.student_name});
    })
  })
});

// To add new API endpoints, just copy & paste the same post / get method codes above and just change the query and the name of the endpoint

export default router