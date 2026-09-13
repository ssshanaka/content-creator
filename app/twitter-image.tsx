import { ImageResponse } from 'next/og';


export const alt = 'VibeClips - Generate Animated Music Videos';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to right, #4338ca, #3b82f6, #9333ea)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          color: 'white',
        }}
      >
        <h1
          style={{
            fontSize: '80px',
            fontWeight: 'bold',
            marginBottom: '20px',
            textShadow: '0 4px 8px rgba(0,0,0,0.3)',
          }}
        >
          VibeClips
        </h1>
        <p
          style={{
            fontSize: '40px',
            maxWidth: '800px',
            textAlign: 'center',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          Generate Animated Music Videos with AI
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}
