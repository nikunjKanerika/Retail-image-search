// import React, { useState } from "react";

// const Recommendation = ({ images, segImg }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Move to the next slide
//   const handleNext = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//   };

//   // Move to the previous slide
//   const handlePrev = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? images.length - 1 : prevIndex - 1
//     );
//   };

//   // Go to a specific slide
//   const goToSlide = (index) => {
//     setCurrentIndex(index);
//   };

//   return (
//     <div className="flex justify-center items-center space-x-4">
//       {/* Left-side for segImg */}
//       <div className="w-1/2">
//         {segImg ? (
//           <img
//             src={`data:image/png;base64,${segImg}`}
//             alt="Segmented Image"
//             className="w-full h-auto rounded-lg shadow-md"
//           />
//         ) : (
//           <p>No segmented image available</p>
//         )}
//       </div>

//       {/* Right-side Carousel */}
//       <div className="w-1/2 relative">
//         <div className="relative w-full" id="default-carousel">
//           {/* Carousel wrapper */}
//           <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
//             {images.map((image, index) => (
//               <div
//                 key={index}
//                 className={`absolute inset-0 transition-all duration-700 ease-in-out ${
//                   index === currentIndex ? "block" : "hidden"
//                 }`}
//               >
//                 <img
//                   src={`data:image/png;base64,${image}`}
//                   className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
//                   alt={`Slide ${index + 1}`}
//                 />
//               </div>
//             ))}
//           </div>

//           {/* Slider indicators */}
//           <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
//             {images.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => goToSlide(index)}
//                 className={`w-3 h-3 rounded-full ${
//                   index === currentIndex ? "bg-blue-500" : "bg-gray-300"
//                 }`}
//                 aria-label={`Slide ${index + 1}`}
//               />
//             ))}
//           </div>

//           {/* Slider controls */}
//           <button
//             onClick={handlePrev}
//             className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
//           >
//             <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
//               <svg
//                 className="w-4 h-4 text-white"
//                 fill="none"
//                 viewBox="0 0 6 10"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M5 1 1 5l4 4"
//                 />
//               </svg>
//               <span className="sr-only">Previous</span>
//             </span>
//           </button>

//           <button
//             onClick={handleNext}
//             className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
//           >
//             <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
//               <svg
//                 className="w-4 h-4 text-white"
//                 fill="none"
//                 viewBox="0 0 6 10"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="m1 9 4-4-4-4"
//                 />
//               </svg>
//               <span className="sr-only">Next</span>
//             </span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Recommendation;


import React, { useState } from 'react';
import data from '../utils/data.json';

const ImageCarousel = () => {
  const images = data.images.map(img => `data:image/png;base64,${img}`);
  const segImg = `data:image/png;base64,${data.seg_img}`;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className='flex flex-col'>
        <h1 className='mx-auto p-4 font-semibold text-2xl text-gray-900'>Matching Recommendations</h1>
        <div className="flex justify-center items-start mt-10 px-4"> {/* Add margin-top and padding */}
      {/* Segmented Image */}
      <div className="w-1/3  pr-2"> {/* Adjusted width and added padding to the right */}
        {segImg && (
          <img src={segImg} alt="Segmented" className="rounded-sm shadow-md object-contain h-80" /> 
        )}
      </div>

      {/* Carousel of Images */}
      <div id="default-carousel" className="relative w-1/3" data-carousel="slide"> {/* Adjusted width */}
        <div className="relative h-80 overflow-hidden rounded-sm shadow-md"> {/* Set height to 48 and added shadow */}
          {images.map((img, index) => (
            <div key={index} className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`} data-carousel-item>
              <img src={img} className="w-full h-full object-fit" alt={`Carousel Item ${index + 1}`} />
            </div>
          ))}
        </div>

        {/* Slider indicators */}
        <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
          {images.map((_, index) => (
            <button key={index} type="button" className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'}`} aria-current={index === currentIndex} aria-label={`Slide ${index + 1}`} onClick={() => setCurrentIndex(index)}></button>
          ))}
        </div>

        {/* Slider controls */}
        <button type="button" className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" onClick={handlePrev}>
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-black group-focus:outline-none">
            <svg className="w-4 h-4 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button type="button" className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" onClick={handleNext}>
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-black group-focus:outline-none">
            <svg className="w-4 h-4 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
    </div>
    </div>
    
  );
};

export default ImageCarousel;




