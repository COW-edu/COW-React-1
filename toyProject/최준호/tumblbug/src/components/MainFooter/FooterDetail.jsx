import React from "react";

function FooterDetail(props) {
  return(
    <div className="flex flex-col w-40 ">
      <div className=" font-bold text-lg mb-1">{props.title}</div>
      <ul className="flex flex-col justify-start items-start">
        {props.footerDetail.map(function(a,i) {
          return(
            <li className="flex font-semibold hover:cursor-pointer text-base text-gray-500 hover:text-black">{props.footerDetail[i]}</li>
          )
        })}
      </ul>
    </div>
  )
}

export default FooterDetail;