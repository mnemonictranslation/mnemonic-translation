'use client';

import Image from 'next/image';

export default function Navigation() {
  return (
    <nav className="bg-white text-black border-b-2 sticky top-0 z-50 shadow-sm" style={{ borderColor: '#ceae6e' }}>
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-4">
        {/* Logo on both mobile and desktop */}
        <a href="/" className="flex items-center hover:opacity-80 transition-opacity duration-300">
          <Image 
            src="/images/mnemonic-face.png" 
            alt="Mnemonic" 
            width={50}
            height={50}
            priority
          />
        </a>

        {/* Navigation links */}
        <ul className="flex gap-4 md:gap-8 text-sm md:text-base">
          <li><a href="/" className="hover:text-amber-600 transition-colors duration-300 relative group">Home<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 group-hover:w-full transition-all duration-300" style={{ backgroundColor: '#ceae6e' }}></span></a></li>
          <li><a href="/services" className="hover:text-amber-600 transition-colors duration-300 relative group">Services<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 group-hover:w-full transition-all duration-300" style={{ backgroundColor: '#ceae6e' }}></span></a></li>
          <li><a href="/about" className="hover:text-amber-600 transition-colors duration-300 relative group">About<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 group-hover:w-full transition-all duration-300" style={{ backgroundColor: '#ceae6e' }}></span></a></li>
          <li><a href="/blog" className="hover:text-amber-600 transition-colors duration-300 relative group">Blog<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 group-hover:w-full transition-all duration-300" style={{ backgroundColor: '#ceae6e' }}></span></a></li>
          <li><a href="/contact" className="hover:text-amber-600 transition-colors duration-300 relative group">Contact<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 group-hover:w-full transition-all duration-300" style={{ backgroundColor: '#ceae6e' }}></span></a></li>
        </ul>
      </div>
    </nav>
  );
}