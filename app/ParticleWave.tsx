'use client'

import React, { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  z: number
  color: string
}

const COLORS = ['#4285F4', '#EA4335', '#FBBC05', '#34A853', '#A855F7', '#EC4899', '#F97316', '#06B6D4']
const NUM_PARTICLES = 2500 // Maximize count for density
const SPEED = 2.5 // Base outward speed

export default function ParticleWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []

    // Track mouse for interactivity (bending the tunnel)
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }

    const initParticles = () => {
      particles = []
      for (let i = 0; i < NUM_PARTICLES; i++) {
        particles.push({
          x: (Math.random() - 0.5) * 4000,
          y: (Math.random() - 0.5) * 4000,
          z: Math.random() * 2000,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        })
      }
    }

    const resize = () => {
      const rect = container.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`

      initParticles()
      
      // Default focal point to the center-top (aligned with headline)
      mouse.x = rect.width / 2
      mouse.y = rect.height * 0.25
      mouse.targetX = rect.width / 2
      mouse.targetY = rect.height * 0.25
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.targetX = e.clientX - rect.left
      mouse.targetY = e.clientY - rect.top
    }

    const handleMouseLeave = () => {
      // Return to headline area when mouse leaves
      mouse.targetX = canvas.width / 2 / (window.devicePixelRatio || 1)
      mouse.targetY = (canvas.height / (window.devicePixelRatio || 1)) * 0.25
    }

    const updateAndDraw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Smoothly interpolate mouse position for a fluid, heavy, expensive camera shift
      mouse.x += (mouse.targetX - mouse.x) * 0.015
      mouse.y += (mouse.targetY - mouse.y) * 0.015

      const centerX = mouse.x
      const centerY = mouse.y

      for (const p of particles) {
        // Move particle towards camera
        p.z -= SPEED

        // If particle passes camera, push it back to the end of the tunnel
        if (p.z <= 0) {
          p.z = 2000
          p.x = (Math.random() - 0.5) * 4000
          p.y = (Math.random() - 0.5) * 4000
        }

        // 3D Projection
        const fov = 300
        const projection = fov / Math.max(1, p.z) // prevent division by zero

        const x = p.x * projection + centerX
        const y = p.y * projection + centerY

        // Previous position to draw sparks/lines (length multiplied by 1.75x)
        const prevProjection = fov / Math.max(1, p.z + SPEED * 10.5)
        const prevX = p.x * prevProjection + centerX
        const prevY = p.y * prevProjection + centerY

        // Only draw if within bounds
        if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
          ctx.beginPath()
          ctx.moveTo(prevX, prevY)
          ctx.lineTo(x, y)
          
          // Color and opacity based on depth (z)
          // Particles fade in from the back to create a smooth tunnel entrance
          let alpha = Math.max(0, 1 - (p.z / 2000))
          
          // Smooth cutoff as they zoom past the camera (if Z < 400, start fading out to 0 quickly)
          if (p.z < 400) {
             alpha *= (p.z / 400)
          }

          ctx.globalAlpha = alpha
          
          ctx.strokeStyle = p.color
          // Closer objects are thicker
          ctx.lineWidth = Math.max(1, 4 * projection)
          ctx.lineCap = 'round'
          ctx.stroke()
        }
      }
      
      ctx.globalAlpha = 1.0
      animationFrameId = requestAnimationFrame(updateAndDraw)
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    resize()
    updateAndDraw()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      // Removed mix-blend-multiply and set opacity-100 to make the colors intensely vibrant
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-100"
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
