import { useEffect, useState } from "react";
import { useValidate } from "./useValidate";

export function useInput(initialValue) {
  const [input, setInput] = useState(initialValue.input);
  const { valiDate, errors } = useValidate();
  const [checkList, setCheckList] = useState(initialValue.check);
  const [inputError, setInputError] = useState({});
  const [checkError, setCheckError] = useState({});

  const [touched, setTouched] = useState({
    email: false,
    password: false,
    passwordConfirm: false,
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    valiDate(input);
  };

  const handleCheck = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setCheckList({ ...checkList, [name]: true });
    } else {
      setCheckList({ ...checkList, [name]: false });
    }
    valiDate(checkList);
  };

  const checkAll = (e) => {
    if (e.target.checked === true) {
      const checkAll = {
        require1: true,
        require2: true,
        require3: true,
        option1: true,
        option2: true,
      };
      setCheckList(checkAll);
      console.log(checkList);
    } else {
      const checkAll = {
        require1: false,
        require2: false,
        require3: false,
        option1: false,
        option2: false,
      };
      setCheckList(checkAll);
    }
  };

  const onBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const onSubmit = (e) => {
    if (
      inputError.email !== "" ||
      inputError.password !== "" ||
      inputError.passwordConfirm !== "" ||
      checkError.checkError !== ""
    ) {
      console.log("에러가 존재하니 submit을 하지 않음");
      e.preventDefault();
      return;
    } else {
      setInputError({});
    }
  };

  useEffect(() => {
    valiDate(input);

    setInputError(errors);
  }, [input]);

  useEffect(() => {
    valiDate(checkList);

    setCheckError(errors);
  }, [checkList]);

  return {
    onChange,
    onSubmit,
    inputError,
    touched,
    onBlur,
    checkList,
    handleCheck,
    checkAll,
    checkError,
  };
}
