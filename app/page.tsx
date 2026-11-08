import type { Metadata } from "next";
import Home from "./Home";

export const metadata: Metadata = {
  title: "Afterlight — Manufacturing execution system",
  description: "Software for your factory.",
};

export default function Page() {
  return <Home />;
}
