"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"

// Import Particles dynamically to avoid SSR issues
export function ParticlesBackground() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [ParticlesComponent, setParticlesComponent] = useState(null)

  useEffect(() => {
    // Only import and initialize on client side
    const initParticles = async () => {
      try {
        const { default: Particles } = await import("react-particles")
        const { loadSlim } = await import("tsparticles-slim")

        const ParticlesWithInit = (props) => {
          const init = async (engine) => {
            await loadSlim(engine)
          }

          const loaded = async (container) => {
            await container?.refresh()
          }

          return <Particles init={init} loaded={loaded} {...props} />
        }

        setParticlesComponent(() => ParticlesWithInit)
        setMounted(true)
      } catch (error) {
        console.error("Failed to load particles:", error)
      }
    }

    initParticles()
  }, [])

  if (!mounted || !ParticlesComponent) return null

  return (
    <ParticlesComponent
      className="fixed inset-0 -z-10"
      id="tsparticles"
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 100,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: theme === "dark" ? "#ffffff" : "#3b82f6",
          },
          links: {
            color: theme === "dark" ? "#ffffff" : "#3b82f6",
            distance: 150,
            enable: true,
            opacity: 0.2,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.2,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      }}
    />
  )
}
