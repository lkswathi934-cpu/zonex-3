import { useEffect, useRef } from 'react';

interface RobotState {
  targetRotX: number;
  targetRotY: number;
  rotX: number;
  rotY: number;
  floatPhase: number;
  blinkTimer: number;
  blinkProgress: number;
  isBlinking: boolean;
  glowPulse: number;
}

export function AIRobot() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const stateRef = useRef<RobotState>({
    targetRotX: 0,
    targetRotY: 0,
    rotX: 0,
    rotY: 0,
    floatPhase: 0,
    blinkTimer: 3000,
    blinkProgress: 0,
    isBlinking: false,
    glowPulse: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let lastTime = performance.now();
    let isTouching = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (window.innerWidth / 2);
      const dy = (e.clientY - cy) / (window.innerHeight / 2);
      mouseRef.current.x = Math.max(-1.5, Math.min(1.5, dx));
      mouseRef.current.y = Math.max(-1.5, Math.min(1.5, dy));
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      isTouching = true;
      const rect = canvas.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.touches[0].clientX - cx) / (window.innerWidth / 2);
      const dy = (e.touches[0].clientY - cy) / (window.innerHeight / 2);
      mouseRef.current.x = Math.max(-1.5, Math.min(1.5, dx));
      mouseRef.current.y = Math.max(-1.5, Math.min(1.5, dy));
    };

    const handleTouchEnd = () => {
      isTouching = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    const draw = (now: number) => {
      const dt = Math.min(now - lastTime, 50);
      lastTime = now;
      const s = stateRef.current;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      // Auto-float on mobile when no touch
      if (window.innerWidth < 768 && !isTouching) {
        s.targetRotY = Math.sin(now * 0.0006) * 0.4;
        s.targetRotX = Math.cos(now * 0.0004) * 0.2;
      } else {
        s.targetRotY = mouseRef.current.x * 0.5;
        s.targetRotX = mouseRef.current.y * 0.35;
      }

      // Smooth interpolation
      s.rotX += (s.targetRotX - s.rotX) * 0.06;
      s.rotY += (s.targetRotY - s.rotY) * 0.06;
      s.floatPhase += dt * 0.0012;
      s.glowPulse += dt * 0.002;

      // Blink logic
      s.blinkTimer -= dt;
      if (s.blinkTimer <= 0 && !s.isBlinking) {
        s.isBlinking = true;
        s.blinkProgress = 0;
      }
      if (s.isBlinking) {
        s.blinkProgress += dt * 0.008;
        if (s.blinkProgress >= 1) {
          s.isBlinking = false;
          s.blinkTimer = 2500 + Math.random() * 3500;
        }
      }

      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const floatY = Math.sin(s.floatPhase) * 12;
      const cy = h / 2 + floatY;
      const size = Math.min(w, h) * 0.32;
      const rotY = s.rotY;
      const rotX = s.rotX;

      // Compute pseudo-3D perspective offsets
      const perspective = (val: number) => val * 0.65;
      const skewX = rotY * 0.12;
      const scaleY = 1 - Math.abs(rotX) * 0.06;

      // ---- Outer glow aura ----
      const glowR = size * 1.8;
      const glowGrad = ctx.createRadialGradient(cx, cy, size * 0.5, cx, cy, glowR);
      const pulse = 0.3 + Math.sin(s.glowPulse) * 0.08;
      glowGrad.addColorStop(0, `rgba(139, 92, 246, ${pulse * 0.4})`);
      glowGrad.addColorStop(0.4, `rgba(34, 211, 238, ${pulse * 0.18})`);
      glowGrad.addColorStop(1, 'rgba(139, 92, 246, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, glowR, 0, Math.PI * 2);
      ctx.fill();

      // ---- Floating particles around robot ----
      for (let i = 0; i < 6; i++) {
        const ang = s.floatPhase * 0.5 + (i / 6) * Math.PI * 2;
        const pr = size * 1.3 + Math.sin(s.floatPhase * 2 + i) * 15;
        const px = cx + Math.cos(ang) * pr * (1 + rotY * 0.1);
        const py = cy + Math.sin(ang) * pr * 0.4 + floatY * 0.5;
        const pAlpha = 0.3 + Math.sin(s.glowPulse * 2 + i) * 0.2;
        const pSize = 2 + Math.sin(s.glowPulse + i) * 1;
        ctx.fillStyle = i % 2 === 0
          ? `rgba(34, 211, 238, ${pAlpha})`
          : `rgba(139, 92, 246, ${pAlpha})`;
        ctx.beginPath();
        ctx.arc(px, py, pSize, 0, Math.PI * 2);
        ctx.fill();
      }

      // ---- Robot body (sphere/dome) ----
      ctx.save();
      ctx.translate(cx, cy);
      ctx.transform(1, 0, skewX, scaleY, 0, 0);

      // Main head dome
      const headGrad = ctx.createRadialGradient(
        -size * 0.2, -size * 0.25, size * 0.1,
        0, 0, size
      );
      headGrad.addColorStop(0, 'rgba(55, 60, 80, 0.95)');
      headGrad.addColorStop(0.5, 'rgba(30, 35, 55, 0.95)');
      headGrad.addColorStop(1, 'rgba(15, 18, 35, 0.98)');
      ctx.fillStyle = headGrad;
      ctx.beginPath();
      ctx.arc(0, 0, size, 0, Math.PI * 2);
      ctx.fill();

      // Rim highlight
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, size, 0, Math.PI * 2);
      ctx.stroke();

      // Top highlight band
      const topGrad = ctx.createLinearGradient(0, -size, 0, -size * 0.3);
      topGrad.addColorStop(0, 'rgba(255, 255, 255, 0.12)');
      topGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = topGrad;
      ctx.beginPath();
      ctx.ellipse(0, -size * 0.55, size * 0.7, size * 0.25, 0, 0, Math.PI * 2);
      ctx.fill();

      // ---- Circuit lines on head ----
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.18)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 3; i++) {
        const yOff = -size * 0.15 + i * size * 0.12;
        ctx.beginPath();
        ctx.moveTo(-size * 0.8, yOff);
        ctx.lineTo(-size * 0.3, yOff);
        ctx.lineTo(-size * 0.25, yOff - 4);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(size * 0.8, yOff);
        ctx.lineTo(size * 0.3, yOff);
        ctx.lineTo(size * 0.25, yOff - 4);
        ctx.stroke();
      }

      // ---- Eyes ----
      const eyeSpacing = size * 0.32;
      const eyeY = -size * 0.05;
      const eyeRadius = size * 0.13;
      // Eye positions shift based on rotation
      const eyeShiftX = perspective(rotY) * size * 0.08;
      const eyeShiftY = perspective(rotX) * size * 0.05;

      // Blink factor: 1 = open, 0 = closed
      let blinkFactor = 1;
      if (s.isBlinking) {
        // Triangular blink: close then open
        blinkFactor = 1 - Math.sin(s.blinkProgress * Math.PI);
        blinkFactor = Math.max(0.05, blinkFactor);
      }

      for (const side of [-1, 1]) {
        const ex = side * eyeSpacing + eyeShiftX;
        const ey = eyeY + eyeShiftY;

        // Eye socket (dark recess)
        ctx.fillStyle = 'rgba(5, 8, 18, 0.9)';
        ctx.beginPath();
        ctx.ellipse(ex, ey, eyeRadius, eyeRadius * blinkFactor, 0, 0, Math.PI * 2);
        ctx.fill();

        if (blinkFactor > 0.1) {
          // Glowing eye
          const eyeGrad = ctx.createRadialGradient(ex, ey, 0, ex, ey, eyeRadius);
          eyeGrad.addColorStop(0, 'rgba(34, 211, 238, 1)');
          eyeGrad.addColorStop(0.3, 'rgba(34, 211, 238, 0.85)');
          eyeGrad.addColorStop(0.7, 'rgba(139, 92, 246, 0.5)');
          eyeGrad.addColorStop(1, 'rgba(139, 92, 246, 0)');
          ctx.fillStyle = eyeGrad;
          ctx.beginPath();
          ctx.ellipse(ex, ey, eyeRadius * 0.9, eyeRadius * 0.9 * blinkFactor, 0, 0, Math.PI * 2);
          ctx.fill();

          // Bright core
          ctx.fillStyle = 'rgba(220, 250, 255, 0.95)';
          ctx.beginPath();
          ctx.ellipse(ex, ey, eyeRadius * 0.35, eyeRadius * 0.35 * blinkFactor, 0, 0, Math.PI * 2);
          ctx.fill();

          // Eye glow aura
          const auraGrad = ctx.createRadialGradient(ex, ey, eyeRadius, ex, ey, eyeRadius * 2.5);
          auraGrad.addColorStop(0, 'rgba(34, 211, 238, 0.3)');
          auraGrad.addColorStop(1, 'rgba(34, 211, 238, 0)');
          ctx.fillStyle = auraGrad;
          ctx.beginPath();
          ctx.arc(ex, ey, eyeRadius * 2.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Closed eye line
          ctx.strokeStyle = 'rgba(34, 211, 238, 0.5)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(ex - eyeRadius * 0.7, ey);
          ctx.lineTo(ex + eyeRadius * 0.7, ey);
          ctx.stroke();
        }
      }

      // ---- Mouth / chin indicator ----
      const mouthY = size * 0.25;
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-size * 0.15, mouthY);
      ctx.lineTo(size * 0.15, mouthY);
      ctx.stroke();

      // Small chin dots
      ctx.fillStyle = 'rgba(139, 92, 246, 0.5)';
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(-size * 0.08 + i * size * 0.08, size * 0.38, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // ---- Antenna ----
      const antTop = -size * 1.05;
      ctx.strokeStyle = 'rgba(100, 110, 140, 0.6)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.85);
      ctx.lineTo(0, antTop);
      ctx.stroke();

      // Antenna tip glow
      const antPulse = 0.6 + Math.sin(s.glowPulse * 3) * 0.3;
      const antGrad = ctx.createRadialGradient(0, antTop, 0, 0, antTop, size * 0.12);
      antGrad.addColorStop(0, `rgba(34, 211, 238, ${antPulse})`);
      antGrad.addColorStop(0.5, `rgba(34, 211, 238, ${antPulse * 0.5})`);
      antGrad.addColorStop(1, 'rgba(34, 211, 238, 0)');
      ctx.fillStyle = antGrad;
      ctx.beginPath();
      ctx.arc(0, antTop, size * 0.12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = `rgba(220, 250, 255, ${antPulse})`;
      ctx.beginPath();
      ctx.arc(0, antTop, size * 0.04, 0, Math.PI * 2);
      ctx.fill();

      // ---- Side panels / ears ----
      for (const side of [-1, 1]) {
        const px = side * size * 0.92;
        const py = size * 0.05;
        ctx.fillStyle = 'rgba(40, 45, 65, 0.9)';
        ctx.beginPath();
        ctx.ellipse(px, py, size * 0.1, size * 0.18, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.3)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(px, py, size * 0.1, size * 0.18, 0, 0, Math.PI * 2);
        ctx.stroke();
        // Small light on ear
        ctx.fillStyle = `rgba(34, 211, 238, ${0.4 + Math.sin(s.glowPulse * 2 + side) * 0.2})`;
        ctx.beginPath();
        ctx.arc(px, py - size * 0.05, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
