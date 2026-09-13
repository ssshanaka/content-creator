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

  private currentCanvasCode?: string;
  private cachedFunction?: Function;
  private hasErrored: boolean = false;

  public renderFrame(item: GeneratedItem, time: number, artistName?: string, songName?: string) {
    // 1. Base clear
    this.ctx.fillStyle = item.colors.primary || '#000000';
    this.ctx.fillRect(0, 0, this.width, this.height);

    // 2. Render Animation
    if (item.canvasCode) {
      if (this.currentCanvasCode !== item.canvasCode) {
        this.currentCanvasCode = item.canvasCode;
        this.hasErrored = false;
        try {
          this.cachedFunction = new Function('ctx', 'width', 'height', 'timeMs', 'colors', item.canvasCode);
        } catch (e: any) {
          console.error('Error compiling generated canvas code:', e);
          this.hasErrored = true;
          this.drawError(e.message);
        }
      }

      if (!this.hasErrored && this.cachedFunction) {
        try {
          // Wrap ctx in a safety proxy to guard against Gemini-generated code
          // passing NaN/Infinity/negative-radius to canvas API methods.
          const safeCtx = new Proxy(this.ctx, {
            get(target, prop) {
              const val = (target as any)[prop];
              if (prop === 'createRadialGradient') {
                return (x0: number, y0: number, r0: number, x1: number, y1: number, r1: number) => {
                  if (!isFinite(x0) || !isFinite(y0) || !isFinite(r0) ||
                      !isFinite(x1) || !isFinite(y1) || !isFinite(r1)) {
                    return { addColorStop: () => {} } as any;
                  }
                  return (target as CanvasRenderingContext2D).createRadialGradient(
                    x0, y0, Math.max(0, r0), x1, y1, Math.max(0, r1)
                  );
                };
              }
              if (prop === 'createLinearGradient') {
                return (x0: number, y0: number, x1: number, y1: number) => {
                  if (!isFinite(x0) || !isFinite(y0) || !isFinite(x1) || !isFinite(y1)) {
                    return { addColorStop: () => {} } as any;
                  }
                  return (target as CanvasRenderingContext2D).createLinearGradient(x0, y0, x1, y1);
                };
              }
              if (prop === 'ellipse') {
                return (x: number, y: number, rx: number, ry: number, rot: number, start: number, end: number, ccw?: boolean) => {
                  if (!isFinite(x) || !isFinite(y) || !isFinite(rx) || !isFinite(ry)) return;
                  (target as CanvasRenderingContext2D).ellipse(
                    x, y, Math.max(0, rx), Math.max(0, ry), rot || 0, start, end, ccw
                  );
                };
              }
              if (prop === 'arc') {
                return (x: number, y: number, r: number, start: number, end: number, ccw?: boolean) => {
                  if (!isFinite(x) || !isFinite(y) || !isFinite(r) || r < 0) return;
                  (target as CanvasRenderingContext2D).arc(x, y, r, start, end, ccw);
                };
              }
              return typeof val === 'function' ? val.bind(target) : val;
            },
            set(target, prop, value) {
              (target as any)[prop] = value;
              return true;
            }
          });
          this.cachedFunction(safeCtx, this.width, this.height, time, item.colors);
        } catch (e: any) {
          console.error('Error executing generated canvas code:', e);
          this.hasErrored = true;
          this.drawError(e.message);
        }
      } else if (this.hasErrored) {
          this.drawError("Fix the code to resume rendering.");
      }
    } else {
      // Fallback
      drawGradientFog(this.ctx as CanvasRenderingContext2D, time, item.colors);
    }

    // 3. Render Text
    this.drawText(item);

    // 4. Render Song and Artist Name
    if (songName || artistName) {
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'top';
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
      
      let currentY = 80;

      if (songName) {
        this.ctx.font = 'bold 36px sans-serif';
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        this.ctx.fillText(`♫ ${songName}`, this.width / 2, currentY);
        currentY += 45;
      }
      
      if (artistName) {
        this.ctx.font = '30px sans-serif';
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        this.ctx.fillText(artistName, this.width / 2, currentY);
      }
      
      this.ctx.shadowBlur = 0;
    }
  }

  private drawError(message: string) {
    this.ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
    this.ctx.fillRect(0, 0, this.width, 150);
    this.ctx.fillStyle = 'white';
    this.ctx.font = 'bold 30px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText("Render Error: " + message, this.width / 2, 75);
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
