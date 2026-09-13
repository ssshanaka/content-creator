export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  content: string;
}

export const posts: BlogPost[] = [
  {
    slug: 'how-to-generate-music-videos',
    title: 'How to Generate 20 Music Videos in 5 Minutes',
    description: 'A complete step-by-step guide to using VibeClips batch generation feature for your latest album or EP.',
    date: '2026-09-13',
    content: `
# How to Generate 20 Music Videos in 5 Minutes

Are you an indie artist sitting on a fresh EP or beat tape? You need content for TikTok, Reels, and Shorts to promote it, but video editing takes hours. With VibeClips, you can generate an entire month's worth of visual content in just 5 minutes.

## Step 1: Prepare Your Audio

Make sure your tracks are in MP3 or WAV format. For social media, we recommend uploading short snippets (15-60 seconds) of the catchiest parts of your songs.

## Step 2: Choose Your Vibe

Open VibeClips and drop your tracks into the uploader. Select a genre that fits your music—whether that's "Lofi chill," "Synthwave," or "Dark ambient." 

## Step 3: Add Your Gemini API Key

VibeClips uses Google's Gemini AI to generate the quotes and visual scripts. You can get a free API key from Google AI Studio. Paste it into the configuration panel.

## Step 4: Generate and Export

Click "Generate." The AI will instantly draft 20 unique concepts, complete with poetic quotes and matching HTML5 animations. Once they look good, click "Render & ZIP" to batch export all of them directly to your hard drive. 

No watermarks, no subscriptions, just pure content ready to be posted.
    `
  }
];
