import { useEffect, useState } from "react";
import Section from "../components/Section";
import bgTexture from "../assets/images/hero3.jpg";

export default function MottoSection() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Section className="bg-primary text-text relative flex h-[25vh] items-center justify-center overflow-hidden md:h-[40vh]">
      <div
        className="absolute inset-0 bg-black/50"
        style={{
          backgroundImage: `url(${bgTexture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />{" "}
      <div
        className={`font-primary text-primary relative z-10 max-w-4xl px-6 text-center text-3xl font-bold tracking-wide uppercase transition-all duration-1000 ease-out md:text-5xl lg:text-6xl ${
          animate ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
        }`}
      >
        "Sztuka jest językiem, którym mówię do świata."
      </div>
    </Section>
  );
}
