import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ExternalLink, ArrowRight, Layers, CheckCircle2 } from 'lucide-react'
import { Github } from './Icons'
import Button from './Button'

const categoryBadges = {
  'MERN Stack': 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/25',
  'AI / NLP': 'text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/25',
  'Flutter': 'text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/25',
  'Full Stack': 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/25',
}

export default function ProjectCard({ project }) {
  const badgeClass = categoryBadges[project.category] || 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/25'

  return (
    <motion.div
      className="rounded-2xl bg-white/80 dark:bg-slate-900/70 border border-slate-200 dark:border-white/10 hover:border-cyan-500/40 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between overflow-hidden group"
      whileHover={{ y: -6 }}
    >
      {/* Card Header & Preview */}
      <div className="p-6 sm:p-7 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${badgeClass}`}>
            <Layers className="w-3 h-3" />
            {project.category}
          </span>

          {project.featured && (
            <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
              Featured Project
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-500 transition-colors">
          <Link to={`/projects/${project.slug}`}>
            {project.title}
          </Link>
        </h3>

        {/* Tagline */}
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
          {project.tagline}
        </p>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 line-clamp-3">
          {project.description}
        </p>

        {/* Key Highlights / Features Preview */}
        {project.features && project.features.length > 0 && (
          <div className="mb-6 space-y-2">
            <p className="text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
              Key Highlights:
            </p>
            <ul className="space-y-1.5">
              {project.features.slice(0, 3).map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technologies List */}
        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-white/5">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies?.map((tech, idx) => (
              <span
                key={idx}
                className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer / Action Buttons */}
      <div className="px-6 py-4 bg-slate-50/80 dark:bg-slate-950/40 border-t border-slate-100 dark:border-white/5 flex items-center justify-between gap-3">
        <Link
          to={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 transition-colors"
        >
          View Case Study
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <div className="flex items-center gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} GitHub repository`}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-all"
              title="GitHub Code"
            >
              <Github className="w-4 h-4" />
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              className="p-2 rounded-lg text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 hover:bg-cyan-500/10 transition-all"
              title="Live Demo"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
