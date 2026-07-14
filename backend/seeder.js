import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Asset from './models/Asset.js';
import User from './models/User.js';
import Booking from './models/Booking.js';
import Maintenance from './models/Maintenance.js';
import Audit from './models/Audit.js';

import bcrypt from 'bcryptjs';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/assetflow');
    console.log('MongoDB Connected for Seeding...');

    await Asset.deleteMany();
    await User.deleteMany();
    await Booking.deleteMany();
    await Maintenance.deleteMany();
    await Audit.deleteMany();

    const hashedPassword = await bcrypt.hash('password123', 12);

    const users = await User.insertMany([
      { name: 'Admin User', email: 'admin@assetflow.com', password: hashedPassword, role: 'admin' },
      { name: 'Sarah Jenkins', email: 'sarah.j@assetflow.com', password: hashedPassword, role: 'user' },
      { name: 'Mike Ross', email: 'mike.r@assetflow.com', password: hashedPassword, role: 'user' }
    ]);

    const adminId = users[0]._id;
    const employee1Id = users[1]._id;
    const employee2Id = users[2]._id;

    const assets = await Asset.insertMany([
      { name: 'MacBook Pro M3', tag: 'AST-1001', category: 'Hardware', status: 'In Use', assignedTo: employee1Id, purchaseDate: new Date('2023-01-15') },
      { name: 'Sony A7IV Camera', tag: 'AST-1005', category: 'Hardware', status: 'Available', purchaseDate: new Date('2023-02-20') },
      { name: 'Adobe Creative Cloud', tag: 'AST-1004', category: 'Software', status: 'In Use', assignedTo: employee2Id, purchaseDate: new Date('2023-03-10') },
      { name: 'Herman Miller Chair', tag: 'AST-1003', category: 'Furniture', status: 'Available', purchaseDate: new Date('2023-04-05') },
      { name: 'Dell UltraSharp 27"', tag: 'AST-1009', category: 'Hardware', status: 'Under Maintenance', purchaseDate: new Date('2023-05-12') },
      { name: 'ThinkPad X1 Carbon', tag: 'AST-1010', category: 'Hardware', status: 'Available', purchaseDate: new Date('2023-06-18') },
      { name: 'iPad Pro', tag: 'AST-1014', category: 'Hardware', status: 'In Use', assignedTo: employee1Id, purchaseDate: new Date('2023-07-22') },
      { name: 'Server Rack Key', tag: 'AST-1023', category: 'Infrastructure', status: 'Available', purchaseDate: new Date('2023-08-30') },
      { name: 'MacBook Air M2', tag: 'AST-1012', category: 'Hardware', status: 'Available', purchaseDate: new Date('2023-09-15') },
      { name: 'Ergonomic Desk', tag: 'AST-1025', category: 'Furniture', status: 'Available', purchaseDate: new Date('2023-10-10') }
    ]);

    await Booking.insertMany([
      { asset: assets[1]._id, user: employee1Id, startDate: new Date(), endDate: new Date(Date.now() + 86400000), status: 'Active', reason: 'Photo shoot' },
      { asset: assets[5]._id, user: employee2Id, startDate: new Date(), endDate: new Date(Date.now() + 172800000), status: 'Pending', reason: 'Business trip' },
      { asset: assets[7]._id, user: adminId, startDate: new Date(Date.now() - 86400000), endDate: new Date(), status: 'Completed', reason: 'Server maintenance' }
    ]);

    await Maintenance.insertMany([
      { asset: assets[4]._id, reportedBy: adminId, issue: 'Screen flickering', cost: 150, status: 'In Repair' },
      { asset: assets[0]._id, reportedBy: employee1Id, issue: 'Battery drains fast', cost: 200, status: 'Resolved' }
    ]);

    await Audit.insertMany([
      { departmentName: 'Engineering', inspector: adminId, status: 'Completed', totalExpected: 45, totalScanned: 45, accuracy: 100 },
      { departmentName: 'Design', inspector: adminId, status: 'Incomplete', totalExpected: 20, totalScanned: 18, accuracy: 90 }
    ]);

    console.log('Data Seeded Successfully');
    process.exit();
  } catch (error) {
    console.error('Error with data import', error);
    process.exit(1);
  }
};

seedData();
