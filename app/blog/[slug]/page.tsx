'use client';

import { useState, useEffect } from 'react';
import { use } from 'react';
import { marked } from 'marked';
import Navigation from '../../components/navigation';
import Footer from '../../components/footer';
import { supabase } from '../../../lib/supabase';
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
  params: Promise<{ slug: string }> 
}) {
  const { slug } = use(params);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [slug]);

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

          {/* Post Content - Markdown rendered as HTML */}
          <div 
  className="markdown-content mb-12"
  dangerouslySetInnerHTML={{ 
    __html: DOMPurify.sanitize(htmlContent as string)
  }}
/>

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