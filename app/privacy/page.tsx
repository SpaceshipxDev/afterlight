import { CONTACT, EMAIL, LegalDoc, type Section } from "@/components/Site";

export const metadata = {
  title: "Privacy Policy — Afterlight",
  description: "How Afterlight handles information on tryafterlight.com and in the Afterlight manufacturing execution system.",
};

const Mail = () => <a href={CONTACT}>{EMAIL}</a>;

const sections: Section[] = [
  {
    id: "scope",
    title: "Scope",
    body: (
      <>
        <p>
          Afterlight, Inc. (&ldquo;Afterlight&rdquo;, &ldquo;we&rdquo;) makes manufacturing execution software for factories
          (the &ldquo;Service&rdquo;). This policy covers tryafterlight.com and the Service.
        </p>
        <p>
          For information a factory puts into the Service, the factory is the controller and Afterlight processes it on the
          factory&rsquo;s behalf, under our agreement with that factory. If you work at a factory that uses Afterlight,
          questions about your data go to your employer first; we will help them answer.
        </p>
      </>
    ),
  },
  {
    id: "collect",
    title: "Information we handle",
    body: (
      <ul>
        <li>
          <strong>Production data.</strong> Orders, parts, drawings, quantities, due dates, process steps, suppliers and
          customers, as entered or imported by the factory.
        </li>
        <li>
          <strong>Shop-floor records.</strong> Scans of order QR codes, with the worker, step, quantity and time.
        </li>
        <li>
          <strong>Account information.</strong> Names, roles and phone numbers of the people a factory sets up as users.
        </li>
        <li>
          <strong>Requests.</strong> Messages and files sent to the Afterlight assistant, including in WeChat groups where
          the factory has added it. The assistant reads messages addressed to it and the context needed to act on them.
        </li>
        <li>
          <strong>Technical data.</strong> Server logs such as IP address, device type and request times, kept for security
          and troubleshooting.
        </li>
        <li>
          <strong>Correspondence.</strong> What you send when you email us.
        </li>
      </ul>
    ),
  },
  {
    id: "use",
    title: "How we use it",
    body: (
      <>
        <ul>
          <li>To run the Service for the factory, including making the changes the factory asks for.</li>
          <li>To support, secure and fix the Service.</li>
          <li>To meet legal obligations.</li>
        </ul>
        <p>
          A factory&rsquo;s data is used for AI training only under our Licensed Data Training Program, by separate
          written agreement. To take part, contact us at <Mail />. We do not sell personal information and do not use it
          for advertising.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "Service providers",
    body: (
      <>
        <p>We share information only with providers that help us run the Service, under contracts that limit their use of it:</p>
        <ul>
          <li>Cloud hosting and storage.</li>
          <li>AI model providers, which process requests sent to the assistant. They may not train on this data.</li>
          <li>Email and messaging services used to deliver notifications.</li>
        </ul>
        <p>We disclose information to authorities only when the law requires it.</p>
      </>
    ),
  },
  {
    id: "location",
    title: "Where data is stored",
    body: (
      <p>
        The Service runs on cloud infrastructure in the United States and Asia. Where a factory&rsquo;s data is hosted is
        set out in its agreement. Transfers between regions follow applicable data protection law.
      </p>
    ),
  },
  {
    id: "security",
    title: "Security",
    body: (
      <ul>
        <li>Each factory runs on its own application instance and database. No factory can see another&rsquo;s data.</li>
        <li>All traffic is encrypted in transit with TLS.</li>
        <li>Production access is limited to Afterlight staff who need it to run and support the Service.</li>
      </ul>
    ),
  },
  {
    id: "retention",
    title: "Retention and deletion",
    body: (
      <p>
        We keep a factory&rsquo;s data for as long as it uses the Service. When the agreement ends, the factory can ask for a
        full export, and we delete its data within 30 days of that request, except where the law requires us to keep it.
        Server logs are kept only as long as needed for security and troubleshooting.
      </p>
    ),
  },
  {
    id: "rights",
    title: "Your rights",
    body: (
      <p>
        Depending on where you are, you may have the right to access, correct, delete or export your personal information,
        or to object to how it is used. Email <Mail />. If the request concerns data a factory controls, we will pass it
        to that factory and help it respond.
      </p>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    body: (
      <p>
        tryafterlight.com uses no advertising or tracking cookies. The Service uses essential cookies only, to keep you
        signed in.
      </p>
    ),
  },
  {
    id: "children",
    title: "Children",
    body: <p>The Service is for businesses. We do not knowingly collect information from anyone under 16.</p>,
  },
  {
    id: "changes",
    title: "Changes",
    body: (
      <p>
        We will post any change here with a new effective date. For material changes, we will tell the factories we work
        with before the change takes effect.
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
        <Mail />
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return <LegalDoc title="Privacy Policy" effective="November 7, 2026" sections={sections} />;
}
