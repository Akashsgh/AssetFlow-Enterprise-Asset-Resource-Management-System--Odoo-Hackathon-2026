import Notification from '../models/Notification.js';

export const getNotifications = async (req, res) => {
  try {
    // Ideally user is from req.user (after auth middleware), but we use req.query.userId for now if auth is not applied
    const userId = req.user ? req.user._id : req.query.userId; 
    
    if (!userId) {
      return res.status(400).json({ success: false, message: 'User ID is required' });
    }

    const notifications = await Notification.find({ user: userId })
      .sort({ createdAt: -1 });
      
    res.json({ success: true, count: notifications.length, data: notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

export const createNotification = async (req, res) => {
  try {
    const newNotification = await Notification.create(req.body);
    res.status(201).json({ success: true, data: newNotification });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Validation Error', error: error.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!notification) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }
    res.json({ success: true, data: notification });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

export const markAllAsRead = async (req, res) => {
  try {
    const userId = req.user ? req.user._id : req.body.userId;
    
    if (!userId) {
      return res.status(400).json({ success: false, message: 'User ID is required' });
    }

    await Notification.updateMany({ user: userId, read: false }, { read: true });
    res.json({ success: true, message: 'All notifications marked as read' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};
