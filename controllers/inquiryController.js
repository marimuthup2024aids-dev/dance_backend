const Inquiry = require('../models/Inquiry');

exports.createInquiry = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    const inquiry = await Inquiry.create({ name, email, message });
    
    res.status(201).json({
      success: true,
      inquiry
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json({ success: true, inquiries });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateInquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }
    
    res.json({ success: true, inquiry });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    
    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }
    
    res.json({ success: true, message: 'Inquiry deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};