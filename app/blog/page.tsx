import Image from 'next/image';

export default function Blog() {
  const posts = [
    {
      slug: 'why-professional-translation-matters',
      title: 'Why Professional Translation Matters',
      date: 'May 10, 2024',
      excerpt: 'Learn why hiring professional translators is crucial for your business success and how it can save you money in the long run.',
      category: 'Business',
    },
    {
      slug: 'top-5-languages-for-global-business',
      title: 'Top 5 Languages for Global Business',
      date: 'May 5, 2024',
      excerpt: 'Discover which languages can help expand your business internationally and reach new markets effectively.',
      category: 'Languages',
    },
    {
      slug: 'translation-vs-localization',
      title: 'Translation vs. Localization: What\'s the Difference?',
      date: 'April 28, 2024',
      excerpt: 'Understanding the key differences between translation and localization and when to use each for maximum impact.',
      category: 'Localization',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white text-black p-4 border-b-2 sticky top-0 z-50 shadow-sm" style={{ borderColor: '#ceae6e' }}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <a href="/" className="flex items-center hover:opacity-80 transition-opacity duration-300">
            <Image 
              src="/images/mnemonic-logo.png" 
              alt="Mnemonic" 
              width={200}
              height={64}
              priority
            />
          </a>
          <ul className="flex gap-8">
            <li><a href="/" className="hover:text-amber-600 transition-colors duration-300 relative group">Home<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 group-hover:w-full transition-all duration-300" style={{ backgroundColor: '#ceae6e' }}></span></a></li>
            <li><a href="/services" className="hover:text-amber-600 transition-colors duration-300 relative group">Services<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 group-hover:w-full transition-all duration-300" style={{ backgroundColor: '#ceae6e' }}></span></a></li>
            <li><a href="/about" className="hover:text-amber-600 transition-colors duration-300 relative group">About<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 group-hover:w-full transition-all duration-300" style={{ backgroundColor: '#ceae6e' }}></span></a></li>
            <li><a href="/blog" className="hover:text-amber-600 transition-colors duration-300 relative group">Blog<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 group-hover:w-full transition-all duration-300" style={{ backgroundColor: '#ceae6e' }}></span></a></li>
            <li><a href="/contact" className="hover:text-amber-600 transition-colors duration-300 relative group">Contact<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 group-hover:w-full transition-all duration-300" style={{ backgroundColor: '#ceae6e' }}></span></a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            background: `linear-gradient(135deg, #ceae6e 0%, #443416 100%)`,
          }}
        ></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-4" style={{ color: '#443416' }}>Translation & Localization Blog</h2>
          <div className="w-24 h-1 rounded" style={{ backgroundColor: '#ceae6e' }}></div>
          <p className="text-xl text-gray-600 mt-6">Tips, insights, and industry updates from Mnemonic</p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {posts.map((post, index) => (
              <article 
                key={post.slug} 
                className="group rounded-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
                style={{ backgroundColor: '#f9f7f4' }}
              >
                <div className="p-8">
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span 
                      className="text-xs font-bold px-3 py-1 rounded-full text-white transition-all duration-300"
                      style={{ backgroundColor: index % 2 === 0 ? '#ceae6e' : '#771023' }}
                    >
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500 px-3 py-1">
                      {post.date}
                    </span>
                  </div>

                  <h3 className="text-3xl font-bold mb-4 transition-colors duration-300 group-hover:opacity-80" style={{ color: '#443416' }}>
                    <a href={`/blog/${post.slug}`} className="hover:underline">
                      {post.title}
                    </a>
                  </h3>

                  <p className="text-lg text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {post.excerpt}
                  </p>

                  <a 
                    href={`/blog/${post.slug}`} 
                    className="inline-flex items-center font-bold transition-all duration-300 group-hover:translate-x-2"
                    style={{ color: '#ceae6e' }}
                  >
                    Read More
                    <span className="ml-2">→</span>
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Coming Soon Section */}
          <div className="mt-16 rounded-lg p-8 text-center" style={{ backgroundColor: '#f9f7f4' }}>
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#443416' }}>More Articles Coming Soon</h3>
            <p className="text-gray-600 mb-6">We're regularly publishing new insights about translation, localization, and language services.</p>
            <a 
              href="/contact"
              className="inline-block px-8 py-3 rounded-lg font-bold text-white transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
              style={{ backgroundColor: '#443416' }}
            >
              Suggest a Topic
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 mt-8" style={{ background: `linear-gradient(135deg, #443416 0%, #1a1a1a 100%)` }}>
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-6 text-white">Ready for Your Translation Project?</h3>
          <p className="text-lg mb-8 text-gray-200">Get expert translation services from Mnemonic</p>
          <a 
            href="/contact"
            className="inline-block px-10 py-4 rounded-lg font-bold text-white transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95"
            style={{ backgroundColor: '#ceae6e', color: '#1a1a1a' }}
          >
            Get a Free Quote
          </a>
        </div>
      </section>

      {/* Footer */}
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
    </div>
  );
}