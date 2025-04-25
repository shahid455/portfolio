"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useTheme } from "next-themes"
import { Float, Text3D } from "@react-three/drei"
import type { Group } from "three"

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Python",
  "C++",
  "Algorithms",
  "Data Structures",
  "Security",
  "Node.js",
]

function SkillsCloud() {
  const { resolvedTheme } = useTheme()
  const isDarkMode = resolvedTheme === "dark"

  const groupRef = useRef<Group>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    groupRef.current.rotation.y = time * 0.05
  })

  return (
    <group ref={groupRef}>
      {skills.map((skill, i) => {
        // Calculate position on a sphere
        const phi = Math.acos(-1 + (2 * i) / skills.length)
        const theta = Math.sqrt(skills.length * Math.PI) * phi
        const radius = 4

        const x = radius * Math.cos(theta) * Math.sin(phi)
        const y = radius * Math.sin(theta) * Math.sin(phi)
        const z = radius * Math.cos(phi)

        const color = isDarkMode
          ? i % 3 === 0
            ? "#60a5fa"
            : i % 3 === 1
              ? "#93c5fd"
              : "#f472b6"
          : i % 3 === 0
            ? "#3b82f6"
            : i % 3 === 1
              ? "#2563eb"
              : "#db2777"

        return (
          <Float
            key={skill}
            position={[x, y, z]}
            speed={1 + Math.random()}
            rotationIntensity={0.2}
            floatIntensity={0.5}
          >
            <Text3D font="/fonts/Inter_Regular.json" size={0.3} height={0.05} curveSegments={12}>
              {skill}
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} transparent opacity={0.8} />
            </Text3D>
          </Float>
        )
      })}
    </group>
  )
}

export default function SkillsBackground() {
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
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }} style={{ pointerEvents: "none" }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <SkillsCloud />
      </Canvas>
    </div>
  )
}
