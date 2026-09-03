export function drawSpaceDust(ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, time: number, colors: any) {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  
  // Background
  ctx.fillStyle = colors?.primary || '#0B0C10';
  ctx.fillRect(0, 0, width, height);
  
  // Nebula glow
  const gradient = ctx.createRadialGradient(
    width / 2, height / 2, 0,
    width / 2, height / 2, width
  );
  gradient.addColorStop(0, colors?.accent || 'rgba(69, 162, 158, 0.2)');
  gradient.addColorStop(1, 'transparent');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Stars / Dust
  const numStars = 300;
  for (let i = 0; i < numStars; i++) {
    // Generate pseudo-random deterministic positions based on index
    const seedX = Math.sin(i * 12.9898) * 43758.5453;
    const seedY = Math.sin(i * 78.233) * 43758.5453;
    const seedSize = Math.sin(i * 93.233) * 43758.5453;
    
    const startX = (seedX - Math.floor(seedX)) * width;
    const startY = (seedY - Math.floor(seedY)) * height;
    const size = (seedSize - Math.floor(seedSize)) * 2 + 0.5;
    
    // Drift movement
    const speed = size * 0.1;
    let x = startX + time * speed;
    let y = startY - time * speed * 0.5;
    
    // Wrap around
    x = (x % width + width) % width;
    y = (y % height + height) % height;
    
    // Twinkle
    const twinkle = Math.sin(time * 0.05 + i) * 0.5 + 0.5;
    ctx.fillStyle = `rgba(255, 255, 255, ${twinkle * 0.8})`;
    
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
}
