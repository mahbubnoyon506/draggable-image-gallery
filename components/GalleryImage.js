import Image from "next/image";
import DragDropOverlay from "./DragDropOverlay";

const GalleryImage = ({
  image,
  index,
  selectThumbnails,
  setSelectThumbnails,
  handleDragStart,
  handleDrop,
  dragging,
  draggedIndex,
}) => {
  return (
    <div
      key={index}
      className={
        "group relative before:content-[''] before:absolute before:h-full before:w-full before:rounded-lg before:transition-colors" +
        (index === 0 ? " md:col-span-2 md:row-span-2" : " col-span-1") +
        (selectThumbnails.find((photo) => photo.id === image.id)
          ? " opacity-100"
          : " hover:before:bg-black/50")
      }
      draggable={true}
      onDragStart={() => handleDragStart(image)}
      onDrop={() => handleDrop(index)}
    >
      <Image
        src={image.thumbnail}
        alt={image.id}
        height={index === 0 ? 390 : 184}
        width={index === 0 ? 390 : 184}
        className={
          "h-full w-full max-w-full rounded-lg object-contain outline outline-1 outline-gray-200" +
          " " +
          (selectThumbnails.find((photo) => photo.id === image.id) &&
            "opacity-70")
        }
      />
      <input
        type="checkbox"
        name={image.id}
        id={image.id}
        className={
          "absolute top-3 left-3 h-4 w-4 accent-blue-500 rounded group-hover:opacity-100 transition-opacity delay-100 duration-100 ease-linear cursor-pointer" +
          " " +
          (selectThumbnails.find((photo) => photo.id === image.id)
            ? "opacity-100"
            : "opacity-0")
        }
        checked={
          selectThumbnails.find((photo) => photo.id === image.id) ? true : false
        }
        onChange={() => {
          if (selectThumbnails.find((photo) => photo.id === image.id))
            setSelectThumbnails(
              selectThumbnails.filter((photo) => photo.id !== image.id)
            );
          else setSelectThumbnails([...selectThumbnails, image]);
        }}
      />
      <DragDropOverlay
        dragging={dragging}
        draggedIndex={draggedIndex}
        image={image}
      />
    </div>
  );
};

export default GalleryImage;
