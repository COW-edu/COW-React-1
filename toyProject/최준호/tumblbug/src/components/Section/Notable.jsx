import React from "react";
import { notable_projects } from "../../data";


function Notable() {
  const notableList = notable_projects;
  return(
    <div className="flex flex-wrap mx-2 xl:ml-32 xl:mt-8">
      <div className=" font-semibold text-xl m-2">주목할 만한 프로젝트</div>
      <ul className="flex flex-row flex-wrap">
        {notableList.map(function(a,i) {
          return(
            <li className=" flex flex-col w-[23%] xl:w-1/5 mx-2 my-6">
              <img className="hover:scale-105 hover:ease-linear cursor-pointer duration-100" src={process.env.PUBLIC_URL + `/notable_${i+1}.png`}/>
              <div className=" font-normal text-xs text-gray-500 truncate hover:underline cursor-pointer">{notableList[i].category} | {notableList[i].creator}</div>
              <div className=" font-bold text-base h-[3rem] line-clamp-2 cursor-pointer hover:underline">{notableList[i].title}</div>
              <div className=" font-bold text-red-600 text-sm mt-2 ">{notableList[i].sponsorship_rate}% 달성</div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Notable;