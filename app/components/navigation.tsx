'use client';

import { useState, useEffect, useRef } from 'react';
import { useNavThreshold } from '../../lib/navContext';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { scrollThreshold } = useNavThreshold();

  useEffect(() => {
    console.log('Current scroll threshold:', scrollThreshold);
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      console.log('Scroll Y:', currentScrollY, 'Threshold:', scrollThreshold);
      if (currentScrollY > scrollThreshold) {
        if (currentScrollY > lastScrollY) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, scrollThreshold]);

  return (
    <nav 
      className="bg-transparent text-white border-b-0 sticky top-0 z-50 shadow-none relative transition-all duration-300 backdrop-blur-sm"
      style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
      }}
    >
       <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-4">
        <a href="/" className="flex items-center hover:opacity-80 transition-opacity duration-300">
          {/* Mobile logo - only face */}
          <img
            src="/images/mnemonic-face.png"
            alt="Mnemonic"
            width={50}
            height={50}
            className="md:hidden"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          
          {/* Desktop logo - full logo */}
          <img
            src="/images/mnemonic-logo.png"
            alt="Mnemonic"
            width={200}
            height={62}
            className="hidden md:block"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </a>

        <ul className="hidden md:flex gap-8 text-base">
          <li>
            <a href="/" className="hover:text-amber-600 transition-colors duration-300 relative group text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300" style={{ backgroundColor: '#ceae6e' }}></span>
            </a>
          </li>
          <li>
            <a href="/services" className="hover:text-amber-600 transition-colors duration-300 relative group text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300" style={{ backgroundColor: '#ceae6e' }}></span>
            </a>
          </li>
          <li>
            <a href="/about" className="hover:text-amber-600 transition-colors duration-300 relative group text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300" style={{ backgroundColor: '#ceae6e' }}></span>
            </a>
          </li>
          <li>
            <a href="/blog" className="hover:text-amber-600 transition-colors duration-300 relative group text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
              Blog
              <span className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300" style={{ backgroundColor: '#ceae6e' }}></span>
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:text-amber-600 transition-colors duration-300 relative group text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300" style={{ backgroundColor: '#ceae6e' }}></span>
            </a>
          </li>
        </ul>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={isOpen ? "block w-6 h-0.5 bg-white rotate-45 translate-y-2 transition-all duration-300" : "block w-6 h-0.5 bg-white transition-all duration-300"}></span>
          <span className={isOpen ? "block w-6 h-0.5 bg-white opacity-0 transition-all duration-300" : "block w-6 h-0.5 bg-white transition-all duration-300"}></span>
          <span className={isOpen ? "block w-6 h-0.5 bg-white -rotate-45 -translate-y-2 transition-all duration-300" : "block w-6 h-0.5 bg-white transition-all duration-300"}></span>
        </button>
      </div>

      {/* Mobile dropdown menu - slides down from navbar */}
      <div 
        className="md:hidden absolute left-0 right-0 bg-black/80 backdrop-blur-md shadow-lg overflow-hidden transition-all duration-500 ease-in-out"
        style={{ 
          borderTop: '2px solid #ceae6e',
          top: '100%',
          maxHeight: isOpen ? '400px' : '0'
        }}
      >
        <ul className="flex flex-col px-4 pb-4 gap-4 text-base">
          <li className="pt-2">
            <a href="/" className="block text-white hover:text-amber-600 transition-colors duration-300" onClick={() => setIsOpen(false)}>
              Home
            </a>
          </li>
          <li>
            <a href="/services" className="block text-white hover:text-amber-600 transition-colors duration-300" onClick={() => setIsOpen(false)}>
              Services
            </a>
          </li>
          <li>
            <a href="/about" className="block text-white hover:text-amber-600 transition-colors duration-300" onClick={() => setIsOpen(false)}>
              About
            </a>
          </li>
          <li>
            <a href="/blog" className="block text-white hover:text-amber-600 transition-colors duration-300" onClick={() => setIsOpen(false)}>
              Blog
            </a>
          </li>
          <li>
            <a href="/contact" className="block text-white hover:text-amber-600 transition-colors duration-300" onClick={() => setIsOpen(false)}>
              Contact
            </a>
          </li>
        </ul>
      </div>  
    </nav>
  );
}