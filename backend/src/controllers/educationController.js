const Education = require('../models/Education');

/** GET /api/education */
const getEducation = async (req, res, next) => {
  try {
    const education = await Education.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: education.length, data: education });
  } catch (error) {
    next(error);
  }
};

/** POST /api/education (Admin) */
const createEducation = async (req, res, next) => {
  try {
    const edu = await Education.create(req.body);
    res.status(201).json({ success: true, data: edu });
  } catch (error) {
    next(error);
  }
};

/** PUT /api/education/:id (Admin) */
const updateEducation = async (req, res, next) => {
  try {
    const edu = await Education.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!edu) {
      res.status(404);
      return next(new Error('Education record not found'));
    }
    res.json({ success: true, data: edu });
  } catch (error) {
    next(error);
  }
};

/** DELETE /api/education/:id (Admin) */
const deleteEducation = async (req, res, next) => {
  try {
    const edu = await Education.findById(req.params.id);
    if (!edu) {
      res.status(404);
      return next(new Error('Education record not found'));
    }
    await edu.deleteOne();
    res.json({ success: true, message: 'Education record deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getEducation, createEducation, updateEducation, deleteEducation };
