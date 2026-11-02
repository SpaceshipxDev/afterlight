'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const links = [
  { href: '/use-cases', label: 'Use Cases' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/api', label: 'API' },
  { href: '/cdrp', label: 'Trust' },
];

export default function APINav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  return (
    <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-neutral-100">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <Link
          href="/"
          aria-label="Afterlight home"
          className="flex items-center relative z-[60]"
          onClick={() => setOpen(false)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/afterlight-wordmark.svg"
            alt="Afterlight"
            width={919}
            height={193}
            className="h-6 w-auto select-none"
          />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-7 text-[14px] font-medium text-neutral-600">
          <Link href="/use-cases" className="hover:text-neutral-900 transition-colors">Use Cases</Link>
          <Link href="/pricing" className="hover:text-neutral-900 transition-colors">Pricing</Link>
          <Link href="/api" className="text-neutral-900">API</Link>
          <Link href="/cdrp" className="hover:text-neutral-900 transition-colors">Trust</Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 bg-white text-neutral-700 border border-neutral-200 rounded-full px-5 py-2 text-[14px] font-medium hover:text-black hover:border-black hover:bg-neutral-50 transition-all"
          >
            Login
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="md:hidden relative z-[60] w-11 h-11 -mr-2 flex items-center justify-center"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="relative block w-[22px] h-[14px]">
            <span
              className={
                'absolute left-0 w-[22px] h-[1.5px] bg-neutral-900 rounded-full transition-all duration-300 ease-out ' +
                (open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0')
              }
            />
            <span
              className={
                'absolute left-0 w-[22px] h-[1.5px] bg-neutral-900 rounded-full transition-all duration-300 ease-out ' +
                (open ? 'bottom-1/2 translate-y-1/2 -rotate-45' : 'bottom-0')
              }
            />
          </span>
        </button>
      </div>

      {/* Mobile menu panel */}
      <div
        aria-hidden={!open}
        className={
          'md:hidden fixed inset-x-0 top-16 bottom-0 bg-white transition-opacity duration-200 ease-out ' +
          (open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none')
        }
      >
        <div className="flex flex-col h-full px-8 pt-12 pb-10">
          <ul className="space-y-7">
            {links.map((item, i) => (
              <li
                key={item.href}
                style={{ transitionDelay: open ? `${80 + i * 50}ms` : '0ms' }}
                className={
                  'transform transition-all duration-300 ease-out ' +
                  (open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2')
                }
              >
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block text-[32px] font-medium tracking-[-0.025em] text-neutral-900 leading-none"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div
            style={{ transitionDelay: open ? `${80 + links.length * 50}ms` : '0ms' }}
            className={
              'mt-auto transform transition-all duration-300 ease-out ' +
              (open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2')
            }
          >
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="inline-flex w-full items-center justify-center gap-2 bg-neutral-900 text-white rounded-full px-7 py-4 text-[15px] font-semibold tracking-tight hover:bg-black transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
