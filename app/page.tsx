import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white text-black p-4 border-b-2 sticky top-0 z-50 shadow-sm" style={{ borderColor: '#ceae6e' }}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <a href="/" className="flex items-center hover:opacity-80 transition-opacity duration-300">
            <Image 
              src="/images/mnemonic-logo.png" 
              alt="Mnemonic" 
              width={200}
              height={64}
              priority
            />
          </a>
          <ul className="flex gap-8">
            <li><a href="/" className="hover:text-amber-600 transition-colors duration-300 relative group">Home<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 group-hover:w-full transition-all duration-300" style={{ backgroundColor: '#ceae6e' }}></span></a></li>
            <li><a href="/services" className="hover:text-amber-600 transition-colors duration-300 relative group">Services<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 group-hover:w-full transition-all duration-300" style={{ backgroundColor: '#ceae6e' }}></span></a></li>
            <li><a href="/about" className="hover:text-amber-600 transition-colors duration-300 relative group">About<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 group-hover:w-full transition-all duration-300" style={{ backgroundColor: '#ceae6e' }}></span></a></li>
            <li><a href="/blog" className="hover:text-amber-600 transition-colors duration-300 relative group">Blog<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 group-hover:w-full transition-all duration-300" style={{ backgroundColor: '#ceae6e' }}></span></a></li>
            <li><a href="/contact" className="hover:text-amber-600 transition-colors duration-300 relative group">Contact<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 group-hover:w-full transition-all duration-300" style={{ backgroundColor: '#ceae6e' }}></span></a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-32 px-4 overflow-hidden">
        {/* Animated background gradient */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            background: `linear-gradient(135deg, #ceae6e 0%, #443416 100%)`,
          }}
        ></div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-6xl md:text-7xl font-bold mb-6 leading-tight" style={{ color: '#443416' }}>
            Professional Translation & Localization
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-gray-600 max-w-3xl mx-auto">
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

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4" style={{ color: '#ceae6e' }}>Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/services" className="hover:text-white transition-colors duration-300">Services</a></li>
                <li><a href="/about" className="hover:text-white transition-colors duration-300">About</a></li>
                <li><a href="/blog" className="hover:text-white transition-colors duration-300">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4" style={{ color: '#ceae6e' }}>Contact</h4>
              <p className="text-gray-400">mnemonictranslation@gmail.com</p>
            </div>
            <div>
              <h4 className="font-bold mb-4" style={{ color: '#ceae6e' }}>Follow Us</h4>
              <p className="text-gray-400">Coming soon</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Mnemonic. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}