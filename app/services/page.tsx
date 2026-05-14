import Image from 'next/image';
import Navigation from '../components/navigation';
import Footer from '../components/footer';

export default function Services() {
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

      <Footer />
    </div>
  );
}