import React, { useEffect, useState } from "react";
import { banners } from "../data";

function useCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex+1) % banners.length);
  }

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? banners.length-1 : prevIndex -1
    );
  }

  useEffect(() => {
    const timer = setInterval(goToNextSlide, 4000);
    return ()=> clearInterval(timer);
  }, []);

  return{
    currentBanner: banners[currentIndex],
    goToNextSlide,
    goToPrevSlide,
    currentIndex,
  };
}

export default useCarousel;