import { MessageCircleMore } from 'lucide-react'

export function FloatingUi() {
  return (
    <>
      <button
        className="fixed bottom-6 left-6 z-50 flex h-[58px] w-[58px] items-center justify-center rounded-full border border-black/5 bg-[#efefee] shadow-[0_14px_30px_rgba(0,0,0,0.08)] transition-transform hover:scale-[1.02]"
        aria-label="Open chat"
      >
        <MessageCircleMore className="h-6 w-6 fill-[#181818] text-[#181818]" />
      </button>

      <button
        className="fixed right-0 top-1/2 z-50 flex h-[56px] w-[46px] -translate-y-1/2 items-center justify-center rounded-l-[12px] bg-[#2a2522]"
        aria-label="Rewards"
      >
        <span className="relative block h-8 w-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="absolute left-1/2 top-1/2 h-[2px] w-7 origin-center rounded-full bg-[#d7e71c]"
              style={{ transform: `translate(-50%, -50%) rotate(${i * 45}deg)` }}
            />
          ))}
          <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2a2522] ring-2 ring-[#d7e71c]" />
        </span>
      </button>
    </>
  )
}
