const express = require('express');
const pg= require('pg');
const dotenv = require('dotenv');
const path = require('path');
const jwt = require('jsonwebtoken');
const cors = require('cors');


dotenv.config();

const app=express();
const port=3000;
app.use(cors());
const SECRET_KEY = 'your_jwt_secret';

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../react-school/sms/build')));

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});


  db.connect();




app.get('/api/students/:id',async(req,res,next) => {
  const studentId = req.params.id;
  try{
    const result =await db.query('SELECT * FROM students JOIN classes ON students.class_id=classes.id WHERE students.id= $1',[studentId]);
    
  
    if (result.rowCount > 0) {
      const classid=result.rows[0].class_id;
     
      const result1 = await db.query(
      `SELECT x.name AS teacher_name, subjects.name AS subject_name
       FROM subjects
       JOIN (SELECT * FROM teachers WHERE id IN (SELECT teacher_id FROM assigned_to WHERE class_id = $1)) AS x
       ON subjects.id = x.subject_id`,
      [classid]
  );
   
     if(result1.rowCount>0)
      res.status(200).json({ success: true, student: result.rows[0] , teacher : result1.rows});
    } else {
      res.status(404).json({ success: false, message: 'Student not found' });
    }
  }
  catch(error){
    console.error('Error sending student details',error);
    next(error);
  }
});

app.get('/api/searchstudent', async (req, res) => {
  const { name } = req.query; // Retrieve the `name` query parameter
  try {
    const results = await db.query(
      "SELECT * FROM students WHERE LOWER(name) LIKE $1",
      [`${name}%`]
    );
    res.json(results.rows); // Return the rows from the query result
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});


app.post('/api/login', async (req, res) => {
  const { username, password, role } = req.body;

  try {
    let query;
    let result;

    if (role === 'student') {
      query = 'SELECT * FROM students WHERE roll_no = $1 AND password = $2';
      result = await db.query(query, [username, password]);
    } else if (role === 'teacher') {
      query = 'SELECT * FROM teachers WHERE name = $1 AND password = $2';
      result = await db.query(query, [username, password]);
    } else if (role === 'admin') {
     
      if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        result = { rows: [{ id: 1 }] }; // Simulate a successful admin login
      } else {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    } else {
      return res.status(400).json({ success: false, message: 'Invalid role' });
    }

    if (result && result.rows.length > 0) {
      const user = result.rows[0];
      const token = jwt.sign({ id: user.id, role: role }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ success: true, token });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});



app.get('/api/classstudents',async(req,res,next) =>{
  const {id}=req.query;
  try{
    const result =await db.query('SELECT * FROM students WHERE students.class_id=$1',[id]);
    res.status(200).json(result.rows);
  }
  catch(error){
    console.error('Error sending students of class details',error);
    next(error);
  }
});


app.get('/api/teachers/:id', async (req, res, next) => {
  const  id  = req.params.id;

  try {
    const result = await db.query(
      'SELECT teachers.*,subjects.*,teachers.name AS teacher_name,subjects.name AS subject_name,teachers.id AS teacher_id ,subjects.id AS subject_id FROM teachers JOIN subjects ON teachers.subject_id = subjects.id WHERE teachers.id = $1',
      [id]
    );

    if (result.rowCount > 0) {
      
      const result1 = await db.query(
        'SELECT * FROM classes WHERE id IN (SELECT class_id FROM assigned_to WHERE teacher_id = $1)',
        [id]
      );
      console.log(result1.rows);
      res.status(200).json({
        success: true,
        teacher: result.rows[0],
        class: result1.rows, 
      });
      
     
    } else {
      res.status(404).json({ success: false, message: 'Teacher not found' });
    }
  } catch (error) {
    console.error('Error sending teacher details', error);
    next(error);
  }
});



app.put('/api/teachers/:id', async (req, res, next) => {
  const { id } = req.params;
  const { name, age, address, phone_number, experience, classes } = req.body;

  try {
    // Update teacher details
    await db.query(
      `UPDATE teachers
       SET name = $1, age = $2, address = $3, phone_number = $4, experience = $5
       WHERE id = $6`,
      [name, age, address, phone_number, experience, id]
    );

    // Update assigned classes by clearing old assignments and adding new ones
    await db.query(
      `DELETE FROM assigned_to
       WHERE teacher_id = $1`,
      [id]
    );

    // Insert new class assignments
    for (const classId of classes) {
      await db.query(
        `INSERT INTO assigned_to (teacher_id, class_id)
         VALUES ($1, $2)`,
        [id, classId]
      );
    }

    res.status(200).json({ success: true, message: 'Teacher details updated successfully' });
  } catch (error) {
    console.error('Error updating teacher details:', error);
    next(error);
  }
});

app.get('/api/classes', async (req, res, next) => {
  try {
    const result = await db.query(
      `SELECT id, class_no, sec
       FROM classes`
    );

    res.status(200).json({
      success: true,
      classes: result.rows,
    });
  } catch (error) {
    console.error('Error fetching classes:', error);
    next(error);
  }
});





app.delete('/api/student/:id',async(req,res,next) => {
    const {id} =req.params;
    try{
     const result = await db.query('DELETE FROM students WHERE id=$1 RETURNING *',[id]);
     if(result.rowCount===0){
      return res.status(404).json({ error: 'No Records Found' });
     }
      res.status(200).json({ message: 'Deleted successfully' });
    }
    catch(error){
      console.error('Error deleting student', error);
      next(error);
    }
  });

  app.delete('/api/teachers/:id',async(req,res,next) => {
    const {id} =req.params;
    try{
     const result = await db.query('DELETE FROM teachers WHERE id=$1 RETURNING *',[id]);
     if(result.rowCount===0){
      return res.status(404).json({ error: 'No Records Found' });
     }
      res.status(200).json({ message: 'Deleted successfully' });
    }
    catch(error){
      console.error('Error deleting teacher', error);
      next(error);
    }
  });



  app.get('/api/searchteacher', async (req, res) => {
    const { name } = req.query;
    try {
      const results = await db.query(
        "SELECT teachers.*,subjects.*,teachers.name AS teacher_name,subjects.name AS subject_name,teachers.id AS teacher_id ,subjects.id AS subject_id FROM teachers JOIN subjects ON teachers.subject_id = subjects.id WHERE  LOWER(teachers.name) LIKE $1", 
        [`${name}%`]
      );
      res.json(results.rows); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  });



   


  app.put('/api/student/:id', async (req, res) => {
    const { id } = req.params;
    const { roll_no, name, age, class_no, sec, contact_no, attendance, grade,password } = req.body;
  
    try {
     
      const result1 = await db.query(
        `SELECT id FROM classes WHERE class_no = $1 AND sec = $2`,
        [class_no, sec]
      );
  
      
      if (result1.rowCount === 0) {
        return res.status(404).json({ success: false, message: "Class not found" });
      }
  
      const class_id = result1.rows[0].id;
  
      const result = await db.query(
        `UPDATE students 
         SET roll_no = $1, name = $2, age = $3, class_id = $4, contact_no = $5, attendance = $6, grade = $7,password=$8
         WHERE id = $9 
         RETURNING *`,
        [roll_no, name, age, class_id, contact_no, attendance, grade,password, id]
      );
  
      if (result.rowCount === 0) {
        return res.status(404).json({ success: false, message: "Student not found" });
      }
  
     
      res.json({ success: true, message: "Student updated successfully", student: result.rows[0] });
    } catch (error) {
      console.error("Error updating student:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });



  app.get('/api/subjects', async (req, res) => {
    try {
      const result = await db.query('SELECT id, name FROM subjects');
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching subjects:', error);
      res.status(500).send('Server error');
    }
  });
  

app.post('/api/students', async (req, res) => {
  const { name, age, class_no, sec, address, contact_no, attendance, grade, password, roll_no } = req.body;

  try {
   
    let classResult = await db.query(
      'SELECT id FROM classes WHERE class_no = $1 AND sec = $2',
      [class_no, sec]
    );

    let class_id;
    if (classResult.rows.length === 0) {
      const insertClassResult = await db.query(
        'INSERT INTO classes (class_no, sec) VALUES ($1, $2) RETURNING id',
        [class_no, sec]
      );
      class_id = insertClassResult.rows[0].id;
    } else {
      class_id = classResult.rows[0].id;
    }

    await db.query(
      'INSERT INTO students (name, age, class_id, address, contact_no, attendance, grade, password, roll_no) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
      [name, age, class_id, address, contact_no, attendance, grade,password, roll_no]
    );

    res.status(201).json({ message: 'Student registered successfully' });
  } catch (error) {
    console.error('Error registering student:', error);
    res.status(500).json({ message: 'Failed to register student' });
  }
});



   app.post('/api/teachers', async (req, res) => {
    const { name, age, address, phone_number, subject_id, experience, password } = req.body;
  
   
    try {
      const result = await db.query(
        'INSERT INTO teachers (name, age, address, phone_number, subject_id, experience, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [name, age, address, phone_number, subject_id, experience, password]
      );
  
      res.status(201).json({ message: 'Teacher registered successfully', teacher: result.rows[0] });
    } catch (error) {
      console.error('Error registering teacher:', error);
      res.status(500).send('Server error');
    }
  });
   
app.use((error, req, res, next) => {
  res.status(500).json({ success: false, message: 'An error occurred', error });
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../react-school/sms/build', 'index.html'));
  });

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  });

app.use((req, res, next) => {
    res.status(404).send('Page Not Found');
  });

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });


  