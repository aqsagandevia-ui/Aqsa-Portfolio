/**
 * Seed script — populates database with initial portfolio data.
 * Run with: npm run seed
 *
 * Uses ONLY information explicitly provided in the project brief.
 */
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./src/config/db');

const User = require('./src/models/User');
const Project = require('./src/models/Project');
const Skill = require('./src/models/Skill');
const Education = require('./src/models/Education');
const SiteSettings = require('./src/models/SiteSettings');

const seedData = async () => {
  await connectDB();

  console.log('🌱 Clearing existing data...');
  await User.deleteMany();
  await Project.deleteMany();
  await Skill.deleteMany();
  await Education.deleteMany();
  await SiteSettings.deleteMany();

  // ─── Admin User ───────────────────────────────────────────────
  await User.create({
    name: 'Aqsa Gandevia',
    email: 'admin@portfolio.local',
    password: 'Admin@1234', // Change this in production!
    role: 'admin',
  });
  console.log('✅ Admin user created: admin@portfolio.local / Admin@1234');

  // ─── Site Settings ────────────────────────────────────────────
  await SiteSettings.create({
    name: 'Aqsa Gandevia',
    role: 'Final-year MCA Student | Aspiring Software Developer',
    bio: 'I am a final-year MCA student passionate about building modern web applications using the MERN stack, exploring AI/NLP concepts, and solving real-world problems through technology. I enjoy learning new tools, working on academic and personal projects, and preparing for a career in software development.',
    github: 'https://github.com/aqsagandevia-ui',
    linkedin: 'https://www.linkedin.com/in/aqsa-gandevia-526374253',
    leetcode: 'https://leetcode.com/aqsagandevia',
    resumeUrl: '/resume/Aqsa_Gandevia_Resume.pdf',
    heroHeading: "Hi, I'm Aqsa Gandevia",
    heroSubheading:
      'Final-year MCA student and aspiring Software Developer building modern web and AI-powered applications.',
  });
  console.log('✅ Site settings created');

  // ─── Education ────────────────────────────────────────────────
  await Education.create([
    {
      degree: 'Master of Computer Applications (MCA)',
      institution: 'Shrimad Rajchandra Institute of Management and Computer Application',
      university: 'Uka Tarsadia University',
      description:
        'Pursuing a Master of Computer Applications with a focus on software development, full-stack web technologies, databases, and application design. Academic projects include MERN stack applications, AI/NLP exploration, and mobile development with Flutter.',
      focus: 'Software Development, MERN Stack, AI/NLP, Mobile Development',
      startDate: '',
      endDate: '',
      current: true,
      order: 0,
    },
  ]);
  console.log('✅ Education records created');

  // ─── Skills ───────────────────────────────────────────────────
  const skills = [
    // Frontend
    { name: 'HTML', category: 'Frontend', icon: 'Code2', order: 0 },
    { name: 'CSS', category: 'Frontend', icon: 'Palette', order: 1 },
    { name: 'JavaScript', category: 'Frontend', icon: 'Braces', order: 2 },
    { name: 'React', category: 'Frontend', icon: 'Atom', order: 3 },
    { name: 'Vite', category: 'Frontend', icon: 'Zap', order: 4 },
    { name: 'Tailwind CSS', category: 'Frontend', icon: 'Wind', order: 5 },
    // Backend
    { name: 'Node.js', category: 'Backend', icon: 'Server', order: 0 },
    { name: 'Express.js', category: 'Backend', icon: 'Globe', order: 1 },
    { name: 'REST APIs', category: 'Backend', icon: 'Network', order: 2 },
    // Database
    { name: 'MongoDB', category: 'Database', icon: 'Database', order: 0 },
    { name: 'Mongoose', category: 'Database', icon: 'Database', order: 1 },
    { name: 'MySQL', category: 'Database', icon: 'Table', order: 2 },
    // Programming
    { name: 'JavaScript', category: 'Programming', icon: 'Braces', order: 0 },
    { name: 'Python', category: 'Programming', icon: 'Terminal', order: 1 },
    { name: 'Java', category: 'Programming', icon: 'Coffee', order: 2 },
    { name: 'C/C++', category: 'Programming', icon: 'Code', order: 3 },
    // AI/Data
    { name: 'NLP Concepts', category: 'AI/Data', icon: 'Brain', order: 0 },
    { name: 'Machine Learning Basics', category: 'AI/Data', icon: 'TrendingUp', order: 1 },
    { name: 'Python', category: 'AI/Data', icon: 'Terminal', order: 2 },
    { name: 'Pandas', category: 'AI/Data', icon: 'BarChart2', order: 3 },
    { name: 'NumPy', category: 'AI/Data', icon: 'Hash', order: 4 },
    { name: 'Scikit-learn', category: 'AI/Data', icon: 'Activity', order: 5 },
    // Mobile
    { name: 'Flutter', category: 'Mobile', icon: 'Smartphone', order: 0 },
    { name: 'Dart', category: 'Mobile', icon: 'Code2', order: 1 },
    // Tools
    { name: 'Git', category: 'Tools', icon: 'GitBranch', order: 0 },
    { name: 'GitHub', category: 'Tools', icon: 'Github', order: 1 },
    { name: 'VS Code', category: 'Tools', icon: 'Code2', order: 2 },
    { name: 'Postman', category: 'Tools', icon: 'Send', order: 3 },
    { name: 'Docker', category: 'Tools', icon: 'Box', order: 4 },
  ];
  await Skill.insertMany(skills);
  console.log('✅ Skills created');

  // ─── Projects ─────────────────────────────────────────────────
  await Project.create([
    {
      title: 'ChatSphere — Real-Time Messaging Platform',
      slug: 'chatsphere-realtime-messaging',
      description:
        'Full-stack real-time communication platform built with the MERN stack and Socket.io for instant 1-on-1 and group messaging.',
      detailedDescription:
        'ChatSphere is a modern full-stack real-time messaging application engineered with MongoDB, Express, React, Node.js, and Socket.io. Features end-to-end JWT authentication, instant 1-on-1 and group chat rooms, real-time online/offline presence tracking, live typing indicators, multimedia attachments, and indexed MongoDB message history.',
      problemStatement:
        'Traditional web chat applications often suffer from high latency, connection state loss during network fluctuations, and inefficient database polling that causes server overload.',
      solution:
        'Designed a distributed MERN architecture leveraging Socket.io WebSocket rooms, optimistic UI updates in React, and indexed MongoDB collections for sub-second message dispatch and persistent conversation history.',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'JWT', 'Tailwind CSS', 'REST API'],
      features: [
        'Real-time 1-on-1 and group chat rooms with instant WebSocket message delivery',
        'Live user presence detection (Online/Offline status) and dynamic typing indicators',
        'Secure JWT authentication with bcrypt password hashing and protected API routes',
        'Multimedia file sharing with client-side preview and cloud persistence',
        'Message search, unread badge counters, and indexed chat history retrieval',
      ],
      challenges:
        'Managing high-frequency WebSocket events and preventing duplicate message broadcasts across multiple socket rooms. Handled through event throttling, optimistic UI updates, and atomic MongoDB writes.',
      learnings:
        'Deepened mastery of WebSocket protocols, bi-directional event pipelines, and room broadcasting in Node.js, alongside real-time client state synchronization in React.',
      image: '',
      githubUrl: 'https://github.com/aqsagandevia-ui/ChatSphere',
      liveUrl: '',
      category: 'MERN Stack',
      featured: true,
      order: 0,
    },
    {
      title: 'Online Exam Portal — Automated Assessment System',
      slug: 'online-exam-portal',
      description:
        'Comprehensive web-based examination platform with synchronized timed assessments, instant automated grading, and proctoring controls.',
      detailedDescription:
        'A robust full-stack online examination and student evaluation platform built with the MERN stack. Designed with dual-role dashboards for Instructors and Students, featuring timed test sessions, dynamic question banks with randomized question shuffling, automated instant score computation, student result analytics, and anti-cheating tab-switch detection.',
      problemStatement:
        'Manual exam administration and physical grading are slow and error-prone, while standard online test platforms lack synchronized server-side timers and integrity checks to prevent tab-switching or untimely submissions.',
      solution:
        'Developed an end-to-end evaluation system with server-synchronized countdown timers, automatic test lock & auto-submission, instant multi-format answer evaluation, and instructor analytics dashboards.',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux Toolkit', 'JWT', 'Tailwind CSS', 'REST API'],
      features: [
        'Dual-role authentication (Admin/Instructor & Student) with role-based access control (RBAC)',
        'Synchronized exam timer with automatic test submission upon timer expiration',
        'Dynamic question bank supporting Multiple Choice Questions (MCQ), True/False, and multi-select formats',
        'Anti-cheating proctoring controls with tab-switch detection and full-screen enforcement',
        'Instant automated result evaluation with detailed question-by-question performance analytics',
        'Instructor portal for test scheduling, question management, and student scorecard exports',
      ],
      challenges:
        'Preventing client-side timer manipulation and ensuring fair auto-submission across varying client network speeds. Synchronized test timestamps with server-side validation and automated deadline enforcement.',
      learnings:
        'Engineered secure role-based access control (RBAC) and protected API route hierarchies in Express, and mastered MongoDB aggregation pipelines for student performance benchmarking.',
      image: '',
      githubUrl: 'https://github.com/aqsagandevia-ui/Online-Exam-Portal',
      liveUrl: '',
      category: 'MERN Stack',
      featured: true,
      order: 1,
    },
    {
      title: 'Online Live Snacks Selling System',
      slug: 'online-live-snacks-selling-system',
      description:
        'Interactive e-commerce platform for live snacks ordering, real-time inventory management, and live order tracking.',
      detailedDescription:
        'A dynamic full-stack e-commerce and food ordering web application engineered with the MERN stack and Socket.io. Enables snack vendors and customers to interact seamlessly with live menu stock updates, dynamic cart and checkout, secure digital payment processing, and real-time order lifecycle tracking (Placed, In Kitchen, Out for Delivery, Delivered).',
      problemStatement:
        'Local snack vendors and food stalls face order management bottlenecks during peak hours, frequent inventory discrepancies, and lack of real-time communication with customers regarding preparation and delivery times.',
      solution:
        'Built an interactive real-time snacks selling platform with atomic inventory management, live WebSocket status updates between kitchen and customers, and a streamlined mobile-first checkout experience.',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'JWT', 'Tailwind CSS', 'REST API'],
      features: [
        'Interactive digital snack catalog with category filtering, search, and live in-stock indicators',
        'Real-time order progress tracker with step-by-step visual status alerts powered by WebSockets',
        'Intuitive shopping cart with dynamic pricing, coupon discounts, and secure checkout flow',
        'Vendor & Admin kitchen dashboard for live inventory updates, order dispatching, and sales analytics',
        'Customer order history, digital receipts, and feedback & rating submission',
      ],
      challenges:
        'Preventing overselling and race conditions when multiple customers order limited-quantity snack items simultaneously. Solved using atomic MongoDB queries with conditional stock decrement operators.',
      learnings:
        'Mastered inventory concurrency control, atomic transactions, and order state machines in MongoDB, along with real-time room communication in Socket.io.',
      image: '',
      githubUrl: 'https://github.com/aqsagandevia-ui/Online-Live-Snacks-Selling-System',
      liveUrl: '',
      category: 'MERN Stack',
      featured: true,
      order: 2,
    },
    {
      title: 'SkillSense AI — Intelligent Skill Assessment & Career Path Recommender',
      slug: 'skillsense-ai-skill-analytics',
      description:
        'AI-powered skill extraction, candidate proficiency assessment, and automated career path gap analysis using NLP.',
      detailedDescription:
        'SkillSense AI is an intelligent skill evaluation and career roadmap recommendation platform powered by Natural Language Processing and Machine Learning. The system ingests resumes, portfolios, and job specifications to extract technical skill profiles, compute semantic compatibility scores, identify domain knowledge gaps, and formulate personalized learning roadmaps.',
      problemStatement:
        'Traditional hiring evaluations and student self-assessments rely on manual keyword matching that fails to understand semantic relationships between tech stacks, leaving candidates unaware of exact skill deficiencies for target software roles.',
      solution:
        'Engineered an NLP text processing pipeline utilizing TF-IDF tokenization, cosine similarity metrics, and domain skill taxonomies to accurately parse resumes, benchmark proficiencies against real-world job roles, and generate interactive learning roadmaps.',
      technologies: ['React', 'Node.js', 'Express', 'Python', 'NLP (Spacy / NLTK)', 'TF-IDF', 'MongoDB', 'Tailwind CSS'],
      features: [
        'Automated resume parsing and semantic entity extraction from unstructured text and PDF uploads',
        'Intelligent skill gap analysis comparing candidate competencies against target industry role specifications',
        'Interactive visual metric breakdowns of domain strengths and weaknesses',
        'Personalized AI learning roadmap generator recommending focused projects, topics, and documentation',
        'RESTful microservice bridge between React client, Express API, and Python NLP processing scripts',
        'Historical assessment tracking and progress benchmarking for skill advancement',
      ],
      challenges:
        'Accurately normalizing varied technical terms, abbreviations, and informal skill names across diverse resume formats. Built an entity normalization dictionary and synonym lemmatization layer in Python to unify variations under standardized skill nodes.',
      learnings:
        'Mastered text preprocessing, tokenization, TF-IDF vectorization, and cosine similarity algorithms in Python, alongside dual-runtime communication between Express.js REST backends and Python NLP microservices.',
      image: '',
      githubUrl: 'https://github.com/aqsagandevia-ui',
      liveUrl: '',
      category: 'AI / NLP',
      featured: true,
      order: 3,
    },
  ]);
  console.log('✅ Projects created');

  console.log('\n🎉 Database seeded successfully!\n');
  console.log('Admin credentials:');
  console.log('  Email   : admin@portfolio.local');
  console.log('  Password: Admin@1234');
  console.log('\n⚠️  IMPORTANT: Change the admin password before deploying!\n');
  process.exit(0);
};

seedData().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
