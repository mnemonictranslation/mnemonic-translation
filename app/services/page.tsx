import Image from 'next/image';

export default function Services() {
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
      <section className="relative py-20 px-4">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            background: `linear-gradient(135deg, #ceae6e 0%, #443416 100%)`,
          }}
        ></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-4" style={{ color: '#443416' }}>Our Translation Services</h2>
          <div className="w-24 h-1 rounded" style={{ backgroundColor: '#ceae6e' }}></div>
        </div>
      </section>

      {/* Services Content */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-8">
            {/* Service 1 */}
            <div 
              className="group rounded-lg p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
              style={{ 
                backgroundColor: '#f9f7f4',
                borderLeft: '8px solid #ceae6e'
              }}
            >
              <div className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110 inline-block">🏛️</div>
              <h3 className="text-3xl font-bold mb-4 transition-colors duration-300" style={{ color: '#443416' }}>
                Sworn Translation
              </h3>
              <p className="text-gray-600 text-lg mb-4 group-hover:text-gray-700 transition-colors duration-300">
                Official certified translations for legal, governmental, and official records. Our sworn translators are certified and recognized by legal authorities, ensuring your documents meet all official requirements.
              </p>
              <ul className="text-gray-600 space-y-2 ml-6">
                <li>✓ Legal contracts and agreements</li>
                <li>✓ Government documents</li>
                <li>✓ Certified and notarized</li>
              </ul>
            </div>

            {/* Service 2 */}
            <div 
              className="group rounded-lg p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
              style={{ 
                backgroundColor: '#f9f7f4',
                borderLeft: '8px solid #771023'
              }}
            >
              <div className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110 inline-block">🎮</div>
              <h3 className="text-3xl font-bold mb-4 transition-colors duration-300" style={{ color: '#443416' }}>
                Videogame Localization
              </h3>
              <p className="text-gray-600 text-lg mb-4 group-hover:text-gray-700 transition-colors duration-300">
                Complete game localization services covering dialogue translation, UI/UX adaptation, cultural references, and context-appropriate language. We maintain the original tone, humor, and spirit of your game.
              </p>
              <ul className="text-gray-600 space-y-2 ml-6">
                <li>✓ Dialogue and narrative translation</li>
                <li>✓ UI/UX text localization</li>
                <li>✓ Cultural adaptation</li>
              </ul>
            </div>

            {/* Service 3 */}
            <div 
              className="group rounded-lg p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
              style={{ 
                backgroundColor: '#f9f7f4',
                borderLeft: '8px solid #ceae6e'
              }}
            >
              <div className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110 inline-block">🔬</div>
              <h3 className="text-3xl font-bold mb-4 transition-colors duration-300" style={{ color: '#443416' }}>
                Scientific & Technical Translation
              </h3>
              <p className="text-gray-600 text-lg mb-4 group-hover:text-gray-700 transition-colors duration-300">
                Specialized translation for research papers, technical manuals, patents, and scientific documentation. Our translators have expertise in various technical fields and scientific domains.
              </p>
              <ul className="text-gray-600 space-y-2 ml-6">
                <li>✓ Research papers and journals</li>
                <li>✓ Technical manuals and guides</li>
                <li>✓ Patents and specifications</li>
              </ul>
            </div>

            {/* Service 4 */}
            <div 
              className="group rounded-lg p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
              style={{ 
                backgroundColor: '#f9f7f4',
                borderLeft: '8px solid #771023'
              }}
            >
              <div className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110 inline-block">🎤</div>
              <h3 className="text-3xl font-bold mb-4 transition-colors duration-300" style={{ color: '#443416' }}>
                Interpreting Services
              </h3>
              <p className="text-gray-600 text-lg mb-4 group-hover:text-gray-700 transition-colors duration-300">
                Professional interpretation for conferences, business meetings, interviews, and events. Both simultaneous and consecutive interpretation available with experienced, certified interpreters.
              </p>
              <ul className="text-gray-600 space-y-2 ml-6">
                <li>✓ Simultaneous interpretation</li>
                <li>✓ Consecutive interpretation</li>
                <li>✓ Conference & event coverage</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4" style={{ background: `linear-gradient(135deg, #443416 0%, #1a1a1a 100%)` }}>
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-6 text-white">Ready to Get Started?</h3>
          <p className="text-lg mb-8 text-gray-200">Choose the service you need and get a free quote</p>
          <a 
            href="/contact"
            className="inline-block px-10 py-4 rounded-lg font-bold text-white transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95"
            style={{ backgroundColor: '#ceae6e', color: '#1a1a1a' }}
          >
            Request a Quote
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