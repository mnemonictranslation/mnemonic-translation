'use client';

import { useState } from 'react';
import Image from 'next/image';
import Navigation from '../components/navigation';
import Footer from '../components/footer';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    
    if (selectedFile) {
      // Check file size (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        setFile(null);
        return;
      }
      
      // Check file type (allow common document types)
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ];
      
      if (!allowedTypes.includes(selectedFile.type)) {
        setError('Please upload a valid file type (PDF, DOC, DOCX, TXT, XLS, XLSX)');
        setFile(null);
        return;
      }
      
      setError('');
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Create FormData to handle both text and file
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('message', formData.message);
      
      if (file) {
        formDataToSend.append('file', file);
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setFile(null);
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
          <h2 className="text-5xl md:text-6xl font-bold mb-4" style={{ color: '#443416' }}>Get in Touch</h2>
          <div className="w-24 h-1 rounded" style={{ backgroundColor: '#ceae6e' }}></div>
          <p className="text-xl text-gray-600 mt-6">We'd love to hear about your translation project. Fill out the form below and we'll get back to you within 24 hours.</p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          {submitted && (
            <div className="mb-8 rounded-lg p-6 border-l-4 transition-all duration-500 animate-pulse" style={{ borderColor: '#ceae6e', backgroundColor: '#f0fdf4' }}>
              <div className="flex items-center">
                <span className="text-3xl mr-4">✓</span>
                <div>
                  <h4 className="font-bold" style={{ color: '#443416' }}>Thank you!</h4>
                  <p className="text-gray-600">We've received your message and will contact you within 24 hours.</p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-8 rounded-lg p-6 border-l-4" style={{ borderColor: '#771023', backgroundColor: '#fef2f2' }}>
              <div className="flex items-center">
                <span className="text-3xl mr-4">⚠</span>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="rounded-lg p-8 shadow-lg transition-all duration-500" style={{ backgroundColor: '#f9f7f4' }}>
            <div className="space-y-6">
              {/* Name Field */}
              <div className="group">
                <label className="block text-sm font-bold mb-2" style={{ color: '#443416' }}>Your Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                  style={{ 
                    borderColor: '#ceae6e',
                    '--tw-ring-color': '#ceae6e'
                  } as React.CSSProperties}
                  placeholder="John Doe"
                />
              </div>

              {/* Email Field */}
              <div className="group">
                <label className="block text-sm font-bold mb-2" style={{ color: '#443416' }}>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                  style={{ 
                    borderColor: '#ceae6e',
                    '--tw-ring-color': '#ceae6e'
                  } as React.CSSProperties}
                  placeholder="john@example.com"
                />
              </div>

              {/* Phone Field */}
              <div className="group">
                <label className="block text-sm font-bold mb-2" style={{ color: '#443416' }}>Phone Number (Optional)</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                  style={{ 
                    borderColor: '#ceae6e',
                    '--tw-ring-color': '#ceae6e'
                  } as React.CSSProperties}
                  placeholder="+54 9 123 456 7890"
                />
              </div>

              {/* Message Field */}
              <div className="group">
                <label className="block text-sm font-bold mb-2" style={{ color: '#443416' }}>Tell Us About Your Project *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 resize-none"
                  style={{ 
                    borderColor: '#ceae6e',
                    '--tw-ring-color': '#ceae6e'
                  } as React.CSSProperties}
                  placeholder="What type of translation do you need? What's your timeline? Any specific requirements?"
                />
              </div>

              {/* File Upload Field */}
              <div className="group">
                <label className="block text-sm font-bold mb-2" style={{ color: '#443416' }}>
                  Attach Document (Optional)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.txt,.xls,.xlsx"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:font-bold file:cursor-pointer"
                    style={{ 
                      borderColor: '#ceae6e',
                      '--tw-ring-color': '#ceae6e'
                    } as React.CSSProperties}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Accepted formats: PDF, DOC, DOCX, TXT, XLS, XLSX (max 10MB)
                </p>
                {file && (
                  <div className="mt-2 p-3 rounded bg-green-50 border-l-4" style={{ borderColor: '#ceae6e' }}>
                    <p className="text-sm text-gray-700">
                      📎 {file.name} ({(file.size / 1024).toFixed(2)} KB)
                    </p>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-lg font-bold text-white transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#443416' }}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-spin mr-2">⟳</span>
                    Sending your message...
                  </span>
                ) : (
                  'Send Quote Request'
                )}
              </button>
            </div>

            <p className="text-sm text-gray-500 mt-6 text-center">
              * Required fields. We'll get back to you within 24 hours.
            </p>
          </form>

          {/* Contact Info */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-lg p-6 text-center transition-all duration-500 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f9f7f4' }}>
              <div className="text-4xl mb-4">📧</div>
              <h4 className="font-bold mb-2" style={{ color: '#443416' }}>Email</h4>
              <a href="mailto:mnemonictranslation@gmail.com" className="text-gray-600 hover:underline transition-colors duration-300">
                mnemonictranslation@gmail.com
              </a>
            </div>

            <div className="rounded-lg p-6 text-center transition-all duration-500 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f9f7f4' }}>
              <div className="text-4xl mb-4">🌍</div>
              <h4 className="font-bold mb-2" style={{ color: '#443416' }}>Location</h4>
              <p className="text-gray-600">Argentina</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 mt-8" style={{ background: `linear-gradient(135deg, #443416 0%, #1a1a1a 100%)` }}>
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-6 text-white">Can't find what you need?</h3>
          <p className="text-lg mb-8 text-gray-200">Feel free to reach out directly with any questions</p>
          <a 
            href="mailto:mnemonictranslation@gmail.com"
            className="inline-block px-10 py-4 rounded-lg font-bold text-white transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95"
            style={{ backgroundColor: '#ceae6e', color: '#1a1a1a' }}
          >
            Send an Email
          </a>
        </div>
      </section>

     <Footer />
    </div>
  );
}