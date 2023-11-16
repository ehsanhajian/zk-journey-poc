import React, { useEffect, useRef, useState } from "react";
import background from "../images/level1.png";
import gacha from "../images/gacha1.png";
import { BridgeIcon, CardIcon, FolderIcon, PoolIcon, LanguageIcon } from "../components/Icons";

export default function Countryside() {
  const [visibleDiv, setVisibleDiv] = useState<number | null>(null);
  const [lastBackgroundPosition, setLastBackgroundPosition] = useState(0); // Renamed state variable
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  const handleWheel = (event: WheelEvent) => {
    const scrollContainerDiv = scrollContainerRef.current;
    const backgroundDiv = document.getElementById("background");

    if (scrollContainerDiv && backgroundDiv) {
      event.preventDefault();

      // Convert vertical scroll to horizontal
      const { deltaX, deltaY } = event;
      scrollContainerDiv.scrollLeft += deltaY + deltaX;

      // Parallax effect
      const parallaxRatio = 0.1;
      const backgroundScroll = scrollContainerDiv.scrollLeft * parallaxRatio;

      backgroundDiv.style.backgroundPositionX = `-${backgroundScroll}px`;
      setLastBackgroundPosition(backgroundScroll);
    }
  };

  const handleButtonScroll = (direction: "left" | "right") => {
    const scrollContainerDiv = scrollContainerRef.current;
    const backgroundDiv = backgroundRef.current;

    if (scrollContainerDiv && backgroundDiv) {
      const contentCurrent = scrollContainerDiv.scrollLeft;
      const contentScrollAmount = scrollContainerDiv.clientWidth * 0.6;
      const contentNewScrollLeft =
        direction === "right"
          ? Math.min(
              contentCurrent + contentScrollAmount,
              scrollContainerDiv.scrollWidth - scrollContainerDiv.clientWidth,
            )
          : Math.max(contentCurrent - contentScrollAmount, 0);

      if (direction === "right" && contentCurrent === contentNewScrollLeft) {
        return;
      }

      const backgroundScrollAmount =
        scrollContainerDiv.clientWidth * 0.05 * (direction === "right" ? 1 : -1);
      const backgroundNewPosition = Math.max(lastBackgroundPosition + backgroundScrollAmount, 0);

      let startTimestamp: number | null = null;
      const duration = 300;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const contentPosition = contentCurrent + progress * (contentNewScrollLeft - contentCurrent);
        const backgroundPosition =
          lastBackgroundPosition + progress * (backgroundNewPosition - lastBackgroundPosition);

        scrollContainerDiv.scrollLeft = contentPosition;
        backgroundDiv.style.backgroundPositionX = `-${backgroundPosition}px`;

        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setLastBackgroundPosition(backgroundNewPosition);
        }
      };
      window.requestAnimationFrame(step);
    }
  };

  const handleImageClick = (index: number) => {
    setVisibleDiv(visibleDiv === index ? null : index);
  };

  useEffect(() => {
    const scrollContainerDiv = scrollContainerRef.current;

    if (scrollContainerDiv) {
      scrollContainerDiv.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (scrollContainerDiv) {
        scrollContainerDiv.removeEventListener("wheel", handleWheel);
      }
    };
  }, [handleWheel]);

  return (
    <div className="relative h-[750px] overflow-hidden">
      {/* Parallax Background */}
      <div
        id="background"
        ref={backgroundRef}
        className="absolute top-0 left-0 w-full h-[800px] z--10"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "auto 100%",
          backgroundRepeat: "repeat-x",
          backgroundPositionX: "0",
        }}
      />

      <div className="grid grid-rows-[auto,1fr] grid-cols-[auto,1fr] h-full relative z-0">
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
      {/* Left and Right Scroll Buttons */}
      <button
        className="absolute bottom-10 left-10 z-20 p-2 bg-blue-500 text-white"
        onClick={() => handleButtonScroll("left")}
        type="button"
      >
        Left
      </button>
      <button
        className="absolute bottom-10 right-10 z-20 p-2 bg-blue-500 text-white"
        onClick={() => handleButtonScroll("right")}
        type="button"
      >
        Right
      </button>
    </div>
  );
}
