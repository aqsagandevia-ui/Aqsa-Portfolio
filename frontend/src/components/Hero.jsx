import React from 'react'
import { motion } from 'framer-motion'
import {
  FileDown,
  ArrowRight,
  Code2,
  Terminal,
  Sparkles,
  Layers,
  Cpu,
  Database
} from 'lucide-react'
import { Github, Linkedin } from './Icons'
import Button from './Button'
import { useTheme } from '../context/ThemeContext'
import { fadeInUp, staggerContainer } from '../utils/animations'

export default function Hero({ settings }) {
  const { isDark } = useTheme()

  const socialLinks = [
    {
      name: 'GitHub',
      href: settings?.socialLinks?.github || 'https://github.com/aqsagandevia-ui',
      icon: Github,
      label: 'GitHub Profile',
    },
    {
      name: 'LinkedIn',
      href: settings?.socialLinks?.linkedin || 'https://linkedin.com/in/aqsa-gandevia',
      icon: Linkedin,
      label: 'LinkedIn Profile',
    },
  ]

  const resumeUrl = settings?.resumeUrl || '/resume/Aqsa_Gandevia_MCA_Resume.pdf'

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-40 left-10 w-72 h-72 bg-emerald-500/10 dark:bg-emerald-500/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Grid background texture */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">

        {/* Left Column: Introduction & CTAs */}
        <motion.div
          className="lg:col-span-7 flex flex-col items-start text-left"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Status Badge */}
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-medium border mb-6 backdrop-blur-md transition-colors bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/30"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span>Final-Year MCA Student • Open to Placement Opportunities</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] mb-4"
          >
            <span className="block text-slate-800 dark:text-slate-200">Hi, I'm</span>
            <span className="bg-gradient-to-r from-cyan-500 via-teal-400 to-indigo-500 bg-clip-text text-transparent">
              Aqsa Gandevia
            </span>
          </motion.h1>

          {/* Subtitle / Role */}
          <motion.p
            variants={fadeInUp}
            className="text-lg sm:text-xl font-medium text-slate-700 dark:text-slate-300 mb-4"
          >
            Aspiring Software Developer & MERN Stack Developer
          </motion.p>

          {/* Bio paragraph */}
          <motion.p
            variants={fadeInUp}
            className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed mb-8"
          >
            {settings?.bio ||
              "Final-year MCA student at Shrimad Rajchandra Institute of Management and Computer Application (UTU). Specializing in MERN stack development, Flutter mobile apps, and AI/NLP integrations with a strong focus on clean architecture, scalable code, and problem-solving."}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10"
          >
            <Button
              href="#projects"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto shadow-lg shadow-cyan-500/20"
            >
              Explore Projects
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>

            <Button
              href={resumeUrl}
              download
              target="_blank"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              <FileDown className="w-4 h-4 mr-1.5 text-cyan-500" />
              Download Resume
            </Button>
          </motion.div>

          {/* Social Links & Trust metrics */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center gap-6 pt-6 border-t border-slate-200 dark:border-white/10 w-full"
          >
            <span className="text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
              Connect With Me:
            </span>

            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all shadow-sm"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Code IDE Terminal Card & Visual Elements */}
        <motion.div
          className="lg:col-span-5 relative"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Decorative Badge 1 */}
          <motion.div
            className="absolute -top-6 -left-6 z-20 hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 shadow-xl backdrop-blur-md"
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-500">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-semibold text-slate-400">Architecture</p>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-100">Full-Stack MERN</p>
            </div>
          </motion.div>

          {/* Decorative Badge 2 */}
          <motion.div
            className="absolute -bottom-6 -right-6 z-20 hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 shadow-xl backdrop-blur-md"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
          >
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-semibold text-slate-400">Specialization</p>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-100">AI / NLP & Flutter</p>
            </div>
          </motion.div>

          {/* Code IDE Card */}
          <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[#0c0c17]/90 shadow-2xl backdrop-blur-xl">
            {/* Terminal Top Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-100/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                <Terminal className="w-3.5 h-3.5 text-cyan-500" />
                <span>developer.profile.js</span>
              </div>
              <div className="w-12 text-right">
                <span className="text-[10px] font-mono text-cyan-500 bg-cyan-500/10 px-1.5 py-0.5 rounded">ES6</span>
              </div>
            </div>

            {/* Code Content */}
            <div className="p-5 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto text-slate-800 dark:text-slate-200">
              <div className="text-slate-400 italic mb-2">// Candidate Overview</div>
              <div>
                <span className="text-purple-600 dark:text-purple-400 font-semibold">const</span>{' '}
                <span className="text-cyan-600 dark:text-cyan-400 font-semibold">candidate</span>{' '}
                <span className="text-slate-400">=</span> {'{'}
              </div>

              <div className="pl-4">
                <span className="text-slate-600 dark:text-slate-400">name:</span>{' '}
                <span className="text-emerald-600 dark:text-emerald-400">'Aqsa Gandevia'</span>,
              </div>

              <div className="pl-4">
                <span className="text-slate-600 dark:text-slate-400">education:</span>{' '}
                <span className="text-emerald-600 dark:text-emerald-400">'MCA (Final Year)'</span>,
              </div>

              <div className="pl-4">
                <span className="text-slate-600 dark:text-slate-400">institution:</span>{' '}
                <span className="text-emerald-600 dark:text-emerald-400">'SRIMCA, UTU'</span>,
              </div>

              <div className="pl-4">
                <span className="text-slate-600 dark:text-slate-400">coreTech:</span> [
                <span className="text-amber-600 dark:text-amber-400">'React'</span>,{' '}
                <span className="text-amber-600 dark:text-amber-400">'Node.js'</span>,{' '}
                <span className="text-amber-600 dark:text-amber-400">'MongoDB'</span>,{' '}
                <span className="text-amber-600 dark:text-amber-400">'Flutter'</span>],
              </div>

              <div className="pl-4">
                <span className="text-slate-600 dark:text-slate-400">strengths:</span> [
                <span className="text-amber-600 dark:text-amber-400">'Clean Code'</span>,{' '}
                <span className="text-amber-600 dark:text-amber-400">'RESTful APIs'</span>,{' '}
                <span className="text-amber-600 dark:text-amber-400">'Problem Solving'</span>],
              </div>

              <div className="pl-4">
                <span className="text-slate-600 dark:text-slate-400">readyForPlacements:</span>{' '}
                <span className="text-cyan-600 dark:text-cyan-400 font-bold">true</span>,
              </div>

              <div>{'}'}</div>

              <div className="mt-3 pt-3 border-t border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Status: Ready to Contribute</span>
                </span>
                <span className="text-emerald-500 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Hireable
                </span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
