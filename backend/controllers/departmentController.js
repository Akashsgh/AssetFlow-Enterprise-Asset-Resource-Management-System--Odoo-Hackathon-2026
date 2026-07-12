import Department from '../models/Department.js';

// @desc    Get all departments
// @route   GET /api/departments
export const getDepartments = async (_req, res) => {
  try {
    const departments = await Department.find().populate('head', 'name email').sort('name');
    res.status(200).json({ success: true, count: departments.length, data: departments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create department
// @route   POST /api/departments
export const createDepartment = async (req, res) => {
  try {
    const { name, head } = req.body;
    const department = await Department.create({ name, head: head || null });
    res.status(201).json({ success: true, data: department });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete department
// @route   DELETE /api/departments/:id
export const deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) {
      return res.status(404).json({ success: false, message: 'Department not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
