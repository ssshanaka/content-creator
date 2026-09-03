/**
 * Processes an audio file, slicing a 10-second segment and applying fade in/out.
 * @param file The input audio file (.mp3/.wav)
 * @param durationSeconds The duration to extract (default 10)
 * @param fadeSeconds The fade duration (default 1)
 * @returns An AudioBuffer of the processed audio
 */
export async function processAudio(
  file: File,
  durationSeconds: number = 10,
  fadeSeconds: number = 1
): Promise<AudioBuffer> {
  // Read file to ArrayBuffer
  const arrayBuffer = await file.arrayBuffer();

  // We need an AudioContext just to decode the audio data
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  const tempContext = new AudioContextClass();
  const audioBuffer = await tempContext.decodeAudioData(arrayBuffer);

  const sampleRate = audioBuffer.sampleRate;
  const numberOfChannels = audioBuffer.numberOfChannels;
  const length = sampleRate * durationSeconds;

  // Create an OfflineAudioContext for the target duration
  const offlineCtx = new OfflineAudioContext(numberOfChannels, length, sampleRate);

  // Create a buffer source
  const source = offlineCtx.createBufferSource();
  source.buffer = audioBuffer;

  // Create a GainNode for fading
  const gainNode = offlineCtx.createGain();

  // Connect the graph: source -> gain -> destination
  source.connect(gainNode);
  gainNode.connect(offlineCtx.destination);

  // Start with 0 volume
  gainNode.gain.setValueAtTime(0, offlineCtx.currentTime);
  
  // Fade in
  gainNode.gain.linearRampToValueAtTime(1, offlineCtx.currentTime + fadeSeconds);
  
  // Fade out
  gainNode.gain.setValueAtTime(1, offlineCtx.currentTime + durationSeconds - fadeSeconds);
  gainNode.gain.linearRampToValueAtTime(0, offlineCtx.currentTime + durationSeconds);

  // Start playback in the offline context
  source.start(0);

  // Render the audio
  const renderedBuffer = await offlineCtx.startRendering();
  
  return renderedBuffer;
}
