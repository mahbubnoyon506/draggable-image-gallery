
"use client"

import React, { useState } from "react";

import GalleryImage from "./GalleryImage";

import { Inter } from "next/font/google";
import images from "@/common/data/images";
import GalleryHeader from "./GalleryHeader";
import ImageUploader from "./ImageUploader";


const inter = Inter({ subsets: ["latin"] });

const Gallery = () => {
  // State variables
  const [selectThumbnails, setSelectThumbnails] = useState([]);
  const [thumbnails, setThumbnails] = useState(images);
  const [dragging, setDragging] = useState(false);
  const [draggedImage, setDraggedImage] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);

  // Handle the start of image drag
  const handleDragStart = (image) => {
    setDragging(true);
    setDraggedImage(image);
  };

  // Handle drag over an element
  const handleDragOver = (e) => {
    e.preventDefault();
    e?.target?.children[0]?.alt && setDraggedIndex(e?.target?.children[0]?.alt);
  };

  // Handle the drop of an image
  const handleDrop = (index) => {
    setDragging(false);

    if (draggedImage) {
      // Create a new array of images with the dragged image in the specified index
      const updatedImages = thumbnails.filter(
        (image) => image.id !== draggedImage.id
      );
      updatedImages.splice(index, 0, draggedImage);

      setThumbnails(updatedImages);
      setDraggedImage(null);
    }
  };

  // Handle the click event for deleting selected images
  const handleDeleteClick = () => {
    // Filter out selected thumbnails from the list
    const updatedImages = thumbnails.filter(
      (image) => !selectThumbnails.some((selected) => selected.id === image.id)
    );

    setThumbnails(updatedImages);
    setSelectThumbnails([]);
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const selectedFiles = e.target.files;

    // Generate new images from selected files
    const newImages = Array.from(selectedFiles).map((file, index) => {
      const id = thumbnails.length + index + 1;
      const thumbnail = URL.createObjectURL(file);

      return { id, thumbnail };
    });

    // Add the new images to the existing thumbnails
    setThumbnails([...thumbnails, ...newImages]);
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
              <ImageUploader handleFileUpload={handleFileUpload} />
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};

export default Gallery;
