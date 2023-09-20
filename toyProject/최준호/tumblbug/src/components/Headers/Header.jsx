import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryList from "./CategoryList";

function Header() {
  const [headerList, setHeaderList] = useState(['홈', '인기', '신규', '마감임박', '공개예정', '스테디오']);
  let navigate = useNavigate();

  const[isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return(
    <header className=" fixed flex flex-col justify-center border-t-3 shadow-sm xl:mx-32 mb-5 bg-white w-full xl:w-[86%] z-40" >
      <div className="flex justify-between items-center w-full mt-3">
        <img className=" w-36 h-min ml-5 xl:ml-0" src={process.env.PUBLIC_URL + '/logo.png'} alt="tumblbug logo"/>
        <div className="flex mr-5 xl:mr-0">
          <button className="font-bold">프로젝트 올리기</button>
          <button className="border h-8 font-bold text-sm ml-10" onClick={() => {navigate('/join')}}>로그인/회원가입</button>
        </div>
      </div>
      <div className="flex flex-row justify-between mt-4 mb-2 mx-17">
        <div className="flex flex-row">
          <div className=" text-base mx-3 font-semibold truncate cursor-pointer" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            카테고리
          </div>
          {headerList.map((a,i) => {
              return(
                <div className=" text-base mx-3 font-semibold truncate cursor-pointer hover:text-red-400" >
                  {headerList[i]}
                </div>
              )
            })
          }
        </div>
        <CategoryList/>
        <div className="bg-gray-200 rounded-md w-56 mx-3 font-semibold text-black text-opacity-50" onClick={() => {navigate('/search')}}>검색어를 입력하세요</div>
      </div>
      <CategoryList isHovering={isHovering}/>
    </header>
  )
}

export default Header;