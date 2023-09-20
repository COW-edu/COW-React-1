
import { Fragment } from "react";
import CarouselSlider from "../components/Section/CarouselSlide";
import Notable from "../components/Section/Notable";
import Popular from "../components/Section/Popular";


function MainSection() {
  return (
    <div className="flex xl:flex-row flex-col justify-between">
      <div className="flex flex-col xl:w-[140%] mt-32 ">
        <CarouselSlider/>
        <Notable/>
      </div>
      <Popular/>
    </div>
  )
}

export default MainSection;