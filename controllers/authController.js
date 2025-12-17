const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.signup = async (req, res) => {
  try {
    console.log('📝 Signup request:', req.body);
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('❌ User already exists:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password });
    console.log('✅ User created:', user._id);
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('❌ Signup error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    console.log('📝 Login request:', req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ User not found:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      console.log('❌ Invalid password for:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('✅ Login successful:', user._id);
    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('❌ Login error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for admin user or create one if doesn't exist
    let admin = await User.findOne({ email, role: 'admin' });
    
    if (!admin) {
      // Create default admin user
      admin = await User.create({
        name: 'Admin',
        email: 'admin@dancevibe.com',
        password: 'admin123',
        role: 'admin'
      });
    }

    if (!(await admin.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(admin._id);

    res.json({
      success: true,
      token,
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};