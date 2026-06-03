'use client';

import Image from 'next/image';
import Navigation from './components/navigation';
import LatestBlogPosts from './components/latestBlogPosts';
import Footer from './components/footer';
import { useEffect } from 'react';
import { useNavThreshold } from '../lib/navContext';

export default function Home() {
  const { setScrollThreshold } = useNavThreshold();

  useEffect(() => {
    setScrollThreshold(800); // Full screen
  }, [setScrollThreshold]);

  return (
    <div className="min-h-screen bg-white w-full">
      {/* Use Navigation Component */}
      <Navigation />



      {/* Hero Section - Full Screen */}
<section className="relative -mt-[95px] w-screen h-screen overflow-hidden bg-cover bg-center bg-no-repeat flex items-center justify-center" style={{
  backgroundImage: 'url(/images/hero-image-1.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  
}}>
  {/* Overlay for readability */}
  <div className="absolute inset-0 bg-black/40"></div>
  
  <div className="max-w-6xl mx-auto text-center relative z-10 px-4">
    <h2 className="text-6xl md:text-7xl font-bold mb-6 leading-tight text-white" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
      Professional Translation & Localization
    </h2>
    <p className="text-xl md:text-2xl mb-12 text-white max-w-3xl mx-auto" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
      Expert translation services for games, science, and certified documents
    </p>
    <a 
      href="/contact" 
      className="inline-block px-10 py-4 rounded-lg font-bold text-white transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95"
      style={{ backgroundColor: '#443416' }}
    >
      Get a Free Quote
    </a>
  </div>
</section>

      {/* Services Overview */}
      <section className="py-24 px-4" style={{ backgroundColor: '#f9f7f4' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-bold mb-4" style={{ color: '#443416' }}>Our Services</h3>
            <div className="w-24 h-1 mx-auto rounded" style={{ backgroundColor: '#ceae6e' }}></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Service Card 1 */}
            <div 
              className="group rounded-lg p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
              style={{ 
                backgroundColor: '#ffffff',
                borderLeft: '6px solid #ceae6e'
              }}
            >
              <div className="mb-4 text-4xl transition-transform duration-300 group-hover:scale-110 inline-block">🏛️</div>
              <h4 className="text-2xl font-bold mb-3 transition-colors duration-300" style={{ color: '#443416' }}>
                Sworn Translation
              </h4>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                Official certified translations for legal and government documents
              </p>
            </div>

            {/* Service Card 2 */}
            <div 
              className="group rounded-lg p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
              style={{ 
                backgroundColor: '#ffffff',
                borderLeft: '6px solid #771023'
              }}
            >
              <div className="mb-4 text-4xl transition-transform duration-300 group-hover:scale-110 inline-block">🎮</div>
              <h4 className="text-2xl font-bold mb-3 transition-colors duration-300" style={{ color: '#443416' }}>
                Videogame Localization
              </h4>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                Complete game localization including dialogue, UI, and cultural adaptation
              </p>
            </div>

            {/* Service Card 3 */}
            <div 
              className="group rounded-lg p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
              style={{ 
                backgroundColor: '#ffffff',
                borderLeft: '6px solid #ceae6e'
              }}
            >
              <div className="mb-4 text-4xl transition-transform duration-300 group-hover:scale-110 inline-block">🔬</div>
              <h4 className="text-2xl font-bold mb-3 transition-colors duration-300" style={{ color: '#443416' }}>
                Scientific & Technical
              </h4>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                Specialized translation for scientific papers, manuals, and technical documentation
              </p>
            </div>

            {/* Service Card 4 */}
            <div 
              className="group rounded-lg p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
              style={{ 
                backgroundColor: '#ffffff',
                borderLeft: '6px solid #771023'
              }}
            >
              <div className="mb-4 text-4xl transition-transform duration-300 group-hover:scale-110 inline-block">🎤</div>
              <h4 className="text-2xl font-bold mb-3 transition-colors duration-300" style={{ color: '#443416' }}>
                Interpreting
              </h4>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                Professional interpretation services for meetings, conferences, and events
              </p>
            </div>
          </div>
        </div>
      </section>

       {/* Latest Blog Posts */}
      <LatestBlogPosts />

      {/* CTA Section */}
      <section className="py-20 px-4" style={{ background: `linear-gradient(135deg, #443416 0%, #1a1a1a 100%)` }}>
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-6 text-white">Ready to Start Your Project?</h3>
          <p className="text-lg mb-8 text-gray-200">Get a free quote from our expert translators in less than 24 hours</p>
          <a 
            href="/contact"
            className="inline-block px-10 py-4 rounded-lg font-bold text-white transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95"
            style={{ backgroundColor: '#ceae6e', color: '#1a1a1a' }}
          >
            Get Your Free Quote Now
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}