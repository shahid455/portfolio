"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useTheme } from "next-themes"
import { MathUtils } from "three"

function Particles({ count = 100 }) {
  const { resolvedTheme } = useTheme()
  const isDarkMode = resolvedTheme === "dark"

  const primaryColor = isDarkMode ? "#60a5fa" : "#3b82f6"
  const secondaryColor = isDarkMode ? "#93c5fd" : "#2563eb"
  const accentColor = isDarkMode ? "#f472b6" : "#db2777"

  const colors = [primaryColor, secondaryColor, accentColor]

  const mesh = useRef()
  const particles = useRef([])

  if (particles.current.length === 0) {
    for (let i = 0; i < count; i++) {
      particles.current.push({
        position: [MathUtils.randFloatSpread(10), MathUtils.randFloatSpread(10), MathUtils.randFloatSpread(10)],
        size: MathUtils.randFloat(0.05, 0.15),
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: MathUtils.randFloat(0.01, 0.05),
      })
    }
  }

  useFrame(() => {
    const positions = mesh.current.geometry.attributes.position.array
    const sizes = mesh.current.geometry.attributes.size.array

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3 + 1] -= particles.current[i].speed

      // Reset position when particle goes below the view
      if (positions[i3 + 1] < -5) {
        positions[i3] = MathUtils.randFloatSpread(10)
        positions[i3 + 1] = 5
        positions[i3 + 2] = MathUtils.randFloatSpread(10)
      }
    }

    mesh.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={new Float32Array(count * 3)}
          itemSize={3}
          usage={MathUtils.randFloat(0, 1)}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={Float32Array.from(particles.current.map((p) => p.size))}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={Float32Array.from(
            particles.current.flatMap((p) => {
              const color = p.color.replace("#", "")
              const r = Number.parseInt(color.substring(0, 2), 16) / 255
              const g = Number.parseInt(color.substring(2, 4), 16) / 255
              const b = Number.parseInt(color.substring(4, 6), 16) / 255
              return [r, g, b]
            }),
          )}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} vertexColors transparent opacity={0.6} />
    </points>
  )
}

export default function ProjectsBackground() {
  // Only render on client side
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Delay mounting to ensure browser environment is fully ready
    const timer = setTimeout(() => {
      setIsMounted(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="absolute inset-0 -z-10 opacity-30">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} style={{ pointerEvents: "none" }}>
        <Particles count={200} />
      </Canvas>
    </div>
  )
}
