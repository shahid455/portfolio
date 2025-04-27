"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Award, Medal, Star } from "lucide-react"
import dynamic from "next/dynamic"
import { useState, useEffect } from "react"

// Import the achievements background with no SSR
const AchievementsBackground = dynamic(() => import("../ui/achievements-background"), {
  ssr: false,
})

const achievements = [
  {
    id: 1,
    title: "RHCSA Certification",
    description: "Received RHCSA (Red Hat Certified System Administrator) certification, scoring 285/300 in the EX200 exam.",
    year: "2025",
    icon: Award,
  },
  {
    id: 2,
    title: "Cybersecurity Virtutal Intern",
    description: "Completed a cybersecurity internship with a focus on network security and penetration testing.",
    year: "2025",
    icon: Award,
  },
  {
    id: 3,
    title: "Smart India Hackathon",
    description: "Participated in the Smart India Hackathon, contributing to innovative solutions in a competitive environment.",
    year: "2025",
    icon: Award,
  },
  {
    "id": 4,
    "title": "HACKP46LU TCF",
    "description": "National cybersecurity hackathon, where I implemented a sophisticated IDS.",
    "year": "2025",
    "icon": "Star"
  },
  {
    id: 5,
    title: "Intrusion Detection System (IDS) Project",
    description: "Designed and developed an IDS as part of a university project to detect potential threats in real-time.",
    year: "2025",
    icon: Award,
  },
]

export default function Achievements() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className="container mx-auto px-4 relative">
      {isMounted && <AchievementsBackground />}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text"
      >
        My Achievements
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((achievement, index) => {
          const Icon = achievement.icon

          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full gradient-border overflow-hidden">
                {/* Card shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full"
                  animate={{ translateX: ["100%", "-100%"] }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    delay: index * 0.2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 5,
                  }}
                />

                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{achievement.title}</CardTitle>
                    <CardDescription>{achievement.year}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{achievement.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
