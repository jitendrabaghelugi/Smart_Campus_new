const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

// Get all teachers
router.get('/', teacherController.getAllTeachers);

// Get teacher by ID
router.get('/:id', teacherController.getTeacherById);

// Get teacher by teacher ID
router.get('/teacherId/:teacherId', teacherController.getTeacherByTeacherId);

// Create a new teacher
router.post('/', teacherController.createTeacher);

// Update teacher
router.put('/:id', teacherController.updateTeacher);

// Delete teacher
router.delete('/:id', teacherController.deleteTeacher);

module.exports = router;
