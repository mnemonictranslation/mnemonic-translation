'use client';

import { useState, useEffect } from 'react';
import Navigation from '../components/navigation';
import Footer from '../components/footer';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
}

export default function AdminBlog() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Business',
    excerpt: '',
    content: '',
  });
  const [message, setMessage] = useState('');

  const ADMIN_PASSWORD = 'mnemonic2024';

  useEffect(() => {
    if (isAuthenticated) {
      const savedPosts = localStorage.getItem('blog-posts');
      if (savedPosts) {
        setPosts(JSON.parse(savedPosts));
      }
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
      setMessage('');
    } else {
      setMessage('Invalid password');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.slug || !formData.title || !formData.excerpt || !formData.content) {
      setMessage('Please fill in all fields');
      return;
    }

    try {
      const existingIndex = posts.findIndex(p => p.slug === formData.slug);
      let updatedPosts;

      if (existingIndex >= 0) {
        updatedPosts = [...posts];
        updatedPosts[existingIndex] = formData;
        setMessage('✓ Blog post updated successfully!');
      } else {
        updatedPosts = [...posts, formData];
        setMessage('✓ Blog post published successfully!');
      }

      // Save to localStorage
      const jsonString = JSON.stringify(updatedPosts);
      localStorage.setItem('blog-posts', jsonString);
      console.log('Saved to localStorage:', jsonString);
      
      setPosts(updatedPosts);

      setFormData({
        slug: '',
        title: '',
        date: new Date().toISOString().split('T')[0],
        category: 'Business',
        excerpt: '',
        content: '',
      });

      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error: ' + (error as Error).message);
      console.error('Error:', error);
    }
  };

  const handleDeletePost = (slug: string) => {
    const updatedPosts = posts.filter(p => p.slug !== slug);
    localStorage.setItem('blog-posts', JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
    setMessage('✓ Post deleted');
    setTimeout(() => setMessage(''), 2000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />

        <section className="py-20 px-4">
          <div className="max-w-md mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center" style={{ color: '#443416' }}>Admin Login</h2>

            <form onSubmit={handleLogin} className="rounded-lg p-8 shadow-lg" style={{ backgroundColor: '#f9f7f4' }}>
              <div className="mb-6">
                <label className="block text-sm font-bold mb-2" style={{ color: '#443416' }}>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                  style={{ borderColor: '#ceae6e' }}
                  placeholder="Enter admin password"
                />
              </div>

              {message && <p className="text-red-600 mb-4 text-center">{message}</p>}

              <button
                type="submit"
                className="w-full py-3 rounded-lg font-bold text-white transition-all duration-300 hover:shadow-lg"
                style={{ backgroundColor: '#443416' }}
              >
                Login
              </button>
            </form>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold" style={{ color: '#443416' }}>Blog Manager</h2>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2 rounded-lg font-bold text-white text-sm"
              style={{ backgroundColor: '#771023' }}
            >
              Logout
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="rounded-lg p-8 shadow-lg" style={{ backgroundColor: '#f9f7f4' }}>
                {message && (
                  <div className="mb-6 p-4 rounded-lg" style={{ 
                    backgroundColor: message.includes('✓') ? '#f0fdf4' : '#fef2f2',
                    color: message.includes('✓') ? '#166534' : '#991b1b'
                  }}>
                    {message}
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: '#443416' }}>Slug *</label>
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                      style={{ borderColor: '#ceae6e' }}
                      placeholder="why-professional-translation"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: '#443416' }}>Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                      style={{ borderColor: '#ceae6e' }}
                      placeholder="Blog Post Title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: '#443416' }}>Date *</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                      style={{ borderColor: '#ceae6e' }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: '#443416' }}>Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                      style={{ borderColor: '#ceae6e' }}
                    >
                      <option>Business</option>
                      <option>Languages</option>
                      <option>Localization</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: '#443416' }}>Excerpt *</label>
                    <textarea
                      name="excerpt"
                      value={formData.excerpt}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 resize-none"
                      style={{ borderColor: '#ceae6e' }}
                      placeholder="Brief summary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: '#443416' }}>Content *</label>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      required
                      rows={10}
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 resize-none font-mono text-sm"
                      style={{ borderColor: '#ceae6e' }}
                      placeholder="Write your post here..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-lg font-bold text-white transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
                    style={{ backgroundColor: '#443416' }}
                  >
                    Publish Post
                  </button>
                </div>
              </form>
            </div>

            {/* Posts List */}
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#443416' }}>Published Posts ({posts.length})</h3>
              <div className="space-y-3">
                {posts.map(post => (
                  <div key={post.slug} className="p-4 rounded-lg border-l-4" style={{ backgroundColor: '#f9f7f4', borderColor: '#ceae6e' }}>
                    <h4 className="font-bold mb-2" style={{ color: '#443416' }}>{post.title}</h4>
                    <p className="text-xs text-gray-500 mb-3">{post.date}</p>
                    <button
                      onClick={() => handleDeletePost(post.slug)}
                      className="text-xs font-bold px-3 py-1 rounded text-white"
                      style={{ backgroundColor: '#771023' }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}