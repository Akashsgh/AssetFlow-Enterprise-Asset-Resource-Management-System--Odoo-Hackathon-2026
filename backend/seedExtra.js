import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Maintenance from './models/Maintenance.js';
import Notification from './models/Notification.js';
import User from './models/User.js';
import Asset from './models/Asset.js';

dotenv.config();

const seedExtra = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/assetflow');
    console.log('MongoDB Connected...');

    const users = await User.find();
    if (users.length === 0) {
      console.log('No users found. Please run seeder.js first.');
      process.exit(1);
    }

    const admin = users.find(u => u.role === 'admin');
    const employee = users.find(u => u.role === 'user');
    
    const assets = await Asset.find();
    if (assets.length < 2) {
        console.log('Not enough assets found.');
        process.exit(1);
    }

    // Seed additional Maintenance tickets
    await Maintenance.deleteMany();
    await Maintenance.insertMany([
      { asset: assets[0]._id, reportedBy: admin._id, issue: 'Screen flickering occasionally', priority: 'Medium', cost: 150, status: 'In Repair', createdAt: new Date(Date.now() - 86400000 * 2) },
      { asset: assets[1]._id, reportedBy: employee._id, issue: 'Battery drains incredibly fast', priority: 'High', cost: 200, status: 'Resolved', createdAt: new Date(Date.now() - 86400000 * 5) },
      { asset: assets[2]._id, reportedBy: employee._id, issue: 'Keyboard keys sticking, especially spacebar', priority: 'Medium', status: 'Pending', createdAt: new Date(Date.now() - 3600000 * 4) }
    ]);
    console.log('Maintenance seeded');

    // Seed Notifications
    await Notification.deleteMany();
    await Notification.insertMany([
      { user: admin._id, type: 'alert', title: 'Critical Asset Failure', message: `${assets[0].name} has reported a critical issue and requires immediate attention.`, read: false, createdAt: new Date(Date.now() - 1000 * 60 * 15) },
      { user: admin._id, type: 'booking', title: 'New Booking Request', message: `${employee.name} has requested ${assets[1].name} for the week of Oct 20–25.`, read: false, createdAt: new Date(Date.now() - 1000 * 60 * 60) },
      { user: admin._id, type: 'maintenance', title: 'Maintenance Resolved', message: `The issue on ${assets[1].name} has been marked as resolved.`, read: false, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3) },
      { user: admin._id, type: 'asset', title: 'New Assets Added', message: '5 new Dell UltraSharp monitors have been added to the inventory under IT Operations.', read: true, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24) },
      { user: admin._id, type: 'audit', title: 'Audit Due Reminder', message: 'The quarterly audit for the Design Team department is due in 3 days.', read: true, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2) },
    ]);
    console.log('Notifications seeded');

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedExtra();
