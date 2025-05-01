"use client"
import React, { useEffect, useRef } from 'react';
import './PopUpExperience.css';

const PopUpExperience = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 10; // Number of particles
    const colors = ['#dabda5', '#ece6bd', '#f4e1d2']; // Skin-tone colors

    // Set canvas size to match container
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1; // Smaller particles: 1–4px
        this.speedX = Math.random() * 2 - 1; // Random speed (-1 to 1)
        this.speedY = Math.random() * 2 - 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.5 + 0.3; // 0.3 to 0.8
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

        // Randomly adjust opacity for fade effect
        this.opacity += Math.random() * 0.02 - 0.01;
        if (this.opacity < 0.3) this.opacity = 0.3;
        if (this.opacity > 0.8) this.opacity = 0.8;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `${this.color}${Math.floor(this.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="pop-up-experience">
      <canvas ref={canvasRef} className="pop-up-experience__canvas" />
      <h1 className="pop-up-experience__title">
        Pop Up <br /> Experience
      </h1>
      <div className="popUp-content">
        <div className="pop-up-experience__bubble pop-up-experience__bubble--pop1">
          Pop 1<br />Logo
        </div>
        <div className="pop-up-experience__bubble pop-up-experience__bubble--pop2">
          Pop 2<br />Logo
        </div>
        <div className="pop-up-experience__bubble pop-up-experience__bubble--coming-soon">
          Coming Soon
        </div>
      </div>
      <button className="pop-up-experience__info">More Info</button>
    </div>
  );
};

export default PopUpExperience;