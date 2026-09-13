import { Metadata } from 'next';
import Link from 'next/link';
import { posts } from './posts';

export const metadata: Metadata = {
  title: 'Blog | VibeClips',
  description: 'Tutorials, guides, and updates on creating AI music videos with VibeClips.',
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white">VibeClips Blog</h1>
        <p className="text-xl text-neutral-400">
          Tutorials, guides, and tips for generating better music videos.
        </p>
      </div>
      
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug} className="group">
            <Link href={`/blog/${post.slug}`} className="block p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors">
              <time className="text-sm text-neutral-500 mb-2 block">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
              <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{post.title}</h2>
              <p className="text-neutral-400">{post.description}</p>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
