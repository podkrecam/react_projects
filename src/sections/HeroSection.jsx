import { useEffect, useState } from "react";
import Section from "../components/Section";
import hero1 from "../assets/images/hero1.jpg";

export default function HeroSection() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Section className="bg-primary text-text relative flex h-screen items-center justify-center overflow-hidden">
      <div className="grid h-full w-full max-w-7xl grid-cols-1 items-center md:grid-cols-2">
        {/* lewa kolumna */}
        <div className="flex flex-col items-start justify-center space-y-6 px-5">
          <h1 className="text-accent font-primary text-3xl font-bold tracking-tight uppercase md:text-8xl lg:text-9xl">
            Jadwiga Osial
          </h1>
          <p
            className={`font-secondary text-text text-lg tracking-wide transition-all duration-1000 ease-out md:text-xl ${
              animate ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
          >
            Zanurz się w świecie mojej sztuki i pozwól, aby moje obrazy
            inspirowały i poruszały Twoje zmysły.
          </p>
        </div>

        {/* Prawa kolumna */}
        <div className="flex max-h-4/5 justify-center px-2 md:px-16 xl:px-24">
          <img
            src={hero1}
            alt="Obraz 1"
            className={`max-w-full rounded-xl border border-neutral-800 object-cover shadow-2xl transition-transform duration-500 hover:scale-105 ${
              animate ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
          />
        </div>
      </div>
    </Section>
  );
}
