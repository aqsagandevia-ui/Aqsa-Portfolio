import React from 'react'
import { motion } from 'framer-motion'
import { 
  GraduationCap, 
  Code2, 
  Smartphone, 
  Briefcase, 
  CheckCircle2, 
  Sparkles,
  BookOpen,
  Terminal,
  Cpu
} from 'lucide-react'
import SectionTitle from './SectionTitle'
import { fadeInUp, staggerContainer, viewportOnce } from '../utils/animations'

export default function About() {
  const highlights = [
    {
      icon: GraduationCap,
      color: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20',
      title: 'Academic Foundation',
      subtitle: 'Final-Year MCA at SRIMCA, Uka Tarsadia University',
      description: 'Solid grounding in Advanced Data Structures, Database Management, Software Engineering principles, and System Analysis.',
    },
    {
      icon: Code2,
      color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
      title: 'Full-Stack MERN Architecture',
      subtitle: 'React, Node.js, Express, MongoDB',
      description: 'Building end-to-end responsive web applications with state management, REST APIs, JWT authentication, and secure database schemas.',
    },
    {
      icon: Smartphone,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      title: 'Mobile & AI/NLP Integration',
      subtitle: 'Flutter & Machine Learning Pipelines',
      description: 'Cross-platform mobile application development with Flutter, paired with practical NLP, text processing, and AI APIs.',
    },
    {
      icon: Briefcase,
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
      title: 'Placement & Career Ready',
      subtitle: 'Seeking Software Developer Roles',
      description: 'Eager to contribute to forward-thinking engineering teams, write clean production code, and quickly master new enterprise tech stacks.',
    },
  ]

  const keyStrengths = [
    'Clean, maintainable, component-driven code architecture',
    'Robust RESTful API design with proper validation & error handling',
    'Database modeling, indexing, and aggregation pipelines',
    'Consistent problem-solving and algorithmic thinking',
    'Rapid learner adept at modern developer tooling and Git workflows',
    'Keen eye for responsive UI/UX design and micro-interactions'
  ]

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          label="About Me"
          title="Bridging Theoretical CS with Production Engineering"
          subtitle="Driven by a passion for building elegant software solutions that solve real problems through clean code, modern architectures, and continuous learning."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-12">
          {/* Left Column: Narrative Bio */}
          <motion.div 
            className="lg:col-span-6 flex flex-col gap-6 text-slate-600 dark:text-slate-300"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.div 
              variants={fadeInUp}
              className="p-6 sm:p-8 rounded-2xl bg-white/70 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 backdrop-blur-md shadow-sm"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-500" />
                Hello, I'm Aqsa Gandevia
              </h3>
              
              <p className="leading-relaxed mb-4 text-sm sm:text-base">
                I am a final-year Master of Computer Applications (MCA) student at <strong className="text-slate-900 dark:text-white font-semibold">Shrimad Rajchandra Institute of Management and Computer Application (SRIMCA), Uka Tarsadia University</strong>.
              </p>

              <p className="leading-relaxed mb-4 text-sm sm:text-base">
                My journey into software engineering is rooted in curiosity for how complex systems operate under the hood. Over the course of my academic and self-directed projects, I have specialized in building full-stack web applications using the <strong className="text-cyan-600 dark:text-cyan-400 font-semibold">MERN Stack (MongoDB, Express, React, Node.js)</strong>, building cross-platform mobile apps with <strong className="text-indigo-600 dark:text-indigo-400 font-semibold">Flutter</strong>, and integrating practical <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">AI/NLP solutions</strong>.
              </p>

              <p className="leading-relaxed text-sm sm:text-base">
                I focus heavily on code quality, modular component design, database performance, and adhering to modern development best practices. Currently, I am seeking an opportunity to begin my career as a <strong className="text-slate-900 dark:text-white font-semibold">Software Developer</strong> where I can make an immediate impact on impactful products.
              </p>
            </motion.div>

            {/* What I Bring to the Table */}
            <motion.div 
              variants={fadeInUp}
              className="p-6 sm:p-8 rounded-2xl bg-white/70 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 backdrop-blur-md shadow-sm"
            >
              <h4 className="text-sm uppercase tracking-wider font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-500" />
                Core Engineering Strengths
              </h4>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {keyStrengths.map((strength, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Right Column: Highlight Cards */}
          <motion.div 
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {highlights.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="p-6 rounded-2xl bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 hover:border-cyan-500/40 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
                  whileHover={{ y: -4 }}
                >
                  <div>
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${item.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                      {item.title}
                    </h4>

                    <p className="text-xs font-medium text-cyan-600 dark:text-cyan-400 mb-3">
                      {item.subtitle}
                    </p>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
