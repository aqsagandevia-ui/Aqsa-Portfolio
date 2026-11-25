import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Code,
  Server,
  Database,
  Terminal,
  Cpu,
  Smartphone,
  Wrench,
  Check,
  Sparkles,
  Layers
} from 'lucide-react'
import SectionTitle from './SectionTitle'
import { getSkills } from '../services/api'
import { fadeInUp, staggerContainer, viewportOnce } from '../utils/animations'

// Comprehensive fallback skills matching backend seed data
const fallbackSkills = [
  // Frontend
  { _id: '1', name: 'React.js', category: 'Frontend', icon: 'Code', featured: true },
  { _id: '2', name: 'JavaScript (ES6+)', category: 'Frontend', icon: 'Code', featured: true },
  { _id: '3', name: 'HTML5 & CSS3', category: 'Frontend', icon: 'Code', featured: true },
  { _id: '4', name: 'Tailwind CSS', category: 'Frontend', icon: 'Code', featured: true },
  { _id: '5', name: 'Responsive Web Design', category: 'Frontend', icon: 'Code', featured: false },

  // Backend
  { _id: '6', name: 'Node.js', category: 'Backend', icon: 'Server', featured: true },
  { _id: '7', name: 'Express.js', category: 'Backend', icon: 'Server', featured: true },
  { _id: '8', name: 'RESTful API Architecture', category: 'Backend', icon: 'Server', featured: true },
  { _id: '9', name: 'JWT & Authentication', category: 'Backend', icon: 'Server', featured: true },
  { _id: '10', name: 'Middleware Architecture', category: 'Backend', icon: 'Server', featured: false },

  // Database
  { _id: '11', name: 'MongoDB', category: 'Database', icon: 'Database', featured: true },
  { _id: '12', name: 'Mongoose ODM', category: 'Database', icon: 'Database', featured: true },
  { _id: '13', name: 'MySQL / Relational SQL', category: 'Database', icon: 'Database', featured: true },
  { _id: '14', name: 'Data Modeling & Schema Design', category: 'Database', icon: 'Database', featured: false },

  // Programming & CS
  { _id: '15', name: 'Java', category: 'Programming', icon: 'Terminal', featured: true },
  { _id: '16', name: 'C / C++', category: 'Programming', icon: 'Terminal', featured: true },
  { _id: '17', name: 'Python', category: 'Programming', icon: 'Terminal', featured: true },
  { _id: '18', name: 'Data Structures & Algorithms', category: 'Programming', icon: 'Terminal', featured: true },
  { _id: '19', name: 'Object-Oriented Programming (OOP)', category: 'Programming', icon: 'Terminal', featured: true },
  { _id: '20', name: 'DBMS Fundamentals', category: 'Programming', icon: 'Terminal', featured: false },

  // AI / Data
  { _id: '21', name: 'Natural Language Processing (NLP)', category: 'AI / Data', icon: 'Cpu', featured: true },
  { _id: '22', name: 'Machine Learning Concepts', category: 'AI / Data', icon: 'Cpu', featured: true },
  { _id: '23', name: 'Python Data Libraries', category: 'AI / Data', icon: 'Cpu', featured: false },

  // Mobile
  { _id: '24', name: 'Flutter', category: 'Mobile', icon: 'Smartphone', featured: true },
  { _id: '25', name: 'Dart', category: 'Mobile', icon: 'Smartphone', featured: true },
  { _id: '26', name: 'Cross-Platform App UI', category: 'Mobile', icon: 'Smartphone', featured: false },

  // Tools
  { _id: '27', name: 'Git & GitHub', category: 'Tools', icon: 'Wrench', featured: true },
  { _id: '28', name: 'Postman API Testing', category: 'Tools', icon: 'Wrench', featured: true },
  { _id: '29', name: 'VS Code & npm', category: 'Tools', icon: 'Wrench', featured: false },
]

const categoryIcons = {
  All: Layers,
  Frontend: Code,
  Backend: Server,
  Database: Database,
  Programming: Terminal,
  'AI / Data': Cpu,
  Mobile: Smartphone,
  Tools: Wrench,
}

const categoryColors = {
  Frontend: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20',
  Backend: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
  Database: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
  Programming: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
  'AI / Data': 'text-purple-500 bg-purple-500/10 border-purple-500/20',
  Mobile: 'text-sky-500 bg-sky-500/10 border-sky-500/20',
  Tools: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
}

export default function Skills() {
  const [skills, setSkills] = useState(fallbackSkills)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSkills() {
      try {
        const res = await getSkills()
        if (res?.data && res.data.length > 0) {
          setSkills(res.data)
        }
      } catch (err) {
        // Use fallback quietly
      } finally {
        setLoading(false)
      }
    }
    fetchSkills()
  }, [])

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'Programming', 'AI / Data', 'Mobile', 'Tools']

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter(s => s.category === selectedCategory)

  // Grouped skills view when "All" is selected
  const categoriesList = ['Frontend', 'Backend', 'Database', 'Programming', 'AI / Data', 'Mobile', 'Tools']

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          label="Technical Arsenal"
          title="Skills, Tools & Technologies"
          subtitle="A comprehensive toolkit acquired through rigorous academic coursework, independent project development, and hands-on coding practice."
        />

        {/* Filter Categories Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-10 mb-12">
          {categories.map((cat) => {
            const Icon = categoryIcons[cat] || Code
            const isActive = selectedCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${isActive
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25 border-cyan-500'
                  : 'bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-cyan-500/40 hover:text-cyan-500'
                  }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat}</span>
              </button>
            )
          })}
        </div>

        {/* Selected Category View or All Categories Grid */}
        <AnimatePresence mode="wait">
          {selectedCategory !== 'All' ? (
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {filteredSkills.map((skill) => (
                <div
                  key={skill._id || skill.name}
                  className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/70 border border-slate-200 dark:border-white/10 hover:border-cyan-500/40 transition-all flex items-center justify-between shadow-sm group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg border ${categoryColors[skill.category] || 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20'}`}>
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-cyan-500 transition-colors">
                        {skill.name}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {skill.category}
                      </p>
                    </div>
                  </div>
                  {skill.level && (
                    <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {skill.level}
                    </span>
                  )}
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="all-categories"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {categoriesList.map((category) => {
                const items = skills.filter(s => s.category === category)
                const Icon = categoryIcons[category] || Code
                if (items.length === 0) return null

                return (
                  <motion.div
                    key={category}
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="p-6 rounded-2xl bg-white/80 dark:bg-slate-900/70 border border-slate-200 dark:border-white/10 hover:border-cyan-500/30 transition-all shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-white/5">
                        <div className="flex items-center gap-2.5">
                          <div className={`p-2 rounded-xl border ${categoryColors[category] || 'text-cyan-500 bg-cyan-500/10'}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <h3 className="text-base font-bold text-slate-900 dark:text-white">
                            {category}
                          </h3>
                        </div>
                        <span className="text-xs text-slate-400 font-medium">
                          {items.length} skills
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {items.map((skill) => (
                          <span
                            key={skill._id || skill.name}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${skill.featured
                              ? 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/30'
                              : 'bg-slate-100/80 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/5'
                              }`}
                          >
                            {skill.featured && <Sparkles className="w-3 h-3 text-cyan-500" />}
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
