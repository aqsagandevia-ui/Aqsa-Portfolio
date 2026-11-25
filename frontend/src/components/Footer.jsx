import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowUp,
  Code2,
  Mail,
  Heart,
  Shield,
  Sparkles
} from 'lucide-react'
import { Github, Linkedin } from './Icons'

export default function Footer({ settings }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Services', href: '#services' },
    { name: 'Resume', href: '#resume' },
    { name: 'Contact', href: '#contact' },
  ]

  const socialLinks = [
    {
      name: 'GitHub',
      href: settings?.socialLinks?.github || 'https://github.com/aqsagandevia-ui',
      icon: Github,
    },
    {
      name: 'LinkedIn',
      href: settings?.socialLinks?.linkedin || 'https://linkedin.com/in/aqsa-gandevia',
      icon: Linkedin,
    },
    {
      name: 'Email',
      href: `mailto:${settings?.email || 'aqsagandevia@gmail.com'}`,
      icon: Mail,
    },
  ]

  return (
    <footer className="relative bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12 overflow-hidden">
      {/* Ambient gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">

          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm tracking-wider shadow-md shadow-cyan-500/20">
                AG
              </span>
              <span className="text-lg font-bold text-white tracking-tight">
                Aqsa Gandevia
              </span>
            </div>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Final-year Master of Computer Applications (MCA) student at SRIMCA, Uka Tarsadia University. Aspiring Software Developer specializing in full-stack MERN, Flutter, and scalable software systems.
            </p>

            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-200">
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {navLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-slate-400 hover:text-cyan-400 transition-colors py-1"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: Tech Stack & Admin Link
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-200">
              Stack & Administration
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Built with React, Node.js, Express, MongoDB, Tailwind CSS, and Framer Motion.
            </p>

            <div className="pt-2">
              <Link
                to="/admin"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-cyan-400 transition-colors bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800"
              >
                <Shield className="w-3.5 h-3.5 text-cyan-500" />
                <span>Admin Portal</span>
              </Link>
            </div>
          </div> */}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Aqsa Gandevia. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}
