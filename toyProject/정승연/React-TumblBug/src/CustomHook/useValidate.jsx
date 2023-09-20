import { useEffect, useState } from "react";

export function useValidate() {
  const errors = {
    email: "",
    password: "",
    passwordConfirm: "",
    checkError: "",
  };

  const email_expTest = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
  const valiDate = (values) => {
    console.log(values);
    if (!values.email) {
      errors.email = "이메일이 입력되지 않았습니다";
    } else if (email_expTest.test(values.email) === false) {
      errors.email = "옳바른 형식의 이메일이 아닙니다";
    } else {
      errors.email = "";
    }

    if (!values.password) {
      errors.password = "패스워드가 입력되지 않았습니다";
    } else if (values.password !== values.passwordConfirm) {
      errors.passwordConfirm = "패스워드가 일치하지 않습니다";
    }

    if (values.require1 && values.require2 && values.require3) {
    } else {
      errors.checkError = "필수 항목을 체크해주세요";
    }
  };

  return { valiDate, errors };
}
