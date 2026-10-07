import React, { useEffect, useRef } from 'react';

export default function StarfieldBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Responsive star count: reduce on mobile devices
    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 80 : 220;

    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.3 + 0.05,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      color: Math.random() > 0.4 ? '#ffffff' : Math.random() > 0.5 ? '#75AADB' : '#FFD700',
    }));

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint space nebula glow gradients
      const radialGradient1 = ctx.createRadialGradient(
        width * 0.3,
        height * 0.2,
        0,
        width * 0.3,
        height * 0.2,
        width * 0.5
      );
      radialGradient1.addColorStop(0, 'rgba(117, 170, 219, 0.08)');
      radialGradient1.addColorStop(1, 'rgba(10, 10, 26, 0)');

      const radialGradient2 = ctx.createRadialGradient(
        width * 0.8,
        height * 0.7,
        0,
        width * 0.8,
        height * 0.7,
        width * 0.4
      );
      radialGradient2.addColorStop(0, 'rgba(255, 215, 0, 0.04)');
      radialGradient2.addColorStop(1, 'rgba(10, 10, 26, 0)');

      ctx.fillStyle = radialGradient1;
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = radialGradient2;
      ctx.fillRect(0, 0, width, height);

      // Render stars
      stars.forEach((star) => {
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }

        // Twinkle effect
        star.alpha += Math.sin(Date.now() * star.twinkleSpeed) * 0.01;
        const currentAlpha = Math.max(0.1, Math.min(1, star.alpha));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = currentAlpha;
        ctx.shadowBlur = star.size > 1.5 ? 8 : 0;
        ctx.shadowColor = star.color;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'linear-gradient(to bottom, #0a0a1a, #060612)' }}
    />
  );
}
