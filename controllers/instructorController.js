const Instructor = require('../models/Instructor');

exports.getAllInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find().sort({ createdAt: -1 });
    console.log('Fetched instructors:', instructors.length);
    res.json({ success: true, instructors });
  } catch (error) {
    console.error('Error fetching instructors:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createInstructor = async (req, res) => {
  try {
    console.log('Creating instructor with data:', req.body);
    const instructor = await Instructor.create(req.body);
    console.log('Instructor created successfully:', instructor);
    res.status(201).json({ success: true, instructor });
  } catch (error) {
    console.error('Error creating instructor:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateInstructor = async (req, res) => {
  try {
    console.log('Updating instructor:', req.params.id, 'with data:', req.body);
    const instructor = await Instructor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!instructor) {
      return res.status(404).json({ success: false, message: 'Instructor not found' });
    }
    console.log('Instructor updated successfully:', instructor);
    res.json({ success: true, instructor });
  } catch (error) {
    console.error('Error updating instructor:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteInstructor = async (req, res) => {
  try {
    console.log('Deleting instructor:', req.params.id);
    const instructor = await Instructor.findByIdAndDelete(req.params.id);
    if (!instructor) {
      return res.status(404).json({ success: false, message: 'Instructor not found' });
    }
    console.log('Instructor deleted successfully');
    res.json({ success: true, message: 'Instructor deleted' });
  } catch (error) {
    console.error('Error deleting instructor:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};