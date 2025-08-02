import { useEffect, useState } from "react";
import Section from "../components/Section";
import work1 from "../assets/images/carousel1.jpg";
import work2 from "../assets/images/carousel2.jpg";
import work3 from "../assets/images/carousel3.jpg";
import { Link } from "react-router-dom";

const works = [
  {
    img: work1,
    title: "Sen portu",
    technique: "Olej na płótnie",
    year: "2023",
  },
  { img: work2, title: "Cichy świadek", technique: "Akryl", year: "2022" },
  {
    img: work3,
    title: "Kontrast natury",
    technique: "Olej na płótnie",
    year: "2024",
  },
];

export default function WorksSection() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Section className="bg-primary text-text relative flex flex-col items-center justify-center py-16 md:py-24">
      <h2
        className={`text-accent font-primary mb-12 text-4xl font-bold tracking-tight uppercase transition-all duration-1000 ease-out md:text-5xl lg:text-6xl ${
          animate ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
        }`}
      >
        Wybrane Prace
      </h2>

      <div className="grid w-full max-w-6xl grid-cols-1 gap-6 px-5 pb-10 sm:grid-cols-2 lg:grid-cols-3">
        {works.map((work, index) => (
          <div
            key={index}
            className={`group relative overflow-hidden rounded-xl border border-neutral-800 shadow-2xl transition-transform duration-700 hover:scale-105 ${
              animate
                ? "delay-[ translate-y-0 opacity-100" + index * 100 + "ms]"
                : "translate-y-5 opacity-0"
            }`}
          >
            <img
              src={work.img}
              alt={work.title}
              className="h-full w-full object-cover"
            />
            {/* Overlay info */}
            <div className="absolute bottom-0 left-0 w-full bg-black/60 p-3 text-sm text-white opacity-100 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:translate-y-full md:opacity-0">
              <h3 className="font-bold">{work.title}</h3>
              <p className="text-xs opacity-80">
                {work.technique}, {work.year}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Link
        to="/gallery"
        className="border-accent font-secondary text-accent hover:bg-accent hover:text-primary mt-4 rounded-lg border px-6 py-2 transition-colors duration-300"
      >
        Zobacz Galerię
      </Link>
    </Section>
  );
}
