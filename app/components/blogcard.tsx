'use client';

import { Link } from '@/lib/i18n/navigation';

interface BlogCardProps {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  index?: number;
}

export default function BlogCard({ slug, title, date, category, excerpt, index = 0 }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group flex flex-col md:flex-row items-baseline gap-2 md:gap-10 py-8 md:py-10 border-t last:border-b transition-colors duration-300"
      style={{ borderColor: '#44341622' }}
    >
      <span className="font-brand-serif text-xl md:text-2xl shrink-0" style={{ color: '#ceae6e' }}>
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#443416' }}>
            {category}
          </span>
          <span className="text-xs text-gray-500">{date}</span>
        </div>
        <h3 className="font-brand-serif text-3xl md:text-4xl mb-2" style={{ color: '#443416' }}>
          {title}
        </h3>
        <p className="text-gray-600 max-w-xl">{excerpt}</p>
      </div>
      <span
        className="hidden md:block text-2xl opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0"
        style={{ color: '#443416' }}
        aria-hidden="true"
      >
        →
      </span>
    </Link>
  );
}
