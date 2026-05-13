import Image from 'next/image';

export default async function BlogPost({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;

  const posts: {
    [key: string]: { title: string; date: string; category: string; content: string };
  } = {
    'why-professional-translation-matters': {
      title: 'Why Professional Translation Matters',
      date: 'May 10, 2024',
      category: 'Business',
      content: `Professional translation is one of the most important investments a business can make when expanding internationally. In today's globalized world, accurate translation is more important than ever. Many companies try to cut costs by using machine translation or inexperienced translators, but this often leads to costly mistakes that can damage your brand reputation.

The Cost of Poor Translations

A single mistranslation can damage your brand reputation, confuse your customers, and cost you millions in lost business. Consider the case of a major automotive company whose tagline was mistranslated in another language, completely changing its meaning in an inappropriate way. The cost of fixing that mistake far exceeded what they would have paid for professional translation.

Professional translators ensure that your message is not just accurately translated, but culturally appropriate for your target audience. They understand nuances, idioms, and context that machine translation simply cannot capture.

Quality Over Price

Our team of native speakers and experienced translators ensures that every project meets the highest standards. We don't just translate words—we translate meaning, tone, and intent. When you choose professional translation, you're investing in your business's success.

The ROI of professional translation is substantial. Happy customers in new markets lead to brand loyalty and repeat business. Poor translations, on the other hand, can cost you customers before you even get started.`,
    },
    'top-5-languages-for-global-business': {
      title: 'Top 5 Languages for Global Business',
      date: 'May 5, 2024',
      category: 'Languages',
      content: `If you're looking to expand your business globally, choosing the right languages to target is crucial. Here are the top 5 languages that can help you reach the largest markets and grow your business internationally.

1. Mandarin Chinese

With over 1 billion speakers, Mandarin Chinese opens doors to the world's largest market. China is a major economic powerhouse, and reaching Chinese consumers in their native language is essential for business success. The Chinese market is particularly important for technology, e-commerce, and manufacturing sectors.

2. Spanish

Spoken by 500+ million people across multiple continents, Spanish is essential for growth in Latin America, Spain, and parts of Africa. Spanish-speaking markets are diverse and growing, with significant economic influence in both Europe and the Americas.

3. English

While you may already speak English, having native speakers help with localization is crucial. English is the global business language, but proper localization ensures your message resonates with different English-speaking markets.

4. French

Important for African and European markets, French is the official language in 29 countries. Africa, in particular, represents a growing market with significant business potential. French is also crucial for the European Union and international diplomacy.

5. German

Key for reaching the strong European business community, German speakers are concentrated in wealthy markets in Central Europe. Germany has a particularly strong manufacturing and technology sector, making German speakers valuable for B2B businesses.

Choosing Your Strategy

The languages you choose should depend on your business model, products, and target customers. Start with the markets that represent the biggest opportunities for your business, and expand from there.`,
    },
    'translation-vs-localization': {
      title: 'Translation vs. Localization: What\'s the Difference?',
      date: 'April 28, 2024',
      category: 'Localization',
      content: `Many people use the terms "translation" and "localization" interchangeably, but they're actually quite different processes. Understanding the difference is crucial for successful international expansion.

Translation

Translation is the process of converting text from one language to another while maintaining the original meaning. A translator takes words in the source language and converts them to equivalent words in the target language. This is a literal, word-for-word process (though skilled translators understand that perfect word-for-word translation is often impossible).

Translation works well for:
- Legal documents that need to be precisely accurate
- Technical manuals where clarity is paramount
- Scientific papers and research

Localization

Localization goes beyond translation. It adapts your entire product or content for a specific culture and market. Localization includes:
- Translating text
- Converting currencies, dates, and measurements
- Changing colors and images that may have different meanings in different cultures
- Adapting jokes, references, and cultural examples
- Modifying product names and slogans that might not work in other languages
- Considering local preferences and expectations

Localization is essential for:
- Video games (which is why we specialize in this!)
- Mobile apps and software
- Marketing materials and websites
- Product packaging and instructions

When to Use Each

Use translation for legal documents, contracts, and technical specifications where word-for-word accuracy is essential and cultural adaptation isn't necessary.

Use localization when launching a product or service in a new market where cultural fit is important. A poorly localized game, app, or website will feel foreign to local users and won't be as successful.

The Bottom Line

Translation is about converting language. Localization is about adapting your entire product for a new culture. For maximum success in international markets, localization is almost always the better choice. At Mnemonic, we specialize in both, but we especially excel at localization for creative industries like gaming.`,
    },
  };

  const post = posts[slug];

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
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
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#443416' }}>Post Not Found</h1>
          <p className="text-gray-600 mb-8">Sorry, we couldn't find the blog post you're looking for.</p>
          <a href="/blog" className="px-8 py-3 rounded-lg font-bold text-white transition-all duration-300 hover:shadow-lg hover:scale-105" style={{ backgroundColor: '#443416' }}>
            Back to Blog
          </a>
        </div>
      </div>
    );
  }

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

      {/* Blog Post Content */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Back Link */}
          <a 
            href="/blog" 
            className="inline-flex items-center font-bold mb-8 transition-all duration-300 hover:-translate-x-2"
            style={{ color: '#ceae6e' }}
          >
            <span className="mr-2">←</span>
            Back to Blog
          </a>

          {/* Post Header */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-3 mb-4">
              <span 
                className="text-xs font-bold px-3 py-1 rounded-full text-white"
                style={{ backgroundColor: post.category === 'Business' ? '#ceae6e' : post.category === 'Languages' ? '#771023' : '#443416' }}
              >
                {post.category}
              </span>
              <span className="text-sm text-gray-500">{post.date}</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight" style={{ color: '#443416' }}>
              {post.title}
            </h1>

            <div className="w-24 h-1 rounded" style={{ backgroundColor: '#ceae6e' }}></div>
          </div>

          {/* Post Content */}
          <article className="prose prose-lg max-w-none mb-12">
            <div className="text-gray-700 leading-relaxed space-y-6">
              {post.content.split('\n\n').map((paragraph, index) => {
                // Check if this is a heading (contains bold text and ends with a line break)
                if (paragraph.trim().match(/^[A-Z][^.!?]*$/)) {
                  return (
                    <h2 
                      key={index}
                      className="text-3xl font-bold mt-8 mb-4 pt-4"
                      style={{ color: '#443416' }}
                    >
                      {paragraph.trim()}
                    </h2>
                  );
                }
                // Check if this is a list
                if (paragraph.includes('- ')) {
                  const items = paragraph.split('\n').filter(item => item.trim().startsWith('-'));
                  return (
                    <ul key={index} className="space-y-2 ml-6">
                      {items.map((item, i) => (
                        <li key={i} className="text-gray-700">
                          {item.replace('- ', '')}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={index} className="text-lg text-gray-700">
                    {paragraph.trim()}
                  </p>
                );
              })}
            </div>
          </article>

          {/* Post CTA */}
          <div className="rounded-lg p-8 text-center mb-12" style={{ backgroundColor: '#f9f7f4' }}>
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#443416' }}>
              Interested in our translation services?
            </h3>
            <p className="text-gray-600 mb-6">
              Get a free quote for your project today
            </p>
            <a 
              href="/contact"
              className="inline-block px-10 py-4 rounded-lg font-bold text-white transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
              style={{ backgroundColor: '#443416' }}
            >
              Get a Quote
            </a>
          </div>

          {/* Related Posts */}
          <div className="border-t pt-8">
            <h3 className="text-2xl font-bold mb-6" style={{ color: '#443416' }}>Read More</h3>
            <a 
              href="/blog" 
              className="inline-flex items-center font-bold px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
              style={{ backgroundColor: '#f9f7f4', color: '#443416' }}
            >
              View All Articles
              <span className="ml-2">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 mt-8" style={{ background: `linear-gradient(135deg, #443416 0%, #1a1a1a 100%)` }}>
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-6 text-white">Ready to Start Your Project?</h3>
          <p className="text-lg mb-8 text-gray-200">Our expert translators are ready to help</p>
          <a 
            href="/contact"
            className="inline-block px-10 py-4 rounded-lg font-bold text-white transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95"
            style={{ backgroundColor: '#ceae6e', color: '#1a1a1a' }}
          >
            Get Your Free Quote
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