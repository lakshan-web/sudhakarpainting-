import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";
import { Works } from "@/components/sections/Works";
import { Style } from "@/components/sections/Style";
import { Ratings } from "@/components/sections/Ratings";
import { Contact } from "@/components/sections/Contact";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Sudhakar Painting — Crafting Identity on Wheels" },
      {
        name: "description",
        content:
          "Premium Indian lorry painting workshop. Full body paint, custom name boards, traditional truck art and modern finishes. 4.8/5 rated.",
      },
      { property: "og:title", content: "Sudhakar Painting — Crafting Identity on Wheels" },
      { property: "og:description", content: "Bold colors. Clean lettering. Traditional art. Modern design." },
    ],
  }),
});

function Index() {
  return (
    <main className="relative">
      <Hero />
      <Works />
      <Style />
      <Ratings />
      <Contact />
    </main>
  );
}
