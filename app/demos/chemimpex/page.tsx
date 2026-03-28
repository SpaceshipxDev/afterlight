"use client";

import Image from "next/image";
import { useState } from "react";

// --- DATA ---
const demoData = {
  agencyName: "Chem-Impex",
  clientName: "Chem-Impex",
  skus: [
    {
      id: "sku1",
      displayName: "Fmoc-Ala TentaGel R PHB resin",
      originalTitle: "Compound Link & Basic Specs",
      originalLink: "https://www.chemimpex.com/products/50512",
      inputs: ["/chemimpex/Screenshot 2026-03-27 at 9.47.05 PM.png"], // Replace with your actual input image path
      output: {
        title: "Fmoc-Ala TentaGel R PHB resin (0.15 - 0.22 mmol/g, 90 mm mesh)",
        description: [
          "Fmoc-Ala TentaGel R PHB resin is a high-quality solid-phase peptide synthesis resin widely utilized in peptide chemistry and drug development. This preloaded resin combines Fmoc-L-alanine with the TentaGel R PHB support, providing a convenient starting point for the efficient assembly of peptide sequences. The TentaGel R matrix is designed to provide high diffusion rates and excellent swelling across a broad range of solvents, helping improve coupling efficiency and overall synthesis performance.",
          "In practical applications, Fmoc-Ala TentaGel R PHB resin is particularly valuable for the synthesis of longer or more demanding peptide sequences where reproducibility, purity, and reliable resin performance are important. The p-hydroxybenzyl alcohol linker is acid-labile and compatible with standard cleavage conditions, making this resin a useful choice for Fmoc-based peptide synthesis workflows directed toward peptide acid products.",
        ],
        tabs: [
          {
            id: "general",
            label: "General Information",
            type: "table",
            data: [
              { label: "Molecular Weight", value: "0.0" },
              { label: "Appearance", value: "Beads" },
              { label: "Substitution", value: "0.15 - 0.22 mmol/g" },
              { label: "Mesh Size", value: "90 mm mesh" },
              { label: "Conditions", value: "Store at 0 - 8 °C" },
            ],
          },
          {
            id: "properties",
            label: "Properties",
            type: "text",
            data: "Fmoc-Ala TentaGel R PHB resin is based on a PEG-grafted, low-crosslinked polystyrene support that exhibits both hydrophilic and hydrophobic character. This gives the resin high diffusion rates and excellent swelling in a wide range of solvents, supporting efficient reagent access during synthesis. The PHB linker is TFA-labile, with cleavage established using 95% TFA, and the lower-loading, higher-swelling profile of this resin family is advantageous for difficult or longer peptide sequences.",
          },
          {
            id: "safety",
            label: "Safety and Regulations",
            type: "table",
            data: [
              { label: "Hazmat", value: "Yes" },
              { label: "Antibiotic", value: "No" },
              { label: "DEA-regulated", value: "No" },
              { label: "Warnings", value: "-" },
            ],
          },
          {
            id: "applications",
            label: "Applications",
            type: "list",
            intro:
              "Fmoc-Ala TentaGel R PHB resin is widely utilized in research focused on:",
            data: [
              {
                title: "Peptide Synthesis:",
                desc: "This resin serves as a convenient preloaded support for Fmoc-based solid-phase peptide synthesis, reducing early synthetic steps and helping researchers assemble peptide sequences efficiently.",
              },
              {
                title: "Long Peptide Sequences:",
                desc: "The TentaGel R support is used for long and difficult peptide sequences because of its strong swelling behavior and high diffusion characteristics.",
              },
              {
                title: "Drug Development:",
                desc: "Researchers can employ this resin in the preparation of peptide-based therapeutics and other bioactive peptide candidates where yield and purity are essential.",
              },
              {
                title: "Peptide Research Workflows:",
                desc: "Its compatibility with standard Fmoc SPPS conditions makes it useful in academic and industrial peptide chemistry programs requiring reliable solid supports for repeated synthesis work.",
              },
            ],
          },
        ],
      },
    },
    {
      id: "sku2",
      displayName: "Fmoc-hexasarcosine",
      originalTitle: "Compound Link & Basic Specs",
      originalLink: "https://www.chemimpex.com/products/49721#undefined",
      inputs: ["/chemimpex/Screenshot 2026-03-27 at 9.48.10 PM.png"], // Replace with your actual input image path
      output: {
        title: "Fmoc-hexasarcosine",
        description: [
          "Fmoc-hexasarcosine is a versatile peptide synthesis building block widely utilized in peptide chemistry and drug development. This oligomeric sarcosine derivative features an Fmoc protecting group for selective deprotection and contains six sarcosine units, making it a useful monodisperse poly-Sarcosine building block for both solution-phase and solid-phase peptide synthesis. Its defined oligomeric structure makes it especially attractive for researchers designing more complex peptide architectures.",
          "In addition to its direct role in peptide synthesis, Fmoc-hexasarcosine is particularly valuable in linker and spacer design where a defined, hydrophilic sarcosine segment is desired. It can be used in peptide and conjugate development workflows that benefit from monodisperse poly-Sarcosine elements, including drug-linker and bioconjugation platforms reported in the literature.",
        ],
        tabs: [
          {
            id: "general",
            label: "General Information",
            type: "table",
            data: [
              { label: "Synonyms", value: "Fmoc-(Sar)6-OH" },
              { label: "Purity", value: "98%" },
              { label: "Molecular Formula", value: "C₃₃H₄₂N₆O₉" },
              { label: "Molecular Weight", value: "666.73" },
              { label: "Appearance", value: "White powder" },
              { label: "Conditions", value: "Store at 2 - 8 °C" },
            ],
          },
          {
            id: "properties",
            label: "Properties",
            type: "text",
            data: "Fmoc-hexasarcosine is a monodisperse oligo(sarcosine) building block with a defined chain length and an Fmoc-protected terminus suited to standard peptide synthesis workflows. Sarcosine-based linkers are highly soluble and can improve the solubility of structured polypeptides while also providing spatial separation between peptide ligands and attached functional groups. These characteristics make Fmoc-hexasarcosine particularly useful when a well-defined hydrophilic spacer is required in peptide or conjugate synthesis.",
          },
          {
            id: "safety",
            label: "Safety and Regulations",
            type: "table",
            data: [
              { label: "Hazmat", value: "No" },
              { label: "Antibiotic", value: "No" },
              { label: "DEA-regulated", value: "No" },
              { label: "Warnings", value: "-" },
            ],
          },
          {
            id: "applications",
            label: "Applications",
            type: "list",
            intro:
              "Fmoc-hexasarcosine is widely utilized in research focused on:",
            data: [
              {
                title: "Peptide Synthesis:",
                desc: "This compound is used as a monodisperse poly-Sarcosine building block in solution-phase and solid-phase peptide synthesis, enabling the controlled incorporation of sarcosine oligomers into peptide sequences.",
              },
              {
                title: "Linker and Spacer Design:",
                desc: "Researchers can use this material to introduce a defined hydrophilic spacer into peptide and conjugate constructs where controlled spacing and solubility are important.",
              },
              {
                title: "Drug Development:",
                desc: "The compound is relevant to drug-linker platform design and peptide-based therapeutic research where monodisperse poly-Sarcosine segments are used to tune physicochemical properties.",
              },
              {
                title: "Bioconjugation Research:",
                desc: "Fmoc-hexasarcosine can support conjugation strategies that benefit from highly soluble sarcosine-based linkers capable of separating functional groups from peptide ligands.",
              },
            ],
          },
        ],
      },
    },
  ],
};

// --- SUB-COMPONENTS ---

const SectionHeader = ({
  title,
  className = "",
}: {
  title: string;
  className?: string;
}) => (
  <h2
    className={`mb-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400 ${className}`}
  >
    {title}
  </h2>
);

const MetadataLabel = ({
  label,
  value,
  isLink = false,
}: {
  label: string;
  value: string;
  isLink?: boolean;
}) => (
  <div className="flex items-start gap-3 text-[13px] leading-relaxed sm:items-center">
    <span className="mt-1 w-12 shrink-0 text-[10px] font-medium uppercase tracking-wider text-neutral-400 sm:mt-0">
      {label}
    </span>
    {isLink ? (
      <a
        href={value}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 break-all text-black underline underline-offset-4 transition-colors hover:text-neutral-500 sm:break-normal"
      >
        Source Link
      </a>
    ) : (
      <span className="text-black">{value}</span>
    )}
  </div>
);

const BigPipelineDivider = () => (
  <>
    <div className="hidden lg:flex h-full items-center justify-center px-4 pt-12">
      <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-neutral-900 bg-neutral-900 shadow-xl transition-transform hover:scale-105">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          className="text-white stroke-current stroke-[2.5]"
        >
          <path
            d="M4 12H20M20 12L13 5M20 12L13 19"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>

    <div className="flex lg:hidden justify-center py-12">
      <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-neutral-900 bg-neutral-900 shadow-xl">
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          className="text-white stroke-current stroke-[2.5]"
        >
          <path
            d="M12 4V20M12 20L5 13M12 20L19 13"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  </>
);

// Renders the specific content based on tab/accordion type
const RenderTabContent = ({ tab }: { tab: any }) => {
  if (tab.type === "text") {
    return <p className="text-[#595959] leading-relaxed">{tab.data}</p>;
  }

  if (tab.type === "table") {
    return (
      <div className="flex flex-col">
        {tab.data.map((row: any, i: number) => (
          <div
            key={i}
            className={`flex py-3 ${
              i !== tab.data.length - 1 ? "border-b border-[#EBEBEB]" : ""
            }`}
          >
            <div className="w-1/3 text-[#1D1D1B] font-medium pr-4">
              {row.label}
            </div>
            <div className="w-2/3 text-[#1D1D1B]">{row.value}</div>
          </div>
        ))}
      </div>
    );
  }

  if (tab.type === "list") {
    return (
      <div className="text-[#1D1D1B] leading-relaxed">
        {tab.intro && <p className="mb-4">{tab.intro}</p>}
        <ul className="space-y-2">
          {tab.data.map((item: any, i: number) => (
            <li key={i}>
              <strong className="font-bold">{item.title}</strong> {item.desc}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
};

// --- INTERACTIVE WIDGET COMPONENT ---
const GeneratedOutputWidget = ({ output }: { output: any }) => {
  const [activeTab, setActiveTab] = useState(output.tabs[0].id);
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>(
    { [output.tabs[0].id]: true } // First one open by default
  );

  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="bg-[#F6F6F4] text-[#1D1D1B] rounded-xl overflow-hidden shadow-sm border border-neutral-200">
      <div className="p-6 md:p-8 pb-4">
        <h3 className="text-2xl md:text-[28px] font-medium mb-4 tracking-tight">
          Product Information
        </h3>
        <div className="space-y-4 text-[15px] leading-[1.6] text-[#6b6b6b]">
          {output.description.map((paragraph: string, idx: number) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </div>

      {/* DESKTOP VIEW (Tabs) */}
      <div className="hidden md:block px-8 pb-8 pt-4">
        <div className="flex gap-2 border-b border-transparent">
          {output.tabs.map((tab: any) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-[14px] transition-all rounded-t-xl border font-medium -mb-[1px] relative z-10 ${
                  isActive
                    ? "bg-white border-[#0056b3] text-[#1D1D1B]"
                    : "bg-transparent border-transparent text-[#767676] hover:bg-[#eaeaea] border-b-[#EBEBEB]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
        <div className="bg-white border border-[#EBEBEB] rounded-b-xl rounded-tr-xl p-6 shadow-sm">
          <RenderTabContent
            tab={output.tabs.find((t: any) => t.id === activeTab)}
          />
        </div>
      </div>

      {/* MOBILE VIEW (Accordions) */}
      <div className="block md:hidden px-6 pb-6 pt-2">
        <div className="border-t border-[#EBEBEB]">
          {output.tabs.map((tab: any) => {
            const isOpen = openAccordions[tab.id];
            return (
              <div key={tab.id} className="border-b border-[#EBEBEB]">
                <button
                  onClick={() => toggleAccordion(tab.id)}
                  className="w-full flex justify-between items-center py-5 text-left text-[16px] text-[#1D1D1B]"
                >
                  {tab.label}
                  <span className="text-[#1D1D1B] text-xl font-light">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div className="pb-6 animate-in slide-in-from-top-2 fade-in duration-200">
                    <RenderTabContent tab={tab} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE ---

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-white font-sans text-neutral-900 selection:bg-neutral-100">
      <header className="border-b border-neutral-100">
        <div className="mx-auto max-w-[1600px] px-6 py-5 md:py-6">
          <h1 className="text-base font-bold uppercase tracking-widest text-black md:text-lg">
            Afterlight
          </h1>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] px-6 py-12 md:py-24">
        <div className="mb-20 md:mb-24">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-500 md:mb-4 md:text-[12px]">
             Demo 
          </p>
          <h2 className="max-w-4xl text-4xl font-bold tracking-tighter text-black sm:text-5xl md:text-7xl">
            {demoData.clientName}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-500">
            We took the product facts and filled in the missing listing content.
          </p>
        </div>

        {demoData.skus.map((sku, index) => (
          <div
            key={sku.id}
            className={`${
              index !== 0
                ? "mt-24 border-t border-neutral-100 pt-16 md:mt-32 md:pt-20"
                : ""
            }`}
          >
            <div className="mb-10 flex items-baseline gap-3 md:mb-12 md:gap-4">
              <span className="font-mono text-xs text-neutral-400 md:text-sm">
                0{index + 1}
              </span>
              <h3 className="text-xl font-medium tracking-tight md:text-2xl">
                {sku.displayName}
              </h3>
            </div>

            <div className="grid grid-cols-1 items-stretch gap-0 lg:grid-cols-[minmax(0,3.5fr)_auto_minmax(0,8.5fr)] lg:gap-12">
              {/* LEFT SIDE: INPUT */}
              <div className="flex w-full flex-col">
                <SectionHeader title="Input" />

                <div className="mb-6">
                  {sku.inputs.map((src, idx) => (
                    <div
                      key={idx}
                      className="relative mx-auto aspect-square w-full max-w-[400px] overflow-hidden rounded-xl border border-neutral-200 bg-[#f9f9f9] lg:mx-0"
                    >
                      <Image
                        src={src}
                        alt={`${sku.displayName} Input ${idx + 1}`}
                        fill
                        className="object-contain p-8 mix-blend-multiply"
                        sizes="(max-width: 1024px) 100vw, 30vw"
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-3 rounded-lg border border-neutral-100 bg-neutral-50 p-4 pt-2 md:pt-4">
                  <MetadataLabel label="TITLE" value={sku.displayName} />
                  <MetadataLabel label="LINK" value={sku.originalLink} isLink />
                </div>
              </div>

              {/* MIDDLE: ARROW */}
              <BigPipelineDivider />

              {/* RIGHT SIDE: GENERATED OUTPUT */}
              <div className="flex w-full flex-col">
                <SectionHeader title="Generated Copy" />

                <GeneratedOutputWidget output={sku.output} />
              </div>
            </div>
          </div>
        ))}

        <footer className="mt-24 flex items-center justify-between border-t border-neutral-100 pt-10 text-[11px] font-medium text-neutral-400 md:mt-40 md:pt-12 md:text-[13px]">
          <span>&copy; {new Date().getFullYear()} Afterlight</span>
          <span>Confidential</span>
        </footer>
      </div>
    </main>
  );
}