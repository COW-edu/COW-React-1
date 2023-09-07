import { useState } from "react";
import { categories } from "../../data";

function CategoryList(props) {
  const category = categories;
  const isHovering = props.isHovering
  const [categoryIsHovering, setCategoryIsHovering] = useState(false);
  const handleMouseOver = ()=>{
    setCategoryIsHovering(true);
  }
  const hadleMouseOut = () => {
    setCategoryIsHovering(false)
  }
  
  return(
    <div className={isHovering||categoryIsHovering ? ' relative -translate-y-2 duration-200 w-screen -ml-28' : 'hidden'} onMouseOver={handleMouseOver} onMouseOut={hadleMouseOut}>
      <div className=" mt-10 h-[16rem] flex flex-wrap flex-col items-center bg-white" >
        {categories.map((a,i) => {
          return(
            <div className=" h-10 xl:w-60 flex justify-start items-center font-bold hover:text-red-500 cursor-pointer">{category[i]}</div>
          )
        })}
      </div>
    </div>
  )
}

export default CategoryList;