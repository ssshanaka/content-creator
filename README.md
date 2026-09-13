# VibeClips - AI Animated Music Videos

**VibeClips** is a free, open-source AI video generator designed for music artists and content creators. It generates 9:16 vertical short-form animated videos, complete with procedurally generated ambient visuals perfectly suited for TikTok, Instagram Reels, and YouTube Shorts. 

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fssshanaka%2Fcontent-creator)

## 🌟 Features

- **AI-Powered Visuals**: Uses the Gemini API to procedurally generate ambient, lofi, or genre-specific animated backgrounds matching your music.
- **Batch Processing**: Generate 20+ videos simultaneously in bulk. Just drop your audio files and let it work.
- **Short-Form Optimized**: Perfect 9:16 aspect ratio (1080x1920) for maximum engagement on modern social platforms.
- **100% Free & Open Source**: No subscriptions, no hidden limits, and **zero watermarks**. Bring your own Gemini API key.
- **Telegram Bot Integration**: Optionally connect your Telegram bot to receive generated videos directly on your phone, ready to post.
- **Browser-Based Engine**: Videos are rendered and encoded entirely on the client side using modern WebCodecs APIs. No heavy server required.

## 🚀 Getting Started

### Prerequisites

You will need a free [Gemini API Key](https://aistudio.google.com/app/apikey) to generate content.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ssshanaka/content-creator.git vibeclips
   cd vibeclips
   ```

2. Install dependencies:
   ```bash
   npm install
   # or yarn / pnpm / bun
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **AI Engine**: [Google Generative AI](https://ai.google.dev/) (Gemini Flash Lite)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Video Rendering**: HTML5 Canvas + WebCodecs (`mp4-muxer`)

## 💡 How It Works

1. **Configure**: Enter your Gemini API key and optional Telegram bot credentials.
2. **Set the Vibe**: Choose your music genre (e.g., Lofi Chill, Rap, Synthwave) and drop in your `.mp3` or `.wav` files.
3. **Generate**: The AI drafts 20 unique concepts, poetic quotes, and procedural canvas animations.
4. **Export**: VibeClips renders the video frames in the browser, merges them with your audio, and exports a `.zip` archive or sends them to your Telegram.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! 
Feel free to check the [issues page](https://github.com/ssshanaka/content-creator/issues).

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
