import * as Mp4Muxer from 'mp4-muxer';

export interface EncodeVideoOptions {
  canvasWidth: number;
  canvasHeight: number;
  fps: number;
  durationSeconds: number;
  audioBuffer?: AudioBuffer;
  renderFrame: (ctx: CanvasRenderingContext2D, timeMs: number) => void;
}

export async function encodeVideo(options: EncodeVideoOptions): Promise<Blob> {
  const { canvasWidth, canvasHeight, fps, durationSeconds, audioBuffer, renderFrame } = options;

  const muxer = new Mp4Muxer.Muxer({
    target: new Mp4Muxer.ArrayBufferTarget(),
    video: {
      codec: 'avc',
      width: canvasWidth,
      height: canvasHeight
    },
    audio: audioBuffer ? {
      codec: 'aac',
      numberOfChannels: audioBuffer.numberOfChannels,
      sampleRate: audioBuffer.sampleRate
    } : undefined,
    fastStart: 'in-memory'
  });

  const videoEncoder = new VideoEncoder({
    output: (chunk, meta) => muxer.addVideoChunk(chunk, meta),
    error: e => console.error('VideoEncoder error', e)
  });

  videoEncoder.configure({
    codec: 'avc1.42E01F',
    width: canvasWidth,
    height: canvasHeight,
    bitrate: 5_000_000,
    framerate: fps
  });

  // Handle audio encoding if audioBuffer is provided
  let audioEncoder: AudioEncoder | null = null;
  if (audioBuffer) {
    audioEncoder = new AudioEncoder({
      output: (chunk, meta) => muxer.addAudioChunk(chunk, meta),
      error: e => console.error('AudioEncoder error', e)
    });
    
    audioEncoder.configure({
      codec: 'mp4a.40.2',
      sampleRate: audioBuffer.sampleRate,
      numberOfChannels: audioBuffer.numberOfChannels,
      bitrate: 128_000
    });

    const length = audioBuffer.length;
    const sampleRate = audioBuffer.sampleRate;
    const numberOfChannels = audioBuffer.numberOfChannels;
    
    // Process audio in chunks (e.g., 1024 frames)
    const chunkSize = 1024;
    for (let i = 0; i < length; i += chunkSize) {
      const framesToProcess = Math.min(chunkSize, length - i);
      const timestampUs = (i / sampleRate) * 1_000_000;
      
      const planarData = new Float32Array(framesToProcess * numberOfChannels);
      for (let c = 0; c < numberOfChannels; c++) {
        const channelData = audioBuffer.getChannelData(c);
        const offset = c * framesToProcess;
        for (let j = 0; j < framesToProcess; j++) {
          planarData[offset + j] = channelData[i + j];
        }
      }

      const audioData = new AudioData({
        format: 'f32-planar',
        sampleRate: sampleRate,
        numberOfFrames: framesToProcess,
        numberOfChannels: numberOfChannels,
        timestamp: timestampUs,
        data: planarData
      });
      
      audioEncoder.encode(audioData);
      audioData.close();
    }
    await audioEncoder.flush();
    audioEncoder.close();
  }

  // Handle video encoding
  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Failed to get 2D context from canvas');
  }

  const totalFrames = durationSeconds * fps;
  for (let i = 0; i < totalFrames; i++) {
    const timeMs = (i / fps) * 1000;
    
    renderFrame(ctx, timeMs);
    
    const timestampUs = (i / fps) * 1_000_000;
    const videoFrame = new VideoFrame(canvas, { timestamp: timestampUs });
    
    const keyFrame = i % fps === 0;
    videoEncoder.encode(videoFrame, { keyFrame });
    videoFrame.close();
  }

  await videoEncoder.flush();
  videoEncoder.close();
  
  muxer.finalize();
  
  const buffer = (muxer.target as Mp4Muxer.ArrayBufferTarget).buffer;
  return new Blob([buffer], { type: 'video/mp4' });
}
