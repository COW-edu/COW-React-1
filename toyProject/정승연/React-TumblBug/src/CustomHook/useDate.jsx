import { useEffect, useState } from "react";

export function useDate() {
  const date = new Date();

  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [today, setToday] = useState(date.getDate());
  const [hours, setHours] = useState(date.getHours());
  const [minutes, setMinutes] = useState(date.getMinutes());
  const [seconds, setSeconds] = useState(date.getSeconds());

  const getTime = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const today = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    setYear(year);
    setMonth(month);
    setToday(today);
    setHours(addZero(hours));
    setMinutes(addZero(minutes));
    setSeconds(addZero(seconds));
  };

  const addZero = (content) => {
    if (content < 10) {
      return `0${content}`;
    } else {
      return content;
    }
  };

  useEffect(() => {
    let timer = setInterval(getTime, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  return `${year}.${month}.${today} ${hours}:${minutes}:${seconds}`;
}
