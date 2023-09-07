import React from "react";
import FooterDetail from "./FooterDetail";

function Upfooter() {
  const footerDetail1 = ['공지사항', '서비스 소개', '채용', '2022 텀블벅 결산', '텀블벅 광고센터'];
  const footerDetail2 = ['헬프 센터', '첫 후원 가이드', '창작자 가이드', '수수료 안내', '제휴·협력'];
  const footerDetail3 = ['이용약관', '개인정보 처리방침', '프로젝트 심사 기준'];
  return(
    <div className=" border-y border-gray-300 flex flex-col xl:flex-row justify-between mt-8 mx-32">
      <div className="flex flex-row justify-between xl:justify-start items-start my-8">
        <FooterDetail footerDetail = {footerDetail1} title = '텀블벅'/>
        <FooterDetail footerDetail = {footerDetail2} title = '이용안내'/>
        <FooterDetail footerDetail = {footerDetail3} title = '정책'/>
        
        <div className="flex flex-col w-40 ">
          <div className=" font-bold text-lg mb-1">App</div>
          <ul className="flex flex-col justify-start items-start">
            <button className=" rounded-sm bg-gray-300 w-full h-8 font-semibold text-sm mb-2 hover:font-bold">안드로이드</button>
            <button className=" rounded-sm bg-gray-300 w-full h-8 font-semibold text-sm hover:font-bold">iOS</button>
          </ul>
        </div>

      </div>
      <div>
        <div className="font-bold text-lg mb-1 mt-8">고객지원</div>
        <div className="text-xs ">평일 9:00 ~ 17:00 (12:00 ~14:00 제외)</div>
        <button className="rounded w-full border h-10 mt-3 font-semibold text-sm hover:border-2 hover:border-black">텀블벅에 문의</button>
      </div>
    </div>
  )
}

export default Upfooter;