import { useState } from "react";
import { categories } from "../data";
import Search from "./Search";
import { useNavigate } from "react-router";
function Navbar({ setSearchModal }) {
  const navTitle = ["홈", "인기", "신규", "마감임박", "공계예정", "스테디오"];
  const [category, setCategory] = useState([...categories]);
  const [navModal, setNavModal] = useState(false);

  const navigate = useNavigate();
  return (
    <>
      <div className="">
        <div className="w-9/12 m-0 m-auto relative">
          <div className="flex justify-between py-7">
            <img
              src={process.env.PUBLIC_URL + "/images/logo.png"}
              alt="logo image"
              className="w-32"
            ></img>
            <div className="flex items-center">
              <div className="text-xs font-bold mx-3 cursor-pointer">
                프로젝트 올리기
              </div>
              <div
                className="border-2 text-xs text-center p-2 font-bold rounded-lg cursor-pointer"
                onClick={() => {
                  navigate("/user");
                }}
              >
                로그인/회원가입
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full sticky inset-x-0 top-0 bg-white border-b-2 pt-2 z-50">
        <div className="w-9/12 m-0 m-auto">
          <div className="w-full flex justify-between items-center ">
            <div className="flex">
              <div
                onMouseOver={() => {
                  setNavModal(true);
                }}
                onMouseLeave={() => {
                  setNavModal(false);
                }}
              >
                <div className="px-3 py-3 cursor-pointer font-bold hover:text-orange-700 relative">
                  카테고리
                </div>
                {navModal ? (
                  <div
                    className={`absolute bg-white flex justfiy-center border-b-2`}
                    onMouseOver={() => {
                      setNavModal(!navModal);
                    }}
                  >
                    <div className="w-9/12 flex flex-wrap justfiy-center z-50">
                      {category.map((category) => {
                        return (
                          <div className="cursor-pointer w-1/5 px-3 py-3">
                            {category}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
              {navTitle.map((title, i) => {
                return (
                  <div
                    key={i}
                    className="px-3 py-3 cursor-pointer font-bold hover:text-orange-700"
                  >
                    {title}
                  </div>
                );
              })}
            </div>
            <input
              className="bg-slate-200 rounded px-3 h-8 text-sm"
              placeholder="검색어를 입력하세요"
              onClick={() => {
                setSearchModal(true);
              }}
            ></input>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
