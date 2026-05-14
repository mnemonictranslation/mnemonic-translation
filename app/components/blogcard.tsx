'use client';

interface BlogCardProps {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  index?: number;
}

export default function BlogCard({ slug, title, date, category, excerpt, index = 0 }: BlogCardProps) {
  const categoryColor = category === 'Business' ? '#ceae6e' : category === 'Languages' ? '#771023' : '#443416';

  return (
    <article 
      className="group rounded-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
      style={{ backgroundColor: '#f9f7f4' }}
    >
      <div className="p-8">
        <div className="flex flex-wrap gap-3 mb-4">
          <span 
            className="text-xs font-bold px-3 py-1 rounded-full text-white transition-all duration-300"
            style={{ backgroundColor: categoryColor }}
          >
            {category}
          </span>
          <span className="text-xs text-gray-500 px-3 py-1">
            {date}
          </span>
        </div>

        <h3 className="text-3xl font-bold mb-4 transition-colors duration-300 group-hover:opacity-80" style={{ color: '#443416' }}>
          <a href={`/blog/${slug}`} className="hover:underline">
            {title}
          </a>
        </h3>

        <p className="text-lg text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
          {excerpt}
        </p>

        <a 
          href={`/blog/${slug}`} 
          className="inline-flex items-center font-bold transition-all duration-300 group-hover:translate-x-2"
          style={{ color: '#ceae6e' }}
        >
          Read More
          <span className="ml-2">→</span>
        </a>
      </div>
    </article>
  );
}