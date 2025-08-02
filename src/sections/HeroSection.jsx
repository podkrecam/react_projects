import { useEffect, useState } from "react";
import Section from "../components/Section";
import hero1 from "../assets/images/hero1.jpg";
import hero2 from "../assets/images/hero2.jpg";
import hero3 from "../assets/images/hero3.jpg";

export default function HeroSection() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Section className="bg-primary text-text relative flex h-screen items-center justify-center overflow-hidden">
      {/* Duży napis w tle */}
      <h1 className="text-text font-primary absolute bottom-0 z-0 text-[12vw] font-bold tracking-tight uppercase select-none sm:text-[12vw]">
        Jadwiga Osial
      </h1>

      {/* Kontener na karty */}
      <div className="relative z-10 flex h-full w-full max-w-[400px] items-end justify-center sm:h-auto sm:w-1/3 sm:items-center">
        {/* Lewa karta */}
        <img
          src={hero2}
          alt="Obraz 2"
          className={`absolute h-auto w-2/3 rounded-xl border border-neutral-800 shadow-2xl transition-all duration-700 ease-out sm:w-full ${
            animate
              ? "opacity-100 sm:translate-x-[30%] sm:translate-y-[5%] sm:rotate-[-6deg]"
              : "translate-y-[50%] opacity-0"
          } sm:static sm:opacity-100`}
          style={{
            bottom: animate ? "10%" : "-50%", // efekt wjazdu od dołu na mobile
            transform: animate ? "translateY(0)" : "translateY(50px)",
          }}
        />

        {/* Środkowa karta */}
        <img
          src={hero1}
          alt="Obraz 1"
          className={`relative z-10 h-auto w-2/3 rounded-xl border border-neutral-800 shadow-2xl transition-transform duration-500 hover:scale-105 hover:rotate-1 sm:w-full ${
            animate ? "opacity-100" : "scale-90 opacity-0"
          }`}
        />

        {/* Prawa karta */}
        <img
          src={hero3}
          alt="Obraz 3"
          className={`absolute h-auto w-2/3 rounded-xl border border-neutral-800 shadow-2xl transition-all duration-700 ease-out sm:w-full ${
            animate
              ? "opacity-100 sm:translate-x-[-30%] sm:translate-y-[5%] sm:rotate-[6deg]"
              : "translate-y-[50%] opacity-0"
          } sm:static sm:opacity-100`}
          style={{
            bottom: animate ? "10%" : "-50%",
            transform: animate ? "translateY(0)" : "translateY(50px)",
          }}
        />
      </div>
    </Section>
  );
}
