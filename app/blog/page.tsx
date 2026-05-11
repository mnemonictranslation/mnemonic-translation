import Image from 'next/image';
export default function Blog() {
  const posts = [
    {
      slug: 'why-professional-translation-matters',
      title: 'Why Professional Translation Matters',
      date: 'May 10, 2024',
      excerpt: 'Learn why hiring professional translators is crucial for your business success.',
    },
    {
      slug: 'top-5-languages-for-global-business',
      title: 'Top 5 Languages for Global Business',
      date: 'May 5, 2024',
      excerpt: 'Discover which languages can help expand your business internationally.',
    },
    {
      slug: 'translation-vs-localization',
      title: 'Translation vs. Localization: Whats the Difference?',
      date: 'April 28, 2024',
      excerpt: 'Understanding the key differences between translation and localization.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white text-black p-4 border-b-2" style={{ borderColor: '#ceae6e' }}>
  <div className="max-w-6xl mx-auto flex justify-between items-center">
    <a href="/" className="flex items-center">
      <Image 
        src="/images/mnemonic-logo.png" 
        alt="Mnemonic" 
        width={200}
        height={64}
        priority
      />
    </a>
    <ul className="flex gap-6">
      <li><a href="/" className="hover:underline">Home</a></li>
      <li><a href="/services" className="hover:underline">Services</a></li>
      <li><a href="/about" className="hover:underline">About</a></li>
      <li><a href="/blog" className="hover:underline">Blog</a></li>
      <li><a href="/contact" className="hover:underline">Contact</a></li>
    </ul>
  </div>
</nav>

      {/* Blog Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-4" style={{ color: '#443416' }}>Blog</h2>
          <p className="text-gray-600 mb-12">Tips, insights, and updates from Mnemonic</p>

          <div className="space-y-8">
            {posts.map((post) => (
              <article key={post.slug} className="border rounded-lg p-6 hover:shadow-lg transition">
                <div className="text-gray-500 text-sm mb-2">{post.date}</div>
                <h3 className="text-2xl font-bold mb-3">
                  <a href={`/blog/${post.slug}`} className="hover:underline" style={{ color: '#443416' }}>
                    {post.title}
                  </a>
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <a href={`/blog/${post.slug}`} className="font-bold hover:underline" style={{ color: '#ceae6e' }}>
                  Read More →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; 2024 Mnemonic. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}