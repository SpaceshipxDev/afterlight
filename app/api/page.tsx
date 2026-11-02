import Link from 'next/link';
import APINav from './Nav';

export const metadata = {
  title: 'API — Afterlight',
  description: 'An image API for commerce platforms.',
};

const apiMailto =
  'mailto:harry@tryafterlight.com?subject=Afterlight%20API%20access%20request';

type Endpoint = {
  method: 'POST' | 'GET';
  path: string;
  label: string;
  summary: string;
  code: string;
};

const heroCurl = `$ curl -X POST https://api.tryafterlight.com/v1/generations \\
    -H "Authorization: Bearer sk_live_…" \\
    -d '{
      "product_image": "https://cdn.you.com/sku-3401.jpg",
      "store_id":      "store_8f3a92"
    }'`;

const endpoints: Endpoint[] = [
  {
    method: 'POST',
    path: '/v1/generations',
    label: 'Create',
    summary: 'Submit a product and receive a job id.',
    code: `POST /v1/generations
Authorization: Bearer sk_live_…

{
  "product_image": "https://cdn.you.com/sku-3401.jpg",
  "store_id":      "store_8f3a92",
  "scenes":        ["lifestyle", "studio"],
  "count":         6
}

→ 202 Accepted
{
  "id":     "gen_K2xA7p",
  "status": "queued"
}`,
  },
  {
    method: 'GET',
    path: '/v1/generations/{id}',
    label: 'Status',
    summary: 'Check where the job stands.',
    code: `GET /v1/generations/gen_K2xA7p

→ 200 OK
{
  "id":          "gen_K2xA7p",
  "status":      "complete",
  "progress":    1.0,
  "asset_count": 6
}`,
  },
  {
    method: 'GET',
    path: '/v1/generations/{id}/assets',
    label: 'Retrieve',
    summary: 'Pull the finished photos at full resolution.',
    code: `GET /v1/generations/gen_K2xA7p/assets

→ 200 OK
{
  "assets": [
    {
      "url":    "https://cdn.afterlight.io/a/9p…",
      "scene":  "lifestyle",
      "width":  2048,
      "height": 2048
    },
    …
  ]
}`,
  },
];

const webhookSample = `POST <your_endpoint>
Content-Type: application/json
X-Afterlight-Signature: t=…,v1=…

{
  "event":        "generation.complete",
  "id":           "gen_K2xA7p",
  "asset_count":  6,
  "delivered_at": "2026-05-17T08:31:04Z"
}`;

function MethodBadge({ method }: { method: 'POST' | 'GET' }) {
  const isPost = method === 'POST';
  return (
    <span
      className={
        'inline-flex items-center justify-center min-w-[58px] rounded-md px-2.5 py-1 text-[11px] font-semibold tracking-[0.08em] uppercase ' +
        (isPost
          ? 'bg-neutral-900 text-white'
          : 'bg-white text-neutral-900 ring-1 ring-inset ring-neutral-300')
      }
    >
      {method}
    </span>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="bg-neutral-950 text-neutral-100 rounded-2xl p-6 md:p-7 text-[13px] md:text-[13.5px] leading-[1.65] font-mono overflow-x-auto whitespace-pre">
      <code>{children}</code>
    </pre>
  );
}

export default function APIPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-neutral-200">
      <APINav />

      {/* Hero */}
      <section className="border-b border-neutral-100">
        <div className="max-w-[980px] mx-auto px-6 md:px-12 pt-20 md:pt-32 pb-16 md:pb-24 text-center">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-neutral-400 mb-5">
            API
          </p>
          <h1 className="text-[44px] md:text-[68px] lg:text-[80px] font-medium tracking-[-0.03em] text-neutral-900 leading-[1.04]">
            Create product photos with Afterlight API
          </h1>
          <p className="text-[18px] md:text-[20px] text-neutral-500 leading-relaxed max-w-2xl mx-auto mt-6 tracking-[-0.005em]">
            An image API for commerce platforms.
          </p>

          <div className="mt-10 flex items-center justify-center">
            <a
              href={apiMailto}
              className="inline-flex items-center gap-2 bg-neutral-900 text-white rounded-full px-7 py-4 text-[15px] font-semibold tracking-tight hover:bg-black transition-colors"
            >
              Request access
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Curl peek */}
          <div className="mt-14 md:mt-16 max-w-[820px] mx-auto text-left">
            <CodeBlock>{heroCurl}</CodeBlock>
          </div>
        </div>
      </section>

      {/* Endpoints */}
      <section className="border-b border-neutral-100">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12 pt-20 md:pt-28 pb-14 md:pb-20">
          <div className="text-center mb-14 md:mb-20">
            <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-neutral-400 mb-5">
              Endpoints
            </p>
            <h2 className="text-[32px] md:text-[48px] font-medium tracking-[-0.025em] text-neutral-900 leading-[1.08] max-w-3xl mx-auto">
              The whole flow runs through three endpoints.
            </h2>
          </div>

          <div className="space-y-8 md:space-y-10">
            {endpoints.map((ep) => (
              <div
                key={ep.path}
                className="rounded-[28px] bg-neutral-50 border border-neutral-100 overflow-hidden"
              >
                <div className="px-7 md:px-9 pt-7 md:pt-9 pb-5 md:pb-6">
                  <div className="flex items-center gap-3 mb-5">
                    <MethodBadge method={ep.method} />
                    <code className="text-[14.5px] md:text-[15.5px] font-mono text-neutral-900 tracking-tight">
                      {ep.path}
                    </code>
                  </div>
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <h3 className="text-[22px] md:text-[26px] font-medium tracking-[-0.02em] text-neutral-900 leading-none">
                      {ep.label}
                    </h3>
                    <span className="text-[15px] md:text-[16px] text-neutral-500 tracking-[-0.005em]">
                      {ep.summary}
                    </span>
                  </div>
                </div>
                <div className="px-3 md:px-4 pb-3 md:pb-4">
                  <CodeBlock>{ep.code}</CodeBlock>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Webhooks */}
      <section className="border-b border-neutral-100">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12 pt-20 md:pt-28 pb-20 md:pb-28">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-neutral-400 mb-5">
              Webhooks
            </p>
            <h2 className="text-[32px] md:text-[48px] font-medium tracking-[-0.025em] text-neutral-900 leading-[1.08] max-w-3xl mx-auto">
              We post the result to you.
            </h2>
            <p className="text-[17px] md:text-[19px] text-neutral-500 leading-relaxed max-w-2xl mx-auto mt-6 tracking-[-0.005em]">
              When a job finishes, we send the payload to your endpoint. Every event is signed and idempotent, so you can replay it without harm.
            </p>
          </div>

          <div className="rounded-[28px] bg-neutral-50 border border-neutral-100 overflow-hidden">
            <div className="px-7 md:px-9 pt-7 md:pt-9 pb-5 md:pb-6">
              <div className="flex items-center gap-3 mb-5">
                <span className="inline-flex items-center justify-center rounded-md px-2.5 py-1 text-[11px] font-semibold tracking-[0.08em] uppercase bg-neutral-900 text-white">
                  Event
                </span>
                <code className="text-[14.5px] md:text-[15.5px] font-mono text-neutral-900 tracking-tight">
                  generation.complete
                </code>
              </div>
              <div className="flex items-baseline gap-3 flex-wrap">
                <h3 className="text-[22px] md:text-[26px] font-medium tracking-[-0.02em] text-neutral-900 leading-none">
                  Delivered
                </h3>
                <span className="text-[15px] md:text-[16px] text-neutral-500 tracking-[-0.005em]">
                  Fires when a job finishes and its assets are ready.
                </span>
              </div>
            </div>
            <div className="px-3 md:px-4 pb-3 md:pb-4">
              <CodeBlock>{webhookSample}</CodeBlock>
            </div>
          </div>
        </div>
      </section>

      {/* Brand consistency */}
      <section className="border-b border-neutral-100">
        <div className="max-w-[980px] mx-auto px-6 md:px-12 py-20 md:py-28 text-center">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-neutral-400 mb-5">
            Style
          </p>
          <h2 className="text-[32px] md:text-[48px] font-medium tracking-[-0.025em] text-neutral-900 leading-[1.08] max-w-3xl mx-auto">
            Each store keeps its own look.
          </h2>
          <p className="text-[17px] md:text-[19px] text-neutral-500 leading-relaxed max-w-2xl mx-auto mt-6 tracking-[-0.005em]">
            We fit every output to the store’s existing photography — its light, its palette, its composition — across the whole catalogue.
          </p>
        </div>
      </section>

      {/* Staged rollout */}
      <section className="border-b border-neutral-100">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12 pt-20 md:pt-28 pb-20 md:pb-28">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-neutral-400 mb-5">
              Rollout
            </p>
            <h2 className="text-[32px] md:text-[48px] font-medium tracking-[-0.025em] text-neutral-900 leading-[1.08] max-w-3xl mx-auto">
              Built for staged rollout.
            </h2>
          </div>

          <div className="rounded-[28px] bg-neutral-50 border border-neutral-100 p-8 md:p-12 max-w-[920px] mx-auto">
            <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-5">
              {[
                'Private partner access',
                'Async generation queue',
                'Rate limits by store / partner',
                'Webhook completion',
                'CDN-hosted outputs',
                'Batch generation support',
              ].map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-3 text-[15.5px] md:text-[16.5px] text-neutral-800 leading-relaxed tracking-[-0.005em]"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-neutral-900 mt-1 shrink-0"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {line}
                </li>
              ))}
            </ul>

            <div className="my-9 md:my-11 border-t border-neutral-200" />

            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-[14.5px] md:text-[15.5px] text-neutral-700 tracking-[-0.005em]">
              <span>Pilot stores</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-neutral-400"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
              <span>Beta cohort</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-neutral-400"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
              <span>Full commerce deployment</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section>
        <div className="max-w-[900px] mx-auto px-6 md:px-12 py-20 md:py-32 text-center">
          <h2 className="text-[36px] md:text-[56px] font-medium tracking-[-0.03em] text-neutral-900 leading-[1.05]">
            Talk to us.
          </h2>
          <p className="text-[17px] md:text-[19px] text-neutral-500 leading-relaxed max-w-xl mx-auto mt-6 tracking-[-0.005em]">
            Write in and we’ll reply within a day.
          </p>
          <div className="mt-10 flex items-center justify-center">
            <a
              href={apiMailto}
              className="inline-flex items-center gap-2 bg-neutral-900 text-white rounded-full px-8 py-4 text-[15px] font-semibold tracking-tight hover:bg-black transition-colors"
            >
              Request access
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </div>
          <p className="text-[12px] text-neutral-400 mt-5">
            Or write to{' '}
            <a
              href="mailto:harry@tryafterlight.com"
              className="text-neutral-600 hover:text-neutral-900 underline underline-offset-2"
            >
              harry@tryafterlight.com
            </a>
          </p>
        </div>
      </section>

      <footer className="border-t border-neutral-100">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-[12px] text-neutral-400">
          <span>&copy; {new Date().getFullYear()} Afterlight, Inc.</span>
          <div className="flex flex-col sm:items-end gap-2">
            <div className="flex flex-wrap items-center gap-6">
              <Link href="/use-cases" className="hover:text-neutral-700 transition-colors">Use Cases</Link>
              <Link href="/pricing" className="hover:text-neutral-700 transition-colors">Pricing</Link>
              <Link href="/api" className="hover:text-neutral-700 transition-colors">API</Link>
            </div>
            <div className="flex flex-wrap items-center gap-5 text-neutral-400/85">
              <Link href="/terms" className="hover:text-neutral-700 transition-colors">Terms</Link>
              <Link href="/privacy" className="hover:text-neutral-700 transition-colors">Privacy</Link>
              <Link href="/cdrp" className="hover:text-neutral-700 transition-colors">Trust</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
