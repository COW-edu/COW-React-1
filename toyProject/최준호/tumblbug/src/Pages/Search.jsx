import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Recommand from "../components/Recommand";

function Search() {
  let navigator = useNavigate();
  const [searchWord, setSearchWord] = useState('');
  
  return(
    <div className=" w-full h-screen z-50 ">
      <div className="flex border-b border-gray-600 mt-4 justify-between mb-10 ">
        <div className="mx-32 flex flex-row w-full h-12 justify-center items-center">
          <img className=" w-6 h-6 mr-3" src={process.env.PUBLIC_URL + '/searchIcon.png'} alt="Search Icon"/>
          <input className=" w-[90%] h-6" placeholder="검색어를 입력해주세요" onChange={(e) => {setSearchWord(e.target.value)}}/>
          <div className="text-3xl" onClick={() => {navigator('/')} } >x</div>
        </div>
      </div>
      {searchWord !== '' ? <Recommand searchWord={searchWord}/> : null}
    </div>
  )
}

export default Search;