'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setError('');
    setSubmitting(true);

    // Pilot accounts are invite-only. Auth backend isn't wired yet —
    // every login attempt is rejected with the same message.
    await new Promise((r) => setTimeout(r, 500));
    setError('Invalid email or password.');
    setSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-neutral-200 flex flex-col">
      <nav className="border-b border-neutral-100">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <Link href="/" aria-label="Afterlight home" className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/afterlight-wordmark.svg"
              alt="Afterlight"
              width={919}
              height={193}
              className="h-6 w-auto select-none"
            />
          </Link>
          <Link href="/" className="text-[13px] font-medium text-neutral-500 hover:text-neutral-900 transition-colors">
            Back to site
          </Link>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-6 md:px-12 py-16 md:py-24">
        <div className="w-full max-w-[420px]">
          <div className="text-center mb-10">
            <h1 className="text-[32px] md:text-[40px] font-medium tracking-[-0.025em] text-neutral-900 leading-[1.1]">
              Sign in to Afterlight
            </h1>
            <p className="text-[14px] text-neutral-500 mt-3 tracking-[-0.005em]">
              Pilot accounts are invite-only.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-[12px] font-medium text-neutral-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@brand.com"
                required
                autoComplete="email"
                disabled={submitting}
                className="w-full rounded-[12px] border border-neutral-200 bg-white px-4 py-3 text-[15px] text-neutral-900 placeholder:text-neutral-400 outline-none transition-all focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 disabled:opacity-60"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-[12px] font-medium text-neutral-700">
                  Password
                </label>
                <Link href="/" className="text-[12px] text-neutral-500 hover:text-neutral-900 transition-colors">
                  Forgot?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                disabled={submitting}
                className="w-full rounded-[12px] border border-neutral-200 bg-white px-4 py-3 text-[15px] text-neutral-900 placeholder:text-neutral-400 outline-none transition-all focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 disabled:opacity-60"
              />
            </div>

            {error && (
              <p className="text-[13px] text-red-500 font-medium">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 bg-black text-white rounded-full px-7 py-3.5 text-[15px] font-semibold tracking-tight hover:bg-neutral-800 transition-colors disabled:opacity-50 mt-2"
            >
              {submitting ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <div className="mt-10 pt-6 border-t border-neutral-100 text-center">
            <p className="text-[13px] text-neutral-500">
              Not a pilot yet?{' '}
              <Link href="/" className="font-medium text-neutral-900 hover:underline underline-offset-2">
                Request access
              </Link>
            </p>
          </div>
        </div>
      </div>

      <footer className="border-t border-neutral-100">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[12px] text-neutral-400">
          <span>&copy; {new Date().getFullYear()} Afterlight, Inc.</span>
          <div className="flex flex-wrap items-center gap-5">
            <Link href="/use-cases" className="hover:text-neutral-700 transition-colors">Use Cases</Link>
            <Link href="/pricing" className="hover:text-neutral-700 transition-colors">Pricing</Link>
            <Link href="/terms" className="hover:text-neutral-700 transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-neutral-700 transition-colors">Privacy</Link>
            <Link href="/cdrp" className="hover:text-neutral-700 transition-colors">Trust</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
