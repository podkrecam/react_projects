import Section from "../components/Section";
import { useEffect, useState } from "react";

const a =
  "352977332252-g2h1no8vvrlf2opusc1fbdnta959a7ce.apps.googleusercontent.com";

const folderId = "1nmV92eolAFxjprEyWYt82i5BRl0srAVH";
const apiKey =
  "352977332252-g2h1no8vvrlf2opusc1fbdnta959a7ce.apps.googleusercontent.com";

export default function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      const res = await fetch(
        `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}&fields=files(id,name,mimeType)`,
      );
      const data = await res.json();
      const files = data.files
        .filter((file) => file.mimeType.startsWith("image/"))
        .map((file) => ({
          id: file.id,
          name: file.name,
          url: `https://drive.google.com/uc?export=view&id=${file.id}`,
        }));
      setImages(files);
    }
    fetchImages();
  }, []);

  return (
    <Section className="bg-primary text-text relative flex h-screen flex-col items-center justify-center overflow-hidden">
      <h2 className="text-accent font-primary mb-10 text-4xl font-bold uppercase">
        Strona w budowie...
      </h2>
      {images.map((img) => (
        <div key={img.id} className="rounded shadow">
          <img src={img.url} alt={img.name} className="h-auto w-full" />
        </div>
      ))}
    </Section>
  );
}
