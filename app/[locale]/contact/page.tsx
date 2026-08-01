'use client';

import { useTranslations } from 'next-intl';
import { useNavThreshold } from '@/lib/navContext';
import { useEffect } from 'react';
import { useState } from 'react';
import Navigation from '@/app/components/navigation';
import Footer from '@/app/components/footer';
import Reveal from '@/app/components/reveal';

export default function Contact() {
  const t = useTranslations('contact');
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

  const { setScrollThreshold } = useNavThreshold();

    useEffect(() => {
      setScrollThreshold(400); // Disappear after 400px
    }, [setScrollThreshold]);

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
        setError(t('form.fileTooLarge'));
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
        setError(t('form.fileInvalidType'));
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
        setError(t('form.submitError'));
      }
    } catch (error) {
      console.error('Error:', error);
      setError(t('form.genericError'));
    } finally {
      setLoading(false);
    }
  };

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

      {/* Contact Content */}
      <section className="pb-28 md:pb-40 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          {submitted && (
            <div className="mb-8 p-6 border-l-2" style={{ borderColor: '#ceae6e', backgroundColor: '#f9f7f4' }}>
              <h4 className="font-bold" style={{ color: '#443416' }}>{t('success.title')}</h4>
              <p className="text-gray-600">{t('success.message')}</p>
            </div>
          )}

          {error && (
            <div className="mb-8 p-6 border-l-2" style={{ borderColor: '#771023', backgroundColor: '#fef2f2' }}>
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-8 md:p-12" style={{ backgroundColor: '#f9f7f4' }}>
            <div className="space-y-6">
              {/* Name Field */}
              <div className="group">
                <label className="block text-sm font-bold mb-2" style={{ color: '#443416' }}>{t('form.name')}</label>
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
                  placeholder={t('form.namePlaceholder')}
                />
              </div>

              {/* Email Field */}
              <div className="group">
                <label className="block text-sm font-bold mb-2" style={{ color: '#443416' }}>{t('form.email')}</label>
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
                  placeholder={t('form.emailPlaceholder')}
                />
              </div>

              {/* Phone Field */}
              <div className="group">
                <label className="block text-sm font-bold mb-2" style={{ color: '#443416' }}>{t('form.phone')}</label>
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
                  placeholder={t('form.phonePlaceholder')}
                />
              </div>

              {/* Message Field */}
              <div className="group">
                <label className="block text-sm font-bold mb-2" style={{ color: '#443416' }}>{t('form.message')}</label>
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
                  placeholder={t('form.messagePlaceholder')}
                />
              </div>

              {/* File Upload Field */}
              <div className="group">
                <label className="block text-sm font-bold mb-2" style={{ color: '#443416' }}>
                  {t('form.file')}
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
                  {t('form.fileHint')}
                </p>
                {file && (
                  <p className="mt-2 text-sm text-gray-600">
                    {file.name} ({(file.size / 1024).toFixed(2)} KB)
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-lg font-bold text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#443416' }}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-spin mr-2">⟳</span>
                    {t('form.submitting')}
                  </span>
                ) : (
                  t('form.submit')
                )}
              </button>
            </div>

            <p className="text-sm text-gray-500 mt-6 text-center">
              {t('form.requiredNote')}
            </p>
          </form>

          {/* Contact Info */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold mb-2" style={{ color: '#443416' }}>{t('info.emailTitle')}</h4>
              <a href="mailto:mnemonictranslation@gmail.com" className="text-gray-600 hover:underline transition-colors duration-300">
                mnemonictranslation@gmail.com
              </a>
            </div>

            <div>
              <h4 className="font-bold mb-2" style={{ color: '#443416' }}>{t('info.locationTitle')}</h4>
              <p className="text-gray-600">{t('info.location')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 md:py-36 px-4" style={{ background: '#1a1a1a' }}>
        <Reveal className="max-w-3xl mx-auto text-center">
          <h3 className="font-brand-serif text-4xl md:text-5xl mb-8 text-white">{t('cta.title')}</h3>
          <p className="text-lg mb-10 text-gray-400">{t('cta.subtitle')}</p>
          <a
            href="mailto:mnemonictranslation@gmail.com"
            className="inline-block px-10 py-4 rounded-lg font-bold text-lg transition-colors duration-300"
            style={{ backgroundColor: '#ceae6e', color: '#1a1a1a' }}
          >
            {t('cta.button')}
          </a>
        </Reveal>
      </section>

     <Footer />
    </div>
  );
}
