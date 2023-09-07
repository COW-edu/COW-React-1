import React from 'react';
import useCarousel from '../../hooks/useCarousel';
import { banners } from '../../data';

const CarouselSlider = () => {
  const { currentBanner, goToNextSlide, goToPrevSlide } = useCarousel();

  return (
    <div className="flex flex-col items-center justify-center xl:ml-32 w-full xl:w-3/4 ">
      <div className="relative overflow-hidden ">
        <img
          src={process.env.PUBLIC_URL + `/carousel_${currentBanner.id + 1}.png`}
          alt={`Banner ${currentBanner.id + 1}`}
        />
        <div className="absolute flex  right-0 bottom-0 p-4">
          <button onClick={goToPrevSlide} className="mr-2 px-2 py-1 rounded-lg bg-black opacity-60 text-white">
            이전
          </button>
          <button onClick={goToNextSlide} className="px-2 py-1 rounded-lg bg-black opacity-60 text-white">
            다음
          </button>
          <div className=" ml-1 mt-2 rounded-lg w-20 font-medium text-center bg-black opacity-60 text-white">
            {currentBanner.id + 1} / {banners.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselSlider;
