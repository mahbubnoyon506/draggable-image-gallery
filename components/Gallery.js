
"use client"

import React, { useState } from "react";

import GalleryImage from "./GalleryImage";

import { Inter } from "next/font/google";
import images from "@/common/data/images";
import GalleryHeader from "./GalleryHeader";


const inter = Inter({ subsets: ["latin"] });

const Gallery = () => {
  const [selectThumbnails, setSelectThumbnails] = useState([]);
  const [thumbnails, setThumbnails] = useState(images);
  const [dragging, setDragging] = useState(false);
  const [draggedImage, setDraggedImage] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (image) => {
    setDragging(true);
    setDraggedImage(image);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e?.target?.children[0]?.alt && setDraggedIndex(e?.target?.children[0]?.alt);
  };

  const handleDrop = (index) => {
    setDragging(false);

    if (draggedImage) {
      const updatedImages = thumbnails.filter(
        (image) => image.id !== draggedImage.id
      );
      updatedImages.splice(index, 0, draggedImage);

      setThumbnails(updatedImages);
      setDraggedImage(null);
    }
  };

  const handleDeleteClick = () => {
    const updatedImages = thumbnails.filter(
      (image) => !selectThumbnails.some((selected) => selected.id === image.id)
    );

    setThumbnails(updatedImages);
    setSelectThumbnails([]);
  };


  return (
    <main
      className={`min-h-screen w-screen flex flex-row items-center justify-center md:p-0 p-4 ${inter.className}`}
    >
      <section className="lg:w-1/2 md:w-3/4 w-full bg-gray-50 rounded-lg shadow">
        <div className="flex flex-col gap-y-2">
          <GalleryHeader
            selectThumbnails={selectThumbnails}
            setSelectThumbnails={setSelectThumbnails}
            handleDeleteClick={handleDeleteClick}
          />
          <hr />
          <section className="h-full w-full p-6">
            <div
              className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-4"
              onDragOver={handleDragOver}
            >
              {thumbnails.map((image, index) => (
                <GalleryImage
                  key={index}
                  image={image}
                  index={index}
                  selectThumbnails={selectThumbnails}
                  setSelectThumbnails={setSelectThumbnails}
                  handleDragStart={handleDragStart}
                  handleDrop={handleDrop}
                  dragging={dragging}
                  draggedIndex={draggedIndex}
                />
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};

export default Gallery;
