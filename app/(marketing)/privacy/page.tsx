import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | VibeClips',
  description: 'Privacy Policy for VibeClips AI Video Generator.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-24 space-y-8">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white">Privacy Policy</h1>
      <p className="text-neutral-400">Last updated: September 14, 2026</p>
      
      <div className="prose prose-invert prose-neutral max-w-none text-neutral-300">
        <p>
          At VibeClips, your privacy is our priority. We designed our architecture specifically so that we do not have to collect, process, or store your personal data, audio files, or API keys on our servers.
        </p>
        
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Information We Do Not Collect</h2>
        <p>
          Unlike traditional cloud-based video generators, VibeClips operates almost entirely on your local device (client-side). Therefore:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>Audio Files:</strong> Any MP3 or WAV files you upload are processed locally in your browser. We never upload them to our servers.</li>
          <li><strong>API Keys:</strong> Your Gemini API Key and Telegram Bot Tokens are saved directly to your browser's <code>localStorage</code>. They are transmitted directly from your device to Google or Telegram's APIs. They never touch our servers.</li>
          <li><strong>Generated Videos:</strong> Videos are rendered using your device's GPU (via the WebCodecs API) and downloaded directly to your hard drive.</li>
        </ul>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Third-Party Services</h2>
        <p>
          While VibeClips does not collect your data, the app communicates with the following third-party APIs based on your configuration:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>Google Gemini API:</strong> Used to generate the text and procedural code for the visuals. Please review Google's <a href="https://policies.google.com/privacy" className="text-blue-400 hover:underline">Privacy Policy</a> to understand how they handle your prompts.</li>
          <li><strong>Telegram API:</strong> (Optional) Used to deliver rendered videos directly to your device. Please review Telegram's <a href="https://telegram.org/privacy" className="text-blue-400 hover:underline">Privacy Policy</a>.</li>
        </ul>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Local Storage</h2>
        <p>
          We use your browser's local storage mechanism to save your preferences, API keys, and queue state so that you do not have to re-enter them every time you visit. You can clear this data at any time by clearing your browser's site data.
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Open Source Transparency</h2>
        <p>
          VibeClips is open-source. You are completely free to inspect the source code on GitHub to verify our data handling practices.
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please open an issue on our GitHub repository.
        </p>
      </div>
    </div>
  );
}
