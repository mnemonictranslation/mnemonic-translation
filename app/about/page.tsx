import Image from 'next/image';
export default function About() {
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

      {/* About Content */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-8" style={{ color: '#443416' }}>About Mnemonic</h2>
          <p className="text-gray-600 text-lg mb-6">
            Mnemonic is a specialized translation agency offering expert services in sworn translation, videogame localization, scientific and technical translation, and professional interpreting. We combine linguistic precision with cultural expertise.
          </p>
          <p className="text-gray-600 text-lg mb-12">
            Our mission is to deliver accurate, culturally-adapted translations that help our clients communicate effectively across languages and markets.
          </p>

          <h3 className="text-3xl font-bold mb-8" style={{ color: '#443416' }}>Our Team</h3>
          <p className="text-gray-600 text-lg">Team information coming soon. Check back soon to meet our expert translators and interpreters.</p>
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