import { useEffect, useRef, useState } from "react";
import Section from "../components/Section";

export default function Gallery() {
  const [allImages, setAllImages] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [selectedImage, setSelectedImage] = useState(null);
  const increment = 10;
  const loaderRef = useRef(null);

  useEffect(() => {
    async function fetchImages() {
      const res = await fetch(
        `https://www.googleapis.com/drive/v3/files?q='${import.meta.env.VITE_DRIVE_FOLDER_ID}'+in+parents&key=${import.meta.env.VITE_DRIVE_API}&fields=files(id,name,mimeType,thumbnailLink,webContentLink)`,
      );
      const data = await res.json();

      const files = data.files
        .filter((file) => file.mimeType.startsWith("image/"))
        .map((file) => ({
          id: file.id,
          name: file.name,
          thumbnail: file.thumbnailLink.replace("=s220", "=s640"),
          full: file.thumbnailLink.replace("=s220", "=s2000"),
        }));

      setAllImages(files);
    }
    fetchImages();
  }, []);

  useEffect(() => {
    if (!loaderRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((prev) =>
            Math.min(prev + increment, allImages.length),
          );
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [allImages]);

  const visibleImages = allImages.slice(0, visibleCount);

  return (
    <Section className="bg-primary text-text font-primary min-h-screen p-8 pt-10 tracking-widest uppercase md:pt-20">
      {/* Masonry layout */}
      <h1 className="text-accent mb-10 text-center text-4xl font-bold md:text-5xl">
        Galeria prac
      </h1>

      <div className="mx-auto max-w-7xl columns-1 gap-4 space-y-4 sm:columns-2 md:columns-3 lg:columns-4">
        {visibleImages.map((file) => (
          <div
            key={file.id}
            className="cursor-zoom-in break-inside-avoid overflow-hidden rounded-lg shadow-lg"
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

      <div ref={loaderRef} className="flex h-16 items-center justify-center">
        {visibleCount < allImages.length && "Ładowanie..."}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="bg-opacity-80 fixed inset-0 z-100 flex cursor-zoom-out items-center justify-center bg-black p-4"
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
