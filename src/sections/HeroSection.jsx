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
    <Section className="bg-primary text-text relative flex items-center justify-center overflow-hidden md:h-screen">
      <div className="flex w-full max-w-7xl flex-col items-center justify-center gap-8 px-5 py-10 md:grid md:grid-cols-2 md:gap-6">
        {/* lewa kolumna */}
        <div className="flex flex-col items-start justify-center space-y-6 px-5">
          <h1 className="text-accent font-primary text-5xl font-bold tracking-tight uppercase sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
            Jadwiga Osial
          </h1>
          <p
            className={`font-secondary text-text text-justify text-base tracking-wide transition-all duration-1000 ease-out sm:text-lg md:text-xl ${
              animate ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
          >
            Odkryj piękno pejzaży, portretów i abstrakcji pełnych emocji i
            intensywnych kolorów. Zanurz się w świecie mojej sztuki i pozwól,
            aby moje obrazy inspirowały i poruszały Twoje zmysły.
          </p>
        </div>

        {/* prawa kolumna */}
        <div className="flex items-center justify-center px-4">
          <img
            src={hero1}
            alt="Obraz 1"
            className={`max-h-[65vh] w-full max-w-lg rounded-xl border border-neutral-800 object-cover shadow-2xl transition-transform duration-1000 hover:scale-105 md:max-h-[80vh] ${
              animate ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
          />
        </div>
      </div>
    </Section>
  );
}
