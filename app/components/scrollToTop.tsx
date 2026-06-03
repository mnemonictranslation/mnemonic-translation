'use client';

export default function ScrollToTop() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 w-12 h-12 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-40 flex items-center justify-center"
      style={{ backgroundColor: '#000000' }}
      title="Return to top"
    >
      <svg width="30" height="30" viewBox="0 0 20 20" fill="none">
        <polygon points="10,5 5,15 15,15" fill="white" />
      </svg>
    </button>
  );
}