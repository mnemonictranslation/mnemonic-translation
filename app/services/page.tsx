import Image from 'next/image';
export default function Services() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
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

      {/* Services Content */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12" style={{ color: '#443416' }}>Our Translation Services</h2>
          
          <div className="space-y-8">
            <div className="border-l-4 pl-6" style={{ borderColor: '#ceae6e' }}>
              <h3 className="text-2xl font-bold mb-2" style={{ color: '#443416' }}>Sworn Translation</h3>
              <p className="text-gray-600">Official certified translations for legal contracts, government documents, and official records. Our sworn translators are certified and recognized by legal authorities.</p>
            </div>

            <div className="border-l-4 pl-6" style={{ borderColor: '#ceae6e' }}>
              <h3 className="text-2xl font-bold mb-2" style={{ color: '#443416' }}>Videogame Localization</h3>
              <p className="text-gray-600">Complete game localization services covering dialogue translation, UI/UX adaptation, cultural references, and context-appropriate language. We maintain the original tone and humor of your game.</p>
            </div>

            <div className="border-l-4 pl-6" style={{ borderColor: '#ceae6e' }}>
              <h3 className="text-2xl font-bold mb-2" style={{ color: '#443416' }}>Scientific & Technical Translation</h3>
              <p className="text-gray-600">Specialized translation for research papers, technical manuals, patents, and scientific documentation. Our translators have expertise in various technical fields.</p>
            </div>

            <div className="border-l-4 pl-6" style={{ borderColor: '#ceae6e' }}>
              <h3 className="text-2xl font-bold mb-2" style={{ color: '#443416' }}>Interpreting Services</h3>
              <p className="text-gray-600">Professional interpretation for conferences, business meetings, interviews, and events. Simultaneous and consecutive interpretation available.</p>
            </div>
          </div>

          <div className="mt-12 p-6 rounded text-center" style={{ backgroundColor: '#ceae6e' }}>
            <p className="text-black mb-4 font-bold">Ready to get started?</p>
            <a href="/contact" className="bg-black text-white px-8 py-3 rounded font-bold hover:bg-gray-800">
              Request a Quote
            </a>
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