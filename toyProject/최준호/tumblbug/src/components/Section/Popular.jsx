import React from "react";
import { popular_projects } from "../../data";

function Popular() {
  const popular = popular_projects;
  const currentTime = new Date();
  const year = currentTime.getFullYear().toString().slice(2);
  const month = currentTime.getMonth().toString().padStart(2,'0');
  const day = currentTime.getDate().toString().padStart(2,'0');
  const hour = currentTime.getHours().toString().padStart(2,'0')
  const minutes = currentTime.getMinutes().toString().padStart(2,'0');
  
  return(
    <div className="flex flex-wrap w-full xl:w-1/2 xl:h-full h-[40rem] xl:mt-32 ml-2 xl:mr-16 xl:ml-0 justify-center items-center border-t xl:border-t-0">
      <div className="w-full flex flex-row justify-between mr-6 mb-2">
        <div className="flex flex-col">
          <div className="flex  font-semibold text-xl ">인기 프로젝트</div>
          <div className="flex justify-start items-start text-xs text-gray-500 mt-1">{year}.{month}.{day}.{hour}.{minutes}기준</div>
        </div>
        <div className="flex font-medium text-sm text-gray-500">전체보기</div>
      </div>
      
      
      <ul className="flex flex-row flex-wrap justify-between">
        {popular.map(function(a,i) {
          return(
            <li className="flex flex-row my-3 h-24 w-[47%] xl:w-auto mr-6">
              <img className=" w-32 xl:w-24 hover:scale-110 hover:ease-linear duration-100" src={process.env.PUBLIC_URL + `/popular_${i}.png`}/>
              <div className="font-semibold text-lg text-red-400 mx-3">{i+1}</div>
              <div className="flex flex-col">
                <div className="font-normal text-xs text-gray-500 truncate cursor-pointer hover:underline">{popular[i].category} | {popular[i].creator}</div>
                <div className=" my-1 font-bold line-clamp-2 text-sm cursor-pointer hover:underline">{popular[i].title}</div>
                <div className=" font-bold text-red-600 text-xs ">{popular[i].sponsorship_rate}% 달성</div>
              </div>
            </li>
          )
        })}
      </ul>
      <button className=" mt-3 border rounded-xl w-52 h-10 shadow-sm hover:bg-gray-200">인기 프로젝트 전체보기</button>
    </div>
  )
}

export default Popular;