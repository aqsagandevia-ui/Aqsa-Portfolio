const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Short description is required'],
    },
    detailedDescription: {
      type: String,
      default: '',
    },
    problemStatement: {
      type: String,
      default: '',
    },
    solution: {
      type: String,
      default: '',
    },
    technologies: {
      type: [String],
      default: [],
    },
    features: {
      type: [String],
      default: [],
    },
    challenges: {
      type: String,
      default: '',
    },
    learnings: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    githubUrl: {
      type: String,
      default: '',
    },
    liveUrl: {
      type: String,
      default: '',
    },
    tagline: {
      type: String,
      default: '',
    },
    // Category used for filtering: MERN Stack, AI / NLP, Flutter, Full Stack, Other
    category: {
      type: String,
      enum: ['MERN', 'MERN Stack', 'AI/NLP', 'AI / NLP', 'Flutter', 'Full Stack', 'Other'],
      default: 'Other',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
