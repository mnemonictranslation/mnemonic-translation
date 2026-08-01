'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { supabase } from '@/lib/supabase';
import { Link } from '@/lib/i18n/navigation';
import Reveal from './reveal';

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
}

export default function LatestBlogPosts() {
  const t = useTranslations('home.blog');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('date', { ascending: false })
          .limit(3);

        if (error) {
          console.error('Error fetching posts:', error);
        } else {
          setPosts(data || []);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <section className="py-28 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-500">{t('loading')}</p>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return null; // Don't show section if no posts
  }

  return (
    <section className="py-28 md:py-40 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <h3 className="font-brand-serif text-4xl md:text-6xl mb-16" style={{ color: '#443416' }}>
            {t('title')}
          </h3>
        </Reveal>

        <div>
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 80}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col md:flex-row md:items-baseline gap-2 md:gap-10 py-8 md:py-10 border-t last:border-b transition-colors duration-300"
                style={{ borderColor: '#44341622' }}
              >
                <span className="text-sm text-gray-500 shrink-0 md:w-32">{post.date}</span>
                <div className="flex-1">
                  <h4 className="font-brand-serif text-2xl md:text-3xl mb-2" style={{ color: '#443416' }}>
                    {post.title}
                  </h4>
                  <p className="text-gray-600 max-w-xl">{post.excerpt}</p>
                </div>
                <span
                  className="hidden md:block text-2xl opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0"
                  style={{ color: '#443416' }}
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={240} className="mt-16 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-bold text-lg border-b-2 pb-1 transition-colors duration-300"
            style={{ color: '#443416', borderColor: '#ceae6e' }}
          >
            {t('viewAll')}
            <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
