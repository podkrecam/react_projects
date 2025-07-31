import HeroSection from "../sections/HeroSection";
import Section from "../components/Section";

function Home() {
  return (
    <>
      <HeroSection />
      <Section className="bg-gray-100">
        <h1>Druga sekcja</h1>
      </Section>
      <Section className="bg-gray-700">
        <h1>Trzecia sekcja</h1>
      </Section>
    </>
  );
}

export default Home;
