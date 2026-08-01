'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import Navigation from '@/app/components/navigation';
import LatestBlogPosts from '@/app/components/latestBlogPosts';
import Footer from '@/app/components/footer';
import Reveal from '@/app/components/reveal';
import LanguageToggle from '@/app/components/languageToggle';
import { useEffect } from 'react';
import { useNavThreshold } from '@/lib/navContext';

const serviceSlugs = [
  { key: 'sworn', slug: 'sworn-translation', accent: '#ceae6e' },
  { key: 'videogame', slug: 'videogame-localization', accent: '#771023' },
  { key: 'scientific', slug: 'scientific-technical-translation', accent: '#ceae6e' },
  { key: 'interpreting', slug: 'interpreting-services', accent: '#771023' },
] as const;

export default function Home() {
  const { setScrollThreshold } = useNavThreshold();
  const t = useTranslations('home');
  const tNav = useTranslations('nav');

  useEffect(() => {
    setScrollThreshold(800); // Full screen
  }, [setScrollThreshold]);

  return (
    <div className="min-h-screen bg-white w-full">
      <Navigation showLogo={false} showNavLinks={false} showLanguageToggle={false} mobileTransparent />

      {/* Hero Section - split editorial layout */}
      <section className="relative -mt-8 w-full min-h-screen grid grid-cols-1 lg:grid-cols-[3fr_2fr]">
        <div
          className="flex items-center justify-center px-8 pt-32 pb-10 lg:py-0 order-1"
          style={{ backgroundColor: '#f9f7f4' }}
        >
          <div className="max-w-3xl">
            <h2 className="mb-16">
              <img
                src="/images/mnemonic-logo.png"
                alt="Mnemonic"
                width={720}
                height={223}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </h2>
            <ul className="flex flex-wrap gap-x-10 gap-y-3 text-base font-bold uppercase tracking-[0.15em]">
              <li>
                <Link href="/about" className="text-[#443416] hover:text-[#ceae6e] transition-colors duration-300">
                  {tNav('about')}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-[#443416] hover:text-[#ceae6e] transition-colors duration-300">
                  {tNav('blog')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#443416] hover:text-[#ceae6e] transition-colors duration-300">
                  {tNav('contact')}
                </Link>
              </li>
            </ul>
            <LanguageToggle variant="dark" className="text-base uppercase tracking-[0.15em] mt-6" />
          </div>
        </div>

        <div
          className="relative h-36 lg:h-auto order-2"
          style={{
            backgroundColor: '#f9f7f4',
            backgroundImage: "url('/patterns/autumn.svg')",
            backgroundSize: '220px 60px',
          }}
        ></div>
      </section>

      {/* Mission statement */}
      <section className="py-28 md:py-40 px-4 bg-white">
        <Reveal className="max-w-4xl mx-auto text-center">
          <p className="font-brand-serif text-3xl md:text-5xl leading-snug" style={{ color: '#443416' }}>
            {t('mission')}
          </p>
        </Reveal>
      </section>

      {/* Services - editorial numbered list */}
      <section id="services-overview" className="py-28 md:py-40 px-4" style={{ backgroundColor: '#f9f7f4' }}>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h3 className="font-brand-serif text-4xl md:text-6xl mb-16" style={{ color: '#443416' }}>
              {t('services.title')}
            </h3>
          </Reveal>

          <div>
            {serviceSlugs.map((service, i) => (
              <Reveal key={service.key} delay={i * 80}>
                <Link
                  href={`/blog/${service.slug}`}
                  className="group flex items-baseline gap-6 md:gap-10 py-8 md:py-10 border-t last:border-b transition-colors duration-300"
                  style={{ borderColor: '#44341622' }}
                >
                  <span className="font-brand-serif text-xl md:text-2xl shrink-0" style={{ color: '#ceae6e' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <h4 className="font-brand-serif text-3xl md:text-4xl mb-2 transition-colors duration-300" style={{ color: '#443416' }}>
                      {t(`services.${service.key}.title`)}
                    </h4>
                    <p className="text-gray-600 max-w-xl">{t(`services.${service.key}.description`)}</p>
                  </div>
                  <span
                    className="hidden md:block text-2xl opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0"
                    style={{ color: '#443416' }}
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <LatestBlogPosts />

      {/* CTA Section */}
      <section className="py-28 md:py-36 px-4" style={{ background: '#1a1a1a' }}>
        <Reveal className="max-w-3xl mx-auto text-center">
          <h3 className="font-brand-serif text-4xl md:text-5xl mb-8 text-white">{t('cta.title')}</h3>
          <p className="text-lg mb-10 text-gray-400">{t('cta.subtitle')}</p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 rounded-lg font-bold text-lg transition-colors duration-300"
            style={{ backgroundColor: '#ceae6e', color: '#1a1a1a' }}
          >
            {t('cta.button')}
          </Link>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
