import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import EventFacts from "@/components/EventFacts";
import Scope from "@/components/Scope";
import Timeline from "@/components/Timeline";
import Phases from "@/components/Phases";
import Investment from "@/components/Investment";
import Why from "@/components/Why";
import FAQ from "@/components/FAQ";
import NextSteps from "@/components/NextSteps";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <EventFacts />
      <Scope />
      <Timeline />
      <Phases />
      <Investment />
      <Why />
      <FAQ />
      <NextSteps />
      <Footer />
    </main>
  );
}
