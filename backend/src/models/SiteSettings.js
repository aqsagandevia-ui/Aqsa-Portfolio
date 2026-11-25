const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Aqsa Gandevia',
    },
    role: {
      type: String,
      default: 'Final-year MCA Student | Aspiring Software Developer',
    },
    bio: {
      type: String,
      default:
        'I am a final-year MCA student passionate about building modern web applications using the MERN stack, exploring AI/NLP concepts, and solving real-world problems through technology.',
    },
    email: {
      type: String,
      default: '',
    },
    github: {
      type: String,
      default: 'https://github.com/aqsagandevia-ui',
    },
    linkedin: {
      type: String,
      default: 'https://linkedin.com/in/aqsa-gandevia',
    },
    leetcode: {
      type: String,
      default: 'https://leetcode.com/aqsagandevia',
    },
    resumeUrl: {
      type: String,
      default: '/resume/Aqsa-Gandevia-Resume.pdf',
    },
    heroHeading: {
      type: String,
      default: "Hi, I'm Aqsa Gandevia",
    },
    heroSubheading: {
      type: String,
      default:
        'Final-year MCA student and aspiring Software Developer building modern web and AI-powered applications.',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
