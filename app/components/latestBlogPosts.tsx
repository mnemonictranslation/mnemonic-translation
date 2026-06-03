'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
}

export default function LatestBlogPosts() {
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
      <section className="py-24 px-4" style={{ backgroundColor: '#f9f7f4' }}>
        <div className="max-w-6xl mx-auto text-center">
          <p>Loading blog posts...</p>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return null; // Don't show section if no posts
  }

  const categoryColor = (category: string) => {
    switch (category) {
      case 'Business':
        return '#ceae6e';
      case 'Languages':
        return '#771023';
      case 'Localization':
        return '#443416';
      default:
        return '#ceae6e';
    }
  };

  return (
    <section className="py-24 px-4" style={{ backgroundColor: '#f9f7f4' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-5xl font-bold mb-4" style={{ color: '#443416' }}>Learn more</h3>
          <div className="w-24 h-1 mx-auto rounded" style={{ backgroundColor: '#ceae6e' }}></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <div 
                className="group rounded-lg p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer h-full"
                style={{ 
                  backgroundColor: '#ffffff',
                  borderLeft: `6px solid ${categoryColor(post.category)}`
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span 
                    className="text-xs font-bold px-3 py-1 rounded-full text-white"
                    style={{ backgroundColor: categoryColor(post.category) }}
                  >
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-500">{post.date}</span>
                </div>

                <h4 className="text-2xl font-bold mb-3 transition-colors duration-300 group-hover:text-amber-600" style={{ color: '#443416' }}>
                  {post.title}
                </h4>

                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 mb-4">
                  {post.excerpt}
                </p>

                <div className="text-sm font-bold transition-colors duration-300 group-hover:text-amber-600" style={{ color: '#443416' }}>
                  Read More →
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/blog">
            <button
              className="px-10 py-4 rounded-lg font-bold text-white transition-all duration-300 hover:shadow-lg hover:scale-105"
              style={{ backgroundColor: '#443416' }}
            >
              View All Articles
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}