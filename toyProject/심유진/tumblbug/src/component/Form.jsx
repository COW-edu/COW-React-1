import React, { useCallback, useState, useEffect, } from "react";
import useInput from "../hooks/useInput";
import './Form.css'

import { Routes, Route, useNavigate } from "react-router-dom";


export default function Form() {

  const navigate = useNavigate();
      
        const Close = () => {
          
          navigate('/');
        }
  const [data, onChange, reset] = useInput({
    nickname: "",
    id: "",
    confirmId: "",
    password: "",
    confirmPassword: "",
    
  });

  const [errorMessage, setErrorMessage] = useState("");

  const signUp = useCallback(
    (e) => {
      e.preventDefault();
      console.log("닉네임:", data.nickname);
      console.log("아이디:", data.id);
      console.log("아이디 확인:", data.confirmId);
      console.log("비밀번호:", data.password);
      console.log("비밀번호 확인:", data.confirmPassword);

      if (data.id !== data.confirmId) {
        setErrorMessage("이메일과 이메일 확인이 일치하지 않습니다. ");
      } else if (data.password !== data.confirmPassword) {
        setErrorMessage("비밀번호와 비밀번호 확인이 일치하지 않습니다. ");
      } else {
        setErrorMessage("");
        reset();
      }
    },
    [data.nickname, data.id, data.password, data.confirmPassword, data.confirmId, reset]
  );

  useEffect(() => {
    if (data.id !== data.confirmId) {
      setErrorMessage("이메일과 이메일 확인이 일치하지 않습니다.");
    } else {
      setErrorMessage("");
    }
  }, [data.id, data.confirmId]);

  useEffect(() => {
    if (data.password !== data.confirmPassword) {
      setErrorMessage("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
    } else {
      setErrorMessage("");
    }
  }, [data.password, data.confirmPassword]);

  const [전체동의, set전체동의] = useState(false);
  const [만14세이상, set만14세이상] = useState(false);
  const [텀블벅이용약관, set텀블벅이용약관] = useState(false);
  const [개인정보수집및이용, set개인정보수집및이용] = useState(false);
  const [개인정보제3자제공, set개인정보제3자제공] = useState(false);
  const [마케팅정보수신, set마케팅정보수신] = useState(false);


  const handleIndividualAgreementChange = (e) => {
    const { name, checked } = e.target;
    switch (name) {
      case '만14세이상':
        set만14세이상(checked);
        break;
      case '텀블벅이용약관':
        set텀블벅이용약관(checked);
        break;
      case '개인정보수집및이용':
        set개인정보수집및이용(checked);
        break;
      case '개인정보제3자제공':
        set개인정보제3자제공(checked);
        break;
      case '마케팅정보수신':
        set마케팅정보수신(checked);
        break;
      default:
        break;
    }
    if (!checked) {
      set전체동의(false);
    } else {
      
      if (만14세이상 && 텀블벅이용약관 && 개인정보수집및이용 && 개인정보제3자제공 ) {
        set전체동의(true);
      }
    }
  };

  const handleOverallAgreementChange = (e) => {
    const { checked } = e.target;
    set전체동의(checked);
    set만14세이상(checked);
    set텀블벅이용약관(checked);
    set개인정보수집및이용(checked);
    set개인정보제3자제공(checked);
    set마케팅정보수신(checked);

    
  };

  
  



  return (

    <div className="FormWrapper">
      <div className="Form">
    <form
      onSubmit={signUp}
      autoComplete="off"
      style={{
        display: "flex",
        flexDirection: "column",
       
        margin: "auto",
      }}
    >
      <h2>이메일로 가입하기</h2>
      <button className='XButton' onClick={Close}>x</button>
      <label htmlFor="nickname">이름</label>
      <input
        placeholder="사용하실 이름을 입력해주세요."
        type="text"
        name="nickname"
        value={data.nickname}
        onChange={onChange}
        className="nickname-input"
        autoFocus
      />
      <label htmlFor="id">이메일 주소</label>
      <input
        placeholder="이메일 주소를 입력하세요."
        type="text"
        name="id"
        value={data.id}
        onChange={onChange}
        className="id-input"
      />
      <label htmlFor="confirmId"></label>
      <input
        placeholder="이메일 주소를 확인합니다."
        type="text"
        name="confirmId"
        value={data.confirmId}
        onChange={onChange}
        className="confirm-password-input"
      />
      <label htmlFor="password">비밀번호</label>
      <input
        placeholder="비밀번호를 입력하세요."
        type="password"
        name="password"
        value={data.password}
        onChange={onChange}
        className="password-input"
      />
      <label htmlFor="confirmPassword"></label>
      <input
        placeholder="비밀번호를 확인합니다."
        type="password"
        name="confirmPassword"
        value={data.confirmPassword}
        onChange={onChange}
        className="handlePasswordChange-input"
      />
      {errorMessage && (
        <p style={{ color: "red", marginTop: "5px" }}>{errorMessage}</p>
      )}
      <label>
        <input
          type="checkbox"
          id="전체동의"
          checked={전체동의}
          onChange={handleOverallAgreementChange}
          className="A1-check"
        />
        전체동의
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="만14세이상"
          checked={만14세이상}
          onChange={handleIndividualAgreementChange}
          className="A2-check"
          required
        />
        만 14세 이상입니다.(필수)
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="텀블벅이용약관"
          checked={텀블벅이용약관}
          onChange={handleIndividualAgreementChange}
          className="A3-check"
          required
        />
        텀블벅 이용 약관동의 (필수)
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="개인정보수집및이용"
          checked={개인정보수집및이용}
          onChange={handleIndividualAgreementChange}
          className="A4-check"
          required
        />
        개인정보 수집 및 이용 동의 (필수)
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="개인정보제3자제공"
          checked={개인정보제3자제공}
          onChange={handleIndividualAgreementChange}
          className="A5-check"
        />
        개인정보 제 3자 제공 동의 (선택)
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="마케팅정보수신"
          checked={마케팅정보수신}
          onChange={handleIndividualAgreementChange}
          className="A6-check"
        />
        마케팅 정보 수신 동의 (선택)
      </label>
      <button className='GButton' type="submit">가입하기</button>
    </form>
    </div>
    </div>
  );
}


