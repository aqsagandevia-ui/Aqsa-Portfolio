import React from 'react'
import { motion } from 'framer-motion'
import { FileDown, Mail, CheckCircle2, Award, Briefcase, GraduationCap } from 'lucide-react'
import Button from './Button'
import { fadeInUp, viewportOnce } from '../utils/animations'

export default function ResumeCTA({ settings }) {
  const resumeUrl = '/resume/Aqsa_Gandevia_MCA_Resume.pdf'

  const qualifications = [
    { label: 'Degree', value: 'Master of Computer Applications (MCA) – Final Year' },
    { label: 'Institution', value: 'SRIMCA, Uka Tarsadia University' },
    { label: 'Primary Stack', value: 'MERN (React, Node, Express, MongoDB) & Flutter' },
    { label: 'Placement Status', value: 'Actively Interviewing for Software Roles' },
  ]

  return (
    <section id="resume" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white border border-slate-800 shadow-2xl p-8 sm:p-12 lg:p-14"
        >
          {/* Ambient Glows */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-cyan-500/20 rounded-full blur-[90px] pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-[90px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 mb-4">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Placement Ready Resume</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-4">
                Interested in working together? Let's connect.
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                Download my up-to-date resume covering academic history, in-depth technical projects, programming proficiencies, and problem-solving experience.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Button
                  href={resumeUrl}
                  download="Aqsa_Gandevia_MCA_Resume.pdf"
                  variant="primary"
                  size="lg"
                  className="shadow-lg shadow-cyan-500/25"
                >
                  <FileDown className="w-4 h-4 mr-2" />
                  Download Resume (PDF)
                </Button>

                <Button
                  href="#contact"
                  variant="secondary"
                  size="lg"
                  className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                >
                  <Mail className="w-4 h-4 mr-2 text-cyan-400" />
                  Contact Me
                </Button>
              </div>
            </div>

            {/* Right Quick Summary Card */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 space-y-4">
              <div className="text-xs uppercase tracking-wider font-bold text-cyan-400 pb-2 border-b border-white/10">
                Candidate Summary
              </div>

              {qualifications.map((q, idx) => (
                <div key={idx} className="text-xs sm:text-sm">
                  <span className="text-slate-400 block text-[11px] uppercase tracking-wider font-semibold">
                    {q.label}
                  </span>
                  <span className="text-white font-medium">
                    {q.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
