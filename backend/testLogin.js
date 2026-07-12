import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const testLogin = async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/assetflow');
  
  const email = 'admin@assetflow.com';
  const password = 'password123';
  
  const user = await User.findOne({ email }).select('+password');
  console.log('User found:', !!user);
  if (user) {
    console.log('Stored hash:', user.password);
    const isMatch = await user.comparePassword(password);
    console.log('Password match:', isMatch);
  }
  
  process.exit();
};

testLogin();
