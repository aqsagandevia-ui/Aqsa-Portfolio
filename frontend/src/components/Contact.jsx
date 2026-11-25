import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  MapPin,
  Send,
  CheckCircle,
  Code2,
  Sparkles,
  MessageSquare,
  AlertCircle
} from 'lucide-react'
import { Github, Linkedin } from './Icons'
import toast from 'react-hot-toast'
import SectionTitle from './SectionTitle'
import Button from './Button'
import { submitContact } from '../services/api'
import { fadeInUp, staggerContainer, viewportOnce } from '../utils/animations'

export default function Contact({ settings }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const errs = {}
    if (!formData.name.trim()) errs.name = 'Please enter your name.'
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.'
    }
    if (!formData.subject.trim()) errs.subject = 'Please enter a subject.'
    if (!formData.message.trim()) {
      errs.message = 'Please enter your message.'
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message should be at least 10 characters long.'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    try {
      await submitContact(formData)
      toast.success('Message sent successfully! Thank you for reaching out.', {
        duration: 5000,
        style: {
          background: '#0f172a',
          color: '#f8fafc',
          border: '1px solid rgba(6, 182, 212, 0.3)',
        },
      })
      setSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to send message. Please try again or reach out directly via email.'
      toast.error(msg, {
        duration: 5000,
        style: {
          background: '#0f172a',
          color: '#f8fafc',
          border: '1px solid rgba(239, 68, 68, 0.3)',
        },
      })
    } finally {
      setLoading(false)
    }
  }

  const contactEmail = settings?.email || 'aqsagandevia@gmail.com'
  const contactLocation = settings?.location || 'Valsad, Gujarat, India'

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          label="Get In Touch"
          title="Let's Discuss Opportunities & Projects"
          subtitle="Feel free to reach out regarding placement drives, software developer opportunities, freelance projects, or technical discussions."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 items-start">

          {/* Left Column: Contact Information */}
          <motion.div
            className="lg:col-span-5 space-y-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {/* Status Card */}
            <motion.div
              variants={fadeInUp}
              className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-indigo-500/5 to-transparent border border-cyan-500/20"
            >
              <div className="flex items-center gap-2.5 text-cyan-600 dark:text-cyan-400 font-semibold text-xs uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Placement Availability</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Actively Seeking Full-Time Opportunities
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                I am graduating in 2025 and ready to take on software development challenges. I respond promptly to inquiries from recruiters and engineering managers.
              </p>
            </motion.div>

            {/* Direct Details Card */}
            <motion.div
              variants={fadeInUp}
              className="p-6 sm:p-8 rounded-2xl bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 shadow-sm space-y-5"
            >
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</p>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="text-sm sm:text-base font-medium text-slate-900 dark:text-white hover:text-cyan-500 transition-colors break-all"
                  >
                    {contactEmail}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Location</p>
                  <p className="text-sm sm:text-base font-medium text-slate-900 dark:text-white">
                    {contactLocation}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={fadeInUp}
              className="p-6 sm:p-8 rounded-2xl bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 shadow-sm"
            >
              <p className="text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 mb-4">
                Developer Profiles & Socials:
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href={settings?.socialLinks?.github || 'https://github.com/aqsagandevia-ui'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-cyan-500/10 text-slate-700 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 border border-slate-200 dark:border-white/5 transition-all text-xs sm:text-sm font-medium"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub (@aqsagandevia-ui)</span>
                </a>

                <a
                  href={settings?.socialLinks?.linkedin || 'https://www.linkedin.com/in/aqsa-gandevia-526374253/'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-cyan-500/10 text-slate-700 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 border border-slate-200 dark:border-white/5 transition-all text-xs sm:text-sm font-medium"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn (Aqsa Gandevia)</span>
                </a>

              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            className="lg:col-span-7"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <div className="p-6 sm:p-10 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 shadow-xl backdrop-blur-md">
              <div className="flex items-center gap-2 text-cyan-500 mb-2">
                <MessageSquare className="w-5 h-5" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Send a Direct Message
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-8">
                Fill in the details below and your message will be forwarded directly to my inbox.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe / Recruiter Name"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border ${errors.name ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-white/10 focus:border-cyan-500'
                        } text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none transition-all`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. recruiter@company.com"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border ${errors.email ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-white/10 focus:border-cyan-500'
                        } text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none transition-all`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Subject <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Software Developer Opportunity / Interview Invitation"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border ${errors.subject ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-white/10 focus:border-cyan-500'
                      } text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none transition-all`}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message, role details, or inquiry here..."
                    className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border ${errors.message ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-white/10 focus:border-cyan-500'
                      } text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none transition-all resize-y`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  disabled={loading}
                  variant="primary"
                  size="lg"
                  className="w-full shadow-lg shadow-cyan-500/20"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending Message...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
