const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const testAuth = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Test user creation
    const testUser = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    };

    // Delete existing test user
    await User.deleteOne({ email: testUser.email });

    // Create new user
    const user = await User.create(testUser);
    console.log('✅ User created:', { id: user._id, name: user.name, email: user.email });

    // Test password comparison
    const isMatch = await user.comparePassword('password123');
    console.log('✅ Password verification:', isMatch);

    // Find user by email
    const foundUser = await User.findOne({ email: testUser.email });
    console.log('✅ User found:', foundUser ? 'Yes' : 'No');

    await mongoose.disconnect();
    console.log('✅ Test completed successfully');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
};

testAuth();