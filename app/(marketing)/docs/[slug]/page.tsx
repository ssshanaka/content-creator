import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { articles } from '../articles';
import JsonLd from '@/components/JsonLd';

export async function generateStaticParams() {
  return articles.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = articles.find((p) => p.slug === params.slug);
  
  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/docs/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
    }
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = articles.find((p) => p.slug === params.slug);
  
  if (!post) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": post.title,
    "description": post.description,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Person",
      "name": "Shanaka"
    },
    "publisher": {
      "@type": "Organization",
      "name": "VibeClips",
      "logo": {
        "@type": "ImageObject",
        "url": "https://vibeclips.shanaka.dev/icon?size=512x512"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://vibeclips.shanaka.dev/docs/${post.slug}`
    }
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <article className="max-w-3xl mx-auto px-6 py-24">
        <header className="mb-12 space-y-4">
          <time className="text-sm font-medium text-neutral-400 block">
            {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </time>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {post.title}
          </h1>
          <p className="text-xl text-neutral-400 leading-relaxed pt-4">
            {post.description}
          </p>
        </header>

        <div className="prose prose-invert prose-neutral max-w-none prose-h2:text-white prose-a:text-blue-400">
          {/* Note: In a real app with markdown, use a markdown renderer here. For now, simple line breaks. */}
          {post.content.split('\n').map((paragraph, idx) => {
            if (paragraph.startsWith('# ')) return null; // skip duplicate title
            if (paragraph.startsWith('## ')) return <h2 key={idx} className="text-2xl font-bold mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
            if (paragraph.trim() === '') return <br key={idx} />;
            return <p key={idx} className="text-neutral-300 leading-relaxed">{paragraph}</p>;
          })}
        </div>

        {/* Internal Linking: Related Posts */}
        <hr className="border-neutral-800 my-12" />
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white">More Resources for Creators</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {articles
              .filter((p) => p.slug !== post.slug)
              .slice(0, 2)
              .map((related) => (
                <a
                  key={related.slug}
                  href={`/docs/${related.slug}`}
                  className="block p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors"
                >
                  <h4 className="font-bold text-white mb-2">{related.title}</h4>
                  <p className="text-sm text-neutral-400 line-clamp-2">{related.description}</p>
                </a>
              ))}
          </div>
        </div>
      </article>
    </>
  );
}
