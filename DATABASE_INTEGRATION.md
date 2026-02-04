# CMS Database Integration

## Overview
This implementation creates two MongoDB collections (Student and Teacher) and integrates them with the React frontend to display real-time data.

## What Was Created

### Backend (Server-Side)

1. **Models**
   - `models/Student.js` - Student schema with academics array containing subjects, attendance, and marks
   - `models/Teacher.js` - Teacher schema with basic information

2. **Controllers**
   - `controllers/studentController.js` - CRUD operations for students
   - `controllers/teacherController.js` - CRUD operations for teachers

3. **Routes**
   - `routes/student.js` - API endpoints for student operations
   - `routes/teacher.js` - API endpoints for teacher operations

4. **Database Seeder**
   - `seedDB.js` - Script to populate sample data

### Frontend (Client-Side)

Updated `src/pages/student.jsx`:
- **AttendanceView** - Fetches and displays attendance data from database
- **MarksView** - Fetches and displays marks data from database
- **TeachersView** - Fetches and displays teacher data from database

Updated `src/pages/teacher.jsx`:
- **Students List** - Fetches and displays all students from database
- **Attendance Tab** - Uses student data for marking attendance
- **Marks Tab** - Uses student data for entering marks

## API Endpoints

### Student Endpoints
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `GET /api/students/roll/:rollNo` - Get student by roll number
- `POST /api/students` - Create new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Teacher Endpoints
- `GET /api/teachers` - Get all teachers
- `GET /api/teachers/:id` - Get teacher by ID
- `GET /api/teachers/teacherId/:teacherId` - Get teacher by teacher ID
- `POST /api/teachers` - Create new teacher
- `PUT /api/teachers/:id` - Update teacher
- `DELETE /api/teachers/:id` - Delete teacher

## How to Use

### 1. Seed the Database (First Time Setup)

Navigate to the Server-Side directory and run the seeder:

```bash
cd "d:\JITENDRA\CMS - Copy\Server-Side"
node seedDB.js
```

This will populate the database with sample students and teachers.

### 2. Start the Server

```bash
cd "d:\JITENDRA\CMS - Copy\Server-Side"
npm start
```

### 3. Start the Client

```bash
cd "d:\JITENDRA\CMS - Copy\Client-Side"
npm run dev
```

### 4. View the Data

- Open the student dashboard to see attendance, marks, and teachers fetched from the database
- Open the teacher dashboard to see the student list fetched from the database

## Student Schema Structure

```javascript
{
  rollNo: String (unique),
  name: String,
  email: String,
  academics: [
    {
      subjectName: String,
      attendance: {
        attended: Number,
        total: Number
      },
      marks: {
        obtained: Number,
        total: Number
      }
    }
  ]
}
```

## Teacher Schema Structure

```javascript
{
  teacherId: String (unique),
  name: String,
  email: String,
  subject: String,
  department: String,
  phone: String
}
```

## Features

1. **Dynamic Data Loading** - All views fetch real-time data from MongoDB
2. **Automatic Calculations** - Attendance and marks percentages calculated automatically
3. **Color-Coded Display** - Attendance shown with different colors based on percentage
4. **Loading States** - Shows loading indicator while fetching data
5. **Error Handling** - Gracefully handles fetch errors

## Next Steps

1. **Authentication** - Add user authentication to show data specific to logged-in user
2. **Update Operations** - Implement forms to update attendance and marks
3. **Real-time Updates** - Add Socket.io integration for real-time data updates
4. **Filtering** - Add filters to view data by subject, date range, etc.
5. **Reports** - Generate PDF reports of attendance and marks

## Notes

- The frontend currently fetches the first student's data for demonstration
- To show data for a specific student, modify the fetch logic to use authentication
- All API calls use the production URL: `https://smart-campus-new.onrender.com`
