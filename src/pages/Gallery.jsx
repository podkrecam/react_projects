import { useEffect, useState } from "react";
import Section from "../components/Section";

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    async function fetchImages() {
      const res = await fetch(
        `https://www.googleapis.com/drive/v3/files?q='${import.meta.env.VITE_DRIVE_FOLDER_ID}'+in+parents&key=${import.meta.env.VITE_DRIVE_API}&fields=files(id,name,mimeType,thumbnailLink,webContentLink)`,
      );
      const data = await res.json();
      console.log(data);

      const files = data.files
        .filter((file) => file.mimeType.startsWith("image/"))
        .map((file) => ({
          id: file.id,
          name: file.name,
          thumbnail: file.thumbnailLink.replace("=s220", "=s640"),
          full: file.thumbnailLink.replace("=s220", "=s1200"),
        }));
      shuffle(files);
      setImages(files);
    }
    fetchImages();
  }, []);

  return (
    <Section className="bg-primary text-text font-primary min-h-screen p-8 pt-10 tracking-widest uppercase md:pt-20">
      {/* Masonry layout */}
      <h1 className="text-accent mb-10 text-center text-4xl font-bold md:text-5xl">
        Galeria prac
      </h1>

      <div className="columns-1 gap-4 space-y-4 sm:columns-2 md:columns-3 lg:columns-4">
        {images.map((file) => (
          <div
            key={file.id}
            className="cursor-pointer break-inside-avoid overflow-hidden rounded-lg shadow-lg"
            onClick={() => setSelectedImage(file.full)}
          >
            <img
              src={file.thumbnail}
              alt={file.name.split(".")[0]}
              className="h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="bg-opacity-80 fixed inset-0 z-100 flex items-center justify-center bg-black p-4"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="full view"
            className="max-h-full max-w-full rounded-lg shadow-xl"
          />
        </div>
      )}
    </Section>
  );
}
