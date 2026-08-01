'use client';

import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/lib/i18n/navigation';

export default function LanguageToggle({
  variant = 'light',
  className = '',
}: {
  variant?: 'light' | 'dark';
  className?: string;
}) {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (nextLocale: 'en' | 'es') => {
    router.replace(pathname, { locale: nextLocale });
  };

  const color = variant === 'light' ? '#ffffff' : '#443416';
  const textShadow = variant === 'light' ? '1px 1px 2px rgba(0,0,0,0.5)' : undefined;

  return (
    <div
      className={`flex items-center gap-1.5 font-bold ${className}`}
      style={{ color, textShadow }}
      role="group"
      aria-label={t('languageSelector')}
    >
      <button
        type="button"
        onClick={() => switchLocale('es')}
        className="transition-colors duration-300"
        style={{ color: locale === 'es' ? '#ceae6e' : undefined, opacity: locale === 'es' ? 1 : 0.5 }}
        aria-pressed={locale === 'es'}
      >
        ES
      </button>
      <span aria-hidden="true" className="opacity-50">/</span>
      <button
        type="button"
        onClick={() => switchLocale('en')}
        className="transition-colors duration-300"
        style={{ color: locale === 'en' ? '#ceae6e' : undefined, opacity: locale === 'en' ? 1 : 0.5 }}
        aria-pressed={locale === 'en'}
      >
        EN
      </button>
    </div>
  );
}
