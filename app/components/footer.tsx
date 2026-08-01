'use client';

import NextLink from 'next/link';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-black text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="font-bold mb-4" style={{ color: '#ceae6e' }}>{t('quickLinks')}</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/about" className="hover:text-white transition-colors duration-300">{t('about')}</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors duration-300">{t('blog')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4" style={{ color: '#ceae6e' }}>{t('contactTitle')}</h4>
            <p className="text-gray-400">mnemonictranslation@gmail.com</p>
          </div>
          <div>
            <h4 className="font-bold mb-4" style={{ color: '#ceae6e' }}>{t('followUs')}</h4>
            <p className="text-gray-400">{t('comingSoon')}</p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex justify-between items-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Mnemonic. {t('rights')}</p>
          <NextLink
            href="/admin"
            className="text-xs text-gray-600 hover:text-gray-400 transition-colors duration-300"
          >
            {t('admin')}
          </NextLink>
        </div>
      </div>
    </footer>
  );
}
