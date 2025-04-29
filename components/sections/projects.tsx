"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"
import Image from "next/image"

const projects = [
  {
    id: 1,
    title: "Portfolio Website",
    description:
      "A personal portfolio website to showcase my projects, skills, certifications, and contact details, built using React and TypeScript.",
    tags: ["React", "TypeScript", "Portfolio", "Web Development"],
    github: "https://github.com/shahid455/portfolio.git",
    demo: "https://portfolio-nine-ebon-38.vercel.app/",
    image: "/portfolio.jpg",
  }, 
  {
    id: 2,
    title: "AI Game Zone",
    description:
      "An AI-powered game generator where users can create games like platformers, shooters, and puzzles by simply giving a command, using OpenAI's API.",
    tags: ["Python", "OpenAI API", "AI", "Game Development"],
    github: "https://github.com/shahid455/AI-Game-Zone.git",
    demo: "https://ai-game-zone.vercel.app/",
    image: "/gamezone.png",
  },
  {
    id: 3,
    title: "Algorithm Visualizer (DAA Project)",
    description:
      "A tool for visualizing various algorithms such as sorting and pathfinding, built to demonstrate data structures and algorithms concepts.",
    tags: ["React", "Canvas", "Algorithms", "DAA"],
    github: "https://github.com/username/algorithm-visualizer",
    demo: "https://algorithm-visualizer.demo",
    image: "/algorithm.png",
  },
  {
    id: 4,
    title: "Instant Recipe Finder App",
    description:
      "Developed a web app that suggests recipes based on available ingredients.",
    tags: ["Receipes", "JAVA"],
    github: "https://github.com/username/Instant-receipe-finder",
    demo: "https://Instant-receipe-finder.demo",
    image: "/recipe.jpg",
  },
  {
    id: 5,
    title: "VisionGuard",
    description:
      "An AI-powered real-time crime detection system using Flask and SQLite to enhance surveillance security by detecting suspicious activities and potential threats in real-time.",
    tags: ["AI", "Flask", "SQLite", "Crime Detection", "Security"],
    github: "https://github.com/username/visionguard",
    demo: "https://visionguard.demo",
    image: "/vision.jpeg",
  }
]

export default function Projects() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="container mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text"
      >
        Projects
      </motion.h2>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {projects.map((project) => (
          <motion.div key={project.id} variants={item}>
            <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow gradient-border">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={500}
                  height={300}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{project.description}</p>
              </CardContent>

              <CardFooter className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </a>
                </Button>
                <Button variant="default" size="sm" className="flex-1" asChild>
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Demo
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
