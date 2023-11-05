
const DragDropOverlay = ({ dragging, draggedIndex, image }) => {
  return (
    dragging &&
    Number(draggedIndex) === Number(image.id) && (
      <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center bg-white outline-dashed outline-1 outline-gray-200 rounded-lg z-50">
      </div>
    )
  );
};

export default DragDropOverlay;
