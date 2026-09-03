export function drawRainGlass(ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, time: number, colors: any) {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  
  // Base overlay
  ctx.fillStyle = colors?.primary || '#1a1a2e';
  ctx.globalAlpha = 0.8;
  ctx.fillRect(0, 0, width, height);
  ctx.globalAlpha = 1.0;

  // Rain drops
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  const numDrops = 150;
  for (let i = 0; i < numDrops; i++) {
    const x = (Math.sin(i * 123.45) * 0.5 + 0.5) * width;
    const ySpeed = (Math.cos(i * 321.12) * 0.5 + 0.5) * 5 + 2;
    let y = (time * ySpeed + i * 100) % height;
    const length = ySpeed * 3;
    
    // Wobble effect
    const wobble = Math.sin(time * 0.05 + i) * 2;
    
    ctx.beginPath();
    ctx.ellipse(x + wobble, y, 2, length, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // Fog effect on glass
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, 'rgba(255,255,255,0.05)');
  gradient.addColorStop(0.5, 'rgba(255,255,255,0)');
  gradient.addColorStop(1, 'rgba(0,0,0,0.3)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}
