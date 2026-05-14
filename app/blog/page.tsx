'use client';

import { useState, useEffect } from 'react';
import Navigation from '../components/navigation';
import Footer from '../components/footer';
import BlogCard from '../components/blogcard';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get posts from localStorage
    const savedPosts = localStorage.getItem('blog-posts');
    if (savedPosts) {
      try {
        setPosts(JSON.parse(savedPosts));
      } catch (error) {
        console.error('Error parsing blog posts:', error);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="py-20 text-center">
          <p>Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            background: `linear-gradient(135deg, #ceae6e 0%, #443416 100%)`,
          }}
        ></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-4" style={{ color: '#443416' }}>Translation & Localization Blog</h2>
          <div className="w-24 h-1 rounded" style={{ backgroundColor: '#ceae6e' }}></div>
          <p className="text-xl text-gray-600 mt-6">Tips, insights, and industry updates from Mnemonic</p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="space-y-8">
              {posts.map((post, index) => (
                <BlogCard
                  key={post.slug}
                  slug={post.slug}
                  title={post.title}
                  date={post.date}
                  category={post.category}
                  excerpt={post.excerpt}
                  index={index}
                />
              ))}
            </div>
          )}

          {/* Coming Soon Section */}
          <div className="mt-16 rounded-lg p-8 text-center" style={{ backgroundColor: '#f9f7f4' }}>
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#443416' }}>More Articles Coming Soon</h3>
            <p className="text-gray-600 mb-6">We're regularly publishing new insights about translation, localization, and language services.</p>
            <a 
              href="/contact"
              className="inline-block px-8 py-3 rounded-lg font-bold text-white transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
              style={{ backgroundColor: '#443416' }}
            >
              Suggest a Topic
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 mt-8" style={{ background: `linear-gradient(135deg, #443416 0%, #1a1a1a 100%)` }}>
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-6 text-white">Ready for Your Translation Project?</h3>
          <p className="text-lg mb-8 text-gray-200">Get expert translation services from Mnemonic</p>
          <a 
            href="/contact"
            className="inline-block px-10 py-4 rounded-lg font-bold text-white transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95"
            style={{ backgroundColor: '#ceae6e', color: '#1a1a1a' }}
          >
            Get a Free Quote
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}