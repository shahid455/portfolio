"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import dynamic from "next/dynamic"
import { useState, useEffect } from "react"

// Import the skills background with no SSR
const SkillsBackground = dynamic(() => import("../ui/skills-background"), {
  ssr: false,
})

const skillCategories = [
  {
    id: 1,
    title: "Programming Languages",
    skills: [
      { name: "Python", level: 85 },
      { name: "C/C++", level: 85 },
      { name: "Java", level: 80 },
      { name: "HTML/CSS", level: 75 },
    ],
  },
  {
    id: 2,
    title: "Cybersecurity",
    skills: [
      { name: "Network Security", level: 85 },
      { name: "Information Security", level: 80 },
      { name: "Cryptography", level: 75 },
      { name: "Security Analysis", level: 85 },
    ],
  },
  {
    id: 3,
    title: "Algorithms & Data Structures",
    skills: [
      { name: "Divide and Conquer", level: 90 },
      { name: "Dynamic Programming", level: 85 },
      { name: "Greedy algorithm", level: 95 },
      { name: "Complexity Analysis", level: 80 },
    ],
  },
]

export default function Skills() {
  const [isMounted, setIsMounted] = useState(false)
  const [skillValues, setSkillValues] = useState(skillCategories.map((category) => category.skills.map(() => 0)))

  useEffect(() => {
    setIsMounted(true)

    // Animate skill progress bars
    const timer = setTimeout(() => {
      setSkillValues(skillCategories.map((category) => category.skills.map((skill) => skill.level)))
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="container mx-auto px-4 relative">
      {isMounted && <SkillsBackground />}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text"
      >
        Skills
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
          >
            <Card className="h-full gradient-border">
              <CardHeader>
                <CardTitle>{category.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
              {category.skills.map((skill, skillIndex) => (
                <div key={skill.name} className="space-y-2">
                <div className="text-sm font-medium">{skill.name}</div>
                <Progress value={skillValues[categoryIndex][skillIndex]} className="h-2" />
              </div>
              ))}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
