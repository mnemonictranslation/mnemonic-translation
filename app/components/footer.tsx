'use client';

export default function Footer() {
  return (
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
  );
}