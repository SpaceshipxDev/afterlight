import Link from "next/link";
import { CONTACT, EMAIL, LegalDoc, type Section } from "@/components/Site";

export const metadata = {
  title: "Terms of Service — Afterlight",
  description: "Terms for using the Afterlight manufacturing execution system.",
};

const sections: Section[] = [
  {
    id: "agreement",
    title: "Agreement",
    body: (
      <>
        <p>
          These terms govern use of the Afterlight manufacturing execution system and related services (the
          &ldquo;Service&rdquo;) provided by Afterlight, Inc. (&ldquo;Afterlight&rdquo;, &ldquo;we&rdquo;) to a business
          (the &ldquo;Customer&rdquo;).
        </p>
        <p>
          Where the Customer has signed an agreement or order form with us, that document governs and these terms fill in
          anything it does not cover. Where they conflict, the signed document prevails.
        </p>
      </>
    ),
  },
  {
    id: "service",
    title: "The Service",
    body: (
      <p>
        We set up the Service from the Customer&rsquo;s existing production records, host it, and keep it running. The
        scope, setup and service levels for each Customer are set out in its order form.
      </p>
    ),
  },
  {
    id: "changes-by-request",
    title: "Changes made on request",
    body: (
      <p>
        Authorized users can ask for changes to the Service, including through the Afterlight assistant. Changes go
        live in the Customer&rsquo;s Service. The Customer should check that each change works as intended
        and tell us promptly if it does not; we will correct or roll it back.
      </p>
    ),
  },
  {
    id: "accounts",
    title: "Accounts and users",
    body: (
      <p>
        The Customer decides who uses the Service and is responsible for their use of it, for keeping passwords and
        devices secure, and for giving its staff any notices the law requires about the data recorded about them.
      </p>
    ),
  },
  {
    id: "use",
    title: "Acceptable use",
    body: (
      <>
        <p>The Customer will not, and will not let others:</p>
        <ul>
          <li>Use the Service in breach of law or of others&rsquo; rights.</li>
          <li>Try to access other customers&rsquo; data or break the Service&rsquo;s security.</li>
          <li>Resell the Service or use it to build a competing product.</li>
          <li>Overload the Service or disrupt it for others.</li>
        </ul>
      </>
    ),
  },
  {
    id: "data",
    title: "Customer data",
    body: (
      <>
        <p>
          The Customer owns its data. We use it only to provide, support and secure the Service, as described in our{" "}
          <Link href="/privacy">Privacy Policy</Link>, and for other purposes only where the Customer has agreed in
          writing.
        </p>
        <p>
          The Customer can ask for a full export of its data at any time. After the agreement ends, we delete it within 30
          days of the Customer&rsquo;s request, except where the law requires us to keep it.
        </p>
      </>
    ),
  },
  {
    id: "fees",
    title: "Fees",
    body: (
      <p>
        Fees, payment terms and renewal are set out in the order form. If fees remain unpaid after notice, we may limit the
        Service to read-only access until payment is made. Customer data is not deleted for late payment.
      </p>
    ),
  },
  {
    id: "confidentiality",
    title: "Confidentiality",
    body: (
      <p>
        Each party will protect the other&rsquo;s non-public information with at least reasonable care and use it only for
        the purposes of the agreement. Drawings, prices, customer lists and production data are the Customer&rsquo;s
        confidential information.
      </p>
    ),
  },
  {
    id: "ip",
    title: "Intellectual property",
    body: (
      <p>
        Afterlight owns the Service and its software, including changes made for the Customer. The Customer receives the
        right to use the Service for its own operations for the term of the agreement.
      </p>
    ),
  },
  {
    id: "warranty",
    title: "Warranties",
    body: (
      <p>
        We will provide the Service with reasonable skill and care. Except as stated in the agreement, the Service is
        provided &ldquo;as is&rdquo;, and we make no other warranties, express or implied, including of merchantability or
        fitness for a particular purpose. Production, quality and delivery decisions remain the Customer&rsquo;s.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: (
      <p>
        Neither party is liable for indirect or consequential losses, or for lost profits, revenue or data, even if advised
        of the possibility. Each party&rsquo;s total liability is limited to the fees paid by the Customer in the 12 months
        before the claim. These limits do not apply to breach of confidentiality, the Customer&rsquo;s payment obligations,
        or liability that cannot be limited by law.
      </p>
    ),
  },
  {
    id: "term",
    title: "Term and termination",
    body: (
      <p>
        The agreement runs for the term in the order form. Either party may end it on written notice if the other
        materially breaches it and does not fix the breach within 30 days.
      </p>
    ),
  },
  {
    id: "law",
    title: "Governing law",
    body: (
      <p>
        These terms are governed by the laws of the State of Delaware, United States, unless the order form says
        otherwise. The parties will first try to settle any dispute in good faith.
      </p>
    ),
  },
  {
    id: "updates",
    title: "Changes to these terms",
    body: (
      <p>
        We may update these terms and will post the new version here with a new effective date. Changes do not affect a
        signed agreement during its current term.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <p>
        Afterlight, Inc.
        <br />
        <a href={CONTACT}>{EMAIL}</a>
      </p>
    ),
  },
];

export default function TermsPage() {
  return <LegalDoc title="Terms of Service" effective="November 7, 2026" sections={sections} />;
}
