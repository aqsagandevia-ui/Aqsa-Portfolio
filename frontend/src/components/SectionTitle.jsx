import { motion } from 'framer-motion'
import { fadeInUp, viewportOnce } from '../utils/animations'

const SectionTitle = ({ label, title, subtitle, center = false }) => {
  return (
    <motion.div
      className={`mb-12 ${center ? 'text-center' : ''}`}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {label && (
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-cyan-500 mb-3">
          {label}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-slate-400 text-base max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}

export default SectionTitle
