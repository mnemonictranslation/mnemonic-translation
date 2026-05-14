'use client';

import { useState, useEffect } from 'react';
import { use } from 'react';
import Navigation from '../../components/navigation';
import Footer from '../../components/footer';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
}

export default function BlogPost({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = use(params);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedPosts = localStorage.getItem('blog-posts');
    
    if (savedPosts) {
      try {
        const posts = JSON.parse(savedPosts);
        const foundPost = posts.find((p: BlogPost) => p.slug === slug);
        setPost(foundPost || null);
      } catch (error) {
        console.error('Error parsing posts:', error);
      }
    }
    setLoading(false);
  }, [slug]);

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

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#443416' }}>Post Not Found</h1>
          <p className="text-gray-600 mb-8">Sorry, we couldn't find the blog post you're looking for.</p>
          <a href="/blog" className="px-8 py-3 rounded-lg font-bold text-white transition-all duration-300 hover:shadow-lg hover:scale-105" style={{ backgroundColor: '#443416' }}>
            Back to Blog
          </a>
        </div>
        <Footer />
      </div>
    );
  }

  const categoryColor = post.category === 'Business' ? '#ceae6e' : post.category === 'Languages' ? '#771023' : '#443416';

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Blog Post Content */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Back Link */}
          <a 
            href="/blog" 
            className="inline-flex items-center font-bold mb-8 transition-all duration-300 hover:-translate-x-2"
            style={{ color: '#ceae6e' }}
          >
            <span className="mr-2">←</span>
            Back to Blog
          </a>

          {/* Post Header */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-3 mb-4">
              <span 
                className="text-xs font-bold px-3 py-1 rounded-full text-white"
                style={{ backgroundColor: categoryColor }}
              >
                {post.category}
              </span>
              <span className="text-sm text-gray-500">{post.date}</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight" style={{ color: '#443416' }}>
              {post.title}
            </h1>

            <div className="w-24 h-1 rounded" style={{ backgroundColor: '#ceae6e' }}></div>
          </div>

          {/* Post Content */}
          <article className="prose prose-lg max-w-none mb-12">
            <div className="text-gray-700 leading-relaxed space-y-6">
              {post.content.split('\n\n').map((paragraph, index) => {
                // Check if this is a heading
                if (paragraph.trim().match(/^[A-Z][^.!?]*$/)) {
                  return (
                    <h2 
                      key={index}
                      className="text-3xl font-bold mt-8 mb-4 pt-4"
                      style={{ color: '#443416' }}
                    >
                      {paragraph.trim()}
                    </h2>
                  );
                }
                // Check if this is a list
                if (paragraph.includes('- ')) {
                  const items = paragraph.split('\n').filter(item => item.trim().startsWith('-'));
                  return (
                    <ul key={index} className="space-y-2 ml-6">
                      {items.map((item, i) => (
                        <li key={i} className="text-gray-700">
                          {item.replace('- ', '')}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={index} className="text-lg text-gray-700">
                    {paragraph.trim()}
                  </p>
                );
              })}
            </div>
          </article>

          {/* Post CTA */}
          <div className="rounded-lg p-8 text-center mb-12" style={{ backgroundColor: '#f9f7f4' }}>
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#443416' }}>
              Interested in our translation services?
            </h3>
            <p className="text-gray-600 mb-6">
              Get a free quote for your project today
            </p>
            <a 
              href="/contact"
              className="inline-block px-10 py-4 rounded-lg font-bold text-white transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
              style={{ backgroundColor: '#443416' }}
            >
              Get a Quote
            </a>
          </div>

          {/* Related Posts */}
          <div className="border-t pt-8">
            <h3 className="text-2xl font-bold mb-6" style={{ color: '#443416' }}>Read More</h3>
            <a 
              href="/blog" 
              className="inline-flex items-center font-bold px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
              style={{ backgroundColor: '#f9f7f4', color: '#443416' }}
            >
              View All Articles
              <span className="ml-2">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 mt-8" style={{ background: `linear-gradient(135deg, #443416 0%, #1a1a1a 100%)` }}>
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-6 text-white">Ready to Start Your Project?</h3>
          <p className="text-lg mb-8 text-gray-200">Our expert translators are ready to help</p>
          <a 
            href="/contact"
            className="inline-block px-10 py-4 rounded-lg font-bold text-white transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95"
            style={{ backgroundColor: '#ceae6e', color: '#1a1a1a' }}
          >
            Get Your Free Quote
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}