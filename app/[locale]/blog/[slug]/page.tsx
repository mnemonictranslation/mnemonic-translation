'use client';

import { useNavThreshold } from '@/lib/navContext';
import { useState, useEffect } from 'react';
import { use } from 'react';
import { useTranslations } from 'next-intl';
import { marked } from 'marked';
import Navigation from '@/app/components/navigation';
import Footer from '@/app/components/footer';
import Reveal from '@/app/components/reveal';
import { Link } from '@/lib/i18n/navigation';
import { supabase } from '@/lib/supabase';
import DOMPurify from 'dompurify';

interface BlogPost {
  id?: number;
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
}

// Configure marked
marked.setOptions({
  breaks: true,
  gfm: true, // GitHub Flavored Markdown
});

export default function BlogPost({
  params
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { slug } = use(params);
  const t = useTranslations('blog.post');
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

const { setScrollThreshold } = useNavThreshold();

  useEffect(() => {
    setScrollThreshold(400); // Disappear after 400px
  }, [setScrollThreshold]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) {
        console.error('Error fetching post:', error);
        setPost(null);
      } else {
        setPost(data);
      }
    } catch (error) {
      console.error('Error:', error);
      setPost(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="py-20 text-center">
          <p>{t('loading')}</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#443416' }}>{t('notFoundTitle')}</h1>
          <p className="text-gray-600 mb-8">{t('notFoundBody')}</p>
          <Link href="/blog" className="inline-flex items-center gap-2 font-bold text-lg border-b-2 pb-1 transition-colors duration-300" style={{ color: '#443416', borderColor: '#ceae6e' }}>
            {t('backToBlog')}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const categoryColor = post.category === 'Business' ? '#ceae6e' : post.category === 'Languages' ? '#771023' : '#443416';

  // Convert markdown to HTML
  const htmlContent = marked(post.content);

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        .markdown-content h1 {
          font-size: 2rem;
          font-weight: bold;
          color: #443416;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
        }
        .markdown-content h2 {
          font-size: 1.75rem;
          font-weight: bold;
          color: #443416;
          margin-top: 1.25rem;
          margin-bottom: 0.875rem;
        }
        .markdown-content h3 {
          font-size: 1.5rem;
          font-weight: bold;
          color: #443416;
          margin-top: 1rem;
          margin-bottom: 0.75rem;
        }
        .markdown-content h4 {
          font-size: 1.25rem;
          font-weight: bold;
          color: #443416;
          margin-top: 0.875rem;
          margin-bottom: 0.625rem;
        }
        .markdown-content p {
          margin-bottom: 1rem;
          line-height: 1.75;
          color: #374151;
        }
        .markdown-content ul, .markdown-content ol {
          margin-left: 1.5rem;
          margin-bottom: 1rem;
        }
        .markdown-content li {
          margin-bottom: 0.5rem;
          color: #374151;
          line-height: 1.75;
        }
        .markdown-content strong {
          font-weight: bold;
          color: #1f2937;
        }
        .markdown-content em {
          font-style: italic;
        }
        .markdown-content a {
          color: #ceae6e;
          text-decoration: underline;
          transition: opacity 0.3s;
        }
        .markdown-content a:hover {
          opacity: 0.8;
        }
        .markdown-content code {
          background-color: #f3f4f6;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-family: monospace;
          color: #443416;
          font-size: 0.9em;
        }
        .markdown-content pre {
          background-color: #1f2937;
          color: #f3f4f6;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin-bottom: 1rem;
          line-height: 1.5;
        }
        .markdown-content pre code {
          background-color: transparent;
          padding: 0;
          color: #f3f4f6;
        }
        .markdown-content blockquote {
          border-left: 4px solid #ceae6e;
          padding-left: 1rem;
          margin-left: 0;
          margin-bottom: 1rem;
          color: #666;
          font-style: italic;
        }
        .markdown-content table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 1rem;
        }
        .markdown-content th, .markdown-content td {
          border: 1px solid #ddd;
          padding: 0.75rem;
          text-align: left;
        }
        .markdown-content th {
          background-color: #f3f4f6;
          font-weight: bold;
        }
        .markdown-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1rem 0;
        }
        .markdown-content hr {
          border: none;
          border-top: 1px solid #ddd;
          margin: 2rem 0;
        }
      `}</style>

      <Navigation />

      {/* Blog Post Content */}
      <section className="py-20 md:py-28 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          {/* Back Link */}
          <Reveal>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-bold mb-10 transition-colors duration-300"
              style={{ color: '#443416' }}
            >
              <span aria-hidden="true">←</span>
              {t('backToBlog')}
            </Link>
          </Reveal>

          {/* Post Header */}
          <Reveal delay={80} className="mb-12">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: categoryColor }}>
                {post.category}
              </span>
              <span className="text-sm text-gray-500">{post.date}</span>
            </div>

            <h1 className="font-brand-serif text-4xl md:text-6xl leading-tight" style={{ color: '#443416' }}>
              {post.title}
            </h1>
          </Reveal>

          {/* Post Content - Markdown rendered as HTML */}
          <Reveal delay={160}>
            <div
              className="markdown-content mb-16"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(htmlContent as string)
              }}
            />
          </Reveal>

          {/* Post CTA */}
          <Reveal className="mb-16">
            <div style={{ backgroundColor: '#f9f7f4' }} className="p-8 md:p-12 text-center">
              <h3 className="font-brand-serif text-2xl md:text-3xl mb-4" style={{ color: '#443416' }}>
                {t('ctaTitle')}
              </h3>
              <p className="text-gray-600 mb-6">
                {t('ctaSubtitle')}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 font-bold text-lg border-b-2 pb-1 transition-colors duration-300"
                style={{ color: '#443416', borderColor: '#ceae6e' }}
              >
                {t('ctaButton')}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>

          {/* Related Posts */}
          <Reveal>
            <div className="border-t pt-10" style={{ borderColor: '#44341622' }}>
              <h3 className="font-brand-serif text-2xl md:text-3xl mb-6" style={{ color: '#443416' }}>{t('readMoreTitle')}</h3>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 font-bold text-lg border-b-2 pb-1 transition-colors duration-300"
                style={{ color: '#443416', borderColor: '#ceae6e' }}
              >
                {t('viewAllArticles')}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 md:py-36 px-4" style={{ background: '#1a1a1a' }}>
        <Reveal className="max-w-3xl mx-auto text-center">
          <h3 className="font-brand-serif text-4xl md:text-5xl mb-8 text-white">{t('finalCtaTitle')}</h3>
          <p className="text-lg mb-10 text-gray-400">{t('finalCtaSubtitle')}</p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 rounded-lg font-bold text-lg transition-colors duration-300"
            style={{ backgroundColor: '#ceae6e', color: '#1a1a1a' }}
          >
            {t('finalCtaButton')}
          </Link>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
