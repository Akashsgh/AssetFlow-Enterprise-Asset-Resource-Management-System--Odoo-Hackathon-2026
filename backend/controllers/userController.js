import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const getProfile = async (req, res) => {
  try {
    // For local dev/demo, since auth might not be fully wired up, fallback to a dummy user if req.user is missing
    const userId = req.user ? req.user._id : req.query.userId;
    if (!userId) {
      return res.status(400).json({ success: false, message: 'User ID is required' });
    }

    const user = await User.findById(userId).populate('department', 'name');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user ? req.user._id : req.body.userId;
    if (!userId) return res.status(400).json({ success: false, message: 'User ID is required' });

    // Exclude password and sensitive fields from direct update
    const { password, role, ...updateData } = req.body;
    
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true }).populate('department', 'name');
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Validation Error', error: error.message });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const userId = req.user ? req.user._id : req.body.userId;
    if (!userId) return res.status(400).json({ success: false, message: 'User ID is required' });

    const { preferences, notificationSettings, twoFactorEnabled } = req.body;
    
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    if (preferences) user.preferences = { ...user.preferences, ...preferences };
    if (notificationSettings) user.notificationSettings = { ...user.notificationSettings, ...notificationSettings };
    if (twoFactorEnabled !== undefined) user.twoFactorEnabled = twoFactorEnabled;

    await user.save();
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Validation Error', error: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const userId = req.user ? req.user._id : req.body.userId;
    const { currentPassword, newPassword } = req.body;

    if (!userId) return res.status(400).json({ success: false, message: 'User ID is required' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid current password' });

    user.password = newPassword;
    await user.save();

    res.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};
