"use client"

import { motion } from "framer-motion"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Award, Star } from "lucide-react"
import dynamic from "next/dynamic"
import { useState, useEffect } from "react"

// Import background animation without SSR
const AchievementsBackground = dynamic(
  () => import("../ui/achievements-background"),
  { ssr: false }
)

// Achievements data
const achievements = [
  {
    id: 1,
    title: "RHCSA Certification",
    description:
      "Received RHCSA (Red Hat Certified System Administrator) certification, scoring 285/300 in the EX200 exam.",
    year: "2025",
    icon: Award,
    img: "/certificate/red.jpg",
    link: "https://rhtapps.redhat.com/verify?certId=240-202-267",
  },
  {
    id: 2,
    title: "Smart India Hackathon",
    description:
      "Participated in SIH, contributing to innovative solutions in a competitive national environment.",
    year: "2024",
    icon: Award,
    img: "/certificate/SIH.jpg",
  },
  {
    id: 3,
    title: "Fundamentals of Cryptography Certification",
    description:
      "Completed an intensive course on cryptographic systems covering symmetric/asymmetric encryption, hash functions, digital signatures, and PKI through Infosys Springboard.",
    year: "2025",
    icon: Award,
   img: "/certificate/Crypto.jpg",
  },
  {
    id: 4,
    title: "IDEANOVA 2024",
    description:
      "Actively participated in IDEANOVA, hosted by NSCC SRM and the Department of Networking and Communications, School of Computing. The event was held on 23rd October 2024 at SRMIST, Kattankulathur.",
    year: "2024",
    icon: Award,
    img: "/certificate/ideathon.jpg",
  },
  {
    id: 6,
    title: "DBMS Course - Master the Fundamentals and Advanced Concepts",
    description:
      "Successfully completed a comprehensive DBMS course covering fundamental and advanced concepts through 74 video tutorials, 16 modules, and 16 challenges on the Scaler Topics platform.",
    year: "2025",
    icon: Award,
    img: "/certificate/DBMS.jpg",
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
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Card className="h-full gradient-border overflow-hidden relative">
                {/* Shine animation */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full pointer-events-none"
                  animate={{ translateX: ["100%", "-100%"] }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    delay: index * 0.2,
                    repeat: Infinity,
                    repeatDelay: 5,
                  }}
                />

                <CardHeader className="flex flex-row items-center gap-4 relative z-10">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{achievement.title}</CardTitle>
                    <CardDescription>{achievement.year}</CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="relative z-10">
                  <p className="text-muted-foreground">{achievement.description}</p>

                  {/* Certificate image preview */}
                  {achievement.img && (
                    <div className="mt-4">
                      <img
                        src={achievement.img}
                        alt={achievement.title}
                        className="rounded-lg w-full object-contain max-h-48"
                      />
                    </div>
                  )}

                  {/* External link */}
                  {achievement.link && (
                    <a
                      href={achievement.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline text-sm mt-2 inline-block"
                    >
                      View Credential
                    </a>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
