export function drawRetroVHS(ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, time: number, colors: any) {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  
  // Base
  ctx.fillStyle = colors?.primary || '#2C3E50';
  ctx.fillRect(0, 0, width, height);

  // Tracking lines
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  const numLines = 5;
  for (let i = 0; i < numLines; i++) {
    const ySpeed = 2 + Math.sin(i) * 1;
    const y = (time * ySpeed + i * 400) % height;
    ctx.fillRect(0, y, width, 10 + Math.random() * 20);
  }

  // Scanlines
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  for (let y = 0; y < height; y += 4) {
    ctx.fillRect(0, y, width, 2);
  }

  // Noise / grain
  const grainSize = 4;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
  for (let i = 0; i < 500; i++) {
    const pseudoRandomX = Math.sin(time + i * 1.2) * 10000;
    const pseudoRandomY = Math.cos(time + i * 0.8) * 10000;
    
    const x = Math.abs(pseudoRandomX) % width;
    const y = Math.abs(pseudoRandomY) % height;
    
    ctx.fillRect(x, y, grainSize, grainSize);
  }
  
  // Edge vignette
  const grad = ctx.createRadialGradient(width/2, height/2, width/3, width/2, height/2, width);
  grad.addColorStop(0, 'rgba(0,0,0,0)');
  grad.addColorStop(1, 'rgba(0,0,0,0.6)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);
}
