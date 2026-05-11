import Image from 'next/image';

export default async function BlogPost({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;

  const posts: {
    [key: string]: { title: string; date: string; content: string };
  } = {
    'why-professional-translation-matters': {
      title: 'Why Professional Translation Matters',
      date: 'May 10, 2024',
      content: 'In today\'s globalized world, accurate translation is more important than ever.',
    },
    'top-5-languages-for-global-business': {
      title: 'Top 5 Languages for Global Business',
      date: 'May 5, 2024',
      content: 'If you\'re looking to expand your business globally, here are the top 5 languages.',
    },
    'translation-vs-localization': {
      title: 'Translation vs. Localization: What\'s the Difference?',
      date: 'April 28, 2024',
      content: 'Many people use these terms interchangeably, but translation and localization are different.',
    },
  };

  const post = posts[slug];

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p>Post not found</p>
        <p className="text-gray-500 text-sm mt-2">Slug: {slug}</p>
        <a href="/blog" className="hover:underline mt-4" style={{ color: '#ceae6e' }}>
          Back to Blog
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
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

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <a href="/blog" className="hover:underline mb-6 block" style={{ color: '#ceae6e' }}>
            ← Back to Blog
          </a>

          <h1 className="text-4xl font-bold mb-3" style={{ color: '#443416' }}>{post.title}</h1>
          <p className="text-gray-500 mb-8">{post.date}</p>

          <div className="text-gray-700 leading-relaxed mb-8">
            <p>{post.content}</p>
          </div>

          <div className="mt-12 p-6 rounded text-center" style={{ backgroundColor: '#ceae6e' }}>
            <p className="text-black mb-4 font-bold">
              Need help with your translation project?
            </p>
            <a
              href="/contact"
              className="bg-black text-white px-8 py-3 rounded font-bold hover:bg-gray-800"
            >
              Get a Quote
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-black text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; 2024 Mnemonic. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}