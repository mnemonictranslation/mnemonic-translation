import Image from 'next/image';
export default function Home() {
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

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black to-amber-900 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-4">Professional Translation & Localization</h2>
          <p className="text-xl mb-8">Expert translation services for games, science, and certified documents</p>
          <a href="/contact" className="bg-amber-600 text-white px-8 py-3 rounded font-bold hover:bg-amber-700">
            Get a Quote
          </a>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-12" style={{ color: '#443416' }}>Our Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-l-4 p-6 hover:shadow-lg" style={{ borderColor: '#ceae6e' }}>
              <h4 className="text-2xl font-bold mb-3" style={{ color: '#443416' }}>Sworn Translation</h4>
              <p className="text-gray-600">Official certified translations for legal and government documents</p>
            </div>
            <div className="border-l-4 p-6 hover:shadow-lg" style={{ borderColor: '#ceae6e' }}>
              <h4 className="text-2xl font-bold mb-3" style={{ color: '#443416' }}>Videogame Localization</h4>
              <p className="text-gray-600">Complete game localization including dialogue, UI, and cultural adaptation</p>
            </div>
            <div className="border-l-4 p-6 hover:shadow-lg" style={{ borderColor: '#ceae6e' }}>
              <h4 className="text-2xl font-bold mb-3" style={{ color: '#443416' }}>Scientific & Technical</h4>
              <p className="text-gray-600">Specialized translation for scientific papers, manuals, and technical documentation</p>
            </div>
            <div className="border-l-4 p-6 hover:shadow-lg" style={{ borderColor: '#ceae6e' }}>
              <h4 className="text-2xl font-bold mb-3" style={{ color: '#443416' }}>Interpreting</h4>
              <p className="text-gray-600">Professional interpretation services for meetings, conferences, and events</p>
            </div>
          </div>
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