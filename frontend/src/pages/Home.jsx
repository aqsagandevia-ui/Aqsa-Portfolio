import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Education from '../components/Education'
import Services from '../components/Services'
import ResumeCTA from '../components/ResumeCTA'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import { getSettings } from '../services/api'

export default function Home() {
  const [settings, setSettings] = useState(null)

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await getSettings()
        if (res?.data) {
          setSettings(res.data)
        }
      } catch (err) {
        // Fallback default settings
        setSettings({
          name: 'Aqsa Gandevia',
          role: 'Final-year MCA Student | Aspiring Software Developer',
          email: 'aqsagandevia@gmail.com',
          location: 'Valsad, Gujarat, India',
          resumeUrl: '/resume/Aqsa_Gandevia_Resume.pdf',
          socialLinks: {
            github: 'https://github.com/aqsagandevia-ui',
            linkedin: 'https://www.linkedin.com/in/aqsa-gandevia-526374253/',
          }
        })
      }
    }
    fetchSettings()
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-[#09090f] text-slate-100 selection:bg-cyan-500/20 selection:text-white transition-colors duration-300">
      <Navbar settings={settings} />
      <main className="flex-1">
        <Hero settings={settings} />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Services />
        <ResumeCTA settings={settings} />
        <Contact settings={settings} />
      </main>
      <Footer settings={settings} />
    </div>
  )
}
