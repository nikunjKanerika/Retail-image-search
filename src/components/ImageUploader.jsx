import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function ImageUploader() {
  const [image, setImage] = useState(null);
  const [segImg, setSegImg] = useState(""); // Store seg_img
  const [carouselImages, setCarouselImages] = useState([])
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [coordinates, setCoordinates] = useState([]); // Store coordinates
  const [labels, setLabels] = useState([]); // Store labels
  const canvasRef = useRef(null); // Ref for canvas

  const navigate = useNavigate();
  // Function to handle image upload from file input or drag and drop
  const handleImageUpload = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setIsImageLoaded(true); // Trigger the animation once the image is uploaded
      };
      reader.readAsDataURL(file);
    }
  };

  // Handling file input change
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleImageUpload(file);
  };

  // Drag-and-drop events
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    handleImageUpload(file);
  };

  // Open modal on image click
  const handleImageClick = () => {
    setModalOpen(true);
  };

  // Function to handle canvas click and record the coordinates
  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Add new coordinates
    const newCoordinates = [...coordinates, [x, y]];
    setCoordinates(newCoordinates);

    console.log("Coordinates:", newCoordinates);
    // Determine label based on click button
    if (e.button === 0) {
      setLabels([...labels, 1]); // Left-click: store 1
    } else if (e.button === 2) {
      setLabels([...labels, 0]); // Right-click: store 0
    }

    // Redraw the canvas with the new points
    drawCanvas(newCoordinates, [...labels, e.button === 0 ? 1 : 0]);
  };

  // Function to draw image and points on the canvas
  const drawCanvas = (points = coordinates, pointLabels = labels) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = image;

    img.onload = () => {
      // Set canvas dimensions based on image
      canvas.width = img.width;
      canvas.height = img.height;

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the image
      ctx.drawImage(img, 0, 0);

      // Draw all points
      points.forEach((point, index) => {
        ctx.fillStyle = pointLabels[index] === 1 ? "green" : "red";
        ctx.beginPath();
        ctx.arc(point[0], point[1], 5, 0, 2 * Math.PI);
        ctx.fill();
      });
    };
  };

  // Redraw canvas when image is loaded or modal opens
  useEffect(() => {
    if (image && modalOpen) {
      drawCanvas();
    }
  }, [image, modalOpen]);

  // Handle recommendation fetch
  const handleGetRecommendation = async () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("labels", JSON.stringify(labels)); // Send labels as a JSON string
    formData.append("points", JSON.stringify(coordinates)); // Send coordinates as a JSON string

    // try {
      // const response = await fetch("http://localhost:5000/upload", {
      //   method: "POST",
      //   body: formData,
      // });
      // navigate('/recommendations')
    //   if (response.ok) {
    //     const result = await response.json();
    //     setSegImg(result.seg_img); // Store segmented image
    //     setCarouselImages(result.images); // 
    //     console.log("Recommendation Result:", result);
    //     // navigate('/recommendations')
    //   } else {
    //     console.error("Error in fetching recommendation:", response.statusText);
    //   }
    // } catch (error) {
    //   console.error("Error in making API request:", error);
    // }
    navigate('/recommendations')
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100">
      {/* Image container */}
      <div className="p-2 bg-white rounded-lg w-3/4 mb-4"> {/* Increased width to 3/4 */}
        {image && (
          <div
            className={`transition-opacity duration-700 ease-in-out ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt="Uploaded"
              className="w-full h-auto rounded-lg shadow-md max-h-64 object-contain cursor-pointer"
              onClick={handleImageClick} // Open modal on image click
            />
          </div>
        )}
      </div>

      {/* Drag-and-Drop zone */}
      <div
        className={`p-2 bg-white rounded-lg w-3/4 ${ // Increased width to 3/4
          dragActive ? "border-4 border-blue-500" : ""
        }`} // Adjusted width
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className={`flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-50 transition-colors`}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleFileInputChange}
            />
          </label>
        </div>
      </div>

      {/* Get Recommendation Button */}
      <button
        className="mt-4 p-2 bg-blue-500 text-white rounded"
        onClick={handleGetRecommendation}
      >
        Get Recommendation
      </button>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div
            className="relative bg-white p-4 rounded shadow-lg cursor-pointer"
            onMouseDown={handleCanvasClick} // Detect clicks on the canvas
            onContextMenu={(e) => e.preventDefault()} // Disable context menu
          >
            <div className="overflow-auto max-h-[500px] max-w-[700px]"> {/* Reduced height to 500px */}
              <canvas ref={canvasRef} style={{ cursor: "pointer", display: "block" }} />
            </div>
            {/* Close Button */}
            <button
              className="absolute top-0 right-0 m-2 p-2 bg-red-500 text-white rounded-full"
              onClick={() => setModalOpen(false)} // Close the modal on button click
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
 