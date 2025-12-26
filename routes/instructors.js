const express = require('express');
const {
  getAllInstructors,
  createInstructor,
  updateInstructor,
  deleteInstructor
} = require('../controllers/instructorController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', getAllInstructors);
router.post('/', auth, createInstructor);
router.put('/:id', auth, updateInstructor);
router.delete('/:id', auth, deleteInstructor);

module.exports = router;