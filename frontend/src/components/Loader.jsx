import { motion } from 'framer-motion'

const Loader = ({ size = 'md', text = '' }) => {
  const sizes = { sm: 'h-4 w-4', md: 'h-8 w-8', lg: 'h-12 w-12' }

  return (
    <div className="flex flex-col items-center justify-center gap-3" role="status" aria-label="Loading">
      <motion.div
        className={`${sizes[size]} rounded-full border-2 border-white/10 border-t-cyan-500`}
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
      />
      {text && <p className="text-slate-500 text-sm">{text}</p>}
    </div>
  )
}

export default Loader
