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
  scanLineY: number;
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
    scanLineY: 0,
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

    // Helper: draw a rounded plate shape
    const drawPlate = (
      x: number, y: number, w: number, h: number, r: number,
      fill: string, stroke?: string, strokeWidth?: number
    ) => {
      ctx.beginPath();
      ctx.moveTo(x - w / 2 + r, y - h / 2);
      ctx.lineTo(x + w / 2 - r, y - h / 2);
      ctx.quadraticCurveTo(x + w / 2, y - h / 2, x + w / 2, y - h / 2 + r);
      ctx.lineTo(x + w / 2, y + h / 2 - r);
      ctx.quadraticCurveTo(x + w / 2, y + h / 2, x + w / 2 - r, y + h / 2);
      ctx.lineTo(x - w / 2 + r, y + h / 2);
      ctx.quadraticCurveTo(x - w / 2, y + h / 2, x - w / 2, y + h / 2 - r);
      ctx.lineTo(x - w / 2, y - h / 2 + r);
      ctx.quadraticCurveTo(x - w / 2, y - h / 2, x - w / 2 + r, y - h / 2);
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.fill();
      if (stroke) {
        ctx.strokeStyle = stroke;
        ctx.lineWidth = strokeWidth || 1;
        ctx.stroke();
      }
    };

    // Helper: draw a hexagonal bolt
    const drawBolt = (x: number, y: number, r: number, color: string) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const ang = (i / 6) * Math.PI * 2 - Math.PI / 2;
        const px = x + Math.cos(ang) * r;
        const py = y + Math.sin(ang) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.lineWidth = 0.5;
      ctx.stroke();
      // Inner highlight
      ctx.beginPath();
      ctx.arc(x - r * 0.2, y - r * 0.2, r * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.fill();
    };

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

      // Smooth lerp interpolation
      s.rotX += (s.targetRotX - s.rotX) * 0.06;
      s.rotY += (s.targetRotY - s.rotY) * 0.06;
      s.floatPhase += dt * 0.0012;
      s.glowPulse += dt * 0.002;
      s.scanLineY += dt * 0.05;

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
      const floatY = Math.sin(s.floatPhase) * 10;
      const cy = h / 2 + floatY;
      const size = Math.min(w, h) * 0.28;
      const rotY = s.rotY;
      const rotX = s.rotX;

      // Pseudo-3D perspective transforms
      const skewX = rotY * 0.1;
      const scaleY = 1 - Math.abs(rotX) * 0.05;
      const offsetX = rotY * size * 0.12;
      const offsetY = rotX * size * 0.08;

      // ---- Outer atmospheric glow ----
      const glowR = size * 2.2;
      const glowGrad = ctx.createRadialGradient(cx, cy, size * 0.4, cx, cy, glowR);
      const pulse = 0.25 + Math.sin(s.glowPulse) * 0.06;
      glowGrad.addColorStop(0, `rgba(139, 92, 246, ${pulse * 0.35})`);
      glowGrad.addColorStop(0.3, `rgba(34, 211, 238, ${pulse * 0.15})`);
      glowGrad.addColorStop(0.7, `rgba(139, 92, 246, ${pulse * 0.05})`);
      glowGrad.addColorStop(1, 'rgba(139, 92, 246, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, glowR, 0, Math.PI * 2);
      ctx.fill();

      // ---- Floating data particles ----
      for (let i = 0; i < 8; i++) {
        const ang = s.floatPhase * 0.4 + (i / 8) * Math.PI * 2;
        const pr = size * 1.6 + Math.sin(s.floatPhase * 2 + i) * 20;
        const px = cx + Math.cos(ang) * pr * (1 + rotY * 0.08);
        const py = cy + Math.sin(ang) * pr * 0.45 + floatY * 0.3;
        const pAlpha = 0.25 + Math.sin(s.glowPulse * 2 + i) * 0.18;
        const pSize = 1.5 + Math.sin(s.glowPulse + i) * 1;
        ctx.fillStyle = i % 2 === 0
          ? `rgba(34, 211, 238, ${pAlpha})`
          : `rgba(139, 92, 246, ${pAlpha})`;
        ctx.beginPath();
        ctx.arc(px, py, pSize, 0, Math.PI * 2);
        ctx.fill();
      }

      // ---- Main robot head ----
      ctx.save();
      ctx.translate(cx + offsetX, cy + offsetY);
      ctx.transform(1, 0, skewX, scaleY, 0, 0);

      const headW = size * 1.15;
      const headH = size * 1.4;

      // ===== Chin / lower jaw plate =====
      const jawGrad = ctx.createLinearGradient(0, size * 0.3, 0, size * 0.85);
      jawGrad.addColorStop(0, 'rgba(45, 50, 70, 0.95)');
      jawGrad.addColorStop(0.5, 'rgba(30, 35, 55, 0.95)');
      jawGrad.addColorStop(1, 'rgba(20, 24, 40, 0.98)');
      drawPlate(0, size * 0.55, headW * 0.7, size * 0.5, size * 0.08, jawGrad.toString(), 'rgba(139, 92, 246, 0.25)', 1.5);

      // Jaw tech line
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-headW * 0.25, size * 0.55);
      ctx.lineTo(headW * 0.25, size * 0.55);
      ctx.stroke();

      // Jaw vent slots
      for (let i = 0; i < 3; i++) {
        const vy = size * 0.62 + i * size * 0.06;
        ctx.strokeStyle = 'rgba(100, 110, 140, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(-size * 0.12, vy);
        ctx.lineTo(size * 0.12, vy);
        ctx.stroke();
      }

      // ===== Main face plate (central) =====
      const faceGrad = ctx.createRadialGradient(-size * 0.15, -size * 0.2, size * 0.1, 0, 0, headW);
      faceGrad.addColorStop(0, 'rgba(60, 65, 88, 0.96)');
      faceGrad.addColorStop(0.4, 'rgba(40, 45, 65, 0.96)');
      faceGrad.addColorStop(0.8, 'rgba(25, 28, 45, 0.97)');
      faceGrad.addColorStop(1, 'rgba(15, 18, 35, 0.98)');

      // Face plate shape: rounded hexagonal / humanoid
      ctx.beginPath();
      ctx.moveTo(-headW * 0.45, -headH * 0.3);
      ctx.quadraticCurveTo(-headW * 0.52, -headH * 0.45, -headW * 0.4, -headH * 0.5);
      ctx.lineTo(-headW * 0.25, -headH * 0.58);
      ctx.quadraticCurveTo(0, -headH * 0.62, headW * 0.25, -headH * 0.58);
      ctx.lineTo(headW * 0.4, -headH * 0.5);
      ctx.quadraticCurveTo(headW * 0.52, -headH * 0.45, headW * 0.45, -headH * 0.3);
      ctx.lineTo(headW * 0.42, headH * 0.15);
      ctx.quadraticCurveTo(headW * 0.38, headH * 0.35, headW * 0.28, headH * 0.4);
      ctx.lineTo(-headW * 0.28, headH * 0.4);
      ctx.quadraticCurveTo(-headW * 0.38, headH * 0.35, -headW * 0.42, headH * 0.15);
      ctx.closePath();
      ctx.fillStyle = faceGrad;
      ctx.fill();

      // Face plate outline
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // ===== Forehead plate (upper helmet) =====
      const foreheadGrad = ctx.createLinearGradient(0, -headH * 0.62, 0, -headH * 0.25);
      foreheadGrad.addColorStop(0, 'rgba(50, 55, 78, 0.95)');
      foreheadGrad.addColorStop(0.5, 'rgba(35, 40, 60, 0.95)');
      foreheadGrad.addColorStop(1, 'rgba(25, 28, 45, 0.9)');
      ctx.beginPath();
      ctx.moveTo(-headW * 0.4, -headH * 0.5);
      ctx.lineTo(-headW * 0.25, -headH * 0.58);
      ctx.quadraticCurveTo(0, -headH * 0.62, headW * 0.25, -headH * 0.58);
      ctx.lineTo(headW * 0.4, -headH * 0.5);
      ctx.quadraticCurveTo(headW * 0.45, -headH * 0.4, headW * 0.38, -headH * 0.3);
      ctx.lineTo(-headW * 0.38, -headH * 0.3);
      ctx.quadraticCurveTo(-headW * 0.45, -headH * 0.4, -headW * 0.4, -headH * 0.5);
      ctx.closePath();
      ctx.fillStyle = foreheadGrad;
      ctx.fill();
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.25)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Forehead center ridge line
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, -headH * 0.55);
      ctx.lineTo(0, -headH * 0.32);
      ctx.stroke();

      // Forehead tech details - small circuit lines
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.15)';
      ctx.lineWidth = 0.8;
      for (const side of [-1, 1]) {
        ctx.beginPath();
        ctx.moveTo(side * headW * 0.15, -headH * 0.5);
        ctx.lineTo(side * headW * 0.3, -headH * 0.48);
        ctx.lineTo(side * headW * 0.32, -headH * 0.4);
        ctx.stroke();
      }

      // Center forehead sensor / gem
      const sensorPulse = 0.5 + Math.sin(s.glowPulse * 2) * 0.3;
      const sensorGrad = ctx.createRadialGradient(0, -headH * 0.45, 0, 0, -headH * 0.45, size * 0.06);
      sensorGrad.addColorStop(0, `rgba(34, 211, 238, ${sensorPulse})`);
      sensorGrad.addColorStop(0.5, `rgba(34, 211, 238, ${sensorPulse * 0.4})`);
      sensorGrad.addColorStop(1, 'rgba(34, 211, 238, 0)');
      ctx.fillStyle = sensorGrad;
      ctx.beginPath();
      ctx.arc(0, -headH * 0.45, size * 0.06, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = `rgba(220, 250, 255, ${sensorPulse})`;
      ctx.beginPath();
      ctx.arc(0, -headH * 0.45, size * 0.02, 0, Math.PI * 2);
      ctx.fill();

      // ===== Visor / Eye area =====
      const visorY = -headH * 0.08;
      const visorW = headW * 0.72;
      const visorH = size * 0.2;

      // Visor background (dark recessed area)
      const visorBgGrad = ctx.createLinearGradient(0, visorY - visorH / 2, 0, visorY + visorH / 2);
      visorBgGrad.addColorStop(0, 'rgba(3, 5, 12, 0.98)');
      visorBgGrad.addColorStop(0.5, 'rgba(5, 8, 18, 0.98)');
      visorBgGrad.addColorStop(1, 'rgba(3, 5, 12, 0.98)');
      drawPlate(0, visorY, visorW, visorH, size * 0.04, visorBgGrad.toString(), 'rgba(34, 211, 238, 0.4)', 1.5);

      // Visor inner glow
      const visorGlowGrad = ctx.createRadialGradient(0, visorY, 0, 0, visorY, visorW * 0.5);
      visorGlowGrad.addColorStop(0, `rgba(34, 211, 238, ${0.08 + sensorPulse * 0.04})`);
      visorGlowGrad.addColorStop(1, 'rgba(34, 211, 238, 0)');
      ctx.fillStyle = visorGlowGrad;
      drawPlate(0, visorY, visorW * 0.95, visorH * 0.85, size * 0.03, visorGlowGrad.toString());

      // Blink factor
      let blinkFactor = 1;
      if (s.isBlinking) {
        blinkFactor = 1 - Math.sin(s.blinkProgress * Math.PI);
        blinkFactor = Math.max(0.03, blinkFactor);
      }

      // Eye positions with tracking offset
      const eyeSpacing = visorW * 0.22;
      const eyeRadiusX = size * 0.075;
      const eyeRadiusY = size * 0.06;
      const eyeShiftX = rotY * size * 0.04;
      const eyeShiftY = rotX * size * 0.025;

      for (const side of [-1, 1]) {
        const ex = side * eyeSpacing + eyeShiftX;
        const ey = visorY + eyeShiftY;

        if (blinkFactor > 0.08) {
          // Glowing eye
          const eyeGrad = ctx.createRadialGradient(ex, ey, 0, ex, ey, eyeRadiusX * 1.5);
          eyeGrad.addColorStop(0, 'rgba(230, 250, 255, 1)');
          eyeGrad.addColorStop(0.15, 'rgba(34, 211, 238, 0.95)');
          eyeGrad.addColorStop(0.5, 'rgba(34, 211, 238, 0.6)');
          eyeGrad.addColorStop(0.8, 'rgba(139, 92, 246, 0.3)');
          eyeGrad.addColorStop(1, 'rgba(139, 92, 246, 0)');
          ctx.fillStyle = eyeGrad;
          ctx.beginPath();
          ctx.ellipse(ex, ey, eyeRadiusX * 1.4, eyeRadiusY * 1.4 * blinkFactor, 0, 0, Math.PI * 2);
          ctx.fill();

          // Bright core
          ctx.fillStyle = `rgba(240, 252, 255, ${0.9 * blinkFactor})`;
          ctx.beginPath();
          ctx.ellipse(ex, ey, eyeRadiusX * 0.4, eyeRadiusY * 0.4 * blinkFactor, 0, 0, Math.PI * 2);
          ctx.fill();

          // Eye aura
          const auraGrad = ctx.createRadialGradient(ex, ey, eyeRadiusX, ex, ey, eyeRadiusX * 3);
          auraGrad.addColorStop(0, `rgba(34, 211, 238, ${0.2 * blinkFactor})`);
          auraGrad.addColorStop(1, 'rgba(34, 211, 238, 0)');
          ctx.fillStyle = auraGrad;
          ctx.beginPath();
          ctx.arc(ex, ey, eyeRadiusX * 3, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Closed eye - horizontal blink line
          ctx.strokeStyle = 'rgba(34, 211, 238, 0.6)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(ex - eyeRadiusX * 0.8, ey);
          ctx.lineTo(ex + eyeRadiusX * 0.8, ey);
          ctx.stroke();
        }
      }

      // Visor scan line effect
      const scanY = visorY - visorH / 2 + ((s.scanLineY % (visorH * 2)) - visorH) * 0.5;
      if (scanY > visorY - visorH / 2 && scanY < visorY + visorH / 2) {
        const scanGrad = ctx.createLinearGradient(-visorW / 2, scanY, visorW / 2, scanY);
        scanGrad.addColorStop(0, 'rgba(34, 211, 238, 0)');
        scanGrad.addColorStop(0.5, 'rgba(34, 211, 238, 0.25)');
        scanGrad.addColorStop(1, 'rgba(34, 211, 238, 0)');
        ctx.strokeStyle = scanGrad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(-visorW * 0.45, scanY);
        ctx.lineTo(visorW * 0.45, scanY);
        ctx.stroke();
      }

      // ===== Cheek plates =====
      for (const side of [-1, 1]) {
        const cheekX = side * headW * 0.48;
        const cheekY = size * 0.08;
        const cheekGrad = ctx.createLinearGradient(cheekX, cheekY - size * 0.15, cheekX, cheekY + size * 0.15);
        cheekGrad.addColorStop(0, 'rgba(45, 50, 70, 0.9)');
        cheekGrad.addColorStop(1, 'rgba(25, 28, 45, 0.9)');
        drawPlate(cheekX, cheekY, size * 0.2, size * 0.3, size * 0.04, cheekGrad.toString(), 'rgba(139, 92, 246, 0.2)', 1);

        // Cheek vent lines
        ctx.strokeStyle = 'rgba(34, 211, 238, 0.15)';
        ctx.lineWidth = 0.8;
        for (let i = 0; i < 2; i++) {
          ctx.beginPath();
          ctx.moveTo(cheekX - size * 0.06, cheekY - size * 0.04 + i * size * 0.06);
          ctx.lineTo(cheekX + size * 0.06, cheekY - size * 0.04 + i * size * 0.06);
          ctx.stroke();
        }
      }

      // ===== Side temple / ear modules =====
      for (const side of [-1, 1]) {
        const earX = side * headW * 0.55;
        const earY = -size * 0.05;

        // Main ear housing
        const earGrad = ctx.createLinearGradient(earX - size * 0.05, earY, earX + size * 0.05, earY);
        earGrad.addColorStop(0, 'rgba(50, 55, 78, 0.95)');
        earGrad.addColorStop(0.5, 'rgba(35, 40, 60, 0.95)');
        earGrad.addColorStop(1, 'rgba(20, 24, 40, 0.95)');
        ctx.fillStyle = earGrad;
        ctx.beginPath();
        ctx.ellipse(earX, earY, size * 0.1, size * 0.22, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Ear concentric circles (speaker/grille)
        for (let i = 0; i < 3; i++) {
          ctx.strokeStyle = `rgba(34, 211, 238, ${0.15 + i * 0.05})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.ellipse(earX, earY, size * 0.025 + i * size * 0.018, size * 0.06 + i * size * 0.04, 0, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Ear indicator light
        const earLightPulse = 0.4 + Math.sin(s.glowPulse * 2 + side * 1.5) * 0.25;
        ctx.fillStyle = `rgba(34, 211, 238, ${earLightPulse})`;
        ctx.beginPath();
        ctx.arc(earX, earY - size * 0.1, size * 0.015, 0, Math.PI * 2);
        ctx.fill();
      }

      // ===== Neck / collar =====
      const neckY = size * 0.75;
      const neckGrad = ctx.createLinearGradient(0, neckY - size * 0.05, 0, neckY + size * 0.1);
      neckGrad.addColorStop(0, 'rgba(40, 45, 65, 0.9)');
      neckGrad.addColorStop(1, 'rgba(20, 24, 40, 0.9)');
      drawPlate(0, neckY, headW * 0.4, size * 0.15, size * 0.03, neckGrad.toString(), 'rgba(139, 92, 246, 0.2)', 1);

      // Neck tech lines
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.15)';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(-headW * 0.12, neckY);
      ctx.lineTo(headW * 0.12, neckY);
      ctx.stroke();

      // ===== Bolt details =====
      drawBolt(-headW * 0.38, -headH * 0.42, size * 0.018, 'rgba(80, 85, 105, 0.9)');
      drawBolt(headW * 0.38, -headH * 0.42, size * 0.018, 'rgba(80, 85, 105, 0.9)');
      drawBolt(-headW * 0.35, headH * 0.32, size * 0.015, 'rgba(80, 85, 105, 0.9)');
      drawBolt(headW * 0.35, headH * 0.32, size * 0.015, 'rgba(80, 85, 105, 0.9)');
      drawBolt(-headW * 0.18, size * 0.55, size * 0.012, 'rgba(80, 85, 105, 0.9)');
      drawBolt(headW * 0.18, size * 0.55, size * 0.012, 'rgba(80, 85, 105, 0.9)');

      // ===== Top highlight gloss =====
      const glossGrad = ctx.createLinearGradient(0, -headH * 0.6, 0, -headH * 0.2);
      glossGrad.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
      glossGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = glossGrad;
      ctx.beginPath();
      ctx.ellipse(0, -headH * 0.4, headW * 0.35, headH * 0.15, 0, 0, Math.PI * 2);
      ctx.fill();

      // ===== Side edge highlights =====
      for (const side of [-1, 1]) {
        const edgeGrad = ctx.createLinearGradient(side * headW * 0.45, 0, side * headW * 0.5, 0);
        edgeGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        edgeGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.06)');
        edgeGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.strokeStyle = edgeGrad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(side * headW * 0.45, -headH * 0.4);
        ctx.lineTo(side * headW * 0.45, headH * 0.3);
        ctx.stroke();
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


export { AIRobot }