import type { Metadata } from "next";
import Home from "./Home";

export const metadata: Metadata = {
  title: "Afterlight — Factory software that builds itself",
  description:
    "A factory sends us the Excel they run on. An hour later it's their production system, and they change it by asking. Last week 101 workers scanned 12,867 times.",
  openGraph: {
    title: "Afterlight — Factory software that builds itself",
    description: "Last week 101 workers on factory floors scanned 12,867 times.",
    url: "https://tryafterlight.com",
    siteName: "Afterlight",
  },
};

export default function Page() {
  return <Home />;
}
