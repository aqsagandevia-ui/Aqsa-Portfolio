const Skill = require('../models/Skill');

/** GET /api/skills */
const getSkills = async (req, res, next) => {
  try {
    const skills = await Skill.find().sort({ category: 1, order: 1 });
    res.json({ success: true, count: skills.length, data: skills });
  } catch (error) {
    next(error);
  }
};

/** POST /api/skills (Admin) */
const createSkill = async (req, res, next) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json({ success: true, data: skill });
  } catch (error) {
    next(error);
  }
};

/** PUT /api/skills/:id (Admin) */
const updateSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!skill) {
      res.status(404);
      return next(new Error('Skill not found'));
    }
    res.json({ success: true, data: skill });
  } catch (error) {
    next(error);
  }
};

/** DELETE /api/skills/:id (Admin) */
const deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      res.status(404);
      return next(new Error('Skill not found'));
    }
    await skill.deleteOne();
    res.json({ success: true, message: 'Skill deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getSkills, createSkill, updateSkill, deleteSkill };
