'use client';

import { useState, useEffect } from 'react';
import { marked } from 'marked';
import Navigation from '../components/navigation';
import Footer from '../components/footer';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../lib/authContext';
import DOMPurify from 'dompurify';
import { checkRateLimit } from '../../lib/ratelimit';


interface BlogPost {
  id?: number;
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
}

interface Draft {
  id?: number;
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
  updated_at?: string;
}

const validateBlogPost = (data: BlogPost): { valid: boolean; error?: string } => {
  if (!data.slug || data.slug.length === 0 || data.slug.length > 100) {
    return { valid: false, error: 'Slug must be 1-100 characters' };
  }
  
  if (!data.title || data.title.length === 0 || data.title.length > 200) {
    return { valid: false, error: 'Title must be 1-200 characters' };
  }
  
  if (!data.excerpt || data.excerpt.length === 0 || data.excerpt.length > 500) {
    return { valid: false, error: 'Excerpt must be 1-500 characters' };
  }
  
  if (!data.content || data.content.length === 0 || data.content.length > 50000) {
    return { valid: false, error: 'Content must be 1-50000 characters' };
  }
  
  // Check slug format (only lowercase, numbers, and hyphens)
  if (!/^[a-z0-9-]+$/.test(data.slug)) {
    return { valid: false, error: 'Slug can only contain lowercase letters, numbers, and hyphens' };
  }
  
  // Check date is valid
  if (!data.date || isNaN(new Date(data.date).getTime())) {
    return { valid: false, error: 'Invalid date' };
  }
  
  return { valid: true };
};

export default function AdminBlog() {
  const { user, loading: authLoading, signIn, signOut } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [currentDraftId, setCurrentDraftId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Business',
    excerpt: '',
    content: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saving' | 'saved' | null>(null);

  useEffect(() => {
  if (user) {
    fetchPosts();
    fetchDrafts();
  } else {
    // Clear data when user logs out
    setPosts([]);
    setDrafts([]);
    setFormData({
      slug: '',
      title: '',
      date: new Date().toISOString().split('T')[0],
      category: 'Business',
      excerpt: '',
      content: '',
    });
  }
}, [user]);

  // Auto-save draft to Supabase every 30 seconds if content has changed
  useEffect(() => {
    if (!user || !formData.content) return;

    const timer = setTimeout(() => {
      saveDraftToSupabase();
    }, 30000);

    return () => clearTimeout(timer);
  }, [formData, user]);

  const fetchPosts = async () => {
  if (!user) return; // Don't fetch if not logged in
  
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
  }
};

  const fetchDrafts = async () => {
  if (!user) return; // Don't fetch if not logged in
  
  try {
    const { data, error } = await supabase
      .from('blog_drafts')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error fetching drafts:', error);
    } else {
      setDrafts(data || []);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
  const saveDraftToSupabase = async () => {
    if (!formData.slug || !formData.title) return;

    try {
      setAutoSaveStatus('saving');

      const { data: existingDraft } = await supabase
        .from('blog_drafts')
        .select('id')
        .eq('slug', formData.slug)
        .single();

      let result;

      if (existingDraft) {
        result = await supabase
          .from('blog_drafts')
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq('slug', formData.slug)
          .select();

        setCurrentDraftId(existingDraft.id);
      } else {
        result = await supabase
          .from('blog_drafts')
          .insert([{
            ...formData,
            updated_at: new Date().toISOString(),
          }])
          .select();

        if (result.data?.[0]?.id) {
          setCurrentDraftId(result.data[0].id);
        }
      }

      if (!result.error) {
        setAutoSaveStatus('saved');
        setTimeout(() => setAutoSaveStatus(null), 2000);
        fetchDrafts();
      }
    } catch (error) {
      console.error('Error auto-saving draft:', error);
      setAutoSaveStatus(null);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // Check rate limit
  if (!checkRateLimit(email)) {
    setMessage('Too many login attempts. Try again in 15 minutes.');
    return;
  }
  
  setLoading(true);
  try {
    await signIn(email, password);
    setEmail('');
    setPassword('');
    setMessage('');
  } catch (error) {
    setMessage('Invalid email or password');
  } finally {
    setLoading(false);
  }
};

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleLoadDraft = async (draft: Draft) => {
    setFormData({
      slug: draft.slug,
      title: draft.title,
      date: draft.date,
      category: draft.category,
      excerpt: draft.excerpt,
      content: draft.content,
    });
    setCurrentDraftId(draft.id || null);
    setMessage('✓ Draft loaded');
    setTimeout(() => setMessage(''), 2000);
  };

  const handleClearDraft = () => {
    if (confirm('Are you sure you want to clear the current draft?')) {
      setFormData({
        slug: '',
        title: '',
        date: new Date().toISOString().split('T')[0],
        category: 'Business',
        excerpt: '',
        content: '',
      });
      setCurrentDraftId(null);
      setMessage('✓ Draft cleared');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  const handleManualSaveDraft = async () => {
    if (!formData.slug || !formData.title) {
      setMessage('Please fill in slug and title to save draft');
      return;
    }

    const validation = validateBlogPost(formData);
  if (!validation.valid) {
    setMessage(`Cannot save draft: ${validation.error}`);
    return;
  }

    try {
      setAutoSaveStatus('saving');

      const { data: existingDraft } = await supabase
        .from('blog_drafts')
        .select('id')
        .eq('slug', formData.slug)
        .single();

      let result;

      if (existingDraft) {
        result = await supabase
          .from('blog_drafts')
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq('slug', formData.slug)
          .select();

        setCurrentDraftId(existingDraft.id);
      } else {
        result = await supabase
          .from('blog_drafts')
          .insert([{
            ...formData,
            updated_at: new Date().toISOString(),
          }])
          .select();

        if (result.data?.[0]?.id) {
          setCurrentDraftId(result.data[0].id);
        }
      }

      if (!result.error) {
        setMessage('✓ Draft saved manually');
        setAutoSaveStatus('saved');
        fetchDrafts();
        setTimeout(() => {
          setMessage('');
          setAutoSaveStatus(null);
        }, 2000);
      } else {
        setMessage('Error saving draft');
        setAutoSaveStatus(null);
      }
    } catch (error) {
      setMessage('Error: ' + (error as Error).message);
      setAutoSaveStatus(null);
    }
  };

  const handleDeleteDraft = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this draft?')) return;

    try {
      const { error } = await supabase
        .from('blog_drafts')
        .delete()
        .eq('slug', slug);

      if (error) {
        setMessage('Error deleting draft');
      } else {
        setMessage('✓ Draft deleted');
        fetchDrafts();
        if (currentDraftId) setCurrentDraftId(null);
        setTimeout(() => setMessage(''), 2000);
      }
    } catch (error) {
      setMessage('Error: ' + (error as Error).message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  // Validate input
  const validation = validateBlogPost(formData);
  if (!validation.valid) {
    setMessage(`Validation error: ${validation.error}`);
    setLoading(false);
    return;
  }

    try {
      const { data: existingPost } = await supabase
        .from('blog_posts')
        .select('id')
        .eq('slug', formData.slug)
        .single();

      let result;

      if (existingPost) {
        result = await supabase
          .from('blog_posts')
          .update(formData)
          .eq('slug', formData.slug);

        setMessage('✓ Blog post updated successfully!');
      } else {
        result = await supabase
          .from('blog_posts')
          .insert([formData]);

        setMessage('✓ Blog post published successfully!');
      }

      if (result.error) {
        setMessage('Error: ' + result.error.message);
      } else {
        if (currentDraftId) {
          await supabase
            .from('blog_drafts')
            .delete()
            .eq('id', currentDraftId);
        }

        setFormData({
          slug: '',
          title: '',
          date: new Date().toISOString().split('T')[0],
          category: 'Business',
          excerpt: '',
          content: '',
        });
        setCurrentDraftId(null);

        fetchPosts();
        fetchDrafts();
        setShowPreview(false);
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage('Error: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('slug', slug);

      if (error) {
        setMessage('Error deleting post');
      } else {
        setMessage('✓ Post deleted');
        fetchPosts();
        setTimeout(() => setMessage(''), 2000);
      }
    } catch (error) {
      setMessage('Error: ' + (error as Error).message);
    }
  };

  const handleLogout = async () => {
  try {
    setLoading(true);
    await signOut();
    setMessage('');
  } catch (error) {
    console.error('Logout error details:', error);
    setMessage('Logout failed. Please refresh the page.');
  } finally {
    setLoading(false);
  }
};

  if (authLoading) {
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

  if (!user) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />

        <section className="py-20 px-4">
          <div className="max-w-md mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center" style={{ color: '#443416' }}>Admin Login</h2>

            <form onSubmit={handleLogin} className="rounded-lg p-8 shadow-lg" style={{ backgroundColor: '#f9f7f4' }}>
              <div className="mb-6">
                <label className="block text-sm font-bold mb-2" style={{ color: '#443416' }}>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                  style={{ borderColor: '#ceae6e' }}
                  placeholder="admin@example.com"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold mb-2" style={{ color: '#443416' }}>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                  style={{ borderColor: '#ceae6e' }}
                  placeholder="Enter password"
                  required
                />
              </div>

              {message && <p className="text-red-600 mb-4 text-center">{message}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg font-bold text-white transition-all duration-300 hover:shadow-lg disabled:opacity-50"
                style={{ backgroundColor: '#443416' }}
              >
                {loading ? 'Logging in...' : 'Login'}
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
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-4xl font-bold" style={{ color: '#443416' }}>Blog Manager</h2>
              <p className="text-gray-600 mt-2">Logged in as: {user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg font-bold text-white text-sm"
              style={{ backgroundColor: '#771023' }}
            >
              Logout
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Form - takes 3 columns */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="rounded-lg p-8 shadow-lg" style={{ backgroundColor: '#f9f7f4' }}>
                {message && (
                  <div className="mb-6 p-4 rounded-lg" style={{ 
                    backgroundColor: message.includes('✓') ? '#f0fdf4' : '#fef2f2',
                    color: message.includes('✓') ? '#166534' : '#991b1b'
                  }}>
                    {message}
                  </div>
                )}

                {autoSaveStatus && (
                  <div className="mb-6 p-4 rounded-lg bg-blue-50 text-blue-700 flex items-center gap-2">
                    {autoSaveStatus === 'saving' ? '💾 Saving draft...' : '✓ Draft auto-saved'}
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
                      onChange={(e) => {
                        const newTitle = e.target.value;
                        setFormData({
                          ...formData,
                          title: newTitle,
                          slug: generateSlug(newTitle),
                        });
                      }}
                      required
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                      style={{ borderColor: '#ceae6e' }}
                      placeholder="Blog Post Title"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
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
                    <label className="block text-sm font-bold mb-2" style={{ color: '#443416' }}>Content (Markdown) *</label>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      required
                      rows={12}
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 resize-none font-mono text-sm"
                      style={{ borderColor: '#ceae6e' }}
                      placeholder="Write your post in Markdown...

# Heading 1
## Heading 2

**Bold text**
*Italic text*

- List item 1
- List item 2"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={handleManualSaveDraft}
                      className="flex-1 py-4 rounded-lg font-bold text-white transition-all duration-300 hover:shadow-lg"
                      style={{ backgroundColor: '#ceae6e', color: '#1a1a1a' }}
                      disabled={loading || autoSaveStatus === 'saving'}
                    >
                      {autoSaveStatus === 'saving' ? '💾 Saving...' : '💾 Save Draft'}
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 py-4 rounded-lg font-bold text-white transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50"
                      style={{ backgroundColor: '#443416' }}
                    >
                      {loading ? 'Publishing...' : 'Publish Post'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowPreview(!showPreview)}
                      className="flex-1 py-4 rounded-lg font-bold text-white transition-all duration-300 hover:shadow-lg"
                      style={{ backgroundColor: '#443416' }}
                    >
                      {showPreview ? 'Hide Preview' : 'Show Preview'}
                    </button>
                    <button
                      type="button"
                      onClick={handleClearDraft}
                      className="px-6 py-4 rounded-lg font-bold text-white transition-all duration-300 hover:shadow-lg"
                      style={{ backgroundColor: '#771023' }}
                    >
                      Clear Draft
                    </button>
                  </div>
                </div>
              </form>

              {/* Preview Modal */}
              {showPreview && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <style>{`
                    .markdown-preview h1 {
                      font-size: 2rem;
                      font-weight: bold;
                      color: #443416;
                      margin-top: 1.5rem;
                      margin-bottom: 1rem;
                    }
                    .markdown-preview h2 {
                      font-size: 1.75rem;
                      font-weight: bold;
                      color: #443416;
                      margin-top: 1.25rem;
                      margin-bottom: 0.875rem;
                    }
                    .markdown-preview h3 {
                      font-size: 1.5rem;
                      font-weight: bold;
                      color: #443416;
                      margin-top: 1rem;
                      margin-bottom: 0.75rem;
                    }
                    .markdown-preview p {
                      margin-bottom: 1rem;
                      line-height: 1.75;
                      color: #374151;
                    }
                    .markdown-preview ul, .markdown-preview ol {
                      margin-left: 1.5rem;
                      margin-bottom: 1rem;
                    }
                    .markdown-preview li {
                      margin-bottom: 0.5rem;
                      color: #374151;
                    }
                    .markdown-preview strong {
                      font-weight: bold;
                      color: #1f2937;
                    }
                    .markdown-preview em {
                      font-style: italic;
                    }
                    .markdown-preview a {
                      color: #ceae6e;
                      text-decoration: underline;
                    }
                    .markdown-preview code {
                      background-color: #f3f4f6;
                      padding: 0.25rem 0.5rem;
                      border-radius: 0.25rem;
                      font-family: monospace;
                      color: #443416;
                    }
                    .markdown-preview blockquote {
                      border-left: 4px solid #ceae6e;
                      padding-left: 1rem;
                      margin-left: 0;
                      margin-bottom: 1rem;
                      color: #666;
                      font-style: italic;
                    }
                  `}</style>
                  
                  <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8">
                    <div className="flex justify-between items-center mb-6 sticky top-0 bg-white pb-4 border-b">
                      <h2 className="text-3xl font-bold" style={{ color: '#443416' }}>Preview</h2>
                      <button
                        onClick={() => setShowPreview(false)}
                        className="text-2xl font-bold"
                        style={{ color: '#443416' }}
                      >
                        ✕
                      </button>
                    </div>

                    {/* Preview Content with Markdown Styling */}
                    <article>
                      <h1 style={{ color: '#443416', marginBottom: '0.5rem', fontSize: '2.5rem', fontWeight: 'bold' }}>
                        {formData.title}
                      </h1>
                      <p style={{ color: '#999', marginBottom: '2rem' }}>{formData.date} • {formData.category}</p>
                      
                      <div 
  className="markdown-preview text-gray-700 leading-relaxed"
  dangerouslySetInnerHTML={{ 
    __html: DOMPurify.sanitize(marked(formData.content) as string)
  }}
/>
                    </article>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar - 1 column */}
            <div className="space-y-8">
              {/* Drafts Section */}
              <div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#443416' }}>Drafts ({drafts.length})</h3>
                <div className="space-y-3 max-h-[35vh] overflow-y-auto">
                  {drafts.length === 0 ? (
                    <p className="text-sm text-gray-500 italic">No drafts saved</p>
                  ) : (
                    drafts.map(draft => (
                      <div key={draft.slug} className="p-4 rounded-lg border-l-4" style={{ backgroundColor: '#f9f7f4', borderColor: '#ceae6e' }}>
                        <h4 className="font-bold mb-1 text-sm" style={{ color: '#443416' }}>{draft.title || draft.slug}</h4>
                        <p className="text-xs text-gray-500 mb-3">
                          {draft.updated_at ? new Date(draft.updated_at).toLocaleDateString() : 'No date'}
                        </p>
                        <div className="space-y-2">
                          <button
                            onClick={() => handleLoadDraft(draft)}
                            className="w-full text-xs font-bold px-3 py-2 rounded text-white transition-all duration-300 hover:scale-105"
                            style={{ backgroundColor: '#443416' }}
                          >
                            Load
                          </button>
                          <button
                            onClick={() => handleDeleteDraft(draft.slug)}
                            className="w-full text-xs font-bold px-3 py-2 rounded text-white transition-all duration-300 hover:scale-105"
                            style={{ backgroundColor: '#771023' }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Published Posts Section */}
              <div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#443416' }}>Published Posts ({posts.length})</h3>
                <div className="space-y-3 max-h-[35vh] overflow-y-auto">
                  {posts.map(post => (
                    <div key={post.slug} className="p-4 rounded-lg border-l-4" style={{ backgroundColor: '#f9f7f4', borderColor: '#ceae6e' }}>
                      <h4 className="font-bold mb-2 text-sm" style={{ color: '#443416' }}>{post.title}</h4>
                      <p className="text-xs text-gray-500 mb-3">{post.date}</p>
                      <button
                        onClick={() => handleDeletePost(post.slug)}
                        className="w-full text-xs font-bold px-3 py-2 rounded text-white transition-all duration-300 hover:scale-105"
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
        </div>
      </section>

      <Footer />
    </div>
  );
}