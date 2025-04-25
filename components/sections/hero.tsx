"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { TypeAnimation } from "react-type-animation"
import dynamic from "next/dynamic"

// Import the background component with no SSR
const AnimatedBackground = dynamic(() => import("../ui/animated-background"), {
  ssr: false,
})

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const scrollToAbout = () => {
    const element = document.getElementById("about")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-center overflow-hidden">
      {/* Animated background */}
      {isMounted && <AnimatedBackground />}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
            <Image
              src="/shahidHasan.jpg"
              alt="Shahidul Hasan"
              width={200}
              height={200}
              className="object-cover"
              priority
            />

            {/* Animated glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/30 to-purple-500/0"
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 2,
                ease: "easeInOut",
                repeatDelay: 3,
              }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight gradient-text mb-4">Shahidul Hasan</h1>

          {isMounted && (
            <div className="h-12 md:h-16 flex items-center justify-center">
              <TypeAnimation
                sequence={["Cybersecurity Engineer", 1000, "DAA Enthusiast", 1000, "Full Stack Developer", 1000]}
                wrapper="span"
                speed={50}
                repeat={Number.POSITIVE_INFINITY}
                className="text-xl md:text-2xl text-muted-foreground"
              />
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-12"
        >
          <Button onClick={scrollToAbout} className="rounded-full px-8 py-6 text-lg group animated-gradient-bg">
            Explore My Work
            <ArrowDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
