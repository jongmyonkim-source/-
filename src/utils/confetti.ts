/**
 * Lightweight canvas-based confetti trigger for completion celebration
 */
export function triggerCelebrationConfetti() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    canvas.remove();
    return;
  }

  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);

  const colors = ['#10b981', '#059669', '#3b82f6', '#f59e0b', '#ec4899', '#8b5cf6'];
  const particles: Array<{
    x: number;
    y: number;
    w: number;
    h: number;
    color: string;
    vx: number;
    vy: number;
    rotation: number;
    vrot: number;
    alpha: number;
  }> = [];

  for (let i = 0; i < 70; i++) {
    particles.push({
      x: width * 0.5 + (Math.random() - 0.5) * 150,
      y: height * 0.35 + (Math.random() - 0.5) * 100,
      w: Math.random() * 8 + 6,
      h: Math.random() * 6 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 14,
      vy: Math.random() * -10 - 4,
      rotation: Math.random() * 360,
      vrot: (Math.random() - 0.5) * 10,
      alpha: 1,
    });
  }

  let animationFrameId: number;
  const start = performance.now();

  function render(time: number) {
    const elapsed = time - start;
    if (elapsed > 2800) {
      canvas.remove();
      return;
    }

    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // gravity
      p.rotation += p.vrot;
      if (elapsed > 1800) {
        p.alpha = Math.max(0, 1 - (elapsed - 1800) / 1000);
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });

    animationFrameId = requestAnimationFrame(render);
  }

  animationFrameId = requestAnimationFrame(render);
}
