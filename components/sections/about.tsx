"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Laptop, Shield } from "lucide-react"

export default function About() {
  return (
    <div className="container mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-center mb-6 gradient-text"
      >
        About Me
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-semibold mb-4">Who I Am</h3>
          <p className="text-muted-foreground mb-4">
            I'm Shahidul Hasan, a passionate Cybersecurity Engineer and DAA (Design and Analysis of Algorithms)
            enthusiast. With a strong foundation in computer science and a keen interest in security, I develop
            solutions that are both efficient and secure.
          </p>
          <p className="text-muted-foreground">
            My journey in tech began with a fascination for algorithms and data structures, which evolved into a career
            focused on applying these concepts to solve real-world security challenges. I'm constantly learning and
            exploring new technologies to stay at the forefront of the rapidly evolving tech landscape.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-2xl font-semibold mb-4">What I Do</h3>

          <div className="space-y-4">
            <Card className="gradient-border">
              <CardContent className="p-4 flex items-start">
                <Shield className="h-6 w-6 mr-4 text-purple-500 mt-1" />
                <div>
                  <h4 className="font-medium">Cybersecurity</h4>
                  <p className="text-sm text-muted-foreground">
                    Implementing robust security measures and conducting vulnerability assessments to protect digital
                    assets.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-border">
              <CardContent className="p-4 flex items-start">
                <Code className="h-6 w-6 mr-4 text-blue-500 mt-1" />
                <div>
                  <h4 className="font-medium">Algorithm Design</h4>
                  <p className="text-sm text-muted-foreground">
                    Designing and optimizing algorithms for complex computational problems with a focus on efficiency.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-border">
              <CardContent className="p-4 flex items-start">
                <Laptop className="h-6 w-6 mr-4 text-cyan-500 mt-1" />
                <div>
                  <h4 className="font-medium">Full Stack Development</h4>
                  <p className="text-sm text-muted-foreground">
                    Building end-to-end web applications with modern technologies and best practices.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
