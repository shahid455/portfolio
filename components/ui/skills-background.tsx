"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

export default function SkillsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create hexagons
    const hexagons: Hexagon[] = []
    const numberOfHexagons = 20

    class Hexagon {
      x: number
      y: number
      size: number
      rotation: number
      rotationSpeed: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 30 + 10
        this.rotation = Math.random() * Math.PI * 2
        this.rotationSpeed = (Math.random() - 0.5) * 0.01

        // Generate a color from purple to blue gradient
        const hue = Math.random() * 60 + 240 // 240 to 300 (blue to purple)
        this.color = `hsla(${hue}, 70%, 60%, 0.1)`
      }

      update() {
        this.rotation += this.rotationSpeed

        // Slowly move
        this.x += Math.sin(this.rotation) * 0.2
        this.y += Math.cos(this.rotation) * 0.2

        // Wrap around edges
        if (this.x > canvas.width + this.size) this.x = -this.size
        else if (this.x < -this.size) this.x = canvas.width + this.size

        if (this.y > canvas.height + this.size) this.y = -this.size
        else if (this.y < -this.size) this.y = canvas.height + this.size
      }

      draw() {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation)

        ctx.beginPath()
        for (let i = 0; i < 6; i++) {
          const angle = ((Math.PI * 2) / 6) * i
          const x = this.size * Math.cos(angle)
          const y = this.size * Math.sin(angle)

          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.closePath()

        ctx.fillStyle = this.color
        ctx.fill()

        ctx.strokeStyle = this.color.replace("0.1", "0.3")
        ctx.lineWidth = 1
        ctx.stroke()

        ctx.restore()
      }
    }

    const init = () => {
      for (let i = 0; i < numberOfHexagons; i++) {
        hexagons.push(new Hexagon())
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < hexagons.length; i++) {
        hexagons[i].update()
        hexagons[i].draw()
      }

      requestAnimationFrame(animate)
    }

    init()
    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <div className="absolute inset-0 -z-10">
      <canvas ref={canvasRef} className="absolute inset-0 opacity-30" />

      {/* Additional decorative elements */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-purple-500/5 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 8,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl"
        animate={{
          scale: [1, 0.8, 1],
          opacity: [0.3, 0.5, 0.3],
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
