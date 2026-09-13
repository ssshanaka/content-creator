import { ImageResponse } from 'next/og';

export const size = { width: 512, height: 512 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #4338ca, #9333ea)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '256px',
          fontWeight: 'bold',
          fontFamily: 'sans-serif',
          borderRadius: '128px', // Optional: smooth corners if rendered as maskable
        }}
      >
        VC
      </div>
    ),
    { ...size }
  );
}
