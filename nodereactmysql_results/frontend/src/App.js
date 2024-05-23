import React, { useState } from 'react';
import './App.css';

function App() {

  const [studentName, setStudentName] = useState('');
  const [studentID, setStudentID] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // API endpoint named getStudent in router/routes.js
    // const details = await fetch('http://localhost:5000/getStudent', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({student_id: studentID})
    // });

    // API endpoint named getStudentMarks in router/routes.js
    const details = await fetch('http://localhost:5000/getStudentESEMarks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({student_id: studentID})
    });

    if(details.ok){
      const json = await details.json();

      console.log(json);
    }
  }

  const handleSelect = async(e) => {
    e.preventDefault();

    // API endpoint named addStudent in router/routes.js
    const details = await fetch('http://localhost:5000/addStudent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({student_name: studentName})
    });

    if(details.ok){
      const json = await details.json();

      console.log(json);
    }   
  }

  return (
    <div className="App">
      <h3>To get name of student, type id here:</h3>
      <form onSubmit={handleSubmit}>
        <label>Student ID:</label>
        <input type='text' placeholder='ID of the student' onChange={(e) => setStudentID(e.target.value)} />
        <button type='submit'>Submit</button>
      </form>
      <hr />
      <h3>To insert new student, type name here:</h3>
      <form onSubmit={handleSelect}>
        <label>Student Name:</label>
        <input type='text' placeholder='Name of the student' onChange={(e) => setStudentName(e.target.value)} />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default App;
