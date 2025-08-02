"use client"

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"

export function MorphingBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Large morphing shapes */}
      <motion.div
        className="absolute w-96 h-96 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{
          x: [100, 300, 100],
          y: [100, 200, 100],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        initial={{ x: 100, y: 100 }}
      />

      <motion.div
        className="absolute w-80 h-80 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(156,163,175,0.03) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          x: [300, 100, 300],
          y: [200, 400, 200],
          scale: [1.2, 0.8, 1.2],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 5,
        }}
        initial={{ x: 300, y: 200 }}
      />

      <motion.div
        className="absolute w-64 h-64 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.01) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
        animate={{
          x: [500, 200, 500],
          y: [300, 100, 300],
          scale: [0.8, 1.3, 0.8],
        }}
        transition={{
          duration: 30,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 10,
        }}
        initial={{ x: 500, y: 300 }}
      />
    </div>
  )
}
