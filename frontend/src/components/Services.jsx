import React from 'react'
import { motion } from 'framer-motion'
import { 
  Globe, 
  Server, 
  Smartphone, 
  Database, 
  Layout, 
  Cpu, 
  Code2,
  CheckCircle2
} from 'lucide-react'
import SectionTitle from './SectionTitle'
import { fadeInUp, staggerContainer, viewportOnce } from '../utils/animations'

export default function Services() {
  const capabilities = [
    {
      icon: Globe,
      color: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20',
      title: 'Full-Stack Web Apps',
      description: 'End-to-end development of dynamic, scalable web applications using the MERN stack with seamless frontend-backend communication.',
      deliverables: ['Single Page Applications (SPAs)', 'Component-driven UI architecture', 'Secure JWT authentication']
    },
    {
      icon: Server,
      color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
      title: 'RESTful API Engineering',
      description: 'Designing performant, structured, and secure backend APIs in Node.js & Express with clean controllers, routes, and validation.',
      deliverables: ['CRUD operations & pagination', 'Role-based authorization', 'Error handling & rate limiting']
    },
    {
      icon: Smartphone,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      title: 'Cross-Platform Mobile Apps',
      description: 'Building smooth, responsive cross-platform mobile interfaces with Flutter and Dart for Android and iOS devices.',
      deliverables: ['Responsive widget trees', 'State management patterns', 'REST API & local cache sync']
    },
    {
      icon: Database,
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
      title: 'Database Modeling & Design',
      description: 'Architecting efficient data models in MongoDB (NoSQL) and MySQL (Relational) with indexing, relations, and aggregation pipelines.',
      deliverables: ['Mongoose schema optimization', 'Relational normalization', 'Aggregation & filtering queries']
    },
    {
      icon: Layout,
      color: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
      title: 'Modern Responsive UI/UX',
      description: 'Translating design visions into pixel-perfect, accessible, and fast-loading web pages with modern CSS and Tailwind CSS.',
      deliverables: ['Dark & light mode theming', 'Mobile-first layout design', 'Interactive micro-animations']
    },
    {
      icon: Cpu,
      color: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
      title: 'AI & NLP Integrations',
      description: 'Incorporating natural language processing algorithms, text parsing, and AI model endpoints into web applications.',
      deliverables: ['Resume / text keyword scoring', 'Intelligent search & suggestions', 'API-driven AI model integration']
    }
  ]

  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          label="Capabilities & Expertise"
          title="What I Bring to Engineering Teams"
          subtitle="Versatile technical capabilities spanning full-stack development, mobile applications, databases, and modern software architectures."
        />

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {capabilities.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="p-7 rounded-2xl bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 hover:border-cyan-500/40 transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col justify-between group"
                whileHover={{ y: -4 }}
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-5 ${item.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-500 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-white/5">
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 mb-2">
                    Key Deliverables:
                  </p>
                  <ul className="space-y-1.5">
                    {item.deliverables.map((d, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
