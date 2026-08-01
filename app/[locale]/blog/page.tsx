'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Navigation from '@/app/components/navigation';
import Footer from '@/app/components/footer';
import BlogCard from '@/app/components/blogcard';
import Reveal from '@/app/components/reveal';
import { Link } from '@/lib/i18n/navigation';
import { supabase } from '@/lib/supabase';
import { useNavThreshold } from '@/lib/navContext';

interface BlogPost {
  id?: number;
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
}

export default function Blog() {
  const t = useTranslations('blog.list');
  const { setScrollThreshold } = useNavThreshold();

  useEffect(() => {
    setScrollThreshold(400); // Disappear after 400px
  }, [setScrollThreshold]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('date', { ascending: false });

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

  useEffect(() => {
    fetchPosts();
  }, []);

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

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="py-28 md:py-40 px-4 bg-white">
        <Reveal className="max-w-4xl mx-auto">
          <h1 className="font-brand-serif text-5xl md:text-7xl mb-6" style={{ color: '#443416' }}>{t('title')}</h1>
          <p className="text-xl text-gray-600 max-w-2xl">{t('subtitle')}</p>
        </Reveal>
      </section>

      {/* Blog Content */}
      <section className="pb-28 md:pb-40 px-4" style={{ backgroundColor: '#f9f7f4' }}>
        <div className="max-w-4xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">{t('empty')}</p>
            </div>
          ) : (
            <div>
              {posts.map((post, index) => (
                <Reveal key={post.slug} delay={index * 80}>
                  <BlogCard
                    slug={post.slug}
                    title={post.title}
                    date={post.date}
                    category={post.category}
                    excerpt={post.excerpt}
                    index={index}
                  />
                </Reveal>
              ))}
            </div>
          )}

          {/* Coming Soon Section */}
          <Reveal delay={posts.length * 80} className="mt-20 text-center">
            <h3 className="font-brand-serif text-3xl mb-4" style={{ color: '#443416' }}>{t('comingSoonTitle')}</h3>
            <p className="text-gray-600 mb-6">{t('comingSoonBody')}</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-bold text-lg border-b-2 pb-1 transition-colors duration-300"
              style={{ color: '#443416', borderColor: '#ceae6e' }}
            >
              {t('suggestTopic')}
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 md:py-36 px-4" style={{ background: '#1a1a1a' }}>
        <Reveal className="max-w-3xl mx-auto text-center">
          <h3 className="font-brand-serif text-4xl md:text-5xl mb-8 text-white">{t('cta.title')}</h3>
          <p className="text-lg mb-10 text-gray-400">{t('cta.subtitle')}</p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 rounded-lg font-bold text-lg transition-colors duration-300"
            style={{ backgroundColor: '#ceae6e', color: '#1a1a1a' }}
          >
            {t('cta.button')}
          </Link>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
