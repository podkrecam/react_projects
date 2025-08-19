import Section from "../components/Section";
import { useEffect, useState } from "react";

export default function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      const res = await fetch(
        `https://www.googleapis.com/drive/v3/files?q='${import.meta.env.DRIVE_FOLDER_ID}'+in+parents&key=${import.meta.env.DRIVE_API}&fields=files(id,name,mimeType)`,
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
      {images.map((file) => (
        <div key={file.id}>
          <img
            src={`https://drive.google.com/uc?export=view&id=${file.id}`}
            alt={file.name}
            className="rounded-lg shadow"
          />
          <p>{file.name}</p>
        </div>
      ))}
    </Section>
  );
}
