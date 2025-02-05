import About from "@/components/about";
import BestSellers from "./_components/bestsellers";
import Hero from "./_components/hero";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <BestSellers />
      <About />
      <Contact />
    </main>
  );
}
