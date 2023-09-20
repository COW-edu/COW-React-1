import { useEffect, useState } from "react";
import { useValidate } from "../CustomHook/useValidate";
import { useInput } from "../CustomHook/useInput";
import { useNavigate } from "react-router";

function Join() {
  const navigate = useNavigate();
  const {
    onChange,
    onSubmit,
    inputError,
    touched,
    onBlur,
    checkList,
    handleCheck,
    checkAll,
    checkError,
  } = useInput({
    input: { name: "", email: "", password: "", passwordConfirm: "" },
    check: {
      require1: false,
      require2: false,
      require3: false,
      option1: false,
      option2: false,
    },
  });

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full border-b-2">
        <img
          src={process.env.PUBLIC_URL + "/images/logo.png"}
          alt="logo image"
          className="w-32 m-0 m-auto py-5"
          onClick={() => {
            navigate("/");
          }}
        ></img>
      </div>
      <form onSubmit={onSubmit}>
        <div className="border-2 p-8 mt-5">
          <div className="text-xl font-bold pb-3">이메일로 가입하기</div>
          <div className="boder-2 mb-3">
            <label className="text-xs py-2 block" htmlFor="name">
              이름
            </label>
            <input
              type="text"
              className="focus:outline-0 border-2 w-full h-10 rounded-lg"
              placeholder="사용하실 이름을 입력해주세요"
              id="name"
              name="name"
              onChange={onChange}
            ></input>
          </div>
          <div>
            <label className="text-xs py-2 block" htmlFor="email">
              이메일 주소
            </label>
            <input
              className="focus:outline-0 border-2 w-full h-10 rounded-lg"
              placeholder="이메일 주소를 입력해주세요"
              id="email"
              name="email"
              onChange={onChange}
              onBlur={onBlur}
            ></input>
            <div className="text-xs text-red-500 font-bold">
              {touched.email ? inputError.email : null}
            </div>
          </div>
          <div>
            <label className="text-xs py-2 block" htmlFor="password">
              비밀번호
            </label>
            <input
              className="focus:outline-0 border-2 w-full h-10 rounded-lg"
              placeholder="비밀번호를 입력해주세요"
              type="password"
              id="password"
              name="password"
              onChange={onChange}
              onBlur={onBlur}
            ></input>
            <div className="text-xs text-red-500 font-bold">
              {touched.password ? inputError.password : null}
            </div>
            <input
              className="focus:outline-0 border-2 w-full h-10 mt-3 rounded-lg"
              placeholder="비밀번호를 확인합니다"
              type="password"
              onChange={onChange}
              name="passwordConfirm"
              onBlur={onBlur}
            ></input>
            <div className="text-xs text-red-500 font-bold ">
              {touched.passwordConfirm ? inputError.passwordConfirm : null}
            </div>
          </div>
          <div className="mt-5">
            <div className="flex py-2">
              <input
                type="checkbox"
                className={"w-6 h-6 border-2 mr-2"}
                id="checkAll"
                name="checkAll"
                onChange={checkAll}
                // checked={checkList}
              ></input>
              <label className="text-slate-700" htmlFor="checkAll">
                전체동의
              </label>
            </div>
            <div className="flex py-2">
              <input
                type="checkbox"
                className={"w-6 h-6 border-2 mr-2"}
                id="require1"
                name="require1"
                onChange={handleCheck}
                checked={checkList.require1}
              ></input>
              <label className="text-slate-700" htmlFor="require1">
                만 14세 이상입니다.(필수)
              </label>
            </div>
            <div className="flex py-2">
              <input
                type="checkbox"
                className={"w-6 h-6 border-2 mr-2"}
                id="require2"
                name="require2"
                onChange={handleCheck}
                checked={checkList.require2}
              ></input>
              <label className="text-slate-700" htmlFor="require2">
                텀블벅 이용 약관동의.(필수)
              </label>
            </div>
            <div className="flex py-2">
              <input
                type="checkbox"
                className={"w-6 h-6 border-2 mr-2"}
                id="require3"
                name="require3"
                onChange={handleCheck}
                checked={checkList.require3}
              ></input>
              <label className="text-slate-700" htmlFor="require3">
                개인정보 수집 및 이용 동의(필수)
              </label>
            </div>
            <div className="flex py-2">
              <input
                type="checkbox"
                className={"w-6 h-6 border-2 mr-2"}
                id="option1"
                name="option1"
                onChange={handleCheck}
                checked={checkList.option1}
              ></input>
              <label className="text-slate-700" htmlFor="option1">
                개인정보 제 3자 제공 동의(선택)
              </label>
            </div>
            <div className="flex py-2">
              <input
                type="checkbox"
                className={"w-6 h-6 border-2 mr-2"}
                id="option2"
                name="option2"
                onChange={handleCheck}
                checked={checkList.option2}
              ></input>
              <label className="text-slate-700" htmlFor="option2">
                마케팅 정보 수신 동의(선택)
              </label>
            </div>
            <div className="text-xs text-red-500 font-bold ">
              {checkError.checkError}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 text-center text-white py-3 mt-10"
          >
            가입하기
          </button>
        </div>
      </form>
    </div>
  );
}

export default Join;
