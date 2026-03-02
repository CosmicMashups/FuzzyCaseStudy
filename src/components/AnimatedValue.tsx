import { motion } from 'framer-motion'

interface AnimatedValueProps {
  value: number
  decimals?: number
  suffix?: string
  className?: string
}

export function AnimatedValue({ value, decimals = 1, suffix = '', className = '' }: AnimatedValueProps) {
  return (
    <motion.span
      className={className}
      initial={false}
      animate={{ opacity: [0.85, 1] }}
      key={`${value}-${decimals}`}
      transition={{ duration: 0.25 }}
    >
      {value.toFixed(decimals)}{suffix}
    </motion.span>
  )
}

/** Use when you need smooth numeric transition (display only). */
export function AnimatedValueKeyed({
  value,
  decimals = 1,
  suffix = '',
  className = '',
}: AnimatedValueProps) {
  return (
    <motion.span
      className={className}
      key={value}
      initial={{ opacity: 0.7 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {value.toFixed(decimals)}{suffix}
    </motion.span>
  )
}
