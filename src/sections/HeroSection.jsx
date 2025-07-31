import Section from "../components/Section";

export default function HeroSection() {
  return (
    <Section className="bg-black-100 text-text flex h-full flex-col items-center justify-center gap-10 p-10 text-center md:grid md:grid-cols-2 md:grid-rows-2">
      <div className="hidden md:block">Obraz 1</div>
      <h1 className="font-primary text-7xl">JADWIGA OSIAL</h1>
      <div className="row-start-2">3</div>
      <div className="row-start-2 flex flex-col text-center">
        <p className="font-secondary text-sm">
          Odkryj piękno pejzaży, portretów i abstrakcji pełnych emocji i
          intensywnych kolorów. Zanurz się w świecie mojej sztuki i pozwól, aby
          moje obrazy inspirowały i poruszały Twoje zmysły.
        </p>
      </div>
    </Section>
  );
}
