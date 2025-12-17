const express = require('express');
const {
  createInquiry,
  getAllInquiries,
  updateInquiryStatus,
  deleteInquiry
} = require('../controllers/inquiryController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', createInquiry);
router.get('/', auth, getAllInquiries);
router.put('/:id', auth, updateInquiryStatus);
router.delete('/:id', auth, deleteInquiry);

module.exports = router;