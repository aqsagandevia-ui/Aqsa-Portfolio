import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Calendar, MapPin, Award, BookOpen, CheckCircle2 } from 'lucide-react'
import SectionTitle from './SectionTitle'
import { getEducation } from '../services/api'
import { fadeInUp, staggerContainer, viewportOnce } from '../utils/animations'

const fallbackEducation = [
  {
    _id: '1',
    degree: 'Master of Computer Applications (MCA)',
    institution: 'Shrimad Rajchandra Institute of Management and Computer Application (SRIMCA)',
    university: 'Uka Tarsadia University (UTU)',
    location: 'Bardoli, Gujarat, India',
    startYear: '2025',
    endYear: 'Present',
    current: true,
    description: 'Specializing in Advanced Software Engineering, Full-Stack Web Development (MERN), Mobile Computing with Flutter, Natural Language Processing, and Cloud Database Architectures.',
    highlights: [
      'Core Coursework: Advanced Web Development, Data Science & ML, Object-Oriented Analysis, Distributed Systems',
      'Extensive practical project work in MERN stack architecture, state management, and REST APIs',
      'Active placement candidate preparing for Software Engineering and Full-Stack Developer roles'
    ],
    order: 1
  },
  {
    _id: '2',
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Dolat- Usha Institute of Applied Sciences And Dhiru - Sarla Institute of Management & Commerce',
    university: 'Veer Narmad South Gujarat University (VNSGU)',
    location: 'Valsad, Gujarat, India',
    startYear: '2022',
    endYear: '2025',
    current: false,
    description: 'Built strong foundational knowledge in Computer Science principles, Data Structures & Algorithms, Database Management Systems (DBMS), and Object-Oriented Programming.',
    highlights: [
      'Core Coursework: Data Structures & Algorithms (C/C++), Core Java, Relational Database Management (MySQL), Web Development (HTML/CSS/JS)',
      'Developed multiple academic software projects focusing on modular code and relational database normalization',
      'Graduated with strong technical grounding in computer science fundamentals'
    ],
    order: 2
  }
]

export default function Education() {
  const [educationList, setEducationList] = useState(fallbackEducation)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEdu() {
      try {
        const res = await getEducation()
        if (res?.data && res.data.length > 0) {
          setEducationList(res.data)
        }
      } catch (err) {
        // Fallback
      } finally {
        setLoading(false)
      }
    }
    fetchEdu()
  }, [])

  return (
    <section id="education" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-5xl mx-auto">
        <SectionTitle
          label="Academic Background"
          title="Education & Formal Training"
          subtitle="A solid academic trajectory in computer applications, emphasizing continuous technical learning and computer science fundamentals."
        />

        <div className="mt-16 relative">
          {/* Central timeline line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-cyan-500 via-indigo-500 to-slate-300 dark:to-slate-800 -translate-x-1/2" />

          <motion.div
            className="space-y-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {educationList.map((item, index) => {
              const isEven = index % 2 === 0
              return (
                <motion.div
                  key={item._id || index}
                  variants={fadeInUp}
                  className={`relative flex flex-col sm:flex-row items-start ${isEven ? 'sm:flex-row-reverse' : ''
                    }`}
                >
                  {/* Timeline central icon node */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-0 sm:top-6 w-10 h-10 rounded-full bg-white dark:bg-slate-900 border-2 border-cyan-500 shadow-md shadow-cyan-500/20 flex items-center justify-center z-10">
                    <GraduationCap className="w-5 h-5 text-cyan-500" />
                  </div>

                  {/* Content Card */}
                  <div className={`ml-12 sm:ml-0 sm:w-[calc(50%-2.5rem)] ${isEven ? 'sm:text-right' : 'sm:text-left'}`}>
                    <div className="p-6 sm:p-8 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 hover:border-cyan-500/40 transition-all duration-300 shadow-sm hover:shadow-md">
                      {/* Badge & Year */}
                      <div className={`flex flex-wrap items-center gap-2 mb-3 ${isEven ? 'sm:justify-end' : 'sm:justify-start'}`}>
                        {item.current ? (
                          <span className="text-[11px] font-semibold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/25">
                            Currently Enrolled
                          </span>
                        ) : (
                          <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/25">
                            Completed
                          </span>
                        )}

                        <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
                          <Calendar className="w-3.5 h-3.5" />
                          {item.startYear} – {item.endYear}
                        </span>
                      </div>

                      {/* Degree */}
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-1">
                        {item.degree}
                      </h3>

                      {/* Institution */}
                      <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 mb-1">
                        {item.institution}
                      </p>

                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-1 justify-start sm:justify-inherit">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        {item.university || item.location}
                      </p>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Highlights */}
                      {item.highlights && item.highlights.length > 0 && (
                        <div className="pt-4 border-t border-slate-100 dark:border-white/5 text-left">
                          <p className="text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-cyan-500" />
                            Key Focus & Coursework
                          </p>
                          <ul className="space-y-1.5">
                            {item.highlights.map((h, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
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
