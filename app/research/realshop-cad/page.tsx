import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RealShop-CAD: Drawing-to-CAD on Real Production Parts",
  description:
    "A benchmark and dataset report: 228 drawing-to-STEP tasks from anonymized production drawings, graded to 0.1 mm.",
  openGraph: {
    title: "RealShop-CAD: Drawing-to-CAD on Real Production Parts",
    description:
      "Claude Opus 5.5 scores 96% on a public CAD benchmark and 38% on real production parts. 9% on complex parts.",
    images: ["/research/realshop-cad/fig1-complexity.png"],
  },
};

const results = [
  { model: "Claude Opus 5.5", n: "228", all: "38% (87/228)", simple: "63% (54/86)", medium: "30% (29/96)", complex: "9% (4/46)" },
  { model: "GPT-6.1 Sol (high)", n: "20", all: "25% (5/20)", simple: "—", medium: "—", complex: "0% (0/6)" },
];

const housing = [
  { model: "Claude Fable 5.1", iou: "0.45", note: "24 min, $8.15; solid block where the part is a shell" },
  { model: "Claude Opus 5.5", iou: "0.40", note: "curved housing replaced by a prism" },
  { model: "GPT-6.1 Sol", iou: "0.37", note: "prism with ring added" },
  { model: "Gemini 3.1 Pro", iou: "0.28", note: "bent plate" },
];

function Th({ children }: { children: React.ReactNode }) {
  return <th className="border-b border-neutral-300 py-2 pr-4 text-left font-semibold">{children}</th>;
}
function Td({ children }: { children: React.ReactNode }) {
  return <td className="border-b border-neutral-200 py-2 pr-4 align-top">{children}</td>;
}

export default function RealShopCad() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <article className="mx-auto max-w-[720px] px-4 py-14 font-serif leading-relaxed sm:px-6">
        <p className="font-sans text-sm text-neutral-500">Afterlight Research · November 2026</p>
        <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
          RealShop-CAD: Drawing-to-CAD on Real Production Parts
        </h1>
        <p className="mt-3 font-sans text-sm text-neutral-600">Harry Peng · harry@tryafterlight.com</p>

        <h2 className="mt-10 text-xl font-semibold">Abstract</h2>
        <p className="mt-3">
          Frontier models now report near-saturated scores on public text-to-CAD benchmarks. We ask a narrower
          question: given only the 2D manufacturing drawing of a real production part, can a model produce a 3D
          model a machine shop could cut? We introduce RealShop-CAD, 228 drawing-to-STEP tasks sampled from
          anonymized production drawings from MES customers, graded against each part&apos;s own production 3D
          model at 0.1 mm. Claude Opus 5.5, which scores 96% on BenchCAD, produces a machinable model for 38% of
          parts, and 9% of complex parts. The tasks are drawn from a corpus of 130,205 paired production drawings
          and 3D models.
        </p>

        <figure className="mt-8">
          <img src="/research/realshop-cad/fig1-complexity.png" alt="Opus 5.5: 96% on BenchCAD vs 38% on real parts" className="w-full" />
          <figcaption className="mt-2 font-sans text-sm text-neutral-500">
            Figure 1. Claude Opus 5.5, share of parts machinable, by part complexity (B-rep face count).
          </figcaption>
        </figure>

        <h2 className="mt-10 text-xl font-semibold">1. Dataset</h2>
        <p className="mt-3">
          The corpus consists of anonymized production drawings from MES customers: machined parts drawn by
          working engineers between 2018 and 2026, each paired with the 3D model the part was manufactured from.
          Drawings are PDF or DWG with standard orthographic views, sections, tolerances, surface finish and
          material callouts. Title blocks and customer identifiers are removed.
        </p>
        <table className="mt-4 w-full font-sans text-sm">
          <tbody>
            <tr><Td>Drawing–model pairs (exact match)</Td><Td>130,205</Td></tr>
            <tr><Td>Pairs with relaxed matching</Td><Td>~156,000</Td></tr>
            <tr><Td>Unique 3D part models</Td><Td>~214,000</Td></tr>
            <tr><Td>Years</Td><Td>2018–2026</Td></tr>
            <tr><Td>Complexity mix (sampled)</Td><Td>38% simple (≤60 faces), 42% medium (61–300), 20% complex (&gt;300)</Td></tr>
          </tbody>
        </table>
        <p className="mt-4">
          A random audit of 270 pairs found 92% usable as-is and 84% exact one-to-one pairs. About 8% of drawings
          were matched to the wrong model, about 5% contained more than one solid, and fewer than 1% of 3D files
          failed to open. These are removed for the benchmark.
        </p>

        <h2 className="mt-10 text-xl font-semibold">2. Task and grading</h2>
        <p className="mt-3">
          Each task gives the model only the rendered drawing page(s). The model works agentically in a sandbox
          with a CAD kernel (CadQuery), may render and inspect its own output, and must write a single solid as
          STEP. One attempt per part, up to 60 turns or 30 minutes.
        </p>
        <p className="mt-3">
          The candidate is aligned to the reference by PCA initialisation and ICP, then compared by volumetric
          IoU (boolean, with voxel fallback). A part is <em>machinable</em> only if all three hold: IoU ≥ 0.97,
          volume within 1%, and overall size within 0.1 mm of the reference. The reference is the 3D model the
          part was actually made from, not a re-modelled ground truth.
        </p>

        <h2 className="mt-10 text-xl font-semibold">3. Results</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[560px] font-sans text-sm">
            <thead>
              <tr><Th>Model</Th><Th>n</Th><Th>All</Th><Th>Simple</Th><Th>Medium</Th><Th>Complex</Th></tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r.model}><Td>{r.model}</Td><Td>{r.n}</Td><Td>{r.all}</Td><Td>{r.simple}</Td><Td>{r.medium}</Td><Td>{r.complex}</Td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4">
          Performance falls with complexity. On simple prismatic parts Opus 5.5 is often exact. On complex parts
          it succeeds on 4 of 46. The public benchmark score for the same model is 96% (BenchCAD,
          developer-reported).
        </p>

        <h2 className="mt-10 text-xl font-semibold">4. Case study: a curved housing</h2>
        <figure className="mt-4">
          <video src="/research/realshop-cad/fig3-lineup.mp4" controls muted playsInline className="mx-auto w-full max-w-[360px]" />
          <figcaption className="mt-2 font-sans text-sm text-neutral-500">
            Figure 2. One production part, the same drawing given to four models.
          </figcaption>
        </figure>
        <table className="mt-4 w-full font-sans text-sm">
          <thead><tr><Th>Model</Th><Th>IoU</Th><Th>Observation</Th></tr></thead>
          <tbody>
            {housing.map((h) => (
              <tr key={h.model}><Td>{h.model}</Td><Td>{h.iou}</Td><Td>{h.note}</Td></tr>
            ))}
          </tbody>
        </table>
        <p className="mt-4">
          The most common failure on complex parts is substitution: free-form surfaces are replaced with prisms
          and extrusions the model can express easily. A second is dimensional drift. On a motor mount, Opus 5.5
          reached IoU 0.94 but was 0.85 mm off in overall size, which a shop would reject.
        </p>

        <h2 className="mt-10 text-xl font-semibold">5. Limitations</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>One attempt per part. Best-of-n would raise scores.</li>
          <li>GPT-6.1 Sol was run on a 20-part subset; other models on a single case-study part.</li>
          <li>
            Some production drawings leave free-form surfaces undimensioned and defer to the 3D model. This is
            normal practice in industry and is part of what the benchmark measures.
          </li>
          <li>Machinability is approximated geometrically; no toolpaths were generated.</li>
        </ul>

        <h2 className="mt-10 text-xl font-semibold">6. Availability</h2>
        <p className="mt-3">
          The grader, the evaluation split and larger training splits are available to research labs under
          agreement. Contact harry@tryafterlight.com.
        </p>
      </article>
    </main>
  );
}
