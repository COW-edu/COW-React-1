import React, { useEffect, useState } from "react";
import useValid from "../hooks/useValid";
import { useNavigate } from "react-router-dom";

function Join() {
  let navigator = useNavigate();
  const {checkPassword, checkEmail, doubleCheckPassword, doubleCheckEmail, emailError, passwordError, doubleEmailError, doublePasswordError} = useValid();

  const [labels, setLabels] = useState([
    '만 14세 이상입니다.(필수)',
    '텀블벅 이용 약관동의(필수)',
    '개인정보 수집 및 이용 동의 (필수)',
    '개인정보 제 3자 제공 동의(선택)',
    '마케팅 정보 수신 동의(선택)',
  ]);

  const [checkboxStates, setCheckboxStates] = useState(
    labels.map(() => false)
  );

  const [isButtonActive, setIsButtonActive] = useState(false);

  useEffect(() => {
    const allRequiredChecked = checkboxStates.slice(0, 3).every((isChecked) => isChecked);
    setIsButtonActive(allRequiredChecked);
  }, [checkboxStates]);

  const handleCheckboxChange = (index) => {
    const newCheckboxStates = [...checkboxStates];
    newCheckboxStates[index] = !newCheckboxStates[index];
    setCheckboxStates(newCheckboxStates);
  };
  
  const buttonClass = `w-24 h-11 text-xl text-white font-medium ${isButtonActive ? 'bg-red-400' : 'bg-gray-400'}`

  return(
    <div className=" z-50 flex fixed w-screen h-screen rounded-md border border-gray-300 flex-col items-center bg-white">
      <div className="flex">
        <div className="text-2xl font-bold mt-3">이메일로 가입하기</div>
        <button className=" text-3xl" onClick={() => {navigator('/')}}>x</button>
      </div>

      <div className="flex flex-col w-full mt-3 ml-5 xl:ml-32">
        이름
        <input placeholder="사용하실 이름을 입력해주세요" type="text" className="border border-gray-200 rounded-sm w-5/6 h-10"/>
      </div>

      <div className="flex flex-col w-full mt-3 ml-5 xl:ml-32">
        이메일 주소
        <input placeholder="이메일 주소를 입력해주세요" type="mail" className="border border-gray-200 rounded-sm w-5/6 mt-1 h-10" onBlur={checkEmail}></input>
        {emailError && <p className="text-red-500">{emailError}</p>}
        <input placeholder="이메일 주소를 확인합니다." type="mail" className="border border-gray-200 rounded-sm w-5/6 mt-3 h-10 " onBlur={doubleCheckEmail}></input>
        {doubleEmailError && <p className="text-red-500">{doubleEmailError}</p>}
      </div>

      <div className="flex flex-col w-full mt-3 ml-5 xl:ml-32">
        비밀번호
        <input placeholder="비밀번호를 입력해주세요" type="password" className="border border-gray-200 rounded-sm w-5/6 mt-1 h-10" onBlur={checkPassword}></input>
        {passwordError && <p className="text-red-500">{passwordError}</p>}
        <input placeholder="비밀번호를 확인합니다." type="password" className="border border-gray-200 rounded-sm w-5/6 mt-3 h-10 " onBlur={doubleCheckPassword}></input>
        {doublePasswordError && <p className="text-red-500">{doublePasswordError}</p>}
      </div>

      <div>
      {labels.map((label, index) => {
        return (
          <div>
            <label>
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange(index)}
                checked={checkboxStates[index]}
                className=" h-5 w-5 mr-4"
              />
              {label}
            </label>
          </div>
        );
      })}
    </div>
      <button className={buttonClass}>가입하기</button>
    </div>
  )
}

export default Join;