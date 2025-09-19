'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="py-6 px-4 bg-bg-medium/80 backdrop-blur-sm border-t border-white/10">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center"
        >
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold text-ai-blue">AI & I: THE DILEMMA</h3>
            <p className="text-sm text-gray-400">Exploring the boundaries of human and artificial intelligence</p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">About</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-6 text-center text-sm text-gray-500"
        >
          © {new Date().getFullYear()} AI & I: THE DILEMMA. All rights reserved.
        </motion.div>
      </div>
    </footer>
  )
}