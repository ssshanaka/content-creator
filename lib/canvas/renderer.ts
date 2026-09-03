import { GeneratedItem } from '../types';
import { drawRainGlass } from './animations/rainGlass';
import { drawSpaceDust } from './animations/spaceDust';
import { drawRetroVHS } from './animations/retroVHS';
import { drawGradientFog } from './animations/gradientFog';

export class CanvasRenderer {
  private canvas: HTMLCanvasElement | OffscreenCanvas;
  private ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
  private width = 1080;
  private height = 1920;
  private safeMargin = 150;

  constructor(canvas: HTMLCanvasElement | OffscreenCanvas) {
    this.canvas = canvas;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    const context = this.canvas.getContext('2d');
    if (!context) {
      throw new Error('Failed to get 2d context');
    }
    this.ctx = context as CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
  }

  public renderFrame(item: GeneratedItem, time: number) {
    // 1. Base clear
    this.ctx.fillStyle = item.colors.primary || '#000000';
    this.ctx.fillRect(0, 0, this.width, this.height);

    // 2. Render Animation
    switch (item.theme) {
      case 'mist_rain':
        drawRainGlass(this.ctx, time, item.colors);
        break;
      case 'analog_grain':
        drawRetroVHS(this.ctx, time, item.colors);
        break;
      case 'starfield_drift':
        drawSpaceDust(this.ctx, time, item.colors);
        break;
      case 'aurora_wave':
        drawGradientFog(this.ctx, time, item.colors);
        break;
      default:
        drawGradientFog(this.ctx, time, item.colors);
    }

    // 3. Render Text
    this.drawText(item);
  }

  private drawText(item: GeneratedItem) {
    const { quote, subtext, colors } = item;
    const maxWidth = this.width - this.safeMargin * 2;
    const centerX = this.width / 2;
    let currentY = this.height / 2 - 100;

    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';

    // Quote
    this.ctx.font = 'bold 72px sans-serif';
    this.ctx.fillStyle = '#ffffff';
    this.ctx.shadowColor = colors.textGlow || 'rgba(0,0,0,0.5)';
    this.ctx.shadowBlur = 20;

    const quoteLines = this.wrapText(quote, maxWidth);
    for (const line of quoteLines) {
      this.ctx.fillText(line, centerX, currentY);
      currentY += 90;
    }

    // Subtext
    currentY += 40;
    this.ctx.font = '40px sans-serif';
    this.ctx.fillStyle = colors.secondary || '#cccccc';
    this.ctx.shadowBlur = 10;
    
    const subtextLines = this.wrapText(subtext, maxWidth);
    for (const line of subtextLines) {
      this.ctx.fillText(line, centerX, currentY);
      currentY += 50;
    }

    // Reset shadow
    this.ctx.shadowBlur = 0;
  }

  private wrapText(text: string, maxWidth: number): string[] {
    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = this.ctx.measureText(currentLine + ' ' + word).width;
      if (width < maxWidth) {
        currentLine += ' ' + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  }
}
