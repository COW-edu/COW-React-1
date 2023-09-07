import { useState } from "react";

function useValid() {
  const [userEmail, setUseremail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [doubleEmailError, setDoubleEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [doublePasswordError, setDoublePasswordError] = useState('');

  const checkPassword = (e) => {
    const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
    const isValid = regExp.test(e.target.value);
    if(isValid === true) {
      setPassword(e.target.value);
      setPasswordError('');
    } else{
      setPasswordError('비밀번호 형식이 올바르지 않습니다. ');
    }

    console.log('비밀번호 유효성 검사 :: ', isValid);
    return(isValid);
  }

  const doubleCheckPassword = (e) => {
    let isValid;
    if(e.target.value === password) {
      isValid = true;
      setDoublePasswordError('');
    } else{
      isValid = false;
      setDoublePasswordError('비밀번호가 똑같지 않습니다. ')
    }
    console.log('비밀번호 중복 검사 :: ', isValid);
    return(isValid);
  }

  const checkEmail = (e) => {
    const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    const isValid = regExp.test(e.target.value)
    if(isValid === true) {
      setUseremail(e.target.value);
      setEmailError('');
    } else{
      setEmailError('이메일 주소 형식이 올바르지 않습니다.');
    }
    console.log('이메일 유효성 검사 :: ',  isValid);
    return(isValid)
  }

  const doubleCheckEmail = (e) => {
    let isValid;
    if(e.target.value === userEmail) {
      isValid = true;
      setDoubleEmailError('');
    } else{
      isValid = false;
      setDoubleEmailError('이메일이 똑같지 않습니다. ');
    }
    console.log('이메일이 동일하냐? :: ', isValid);
    return(isValid);
  }


  return {checkPassword, checkEmail, doubleCheckPassword, doubleCheckEmail, emailError, passwordError, doublePasswordError, doubleEmailError}
}

export default useValid;

