import type { Metadata } from "next";
import Home from "./Home";

export const metadata: Metadata = {
  title: "Afterlight",
  description: "Software for factories.",
};

export default function Page() {
  return <Home />;
}
