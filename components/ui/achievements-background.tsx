"use client"

import { motion } from "framer-motion"

export default function AchievementsBackground() {
  // Pre-generate fixed positions for particles to avoid hydration mismatch
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    top: `${Math.floor(i * 5)}%`,
    left: `${Math.floor(i * 5)}%`,
    delay: i * 0.2,
    duration: 2 + Math.random() * 3,
  }))

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/5 via-background/50 to-background" />

      {/* Static particles with client-side animations */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 rounded-full bg-primary/30"
            style={{
              top: particle.top,
              left: particle.left,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-purple-500/5 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 8,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl"
        animate={{
          scale: [1, 0.8, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 10,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}
