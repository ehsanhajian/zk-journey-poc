// React Component
import React, { useEffect, useRef, useState } from "react";
import background from "../images/level1.png";
import gacha from "../images/gacha1.png";
import { BridgeIcon, CardIcon, FolderIcon, PoolIcon, LanguageIcon } from "../components/Icons";
export default function Floor2() {
  const [visibleDiv, setVisibleDiv] = useState<number | null>(null);

  const contentRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const contentDiv = scrollContainerRef.current;
    const backgroundDiv = document.getElementById("background");

    if (contentDiv && backgroundDiv) {
      const parallaxRatio = 0.4;
      const backgroundScroll = contentDiv.scrollLeft * parallaxRatio;

      backgroundDiv.style.backgroundPositionX = `-${backgroundScroll}px`;
    }
  };

  useEffect(() => {
    const scrollContainerDiv = scrollContainerRef.current;

    if (scrollContainerDiv) {
      scrollContainerDiv.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollContainerDiv) {
        scrollContainerDiv.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  const handleImageClick = (index: number) => {
    setVisibleDiv(visibleDiv === index ? null : index);
  };
  return (
    <div className="relative h-[750px] overflow-hidden">
      {/* Parallax Background */}
      <div
        id="background"
        className="absolute top-0 left-0 w-full h-[800px] z--10"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "auto 100%",
          backgroundRepeat: "repeat-x",
          backgroundPositionX: "0",
        }}
      />

      <div
        className="grid grid-rows-[auto,1fr] grid-cols-[auto,1fr] h-full relative z-0"
        ref={contentRef}
      >
        {/* Top Button */}
        <button
          type="button"
          className="row-start-1 col-start-2 justify-self-end m-4 p-2 bg-blue-500 text-white"
        >
          Top Button
        </button>

        {/* Left Column with Icons */}
        <div className="flex flex-col justify-start space-y-5 items-center row-start-2 col-start-1 p-4 bg-opacity-50 z-50">
          <BridgeIcon />
          <CardIcon />
          <FolderIcon />
          <PoolIcon />
          <div className="justify-self-end">
            <LanguageIcon />
          </div>
        </div>

        {/* Content Area */}
        <div className="row-start-2 col-start-1 overflow-auto col-span-2">
          <div
            className="flex overflow-x-auto h-full scrollbar-hide items-center pl-[30%] z-10"
            ref={scrollContainerRef}
          >
            {[...Array(10).keys()].map((index) => (
              <div className="flex-none flex mr-[20%]" key={index}>
                <img
                  src={gacha}
                  alt={`Gacha machine ${index}`}
                  className="w-64 h-auto cursor-pointer"
                  onClick={() => handleImageClick(index)}
                />
                <div
                  id={`image_details_${index}`}
                  className="transition-all overflow-hidden bg-gray-200"
                  style={{
                    width: visibleDiv === index ? "400px" : "0",
                    transition: "width 0.3s ease",
                  }}
                >
                  {/* Content of the hidden div */}
                  <p className="p-4">Details for Image {index + 1}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      ,
    </div>
  );
}
