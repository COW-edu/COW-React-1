import { useState, useRef, useEffect } from "react";
import { banners } from "../data";
import { useInterval } from "../CustomHook/useInterval";
function Carousel() {
  const TOTAL_SLIDES = 4;
  const [banner, setBanner] = useState([...banners]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);

  useInterval(() => {
    nextSlide();
  }, 5000);
  useEffect(() => {
    carouselRef.current.style.transition = "all 0.5s ease-in-out";
    carouselRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  }, [currentSlide]);

  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES - 1) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES - 1);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="my-20 w-4/5 overflow-hidden relative max-[1100px]:w-full">
      <div className=" flex w-full relative  " ref={carouselRef}>
        {banner.map((banner, i) => {
          return (
            <div
              key={i}
              className="w-full shrink-0 "
              style={{
                height: "300px",
                backgroundImage: `url("http://localhost:3000/images/banner${
                  i + 1
                }.jpg")`,
              }}
            >
              <div className="text-white text-4xl font-bold w-1/2 mt-40 px-5">
                {banner.title}
              </div>
            </div>
          );
        })}
      </div>
      <div className="absolute top-60 right-5">
        <button
          className="w-6  bg-zinc-600 text-white rounded-xl px-1 mx-3 hover:bg-zinc-800"
          onClick={prevSlide}
        >
          {"<"}
        </button>
        <button
          className="w-6  bg-zinc-600 text-white rounded-xl px-1 hover:bg-zinc-800"
          onClick={nextSlide}
        >
          {">"}
        </button>
      </div>
      <div className="bg-zinc-600 absolute text-white rounded-lg px-3 top-60 right-24">
        {currentSlide + 1 + "/" + 4}
      </div>
    </div>
  );
}

export default Carousel;
