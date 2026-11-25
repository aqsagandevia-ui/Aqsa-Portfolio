import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ExternalLink,
  Layers,
  CheckCircle2,
  Cpu,
  AlertTriangle,
  Lightbulb,
  Calendar,
  Sparkles,
  ArrowRight
} from 'lucide-react'
import { Github } from '../components/Icons'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Button from '../components/Button'
import Loader from '../components/Loader'
import { getProjectBySlug, getProjects } from '../services/api'
import { fadeInUp, staggerContainer } from '../utils/animations'

const fallbackProjectMap = {
  'skillsense-ai-skill-analytics': {
    title: 'SkillSense AI — Intelligent Skill Assessment & Career Path Recommender',
    slug: 'skillsense-ai-skill-analytics',
    category: 'AI / NLP',
    tagline: 'AI-powered skill extraction, candidate proficiency assessment, and automated career path gap analysis using NLP.',
    description: 'SkillSense AI is an intelligent skill evaluation and career roadmap recommendation platform powered by Natural Language Processing and Machine Learning. The system ingests resumes, portfolios, and job specifications to extract technical skill profiles, compute semantic compatibility scores, identify domain knowledge gaps, and formulate personalized learning roadmaps.',
    problem: 'Traditional hiring evaluations and student self-assessments rely on manual keyword matching that fails to understand semantic relationships between tech stacks, leaving candidates unaware of exact skill deficiencies for target software roles.',
    solution: 'Engineered an NLP text processing pipeline utilizing TF-IDF tokenization, cosine similarity metrics, and domain skill taxonomies to accurately parse resumes, benchmark proficiencies against real-world job roles, and generate interactive learning roadmaps.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'Python', 'NLP (Spacy / NLTK)', 'TF-IDF', 'MongoDB', 'Tailwind CSS'],
    features: [
      'Automated resume parsing and semantic entity extraction from unstructured text and PDF uploads',
      'Intelligent skill gap analysis comparing candidate competencies against target industry role specifications',
      'Interactive radar chart and visual metric breakdowns of domain strengths and weaknesses',
      'Personalized AI learning roadmap generator recommending focused projects, topics, and documentation',
      'RESTful microservice bridge between React client, Express API, and Python NLP processing scripts',
      'Historical assessment tracking and progress benchmarking for skill advancement'
    ],
    challenges: [
      {
        challenge: 'Accurately normalizing varied technical terms, abbreviations, and informal skill names across diverse resume formats.',
        resolution: 'Built an entity normalization dictionary and synonym lemmatization layer in Python to unify variations (e.g. "ReactJS", "React.js", "React") under standardized skill nodes.'
      },
      {
        challenge: 'Optimizing NLP text extraction and vector similarity computation latency for multi-page documents.',
        resolution: 'Implemented asynchronous document parsing workers and cached document vector embeddings in MongoDB for instant subsequent comparisons.'
      }
    ],
    learnings: [
      'Mastered text preprocessing, tokenization, TF-IDF vectorization, and cosine similarity algorithms in Python.',
      'Designed seamless dual-runtime communication between Express.js REST backends and Python NLP microservices.',
      'Created intuitive data visualizations with React for complex multi-dimensional competency metrics.'
    ],
    githubUrl: 'https://github.com/aqsagandevia-ui',
    featured: true
  },
  'skillsense-ai': {
    title: 'SkillSense AI — Intelligent Skill Assessment & Career Path Recommender',
    slug: 'skillsense-ai-skill-analytics',
    category: 'AI / NLP',
    tagline: 'AI-powered skill extraction, candidate proficiency assessment, and automated career path gap analysis using NLP.',
    description: 'SkillSense AI is an intelligent skill evaluation and career roadmap recommendation platform powered by Natural Language Processing and Machine Learning.',
    problem: 'Keyword matching fails to capture semantic meaning across tech stacks.',
    solution: 'Engineered an NLP text processing pipeline utilizing TF-IDF tokenization and cosine similarity metrics.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'Python', 'NLP', 'MongoDB', 'Tailwind CSS'],
    features: [
      'Automated resume parsing and semantic skill extraction',
      'Intelligent skill gap analysis and scoring',
      'Personalized AI learning roadmap generator'
    ],
    challenges: [
      {
        challenge: 'Accurately normalizing diverse technical terms.',
        resolution: 'Built an entity normalization dictionary in Python to unify skill taxonomy entities.'
      }
    ],
    learnings: [
      'Mastered text preprocessing, tokenization, and cosine similarity algorithms.'
    ],
    githubUrl: 'https://github.com/aqsagandevia-ui',
    featured: true
  },
  'chatsphere-realtime-messaging': {
    title: 'ChatSphere — Real-Time Messaging Platform',
    slug: 'chatsphere-realtime-messaging',
    category: 'MERN Stack',
    tagline: 'Full-stack real-time communication platform built with MERN stack and Socket.io for instant messaging, room channels, and live presence.',
    description: 'ChatSphere is a modern full-stack real-time messaging application engineered with MongoDB, Express, React, Node.js, and Socket.io. Features end-to-end JWT authentication, instant 1-on-1 and group chat rooms, real-time online/offline presence tracking, live typing indicators, multimedia attachments, and indexed MongoDB message history.',
    problem: 'Traditional web chat applications often suffer from high latency, connection state loss during network fluctuations, and inefficient database polling that causes server overload.',
    solution: 'Designed a distributed MERN architecture leveraging Socket.io WebSocket rooms, optimistic UI updates in React, and indexed MongoDB collections for sub-second message dispatch and persistent conversation history.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'JWT', 'Tailwind CSS', 'REST API'],
    features: [
      'Real-time 1-on-1 and group chat channels with instant WebSocket message delivery',
      'Live user presence detection (Online/Offline) and active typing indicators',
      'Secure JWT authentication with bcrypt password hashing and protected API routes',
      'Multimedia image sharing with client-side preview and cloud persistence',
      'Indexed message search, unread badge counters, and conversation history archiving'
    ],
    challenges: [
      {
        challenge: 'Managing high-frequency WebSocket events and preventing duplicate message broadcasts across multiple socket rooms.',
        resolution: 'Implemented client-side optimistic UI updates, debounced event emitters, and atomic MongoDB insertion operations with unique message identifiers.'
      },
      {
        challenge: 'Handling reliable user presence tracking during unexpected socket disconnections and page reloads.',
        resolution: 'Engineered heartbeat ping-pong intervals and socket reconnection fallbacks with automated status cleanup.'
      }
    ],
    learnings: [
      'Deepened mastery of WebSocket protocols, bi-directional event pipelines, and room broadcasting in Node.js.',
      'Mastered real-time client state management and optimistic UI reconciliation in React.',
      'Strengthened expertise in designing high-throughput NoSQL schemas and indexed query pipelines for message history.'
    ],
    githubUrl: 'https://github.com/aqsagandevia-ui',
    featured: true
  },
  'online-exam-portal': {
    title: 'Online Exam Portal — Automated Assessment System',
    slug: 'online-exam-portal',
    category: 'MERN Stack',
    tagline: 'Comprehensive web-based examination platform with synchronized timed assessments, instant automated grading, and proctoring controls.',
    description: 'A robust full-stack online examination and student evaluation platform built with the MERN stack. Designed with dual-role dashboards for Instructors and Students, featuring timed test sessions, dynamic question banks with randomized question shuffling, automated instant score computation, student result analytics, and tab-switch cheating prevention.',
    problem: 'Manual exam administration and physical grading are slow and error-prone, while standard online test platforms lack synchronized server-side timers and integrity checks to prevent tab-switching or untimely submissions.',
    solution: 'Developed an end-to-end evaluation system with server-synchronized countdown timers, automatic test lock & auto-submission, instant multi-format answer evaluation, and instructor analytics dashboards.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Redux Toolkit', 'JWT', 'Tailwind CSS', 'REST API'],
    features: [
      'Dual-role authentication (Admin/Instructor & Student) with role-based access control (RBAC)',
      'Synchronized exam timer with automatic test submission upon timer expiration',
      'Dynamic question bank supporting Multiple Choice Questions (MCQ), True/False, and multi-select formats',
      'Anti-cheating proctoring controls with tab-switch detection and full-screen enforcement',
      'Instant automated result evaluation with detailed question-by-question performance analytics',
      'Instructor portal for test scheduling, question management, and student scorecard exports'
    ],
    challenges: [
      {
        challenge: 'Preventing client-side timer manipulation and ensuring fair auto-submission across varying client network speeds.',
        resolution: 'Synchronized test timestamps with server-side validation and enforced strict server-side deadline checks on submission.'
      },
      {
        challenge: 'Designing flexible schemas capable of supporting dynamic question types and diverse scoring algorithms.',
        resolution: 'Structured modular Mongoose subdocuments with polymorphic question schemas and atomic grade calculation pipelines.'
      }
    ],
    learnings: [
      'Engineered secure role-based access control (RBAC) and protected API route hierarchies in Express.',
      'Managed complex form states, timer mechanics, and autosave workflows in React with Redux.',
      'Deepened skills in MongoDB aggregation pipelines for student ranking and performance benchmarking.'
    ],
    githubUrl: 'https://github.com/aqsagandevia-ui',
    featured: true
  },
  'online-live-snacks-selling-system': {
    title: 'Online Live Snacks Selling System',
    slug: 'online-live-snacks-selling-system',
    category: 'MERN Stack',
    tagline: 'Interactive e-commerce platform for live snacks ordering, real-time inventory management, and live order tracking.',
    description: 'A dynamic full-stack e-commerce and food ordering web application engineered with the MERN stack and Socket.io. Enables snack vendors and customers to interact seamlessly with live menu stock updates, dynamic cart and checkout, secure digital payment processing, and real-time order lifecycle tracking (Placed, In Kitchen, Out for Delivery, Delivered).',
    problem: 'Local snack vendors and food stalls face order management bottlenecks during peak hours, frequent inventory discrepancies, and lack of real-time communication with customers regarding preparation and delivery times.',
    solution: 'Built an interactive real-time snacks selling platform with atomic inventory management, live WebSocket status updates between kitchen and customers, and a streamlined mobile-first checkout experience.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'JWT', 'Stripe API', 'Tailwind CSS'],
    features: [
      'Interactive digital snack catalog with category filtering, search, and live in-stock indicators',
      'Real-time order progress tracker with step-by-step visual status alerts powered by WebSockets',
      'Intuitive shopping cart with dynamic pricing, coupon discounts, and secure checkout flow',
      'Vendor & Admin kitchen dashboard for live inventory updates, order dispatching, and sales analytics',
      'Customer order history, digital receipts, and feedback & rating submission',
      'Mobile-first responsive interface with micro-animations and instantaneous toast notifications'
    ],
    challenges: [
      {
        challenge: 'Preventing overselling and race conditions when multiple customers order limited-quantity snack items simultaneously.',
        resolution: 'Implemented atomic MongoDB queries with conditional stock decrement operators and inventory validation middleware.'
      },
      {
        challenge: 'Broadcasting live order status updates strictly to the specific ordering customer and active delivery staff.',
        resolution: 'Configured dynamic Socket.io room channels bound to unique order identifiers for targeted real-time event broadcasting.'
      }
    ],
    learnings: [
      'Mastered inventory concurrency control, atomic transactions, and order state machines in MongoDB.',
      'Integrated payment gateways and handled asynchronous webhook notifications securely.',
      'Developed responsive, conversion-optimized e-commerce UI components with rich micro-interactions in React.'
    ],
    githubUrl: 'https://github.com/aqsagandevia-ui/Online-Live-Snacks-Selling-System',
    featured: true
  },
  'skillswap-peer-skill-exchange': {
    title: 'SkillSwap — Peer-to-Peer Skill Exchange Platform',
    slug: 'skillswap-peer-skill-exchange',
    category: 'MERN Stack',
    tagline: 'Full-stack platform connecting students and developers to exchange skills through interactive sessions.',
    description: 'SkillSwap is a full-stack web platform built on the MERN stack designed to solve the problem of inaccessible 1-on-1 peer mentoring for students and developers. The platform enables users to showcase skills they can teach and discover peers willing to teach subjects they wish to learn.',
    problem: 'Many students and early-career engineers find formal tutoring prohibitively expensive, while traditional forums lack structured 1-on-1 collaborative scheduling and real-time interaction.',
    solution: 'Engineered a full-stack platform with JWT authentication, custom profile management, skill-tag matching, interactive request pipelines, and automated status handling.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'REST API', 'Tailwind CSS'],
    features: [
      'JWT-authenticated user registration & secure bcrypt password hashing',
      'Custom user profiles with skill offerings, learning goals, and bio details',
      'Advanced MongoDB multi-field search and aggregation pipeline to match mentors with learners',
      'Session request workflow with state transitions (Pending, Accepted, Completed, Cancelled)',
      'Responsive, accessible user interface optimized for mobile and desktop screens'
    ],
    challenges: [
      {
        challenge: 'Structuring flexible schemas for multi-directional skill requests and status transitions.',
        resolution: 'Designed clean Mongoose subdocuments and indexed query references to handle session lifecycles without race conditions.'
      },
      {
        challenge: 'Ensuring secure route protection across frontend and backend.',
        resolution: 'Implemented express JWT middleware and React context interceptors for consistent authorization and token refreshes.'
      }
    ],
    learnings: [
      'Mastered end-to-end full-stack state coordination and REST API modeling in Node & Express.',
      'Gained deep understanding of NoSQL document design patterns and relational indexing.',
      'Refined component abstraction in React with custom hooks and reusable UI primitives.'
    ],
    githubUrl: 'https://github.com/aqsagandevia-ui',
    featured: true
  },
  'ai-resume-builder-ats-scorer': {
    title: 'AI-Powered Resume Builder & ATS Scorer',
    slug: 'ai-resume-builder-ats-scorer',
    category: 'AI / NLP',
    tagline: 'Intelligent resume creation system with automated ATS compatibility scoring and NLP keyword extraction.',
    description: 'An AI-assisted resume builder that helps candidates tailor their resumes specifically to Applicant Tracking Systems (ATS). The application analyzes the candidate\'s resume against given job descriptions, identifies missing keywords, computes an ATS compatibility score, and generates customized PDF resumes.',
    problem: 'Over 75% of qualified resumes are filtered out by automated Applicant Tracking Systems due to formatting issues and missing semantic keywords.',
    solution: 'Built an NLP-driven resume parsing and comparison engine that analyzes text similarity, extracts key technical skills, provides actionable optimization feedback, and renders clean PDF outputs.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'Python', 'NLP (TF-IDF / Spacy)', 'MongoDB', 'Tailwind CSS'],
    features: [
      'Interactive modular resume builder with live dynamic preview',
      'Automated ATS compatibility scoring with keyword density analysis',
      'Smart skill extraction and bullet-point recommendation engine',
      'One-click high-resolution PDF generation with ATS-friendly styling',
      'Saved resume history and job-specific versioning'
    ],
    challenges: [
      {
        challenge: 'Accurately extracting and normalizing unstructured technical skills from diverse job descriptions.',
        resolution: 'Combined rule-based pattern matching with TF-IDF keyword frequency scoring to reliably identify core competencies.'
      },
      {
        challenge: 'Generating clean, ATS-compliant PDF layouts on the client/server without style artifacts.',
        resolution: 'Engineered a specialized print-ready React template component with exact pixel measurements.'
      }
    ],
    learnings: [
      'Hands-on implementation of NLP algorithms and text similarity metrics in Python & Node.',
      'Experience in architecting dual-service communication between Express and Python text-processing scripts.',
      'Understanding of recruiter workflows and ATS parsing mechanisms.'
    ],
    githubUrl: 'https://github.com/aqsagandevia-ui',
    featured: true
  },
  'chatsphere-cross-platform-messaging': {
    title: 'ChatSphere — Real-Time Messaging Platform',
    slug: 'chatsphere-cross-platform-messaging',
    category: 'MERN Stack',
    tagline: 'Full-stack real-time communication platform built with MERN stack and Socket.io for instant messaging and presence.',
    description: 'A modern full-stack real-time messaging application engineered with MongoDB, Express, React, Node.js, and Socket.io.',
    problem: 'Traditional messaging systems often have delayed message delivery and high server overhead.',
    solution: 'Engineered Socket.io WebSocket rooms and optimized MongoDB collections for sub-second communication.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'JWT', 'Tailwind CSS'],
    features: [
      'Instant real-time 1-on-1 and group chat rooms',
      'Live user presence detection & typing status',
      'JWT-authenticated security'
    ],
    challenges: [
      {
        challenge: 'Real-time state synchronization across devices.',
        resolution: 'Implemented Socket.io event architecture with optimistic UI updates.'
      }
    ],
    learnings: [
      'Deepened mastery of WebSocket protocols and bi-directional event pipelines.'
    ],
    githubUrl: 'https://github.com/aqsagandevia-ui',
    featured: true
  }
}

export default function ProjectDetails() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    async function fetchProject() {
      try {
        const res = await getProjectBySlug(slug)
        if (res?.data) {
          setProject(res.data)
        } else {
          setProject(fallbackProjectMap[slug] || null)
        }
      } catch (err) {
        setProject(fallbackProjectMap[slug] || null)
      } finally {
        setLoading(false)
      }
    }
    fetchProject()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#09090f]">
        <Loader text="Loading Project Case Study..." />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-[#09090f] text-white">
        <Navbar />
        <div className="max-w-xl mx-auto px-4 py-32 text-center">
          <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
          <p className="text-slate-400 mb-6 text-sm">
            The requested project case study could not be located.
          </p>
          <Button href="/#projects" variant="primary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#09090f] text-slate-100 selection:bg-cyan-500/20 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Projects</span>
          </Link>
        </div>

        {/* Header Section */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-6 pb-10 border-b border-slate-800"
        >
          <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/25">
              <Layers className="w-3.5 h-3.5" />
              {project.category}
            </span>
            {project.featured && (
              <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/25">
                Featured Case Study
              </span>
            )}
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight"
          >
            {project.title}
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-base sm:text-lg text-slate-300 leading-relaxed font-medium"
          >
            {project.tagline}
          </motion.p>

          {/* Action links */}
          <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 pt-2">
            {project.githubUrl && (
              <Button
                href={project.githubUrl}
                target="_blank"
                variant="primary"
                size="md"
              >
                <Github className="w-4 h-4 mr-2" />
                View Source Code
              </Button>
            )}

            {project.liveUrl && (
              <Button
                href={project.liveUrl}
                target="_blank"
                variant="secondary"
                size="md"
              >
                <ExternalLink className="w-4 h-4 mr-2 text-cyan-400" />
                Live Application
              </Button>
            )}
          </motion.div>
        </motion.div>

        {/* Case Study Details Grid */}
        <div className="py-12 space-y-12">

          {/* Section: Overview & Problem / Solution */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                The Problem
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.problem || project.description}
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-cyan-400" />
                The Solution & Architecture
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.solution || project.description}
              </p>
            </div>
          </section>

          {/* Section: Key Features */}
          {project.features && project.features.length > 0 && (
            <section className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                Key Features & Capabilities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section: Tech Stack Used */}
          <section className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2.5">
              <Cpu className="w-5 h-5 text-indigo-400" />
              Technologies & Tools
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {project.technologies?.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-800 text-cyan-300 border border-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Section: Technical Challenges & Solutions */}
          {project.challenges && project.challenges.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                Technical Challenges & Overcoming Them
              </h2>
              <div className="space-y-4">
                {project.challenges.map((c, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                    <h3 className="text-sm font-bold text-amber-300">
                      Challenge: {c.challenge}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <strong className="text-cyan-400">Resolution:</strong> {c.resolution}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section: Key Learnings */}
          {project.learnings && project.learnings.length > 0 && (
            <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-500/20">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2.5">
                <Lightbulb className="w-5 h-5 text-amber-400" />
                Key Learnings & Takeaways
              </h2>
              <ul className="space-y-2.5">
                {project.learnings.map((learning, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{learning}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Bottom Back Button */}
          <div className="pt-8 text-center">
            <Button href="/#projects" variant="secondary" size="lg">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to All Projects
            </Button>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
