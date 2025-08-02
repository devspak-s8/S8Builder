"use client"

import { useEffect, useRef } from "react"
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"

export function BackgroundAnimation() {
    const canvasRef = useRef < HTMLCanvasElement > (null)

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

        class Particle {
            constructor(canvas, ctx) {
                this.canvas = canvas;
                this.ctx = ctx;

                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;

                const grayValue = Math.floor(Math.random() * 100) + 150;
                const alpha = Math.random() * 0.15 + 0.05;

                this.color = `rgba(${grayValue}, ${grayValue}, ${grayValue}, ${alpha})`;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0) this.x = this.canvas.width;
                if (this.x > this.canvas.width) this.x = 0;
                if (this.y < 0) this.y = this.canvas.height;
                if (this.y > this.canvas.height) this.y = 0;
            }

            draw() {
                if (!this.ctx) return;
                this.ctx.fillStyle = this.color;
                this.ctx.beginPath();
                this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }

        // Somewhere in your setup code (like useEffect if in React):
        // 💥 Resize canvas to full screen (optional)
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // ✅ Create particles
        const particlesArray = [];
        const particleCount = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 20000));

        for (let i = 0; i < particleCount; i++) {
            particlesArray.push(new Particle(canvas, ctx));
        }

        // Animation loop
        const animate = () => {
            if (!ctx) return
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Update and draw particles
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update()
                particlesArray[i].draw()
            }

            // Draw connections
            connectParticles()

            requestAnimationFrame(animate)
        }

        // Connect particles with lines
        const connectParticles = () => {
            if (!ctx) return
            const maxDistance = 120

            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    const dx = particlesArray[a].x - particlesArray[b].x
                    const dy = particlesArray[a].y - particlesArray[b].y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < maxDistance) {
                        const opacity = 1 - distance / maxDistance
                        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.05})`
                        ctx.lineWidth = 0.5
                        ctx.beginPath()
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
                        ctx.stroke()
                    }
                }
            }
        }

        animate()

        return () => {
            window.removeEventListener("resize", setCanvasDimensions)
        }
    }, [])

    return (
        <motion.canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
        />
    )
}
