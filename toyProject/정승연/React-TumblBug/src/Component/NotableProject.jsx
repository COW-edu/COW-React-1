import Card from "./Card";
import { notable_projects } from "../data";

const style = {
  width: "w-1/4",
  imgWidth: "w-full",
  titleHeight: "h-20",
  maxWidth: "max-[1100px]:w-1/4",
};
function Popular() {
  return (
    <div className="w-full m-0 m-auto ">
      <div className="font-extrabold text-lg">주목할만한 프로젝트</div>
      <div className="flex flex-wrap w-4/5 max-[1100px]:flex max-[1100px]:w-full">
        {notable_projects.map((project, i) => {
          return (
            <Card
              key={i}
              project={project}
              img={"notable_project"}
              index={i}
              style={style}
            ></Card>
          );
        })}
      </div>
    </div>
  );
}

export default Popular;
