import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { Github, Linkedin } from './Icons'
import { useTheme } from '../context/ThemeContext'
import Button from './Button'

const navLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/#about' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Education', href: '/#education' },
  { label: 'Resume', href: '/#resume' },
  { label: 'Contact', href: '/#contact' },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  // Detect scroll to apply backdrop blur
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Active section detection via IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [location.pathname])

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false) }, [location])

  const handleNavClick = (href) => {
    setMobileOpen(false)
    if (href.startsWith('/#')) {
      const id = href.replace('/#', '')
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const isActive = (href) => {
    const id = href.replace('/#', '')
    return activeSection === id
  }

  const isDark = theme === 'dark'

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? isDark
            ? 'bg-[#09090f]/90 backdrop-blur-md border-b border-white/[0.06]'
            : 'bg-white/90 backdrop-blur-md border-b border-black/[0.06]'
          : 'bg-transparent'
          }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group focus-visible:outline-none"
            aria-label="Aqsa Gandevia — Home"
          >
            <div className="w-9 h-9 rounded-lg bg-cyan-500 flex items-center justify-center">
              <span className="text-gray-950 font-bold text-sm tracking-tight">AG</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                  className={`relative px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${isActive(link.href)
                    ? 'text-cyan-400'
                    : isDark
                      ? 'text-slate-400 hover:text-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                    }`}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.span
                      className="absolute -bottom-0.5 left-3 right-3 h-0.5 bg-cyan-500 rounded-full"
                      layoutId="nav-indicator"
                      transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <motion.button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${isDark
                ? 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                : 'text-slate-600 hover:text-slate-900 hover:bg-black/5'
                }`}
              whileTap={{ scale: 0.9 }}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </motion.button>

            {/* Social icons — desktop */}
            <a
              href="https://github.com/aqsagandevia-ui"
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden md:flex p-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${isDark
                ? 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                : 'text-slate-600 hover:text-slate-900 hover:bg-black/5'
                }`}
              aria-label="GitHub profile"
            >
              <Github size={17} />
            </a>
            <a
              href="https://www.linkedin.com/in/aqsa-gandevia-526374253/"
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden md:flex p-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${isDark
                ? 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                : 'text-slate-600 hover:text-slate-900 hover:bg-black/5'
                }`}
              aria-label="LinkedIn profile"
            >
              <Linkedin size={17} />
            </a>

            {/* Let's Talk button */}
            <a
              href="/#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick('/#contact') }}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-cyan-500 text-gray-950 hover:bg-cyan-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            >
              Let's Talk
            </a>

            {/* Mobile hamburger */}
            <motion.button
              onClick={() => setMobileOpen((v) => !v)}
              className={`md:hidden p-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${isDark
                ? 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                : 'text-slate-600 hover:text-slate-900 hover:bg-black/5'
                }`}
              whileTap={{ scale: 0.9 }}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            className={`fixed inset-0 z-40 ${isDark ? 'bg-[#09090f]/98' : 'bg-white/98'
              } flex flex-col pt-20 px-6 pb-8`}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
          >
            <nav aria-label="Mobile navigation">
              <ul className="flex flex-col gap-1" role="list">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                      className={`flex items-center py-3 px-4 rounded-xl text-lg font-medium transition-colors ${isActive(link.href)
                        ? 'text-cyan-400 bg-cyan-500/10'
                        : isDark
                          ? 'text-slate-300 hover:text-slate-100 hover:bg-white/5'
                          : 'text-slate-700 hover:text-slate-900 hover:bg-black/5'
                        }`}
                      aria-current={isActive(link.href) ? 'page' : undefined}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Mobile social + CTA */}
            <div className="mt-auto flex items-center gap-4 pt-8 border-t border-white/10">
              <a
                href="https://github.com/aqsagandevia-ui"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-slate-200 transition-colors"
                aria-label="GitHub"
              >
                <Github size={22} />
              </a>
              <a
                href="https://www.linkedin.com/in/aqsa-gandevia-526374253/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-slate-200 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={22} />
              </a>
              <a
                href="/#contact"
                onClick={(e) => { e.preventDefault(); handleNavClick('/#contact') }}
                className="ml-auto px-5 py-2.5 text-sm font-medium rounded-lg bg-cyan-500 text-gray-950 hover:bg-cyan-400 transition-colors"
              >
                Let's Talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
