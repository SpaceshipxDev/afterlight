import type { ReactNode } from "react";

export type InvestorSlide = {
  id: string;
  title: string;
  content: ReactNode;
  images?: string[];
};

const baseSlides: Omit<InvestorSlide, "images">[] = [
  {
    id: "hook",
    title: "You care more when it's you",
    content: (
      <>
        <p className="text-neutral-400">And so does every Nike customer.</p>
      </>
    ),
  },
  {
    id: "fantasy",
    title: "People Don't Buy Products",
    content: (
      <>
        <p className="mb-6">
          A dad doesn&apos;t buy a Tesla for the torque. He buys it because he
          can see his kids grinning in the back seat.
        </p>
        <p className="text-neutral-400 mb-6">
          A woman doesn&apos;t buy Gucci for the leather. She buys it because
          she can imagine walking into the office tomorrow and her coworkers
          noticing.
        </p>
        <p className="text-white">
          The purchase happens in the imagination. The product is just the
          receipt.
        </p>
      </>
    ),
  },
  {
    id: "broken",
    title: "Ecommerce Is Broken",
    content: (
      <>
        <p className="mb-6">
          Right now, every product page shows the same compressed image to every
          person on earth.
        </p>
        <p className="text-neutral-400 mb-6">
          A white background. A generic model. A lifestyle photo of someone
          else&apos;s life.
        </p>
        <p className="text-white">
          The single reason a customer would buy your product — their personal
          fantasy — you&apos;re not conveying it. You&apos;re making them do the
          imaginative work themselves.
        </p>
      </>
    ),
  },
  {
    id: "future",
    title: "The Future of Buying",
    content: (
      <>
        <p className="mb-6">You see yourself in every product.</p>
        <p className="text-neutral-400 mb-6">
          You in the clothes. Your kids in the car. Your apartment with the
          furniture. A video of you flexing your LVs to your exact friends on
          Wednesday.
        </p>
        <p className="text-white">
          The store doesn&apos;t show you a product. It shows you the version of
          your life where you already own it.
        </p>
      </>
    ),
  },
  {
    id: "tennis-focus",
    title: "",
    content: null,
  },
  {
    id: "wedge",
    title: "What We&apos;re Building",
    content: (
      <>
        <p className="mb-6">
          A customer uploads a photo. The store renders the product in their
          life.
        </p>
        <p className="text-neutral-400 mb-6">
          Not a generic lifestyle shot. Their face, their body, their world. The
          emails do it too. The ads do it too. Every touchpoint becomes personal.
        </p>
        <p className="text-white">
          We generate the fantasy that closes the sale.
        </p>
      </>
    ),
  },
  {
    id: "babies-pets",
    title: "Why Babies and Pets First",
    content: (
      <>
        <p className="mb-6">Parents don&apos;t have selfies. They have thousands of photos of their kids.</p>
        <p className="text-neutral-400 mb-6">
          Pet owners have thousands of their dogs. The data is already sitting in
          their camera roll. The buying intent is insane.
        </p>
        <p className="text-white">
          Show a mother her baby in the outfit and she doesn&apos;t think. She
          buys.
        </p>
      </>
    ),
  },
  {
    id: "today",
    title: "Where We Are",
    content: (
      <>
        <p className="mb-6">
          Today, we generate product photography for brands. That&apos;s the
          door opener.
        </p>
        <p className="text-neutral-400">
          It gets us into merchant workflows, creates immediate value, and moves
          them from static images to dynamic ones. Our founding customer Derek
          at{" "}
          <a
            href="https://www.axiscrew.com.au"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-neutral-300 underline decoration-neutral-600 underline-offset-4 transition-all relative z-50"
          >
            Axis Crew
          </a>{" "}
          calls it &quot;10x faster.&quot; From there, we turn the camera toward
          the customer.
        </p>
      </>
    ),
  },
  {
    id: "proof",
    title: "Early Proof",
    content: (
      <>
        <p className="mb-8">
          5 paying customers across San Francisco and Melbourne.
        </p>
        <ul className="text-xl md:text-2xl text-neutral-400 space-y-2 mb-8 font-mono relative z-50">
          <li>
            - 300 hours saved in total –{" "}
            <a
              href="https://www.axiscrew.com.au"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-neutral-300 underline decoration-neutral-600 underline-offset-4 transition-all"
            >
              Axis Crew
            </a>{" "}
            <span className="text-neutral-600">(Founding)</span>
          </li>
          <li>
            - 30 hours saved last month –{" "}
            <a
              href="https://www.instagram.com/bigtimevtg/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-neutral-300 underline decoration-neutral-600 underline-offset-4 transition-all"
            >
              Big Time Vintage
            </a>
          </li>
          <li>
            - Listed 1000+ jeweler products –{" "}
            <a
              href="https://3k4wh1-ck.myshopify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-neutral-300 underline decoration-neutral-600 underline-offset-4 transition-all"
            >
              Cottage Industry
            </a>
          </li>
          <li>
            - 40 hours saved last month –{" "}
            <a
              href="https://www.stateofflux.shop"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-neutral-300 underline decoration-neutral-600 underline-offset-4 transition-all"
            >
              State of Flux
            </a>
          </li>
          <li>
            - 20 hours saved last month –{" "}
            <a
              href="https://www.bobbylondonsf.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-neutral-300 underline decoration-neutral-600 underline-offset-4 transition-all"
            >
              Bobby London SF
            </a>
          </li>
        </ul>
        <p className="text-lg md:text-xl text-neutral-300 mb-4 leading-relaxed relative z-50">
          400 live products generated for Axis Crew to date. Last week I walked
          into ShopTalk with no badge and left with 16 warm pilots including
          Gap, JR Cigars, and Behr.
        </p>
        <p className="text-lg md:text-xl text-neutral-400 leading-relaxed">
          Converting a $100K contract with Balsam Hill while onboarding Ledge
          Lounger and Baby Braithwaite onto the platform.
        </p>
      </>
    ),
  },
  {
    id: "why-me",
    title: "Why Me",
    content: (
      <>
        <p className="mb-4 text-neutral-400">
          Taught myself to code at 16.
        </p>
        <p className="mb-4 text-neutral-400">
          Dropped out and flew to Hangzhou at 17. Knew nobody. Camped outside
          DeepSeek headquarters until I got introductions into factory networks,
          then sold AI ERP pilots across hundreds of seats.
        </p>
        <p className="mb-8 text-neutral-400">
          Flew to San Francisco at 18. It was Christmas day and nobody picked up
          my cold calls. So I walked into shops the next morning and closed
          paying customers.
        </p>
        <p className="text-white">I fucking distort reality</p>
      </>
    ),
  },
  {
    id: "why-now",
    title: "Why Now",
    content: (
      <>
        <p className="mb-6">Generation finally works.</p>
        <p className="text-neutral-400 mb-6">
          For the first time in history, we can put a customer inside the
          product they&apos;re about to buy. The technology to generate that
          personal fantasy — in real time, at scale — exists today.
        </p>
        <p className="text-white">It didn&apos;t exist 18 months ago.</p>
      </>
    ),
  },
  {
    id: "vision",
    title: "The Vision",
    content: (
      <>
        <p className="mb-6">
          Today: a personalized storefront.
        </p>
        <p className="text-neutral-400 mb-6">
          Tomorrow: every screen you look at is about you.
        </p>
        <p className="text-white">
          Commerce is the beachhead. The real product is a personalized internet.
        </p>
      </>
    ),
  },
  {
    id: "ask",
    title: "The Ask",
    content: (
      <>
        <p className="mb-6 text-neutral-400">
          We have the thesis. We have the wedge. We have paying customers and
          enterprise pipeline.
        </p>
        <p className="mb-10 text-white">
          We&apos;re raising to turn this into the default way people buy things
          online.
        </p>
        <p className="text-white">– Harry</p>
      </>
    ),
  },
];

export function createInvestorSlides(
  imagesById: Record<string, string[] | undefined>,
  slideOverrides?: Partial<Record<string, Partial<InvestorSlide>>>,
): InvestorSlide[] {
  return baseSlides.map((slide) => {
    const images = imagesById[slide.id];
    const override = slideOverrides?.[slide.id];

    return { ...slide, ...(images ? { images } : {}), ...override };
  });
}
