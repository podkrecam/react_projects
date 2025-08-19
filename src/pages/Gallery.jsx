import Section from "../components/Section";
import { useEffect, useState } from "react";

export default function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      const res = await fetch(
        `https://www.googleapis.com/drive/v3/files?q='${import.meta.env.VITE_DRIVE_FOLDER_ID}'+in+parents&key=${import.meta.env.VITE_DRIVE_API}&fields=files(id,name,mimeType)`,
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
    <Section className="bg-primary text-text min-h-screen p-8">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {images.map((file) => (
          <div key={file.id} className="flex flex-col items-center">
            <img
              src={file.url}
              alt={file.name}
              className="w-full rounded-lg object-cover shadow-lg"
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
