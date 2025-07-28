// components/AgentBackground.tsx
'use client';

import { useEffect, useRef } from 'react';

interface AgentBackgroundProps {
  type: 'dna' | 'molecules' | 'network';
  colors: string[];
}

interface Particle {
  x: number;
  y: number;
  speed: number;
  size: number;
  opacity: number;
  color: string;
  age: number;
  reset(): void;
  update(): void;
  draw(): void;
  drawDNA(): void;
  drawMolecule(): void;
  drawNetwork(): void;
  drawDefault(): void;
}

export default function AgentBackground({ type, colors }: AgentBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Early return if canvas is null

    const ctx = canvas.getContext('2d');
    if (!ctx) return; // Early return if context is null

    let animationId: number;
    let particles: Particle[] = [];

    // Set canvas size
    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    
    // Particle class
    class ParticleImpl implements Particle {
      x: number = 0;
      y: number = 0;
      speed: number = 0;
      size: number = 0;
      opacity: number = 0;
      color: string = '';
      age: number = 0;

      constructor() {
        this.reset();
        if (canvas) {
          this.y = Math.random() * canvas.height;
        }
        this.age = Math.random() * 1000;
      }

      reset() {
        if (!canvas) return;
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.speed = 0.5 + Math.random() * 1.5;
        this.size = 1 + Math.random() * 3;
        this.opacity = 0.3 + Math.random() * 0.4;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.age = 0;
      }

      update() {
        if (!canvas) return;
        this.age++;
        
        switch(type) {
          case 'dna':
            this.y += this.speed;
            this.x += Math.sin(this.age * 0.01) * 0.5;
            break;
          case 'molecules':
            this.y += this.speed * 0.7;
            this.x += Math.cos(this.age * 0.02) * 0.8;
            break;
          case 'network':
            this.y += this.speed * 0.5;
            this.x += Math.sin(this.age * 0.015) * 1.2;
            break;
          default:
            this.y += this.speed;
        }

        if (this.y > canvas.height + 10) {
          this.reset();
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        
        switch(type) {
          case 'dna':
            this.drawDNA();
            break;
          case 'molecules':
            this.drawMolecule();
            break;
          case 'network':
            this.drawNetwork();
            break;
          default:
            this.drawDefault();
        }
        
        ctx.restore();
      }

      drawDNA() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw connecting lines
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.x - this.size * 2, this.y);
        ctx.lineTo(this.x + this.size * 2, this.y);
        ctx.stroke();
      }

      drawMolecule() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw bonds
        const bondLength = this.size * 3;
        for (let i = 0; i < 3; i++) {
          const angle = (i / 3) * Math.PI * 2;
          const endX = this.x + Math.cos(angle) * bondLength;
          const endY = this.y + Math.sin(angle) * bondLength;
          
          ctx.strokeStyle = this.color;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(endX, endY);
          ctx.stroke();
          
          ctx.beginPath();
          ctx.arc(endX, endY, this.size * 0.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      drawNetwork() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Connect to nearby particles
        particles.forEach(other => {
          if (other !== this && ctx) {
            const dx = other.x - this.x;
            const dy = other.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
              ctx.strokeStyle = this.color;
              ctx.lineWidth = (100 - distance) / 100;
              ctx.beginPath();
              ctx.moveTo(this.x, this.y);
              ctx.lineTo(other.x, other.y);
              ctx.stroke();
            }
          }
        });
      }

      drawDefault() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles
    const particleCount = type === 'network' ? 50 : 100;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new ParticleImpl());
    }

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [type, colors]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ 
        background: 'radial-gradient(circle at center, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%)' 
      }}
    />
  );
}
