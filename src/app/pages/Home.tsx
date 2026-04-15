import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Properties } from "../components/Properties";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";

export function Home() {
  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#0a0a0a" }}>
      <Navbar />
      <Hero />
      <About />
      <Properties />
      <Contact />
      <Footer />
    </div>
  );
}
