import { useEffect, useState } from "react";
import Section from "../components/Section";
import hero1 from "../assets/images/hero1.jpg";
import hero2 from "../assets/images/hero2.jpg";
import hero3 from "../assets/images/hero3.jpg";

export default function HeroSection() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Section className="bg-primary text-text relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <p
        className={`font-secondary text-text mt-6 w-3/4 text-center text-lg tracking-wide transition-all duration-1000 ease-out md:w-1/2 ${animate ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`}
      >
        Zanurz się w świecie mojej sztuki i pozwól, aby moje obrazy inspirowały
        i poruszały Twoje zmysły.
      </p>

      <div className="relative z-10 flex h-auto w-full max-w-[400px] items-center justify-center pt-10 pb-10 md:h-auto md:w-1/3 md:items-center xl:w-full">
        {/* Lewa karta */}
        <img
          src={hero2}
          alt="Obraz 2"
          className={`absolute h-auto w-2/3 rounded-xl border border-neutral-800 shadow-2xl transition-all duration-1000 ease-out hover:translate-x-[0%] hover:translate-y-[-10%] hover:scale-105 hover:rotate-1 md:w-full xl:w-full ${
            animate
              ? "opacity-100 md:translate-x-[60%] md:translate-y-[5%] md:rotate-[-6deg]"
              : "opacity-0"
          } md:static`}
        />

        {/* Środkowa karta */}
        <img
          src={hero1}
          alt="Obraz 1"
          className={`relative z-10 h-auto w-4/5 rounded-xl border border-neutral-800 shadow-2xl transition-transform duration-500 hover:scale-105 hover:rotate-1 xl:w-full ${
            animate ? "opacity-100" : "scale-90 opacity-0"
          }`}
        />

        {/* Prawa karta */}
        <img
          src={hero3}
          alt="Obraz 3"
          className={`absolute h-auto w-2/3 rounded-xl border border-neutral-800 shadow-2xl transition-all duration-1000 ease-out hover:translate-x-[0%] hover:translate-y-[-10%] hover:scale-105 hover:rotate-1 md:w-full xl:w-full ${
            animate
              ? "opacity-100 md:translate-x-[-60%] md:translate-y-[5%] md:rotate-[6deg]"
              : "opacity-0"
          } md:static`}
        />
      </div>
      <h1 className="text-accent font-primary bottom-7 z-30 text-[12vw] font-bold tracking-tight text-wrap uppercase select-none md:absolute md:bottom-0 md:text-[12vw]">
        Jadwiga Osial
      </h1>
    </Section>
  );
}
