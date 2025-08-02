import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Section from "../components/Section";
import artistPhoto from "../assets/images/me.jpg";

export default function AboutSection() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Section className="bg-secondary text-text relative flex items-center justify-center overflow-hidden py-16 md:py-24">
      <div className="grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-5 md:grid-cols-2 md:gap-16">
        {/* Kolumna ze zdjęciem */}

        <div
          className={`flex flex-col items-start justify-center space-y-6 transition-all duration-1000 ease-out ${
            animate
              ? "translate-x-0 opacity-100 delay-200"
              : "translate-x-10 opacity-0"
          }`}
        >
          <h2 className="text-accent font-primary text-4xl font-bold uppercase sm:text-5xl md:text-6xl">
            O mnie
          </h2>
          <p className="font-secondary text-lg leading-relaxed md:text-xl">
            Jadwiga Osial – malarka z pasją do pejzaży, portretów i abstrakcji.
            W swojej twórczości łączy tradycyjne techniki z nowoczesną
            wrażliwością, tworząc obrazy pełne emocji i intensywnych barw. Każdy
            obraz to zaproszenie do świata koloru i wyobraźni.
          </p>

          <Link
            to="/about"
            className="border-accent font-secondary text-accent hover:bg-accent hover:text-primary mt-4 rounded-lg border px-6 py-2 transition-colors duration-300"
          >
            Czytaj więcej
          </Link>
        </div>
        <div
          className={`flex justify-center transition-all duration-1000 ease-out ${
            animate ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
          }`}
        >
          <img
            src={artistPhoto}
            alt="Jadwiga Osial"
            className="max-h-[60vh] w-full max-w-md rounded-xl border border-neutral-800 object-cover shadow-2xl"
          />
        </div>
      </div>
    </Section>
  );
}
