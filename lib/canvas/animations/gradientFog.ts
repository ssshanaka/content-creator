export function drawGradientFog(ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, time: number, colors: any) {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  
  const c1 = colors?.primary || '#FF6B6B';
  const c2 = colors?.secondary || '#4ECDC4';
  const c3 = colors?.accent || '#45B7D1';

  // Base background
  const baseGradient = ctx.createLinearGradient(0, 0, 0, height);
  baseGradient.addColorStop(0, '#000000');
  baseGradient.addColorStop(1, c1);
  ctx.fillStyle = baseGradient;
  ctx.fillRect(0, 0, width, height);

  // Animated fog blobs
  ctx.globalCompositeOperation = 'screen';
  
  const drawBlob = (xStart: number, yStart: number, radius: number, color: string, timeOffset: number) => {
    const x = xStart + Math.sin(time * 0.02 + timeOffset) * 200;
    const y = yStart + Math.cos(time * 0.015 + timeOffset) * 200;
    
    const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
    grad.addColorStop(0, color);
    grad.addColorStop(1, 'transparent');
    
    ctx.fillStyle = grad;
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  };

  drawBlob(width * 0.3, height * 0.7, 800, c1 + '40', 0);
  drawBlob(width * 0.7, height * 0.3, 900, c2 + '40', 2);
  drawBlob(width * 0.5, height * 0.8, 700, c3 + '40', 4);
  drawBlob(width * 0.8, height * 0.9, 600, c1 + '40', 1);

  ctx.globalCompositeOperation = 'source-over';
}
