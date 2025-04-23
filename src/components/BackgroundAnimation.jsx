"use client"

import { useEffect, useRef } from "react"

const BackgroundAnimation = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    let animationFrameId

    // canvas dimensions to fill the window
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // set initial canvas dimensions
    setCanvasDimensions()
    // initialize particles
    window.addEventListener("resize", setCanvasDimensions)

    const particlesArray = []
    const numberOfParticles = 100

    // Particle class
    // Each particle has a position, size, speed, and color
    // The update method updates the position of the particle
    // The draw method draws the particle on the canvas
    // The connect method connects particles with lines if they are close enough
    // The init method initializes the particles
    // The animate method clears the canvas and updates and draws each particle
    // It also connects the particles with lines
    // The animation loop is created using requestAnimationFrame
    // The animation loop is cancelled when the component unmounts
    // The particles are drawn with a gradient color
    // The particles move around the canvas and connect with each other
    // The particles are drawn with a gradient color
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 5 + 1
        this.speedX = Math.random() * 1 - 0.5
        this.speedY = Math.random() * 1 - 0.5
        this.color = `rgba(65, 105, 225, ${Math.random() * 0.3})`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const init = () => {
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle())
      }
    }

    // Connect particles with lines if they are close enough
    // The connect method connects particles with lines if they are close enough
    // The distance between the particles is calculated using the Pythagorean theorem
    const connect = () => {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x
          const dy = particlesArray[a].y - particlesArray[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.strokeStyle = `rgba(65, 105, 225, ${0.15 - distance / 1000})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
            ctx.stroke()
          }
        }
      }
    }

    init()

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesArray.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      connect()

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  // Style for the canvas to cover the entire screen  
  // and have a fixed position behind other elements
  // The background is a gradient

  const canvasStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -10,
    background: 'linear-gradient(to bottom, #eff6ff, #f5f5f5)', 
  }

  return <canvas ref={canvasRef} style={canvasStyle} />
}

export default BackgroundAnimation
