'use client'

import { motion } from 'framer-motion'
import { useSound } from '@/components/hooks/useSound'

const Button = ({ 
  children, 
  className = '', 
  variant = 'primary', 
  onClick, 
  disabled = false,
  ...props 
}) => {
  const { playSound } = useSound()
  
  const baseClasses = 'font-medium py-2 px-4 rounded-lg transition-all duration-300'
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-ai-blue to-ai-purple text-white hover:shadow-lg hover:shadow-ai-blue/30',
    secondary: 'bg-bg-light text-white border border-white/20 hover:bg-bg-dark',
    success: 'bg-gradient-to-r from-ai-green to-ai-cyan text-white hover:shadow-lg hover:shadow-ai-green/30',
    danger: 'bg-gradient-to-r from-human-red to-human-orange text-white hover:shadow-lg hover:shadow-human-red/30',
  }
  
  const handleClick = (e) => {
    if (!disabled) {
      playSound('click')
      if (onClick) onClick(e)
    }
  }
  
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`${baseClasses} ${variantClasses[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export default Button