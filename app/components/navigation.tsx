'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Squeeze } from 'hamburger-react';
import { Link } from '@/lib/i18n/navigation';
import { useNavThreshold } from '@/lib/navContext';
import LanguageToggle from './languageToggle';

export default function Navigation({
  showLogo = true,
  showNavLinks = true,
  showLanguageToggle = true,
  mobileTransparent = false,
}: {
  showLogo?: boolean;
  showNavLinks?: boolean;
  showLanguageToggle?: boolean;
  mobileTransparent?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { scrollThreshold } = useNavThreshold();
  const t = useTranslations('nav');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
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
      className={`${mobileTransparent ? 'bg-transparent' : 'bg-white'} md:bg-transparent border-b-0 sticky top-0 z-50 shadow-none relative transition-all duration-300`}
      style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
      }}
    >
       <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-4">
        {showLogo ? (
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity duration-300">
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
          </Link>
        ) : (
          <div aria-hidden="true" />
        )}

        <div className="flex items-center gap-6">
          {showNavLinks && (
            <ul className="hidden md:flex gap-8 text-base font-bold uppercase tracking-[0.1em]">
              <li>
                <Link href="/" className="text-[#443416] hover:text-[#ceae6e] transition-colors duration-300">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[#443416] hover:text-[#ceae6e] transition-colors duration-300">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-[#443416] hover:text-[#ceae6e] transition-colors duration-300">
                  {t('blog')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#443416] hover:text-[#ceae6e] transition-colors duration-300">
                  {t('contact')}
                </Link>
              </li>
            </ul>
          )}

          {showLanguageToggle && (
            <LanguageToggle variant="dark" className="text-base ml-4 pl-4 border-l border-black/10" />
          )}

          {showNavLinks && (
            <div className="md:hidden -mr-3">
              <Squeeze
                toggled={isOpen}
                toggle={setIsOpen}
                color="#443416"
                size={20}
                distance="sm"
                duration={0.4}
                easing="ease-in-out"
                rounded={false}
                hideOutline={false}
                label={isOpen ? t('close') : t('menu')}
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile dropdown menu - slides down from navbar */}
      {showNavLinks && (
        <div
          className="md:hidden absolute left-0 right-0 shadow-lg overflow-hidden transition-all duration-500 ease-in-out"
          style={{
            backgroundColor: '#f9f7f4',
            borderTop: '1px solid #44341622',
            top: '100%',
            maxHeight: isOpen ? '400px' : '0'
          }}
        >
          <ul className="flex flex-col px-4 text-base font-bold uppercase tracking-[0.1em]">
            <li>
              <Link href="/" className="block py-4 border-b text-[#443416] hover:text-[#ceae6e] transition-colors duration-300" style={{ borderColor: '#44341622' }} onClick={() => setIsOpen(false)}>
                {t('home')}
              </Link>
            </li>
            <li>
              <Link href="/about" className="block py-4 border-b text-[#443416] hover:text-[#ceae6e] transition-colors duration-300" style={{ borderColor: '#44341622' }} onClick={() => setIsOpen(false)}>
                {t('about')}
              </Link>
            </li>
            <li>
              <Link href="/blog" className="block py-4 border-b text-[#443416] hover:text-[#ceae6e] transition-colors duration-300" style={{ borderColor: '#44341622' }} onClick={() => setIsOpen(false)}>
                {t('blog')}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="block py-4 text-[#443416] hover:text-[#ceae6e] transition-colors duration-300" onClick={() => setIsOpen(false)}>
                {t('contact')}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
