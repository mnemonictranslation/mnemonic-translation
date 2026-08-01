'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useNavThreshold } from '@/lib/navContext';
import { Link } from '@/lib/i18n/navigation';
import Navigation from '@/app/components/navigation';
import Footer from '@/app/components/footer';
import Reveal from '@/app/components/reveal';

const values = ['precision', 'cultural', 'reliability'] as const;

export default function About() {
  const { setScrollThreshold } = useNavThreshold();
  const t = useTranslations('about');

  useEffect(() => {
    setScrollThreshold(400); // Disappear after 400px
  }, [setScrollThreshold]);
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="py-28 md:py-40 px-4 bg-white">
        <Reveal className="max-w-4xl mx-auto">
          <h1 className="font-brand-serif text-5xl md:text-7xl" style={{ color: '#443416' }}>{t('title')}</h1>
        </Reveal>
      </section>

      {/* Who we are */}
      <section className="py-4 px-4 bg-white">
        <Reveal className="max-w-3xl mx-auto pb-20 md:pb-28">
          <p className="font-brand-serif text-2xl md:text-3xl leading-snug mb-6" style={{ color: '#443416' }}>
            {t('whoWeAre.p1')}
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            {t('whoWeAre.p2')}
          </p>
        </Reveal>
      </section>

      {/* Core Values - editorial numbered list */}
      <section className="py-28 md:py-40 px-4" style={{ backgroundColor: '#f9f7f4' }}>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h3 className="font-brand-serif text-4xl md:text-6xl mb-16" style={{ color: '#443416' }}>
              {t('values.title')}
            </h3>
          </Reveal>

          <div>
            {values.map((key, i) => (
              <Reveal key={key} delay={i * 80}>
                <div
                  className="flex items-baseline gap-6 md:gap-10 py-8 md:py-10 border-t last:border-b"
                  style={{ borderColor: '#44341622' }}
                >
                  <span className="font-brand-serif text-xl md:text-2xl shrink-0" style={{ color: '#ceae6e' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <h4 className="font-brand-serif text-3xl md:text-4xl mb-2" style={{ color: '#443416' }}>
                      {t(`values.${key}.title`)}
                    </h4>
                    <p className="text-gray-600 max-w-xl">{t(`values.${key}.description`)}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-28 md:py-40 px-4 bg-white">
        <Reveal className="max-w-3xl mx-auto text-center">
          <h3 className="font-brand-serif text-4xl md:text-5xl mb-8" style={{ color: '#443416' }}>{t('team.title')}</h3>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            {t('team.description')}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 font-bold text-lg border-b-2 pb-1 transition-colors duration-300"
            style={{ color: '#443416', borderColor: '#ceae6e' }}
          >
            {t('team.cta')}
            <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </section>

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
