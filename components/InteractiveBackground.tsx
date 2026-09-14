"use client";

import { useEffect, useRef } from "react";

const VERTEX_SHADER = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_time;

  void main() {
      // Normalized pixel coordinates (from 0 to 1)
      vec2 uv = gl_FragCoord.xy / u_resolution;
      
      // Center and correct aspect ratio
      vec2 p = uv * 2.0 - 1.0;
      p.x *= u_resolution.x / u_resolution.y;

      vec2 mouse = u_mouse * 2.0 - 1.0;
      mouse.x *= u_resolution.x / u_resolution.y;

      // Mouse interaction: fluid push and glow
      float dist = length(p - mouse);
      float interaction = exp(-dist * 3.5); // Smooth ripple falloff

      // Liquid wave domain warping
      float t = u_time * 0.3;
      vec2 warp = p;
      
      // Multi-octave trig distortion for fluid-like folding
      for (float i = 1.0; i <= 3.0; i++) {
          warp.x += 0.4 / i * sin(i * 2.5 * warp.y + t + interaction * 2.5);
          warp.y += 0.4 / i * cos(i * 1.5 * warp.x - t - interaction * 2.5);
      }
      
      // Create continuous color bands from the warped coordinates
      float val = sin(warp.x * 2.0 + warp.y * 2.0);
      val = val * 0.5 + 0.5; // map to 0..1

      // Dark background aesthetic
      vec3 color = vec3(0.01, 0.015, 0.03); // Deep dark blue/black base
      
      // Brand color palette
      vec3 violet = vec3(0.48, 0.22, 0.92);
      vec3 magenta = vec3(0.92, 0.28, 0.60);
      vec3 cyan = vec3(0.02, 0.71, 0.83);
      vec3 gold = vec3(0.96, 0.62, 0.04);
      
      // Smoothly mix colors based on the fluid folds
      color = mix(color, violet, smoothstep(0.1, 0.5, val));
      color = mix(color, magenta, smoothstep(0.4, 0.8, val));
      color = mix(color, cyan, smoothstep(0.7, 0.95, val));
      color = mix(color, gold, smoothstep(0.9, 1.0, val));
      
      // Specular liquid highlights at the highest crests
      float crest = smoothstep(0.85, 1.0, val);
      color += cyan * crest * 0.4;

      // Interactive mouse glow (soft purple/magenta light)
      color += vec3(0.3, 0.1, 0.5) * interaction * 0.6;

      // Global dimming to ensure foreground text is always highly readable
      color *= 0.5;

      gl_FragColor = vec4(color, 1.0);
  }
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: false, antialias: false });
    if (!gl) return;

    // Create shader program
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Setup fullscreen quad
    const vertices = new Float32Array([
      -1, -1, 
       1, -1, 
      -1,  1, 
      -1,  1, 
       1, -1, 
       1,  1
    ]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    // Get uniforms
    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uMouse = gl.getUniformLocation(program, "u_mouse");
    const uTime = gl.getUniformLocation(program, "u_time");

    let mouseX = 0.5;
    let mouseY = 0.5;
    let targetMouseX = 0.5;
    let targetMouseY = 0.5;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX / window.innerWidth;
      // Invert Y because WebGL coordinates start bottom-left
      targetMouseY = 1.0 - (e.clientY / window.innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let animationFrameId: number;
    const startTime = performance.now();

    const resize = () => {
      // Use devicePixelRatio but cap it at 1.5 for consistent performance across displays
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
    };

    window.addEventListener("resize", resize);
    resize();

    const render = (now: number) => {
      // Smoothly interpolate mouse position (inertia)
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      gl.uniform1f(uTime, (now - startTime) / 1000.0);
      gl.uniform2f(uMouse, mouseX, mouseY);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full -z-10 pointer-events-none block"
        style={{ backgroundColor: "#030712" }}
        aria-hidden="true"
      />
      {/* Subtle vignette/dimmer over the canvas to ensure perfect text contrast */}
      <div 
        className="fixed inset-0 w-full h-full -z-10 pointer-events-none bg-black/20"
        aria-hidden="true"
      />
    </>
  );
}
