import { useEffect, useState } from "react";
import Section from "../components/Section";
import portrait from "../assets/images/me.jpg";

export default function AboutHero() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Section className="bg-primary text-text relative flex items-center justify-center overflow-hidden md:h-screen">
      <div className="flex w-full max-w-6xl flex-col items-center justify-center gap-8 px-5 py-10 md:grid md:grid-cols-2 md:gap-6">
        {/* Lewa kolumna - portret */}
        <div className="flex items-center justify-center px-4 py-4">
          <img
            src={portrait}
            alt="Jadwiga Osial"
            className={`max-h-[65vh] w-full max-w-lg rounded-xl border border-neutral-800 object-cover shadow-2xl transition-transform duration-1000 hover:scale-105 md:max-h-[80vh] ${
              animate ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
          />
        </div>

        {/* Prawa kolumna - opis */}
        <div className="mt-5 flex flex-col items-start justify-center space-y-6 px-5 md:mt-0">
          <h2 className="text-accent font-primary text-4xl font-bold tracking-tight uppercase sm:text-5xl md:text-6xl">
            O mnie
          </h2>
          <p
            className={`font-secondary text-text text-justify text-base tracking-wide transition-all duration-1000 ease-out sm:text-lg md:text-xl ${
              animate ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
          >
            Nazywam się Jadwiga Osial i od lat tworzę malarstwo, które jest
            zaproszeniem do świata emocji i barw. Inspiruje mnie natura,
            codzienne życie i magia chwil uchwyconych na płótnie.
          </p>
          <p
            className={`font-secondary text-text text-justify text-base tracking-wide transition-all delay-200 duration-1000 ease-out sm:text-lg md:text-xl ${
              animate ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
          >
            Moje prace łączą tradycyjne techniki z osobistą interpretacją
            rzeczywistości. Każdy obraz to fragment historii, który zaprasza do
            własnych refleksji i emocji.
          </p>
        </div>
      </div>
    </Section>
  );
}
