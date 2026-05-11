'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
<nav className="bg-white text-black p-4 border-b-2" style={{ borderColor: '#ceae6e' }}>
  <div className="max-w-6xl mx-auto flex justify-between items-center">
    <a href="/" className="flex items-center">
      <Image 
        src="/images/mnemonic-logo.png" 
        alt="Mnemonic" 
        width={200}
        height={64}
        priority
      />
    </a>
    <ul className="flex gap-6">
      <li><a href="/" className="hover:underline">Home</a></li>
      <li><a href="/services" className="hover:underline">Services</a></li>
      <li><a href="/about" className="hover:underline">About</a></li>
      <li><a href="/blog" className="hover:underline">Blog</a></li>
      <li><a href="/contact" className="hover:underline">Contact</a></li>
    </ul>
  </div>
</nav>

      {/* Contact Content */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-4" style={{ color: '#443416' }}>Get in Touch</h2>
          <p className="text-gray-600 mb-8">Have a translation project? Fill out the form below and we'll get back to you within 24 hours.</p>

          {submitted && (
            <div className="border-l-4 border-green-500 bg-green-50 text-green-700 px-4 py-3 rounded mb-6">
              ✓ Thank you! We'll contact you soon.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-8 rounded-lg border">
            <div>
              <label className="block text-gray-700 font-bold mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-amber-600"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-amber-600"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">Phone (Optional)</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-amber-600"
                placeholder="Your phone number"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-amber-600"
                placeholder="Tell us about your translation project..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full text-white py-3 rounded-lg font-bold hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: '#443416' }}
            >
              {loading ? 'Sending...' : 'Send Quote Request'}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; 2024 Mnemonic. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}