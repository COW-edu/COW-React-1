import { useEffect, useState } from "react";
import { popular_projects } from "../data";
import Card from "./Card";
import { useDate } from "../CustomHook/useDate";

const style = {
  width: "w-full",
  flex: "flex",
  imgWidth: "w-1/4",
  titleWidth: "w-3/6",
  titlePadding: "px-3",
  maxWidth: "max-[1100px]:w-1/2",
};

function PopularProject() {
  const current = useDate();
  return (
    <div className="py-20 ">
      <div className="flex justify-between w-3/4 items-center max-[1100px]:w-4/5">
        <div>
          <div className="font-extrabold text-lg">인기 프로젝트</div>
          <div className="text-sm">{current}</div>
          <></>
        </div>
        <div className="text-sm text-slate-600">전체보기</div>
      </div>
      <div className="w-full max-[1100px]:flex max-[1100px]:flex-wrap ">
        {popular_projects.map((project, i) => {
          return (
            <Card
              key={i}
              project={project}
              img={"popular_project"}
              index={i}
              style={style}
            ></Card>
          );
        })}
      </div>
      <div className="text-sm text-slate-600 border-2 w-1/3 rounded-lg p-2 ml-20 mt-5 cursor-pointer hover:bg-slate-200 max-[1100px]:w-40 max-[1100px]:m-0 max-[1100px]:m-auto">
        인기프로젝트 더보기
      </div>
    </div>
  );
}
export default PopularProject;
