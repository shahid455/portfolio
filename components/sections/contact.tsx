"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import emailjs from "emailjs-com"
import Confetti from "react-confetti"
import { useWindowSize } from "@uidotdev/usehooks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Send, Instagram } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function Contact() {
  const { toast } = useToast()
  const { width, height } = useWindowSize()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const successSound = typeof window !== "undefined" ? new Audio("/sounds/success.mp3") : null

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsSubmitting(true)

  emailjs
    .send(
      "service_cx9nlb8",
      "template_s5pagh9",
      {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        time: new Date().toLocaleString(),
      },
      "USsdrqsjvaSEeAH4g"
    )
    .then(() => {
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      })
      setFormData({ name: "", email: "", message: "" })
      setShowConfetti(true)
      successSound?.play()  // 🔊 Play the sound
      setTimeout(() => setShowConfetti(false), 5000)
    })
    .catch(() => {
      toast({
        title: "Failed to send",
        description: "Please try again later.",
      })
    })
    .finally(() => setIsSubmitting(false))
}


  return (
    <div className="container mx-auto px-4 relative">
      {showConfetti && <Confetti width={width ?? 300} height={height ?? 500} />}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-center mb-4 gradient-text"
      >
        Contact Me
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center text-muted-foreground mb-12"
      >
        Open to internships and collaborations! Feel free to reach out.
      </motion.p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="h-full gradient-border">
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
              <CardDescription>Fill out the form and I'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required />
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                />
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows={5}
                  required
                />
                <Button type="submit" className="w-full animated-gradient-bg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="flex items-center">Sending...</span>
                  ) : (
                    <span className="flex items-center">
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="h-full gradient-border">
            <CardHeader>
              <CardTitle>Connect With Me</CardTitle>
              <CardDescription>Find me on these platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <motion.a
                  href="mailto:shahidhasan785@gmail.com"
                  className="flex items-center p-3 rounded-lg hover:bg-accent transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <Mail className="h-5 w-5 mr-3 text-purple-500" />
                  <span>shahidhasan785@gmail.com</span>
                </motion.a>
                <motion.a
                  href="https://github.com/shahid455"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 rounded-lg hover:bg-accent transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <Github className="h-5 w-5 mr-3 text-blue-500" />
                  <span>github.com/shahid455</span>
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/shahidulhasan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 rounded-lg hover:bg-accent transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <Linkedin className="h-5 w-5 mr-3 text-cyan-500" />
                  <span>linkedin.com/in/shahidulhasan</span>
                </motion.a>
                <motion.a
                  href="https://www.instagram.com/_shahid.com_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 rounded-lg hover:bg-accent transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <Instagram className="h-5 w-5 mr-3 text-pink-500" />
                  <span>@_shahid.com_</span>
                </motion.a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}