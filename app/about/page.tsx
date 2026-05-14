import Image from 'next/image';
import Navigation from '../components/navigation';
import Footer from '../components/footer';

export default function About() {
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
          <h2 className="text-5xl md:text-6xl font-bold mb-4" style={{ color: '#443416' }}>About Mnemonic</h2>
          <div className="w-24 h-1 rounded" style={{ backgroundColor: '#ceae6e' }}></div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h3 className="text-3xl font-bold mb-6" style={{ color: '#443416' }}>Who We Are</h3>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Mnemonic is a specialized translation agency offering expert services in sworn translation, videogame localization, scientific and technical translation, and professional interpreting. We combine linguistic precision with cultural expertise to deliver translations that truly resonate with your target audience.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our mission is simple: to deliver accurate, culturally-adapted translations that help our clients communicate effectively across languages and markets. Whether you need a legal document certified, a game localized for new regions, or scientific research translated for international publication, we have the expertise you need.
            </p>
          </div>

          {/* Core Values */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-8" style={{ color: '#443416' }}>Our Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div 
                className="group rounded-lg p-6 transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                style={{ backgroundColor: '#f9f7f4' }}
              >
                <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">✓</div>
                <h4 className="text-xl font-bold mb-3" style={{ color: '#443416' }}>Precision</h4>
                <p className="text-gray-600">We ensure every translation is accurate and faithful to the original meaning and intent.</p>
              </div>
              
              <div 
                className="group rounded-lg p-6 transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                style={{ backgroundColor: '#f9f7f4' }}
              >
                <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">🌍</div>
                <h4 className="text-xl font-bold mb-3" style={{ color: '#443416' }}>Cultural Expertise</h4>
                <p className="text-gray-600">We adapt content for different cultures, ensuring your message resonates locally.</p>
              </div>
              
              <div 
                className="group rounded-lg p-6 transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                style={{ backgroundColor: '#f9f7f4' }}
              >
                <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">⏱️</div>
                <h4 className="text-xl font-bold mb-3" style={{ color: '#443416' }}>Reliability</h4>
                <p className="text-gray-600">We deliver on time, every time, with consistent quality you can depend on.</p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div>
            <h3 className="text-3xl font-bold mb-8" style={{ color: '#443416' }}>Our Team</h3>
            <div 
              className="rounded-lg p-8 text-center"
              style={{ backgroundColor: '#f9f7f4' }}
            >
              <p className="text-gray-600 text-lg mb-6">
                We're building a world-class team of expert translators and interpreters. Meet our team members as we grow!
              </p>
              <a 
                href="/contact"
                className="inline-block px-8 py-3 rounded-lg font-bold text-white transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
                style={{ backgroundColor: '#443416' }}
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 mt-8" style={{ background: `linear-gradient(135deg, #443416 0%, #1a1a1a 100%)` }}>
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-6 text-white">Partner With Mnemonic</h3>
          <p className="text-lg mb-8 text-gray-200">Let's help your message reach the world</p>
          <a 
            href="/contact"
            className="inline-block px-10 py-4 rounded-lg font-bold text-white transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95"
            style={{ backgroundColor: '#ceae6e', color: '#1a1a1a' }}
          >
            Start Your Project
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}