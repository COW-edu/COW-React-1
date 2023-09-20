import React from "react";
import DownFooterDetail from "./DownFooterDetail";
import SvgIcons from "./SvgIcons";

function DownFooter() {
  const main = ['회사명', '주소', '대표', '사업자등록번호','통신판매업 신고번호', '대표번호', '메일주소'];
  const sub = ['(주) 백패커', '서울특별시 서초구 서초대로 398, 20층(서초동, BNK디지털타워)', '김동환', '107-87-83297', '2023-서울서초-2114호', '02-6080-0760', 'support_tumblbug@backpac.kr'];
  return(
    <div className="flex flex-row justify-between mx-32">
      <div className="flex flex-col">
        <div className="flex flex-wrap text-sm w-9/12 mt-5">
          {main.map(function(a,i) {
            return(
              <DownFooterDetail main={main[i]} sub={sub[i]}/>
            )
          })}
        </div>
        <div className=" text-xs text-gray-400 font-normal ml-2"> © 2023 Backpackr Inc.</div>
      </div>
      <div className="flex flex-row items-center justify-center">
          <SvgIcons/>
      </div>
    </div>
    
  )
}

export default DownFooter;