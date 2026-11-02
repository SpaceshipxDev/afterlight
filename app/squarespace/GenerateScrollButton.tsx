'use client';

function SparklesIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      width="14"
      height="14"
    >
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
      <path d="M4 17v2" />
      <path d="M5 18H3" />
    </svg>
  );
}

export default function GenerateScrollButton({ targetId }: { targetId: string }) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex items-center gap-2 border border-[#1c1c1c] px-5 py-3 text-[13px] font-semibold tracking-[0.08em] text-[#1c1c1c] hover:bg-[#1c1c1c] hover:text-white transition-colors"
      style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
    >
      <SparklesIcon className="h-[14px] w-[14px]" />
      GENERATE 4 PHOTOS WITH AFTERLIGHT
    </button>
  );
}
