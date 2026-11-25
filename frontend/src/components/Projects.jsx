import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Layers, ArrowUpRight } from 'lucide-react'
import { Github } from './Icons'
import SectionTitle from './SectionTitle'
import ProjectCard from './ProjectCard'
import { getProjects } from '../services/api'
import { fadeInUp, staggerContainer, viewportOnce } from '../utils/animations'

const fallbackProjects = [
  {
    _id: '1',
    title: 'ChatSphere — Real-Time Messaging Platform',
    slug: 'chatsphere-realtime-messaging',
    category: 'MERN Stack',
    tagline: 'Full-stack real-time communication platform built with MERN stack and Socket.io for instant messaging and presence.',
    description: 'A modern full-stack real-time messaging application engineered with MongoDB, Express, React, Node.js, and Socket.io. Features 1-on-1 and group chat rooms, real-time online/offline presence tracking, live typing indicators, JWT authentication with secure cookies, and media attachments with MongoDB message persistence.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'JWT', 'Tailwind CSS', 'REST API'],
    features: [
      'Real-time 1-on-1 and group chat rooms with instant WebSocket message delivery',
      'Live user presence tracking (Online/Offline status) and dynamic typing indicators',
      'Secure JWT authentication with bcrypt password hashing and protected API routes',
      'Multimedia file sharing with preview and indexed message history search'
    ],
    githubUrl: 'https://github.com/aqsagandevia-ui',
    featured: true,
    order: 1
  },
  {
    _id: '2',
    title: 'Online Exam Portal — Automated Assessment System',
    slug: 'online-exam-portal',
    category: 'MERN Stack',
    tagline: 'Comprehensive web-based examination platform with synchronized timed assessments, instant automated grading, and proctoring.',
    description: 'A robust full-stack online examination and evaluation portal built with the MERN stack. Designed with dual-role dashboards for Instructors and Students, featuring timed test sessions, dynamic question banks with randomized question shuffling, automated instant score computation, student result analytics, and anti-cheating tab-switch detection.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux Toolkit', 'JWT', 'Tailwind CSS', 'REST API'],
    features: [
      'Dual-role authentication (Admin/Instructor & Student) with role-based access control (RBAC)',
      'Synchronized exam timer with automatic test submission upon timer expiration',
      'Dynamic question bank supporting Multiple Choice Questions (MCQ), True/False, and multi-select formats',
      'Anti-cheating proctoring controls with tab-switch detection and full-screen enforcement'
    ],
    githubUrl: 'https://github.com/aqsagandevia-ui',
    featured: true,
    order: 2
  },
  {
    _id: '3',
    title: 'Online Live Snacks Selling System',
    slug: 'online-live-snacks-selling-system',
    category: 'MERN Stack',
    tagline: 'Interactive e-commerce platform for live snacks ordering, real-time inventory management, and live order tracking.',
    description: 'A dynamic full-stack e-commerce and food ordering web application engineered with the MERN stack and Socket.io. Enables snack vendors and customers to interact seamlessly with live menu stock updates, dynamic cart and checkout, secure digital payment processing, and real-time order lifecycle tracking (Placed, In Kitchen, Out for Delivery, Delivered).',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'JWT', 'Tailwind CSS', 'REST API'],
    features: [
      'Interactive digital snack catalog with category filtering, search, and live in-stock indicators',
      'Real-time order progress tracker with step-by-step visual status alerts powered by WebSockets',
      'Intuitive shopping cart with dynamic pricing, coupon discounts, and secure checkout flow',
      'Vendor & Admin kitchen dashboard for live inventory updates, order dispatching, and sales analytics'
    ],
    githubUrl: 'https://github.com/aqsagandevia-ui',
    featured: true,
    order: 3
  },
  {
    _id: '4',
    title: 'SkillSense AI — Intelligent Skill Assessment & Career Path Recommender',
    slug: 'skillsense-ai-skill-analytics',
    category: 'AI / NLP',
    tagline: 'AI-powered skill extraction, candidate proficiency assessment, and automated career path gap analysis using NLP.',
    description: 'An intelligent skill assessment and career path recommendation system powered by Natural Language Processing and Machine Learning. Analyzes candidate resumes, code repositories, and job specifications to extract technical competencies, compute skill alignment scores, identify domain knowledge gaps, and suggest personalized learning roadmaps.',
    technologies: ['React', 'Node.js', 'Express', 'Python', 'NLP (Spacy / NLTK)', 'TF-IDF', 'MongoDB', 'Tailwind CSS'],
    features: [
      'Automated resume parsing and semantic skill extraction from unstructured text and PDFs',
      'Intelligent skill gap analysis comparing candidate competencies against target job profiles',
      'Interactive visual dashboard showing proficiency scores and domain strength breakdowns',
      'Personalized AI learning roadmap generator recommending project milestones and coursework'
    ],
    githubUrl: 'https://github.com/aqsagandevia-ui',
    featured: true,
    order: 4
  }
]

export default function Projects() {
  const [projects, setProjects] = useState(fallbackProjects)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  const categories = ['All', 'MERN Stack', 'AI / NLP', 'Flutter']

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await getProjects(selectedCategory !== 'All' ? selectedCategory : undefined)
        if (res?.data && res.data.length > 0) {
          setProjects(res.data)
        }
      } catch (err) {
        // Quietly fallback
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [selectedCategory])

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory)

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          label="Featured Work"
          title="Projects & Engineering Case Studies"
          subtitle="A selection of end-to-end applications demonstrating full-stack MERN architecture, AI/NLP practical tools, and cross-platform mobile development."
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-10 mb-12">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                    : 'bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-cyan-500/40 hover:text-cyan-500'
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project._id || project.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* GitHub link banner */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-purple-500/10 border border-cyan-500/20 text-center flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="text-left">
            <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Want to see more code repositories & experiments?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Explore my open-source work, algorithms, and class projects on GitHub.
            </p>
          </div>

          <a
            href="https://github.com/aqsagandevia-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs sm:text-sm font-semibold hover:bg-cyan-500 dark:hover:bg-cyan-400 dark:hover:text-slate-900 transition-colors shadow-md shrink-0"
          >
            <Github className="w-4 h-4" />
            <span>Visit GitHub Profile</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
