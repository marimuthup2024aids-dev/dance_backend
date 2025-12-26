const express = require('express');
const {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/courseController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', getAllCourses);
router.post('/', auth, createCourse);
router.put('/:id', auth, updateCourse);
router.delete('/:id', auth, deleteCourse);

module.exports = router;