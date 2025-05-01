"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import emailjs from "emailjs-com"
import Confetti from "react-confetti"
import { useWindowSize } from "@uidotdev/usehooks"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Send, Instagram } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Howl } from "howler"

const successSound = new Howl({
  src: ["/sounds/success.wav"], // put this sound in your public/sounds folder
  volume: 0.5,
})


export default function Contact() {
  const { toast } = useToast()
  const { width, height } = useWindowSize()

  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Incomplete Form",
        description: "Please fill out all fields before submitting.",
      })
      return
    }

    setIsSubmitting(true)

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          time: new Date().toLocaleString(),
        },
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
      )
      .then(() => {
        successSound.play() // ✅ Play sound first (or after toast)
        toast({
          title: "Message Sent!",
          description: "Thanks for reaching out. I'll get back to you soon!",
        })
        setFormData({ name: "", email: "", message: "" })
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 5000)
      })      
      .catch(() => {
        toast({
          title: "Error",
          description: "Could not send the message. Try again later.",
        })
      })
      .finally(() => setIsSubmitting(false))
  }

  return (
    <div className="container mx-auto px-4 relative">
      {showConfetti && <Confetti width={width ?? 300} height={height ?? 500} />}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-center mb-4 gradient-text"
      >
        Contact Me
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center text-muted-foreground mb-12"
      >
        Open to internships and collaborations! Feel free to reach out.
      </motion.p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="h-full gradient-border">
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
              <CardDescription>
                Fill out the form and I&apos;ll get back to you soon.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <label htmlFor="name" className="sr-only">Name</label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                />

                <label htmlFor="email" className="sr-only">Email</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                />

                <label htmlFor="message" className="sr-only">Message</label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows={5}
                  required
                />

                <Button
                  type="submit"
                  className="w-full animated-gradient-bg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : (
                    <span className="flex items-center">
                      Send Message <Send className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
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
                  whileHover={{ scale: 1.02 }}
                >
                  <Mail className="h-5 w-5 mr-3 text-purple-500" />
                  shahidhasan785@gmail.com
                </motion.a>

                <motion.a
                  href="https://github.com/shahid455"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 rounded-lg hover:bg-accent transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <Github className="h-5 w-5 mr-3 text-blue-500" />
                  github.com/shahid455
                </motion.a>

                <motion.a
                  href="https://www.linkedin.com/in/shahidulhasan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 rounded-lg hover:bg-accent transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <Linkedin className="h-5 w-5 mr-3 text-cyan-500" />
                  linkedin.com/in/shahidulhasan
                </motion.a>

                <motion.a
                  href="https://www.instagram.com/_shahid.com_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 rounded-lg hover:bg-accent transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <Instagram className="h-5 w-5 mr-3 text-pink-500" />
                  @_shahid.com_
                </motion.a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
