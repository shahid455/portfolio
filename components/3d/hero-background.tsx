"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Float, Environment, Text3D } from "@react-three/drei"
import { Vector3, MathUtils, type Mesh, type Group } from "three"
import { useTheme } from "next-themes"

function FloatingCube({ position, size, color, speed = 1, rotationFactor = 0.01 }) {
  const mesh = useRef<Mesh>(null!)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    mesh.current.position.y = position[1] + Math.sin(time * speed) * 0.5
    mesh.current.rotation.x += rotationFactor
    mesh.current.rotation.y += rotationFactor * 0.5
  })

  return (
    <mesh
      ref={mesh}
      position={position}
      scale={hovered ? 1.1 : 1}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} transparent opacity={0.7} metalness={0.5} roughness={0.2} />
    </mesh>
  )
}

function FloatingSphere({ position, radius, color, speed = 1, floatIntensity = 1 }) {
  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={floatIntensity} position={position}>
      <mesh>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial color={color} transparent opacity={0.7} metalness={0.3} roughness={0.4} />
      </mesh>
    </Float>
  )
}

function FloatingText({ position, text, color }) {
  const groupRef = useRef<Group>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.2
  })

  return (
    <group ref={groupRef} position={position}>
      <Text3D font="/fonts/Inter_Regular.json" size={0.5} height={0.1} curveSegments={12}>
        {text}
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.8} />
      </Text3D>
    </group>
  )
}

function MouseTracker({ color }) {
  const { camera } = useThree()
  const [mousePosition, setMousePosition] = useState(new Vector3(0, 0, 0))
  const sphere = useRef<Mesh>(null!)
  const [isListening, setIsListening] = useState(false)

  useEffect(() => {
    // Safety check for browser environment
    if (typeof window === "undefined") return

    // Delay adding the event listener to ensure DOM is ready
    const timer = setTimeout(() => {
      const handleMouseMove = (event) => {
        // Convert mouse position to normalized device coordinates (-1 to +1)
        const x = (event.clientX / window.innerWidth) * 2 - 1
        const y = -(event.clientY / window.innerHeight) * 2 + 1

        // Project mouse position into 3D space
        setMousePosition(new Vector3(x * 5, y * 3, -3))
      }

      window.addEventListener("mousemove", handleMouseMove)
      setIsListening(true)

      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
        setIsListening(false)
      }
    }, 500) // Delay to ensure DOM is ready

    return () => clearTimeout(timer)
  }, [])

  useFrame(() => {
    if (!sphere.current) return

    // Smoothly move the sphere towards the mouse position
    sphere.current.position.x = MathUtils.lerp(sphere.current.position.x, mousePosition.x, 0.05)
    sphere.current.position.y = MathUtils.lerp(sphere.current.position.y, mousePosition.y, 0.05)
  })

  return (
    <mesh ref={sphere} position={[0, 0, -3]}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial color={color} transparent opacity={0.6} emissive={color} emissiveIntensity={0.5} />
    </mesh>
  )
}

function Scene() {
  const { resolvedTheme } = useTheme()
  const isDarkMode = resolvedTheme === "dark"

  // Updated colors to match the new purple theme
  const primaryColor = isDarkMode ? "#9333ea" : "#8b5cf6"
  const secondaryColor = isDarkMode ? "#a855f7" : "#a78bfa"
  const accentColor = isDarkMode ? "#c084fc" : "#d8b4fe"

  return (
    <>
      <color attach="background" args={["transparent"]} />
      <fog attach="fog" args={[isDarkMode ? "#111827" : "#f8fafc", 5, 20]} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      <Environment preset="sunset" />

      {/* Geometric shapes */}
      <FloatingCube position={[-3, 0, -2]} size={[0.6, 0.6, 0.6]} color={primaryColor} speed={0.8} />
      <FloatingCube position={[3, 1, -3]} size={[0.5, 0.5, 0.5]} color={secondaryColor} speed={1.2} />
      <FloatingCube position={[-2, -1.5, -4]} size={[0.4, 0.4, 0.4]} color={accentColor} speed={1} />

      <FloatingSphere position={[2, -1, -3]} radius={0.5} color={primaryColor} speed={1.5} />
      <FloatingSphere position={[-3, 2, -5]} radius={0.7} color={secondaryColor} speed={0.8} />

      {/* Tech-related 3D elements */}
      <FloatingText position={[-4, 0, -5]} text="React" color={primaryColor} />
      <FloatingText position={[4, -1, -6]} text="Next.js" color={secondaryColor} />

      {/* Mouse tracker */}
      <MouseTracker color={accentColor} />
    </>
  )
}

export default function HeroBackground() {
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
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} style={{ pointerEvents: "none" }} dpr={[1, 2]}>
        <Scene />
      </Canvas>
    </div>
  )
}
