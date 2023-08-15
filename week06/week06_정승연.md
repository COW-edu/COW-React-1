# React hook (기초) <useState, useEffect>

작성일시: 2023년 8월 15일 오후 9:23
복습: No

# React hook

- 리액트 훅은 리액트 클래스형 컴포넌트에서 이용하던 코드를 작성할 필요없이 함수형 컴포넌트에서 다양한 기능을 사용할 수 있게 만들어준 라이브러리다.
- React 16.8 버전에 새로 추가된 기능으로 함수형 컴포넌트에서 사용 가능하다.

## Hook 규칙

1. 최상위에서만 Hook을 호출해야 한다. 
2. 리액트 함수 내에서만 Hook을 호출해야한다.

# useState

```jsx
import { useState } from 'react'
import './App.css';

function App() {
  const [time, setTime] = useState(1);

  const onClick = () => {
    setTime(time + 1);
  }

  console.log('time 업데이트 -> ', time);
  
  return (
    <div className="App">
      <header className="App-header">
        <span>현재시간: {time}시</span>
        <button onClick={onClick}>update</button>
      </header>
  </div>
  );
}

export default App;
```

- useState은 상태를 관리하는 훅이다
- 현재 상태를 나타내는 state 값과 이 상태를 변경하는 setState 값을 한 쌍으로 제공한다
- state 의 초기값을 설정할 수 있으며, 초기값은 첫 렌더링 때 한번 사용된다.
- state는 객체일 필요 없이 문자열, 숫자, boolean, 배열, null 등 다양한 값을 넣을 수 있다.

## useEffect

- useEffect 훅은 리액트 컴포넌트가 렌더링 될 때 마다 특정 작업을 실행할 수 있도록 하는 HOOK이다
- useEffect를 통해 mount, unmount, update 됐을 때, 특정 작업을 처리할 수 있다.

```jsx
useEffect(function,deps)
```

- function: 수행하고자 하는 작업
- deps: 배열 형태이며, 배열 안에는 검사하고자 하는 특정 값 or 빈 배열 가능

```jsx
useEffect(()=>{
console.log("마운트 될 때만 실행된다")},[])
```

- 컴포넌트가 화면에 처음 렌더링 될 때 한번만 실행하고 싶으면 deps 위치에 빈 배열을 넣는다

```jsx
useEffect(()=>{
console.log("업데이트 될 때만 실행된다")},[name])
```

- 특정값이 업데이트 될 때 실행하고 싶을 때는 deps 위치의 검사하고 싶은 값을 넣어준다.(최초 마운트 될 때 도 실행)

```jsx
useEffect(()=>{
console.log("useEffect");
console.log(name);
return()=>{console.log("clean Up")}},[])
```

- return 뒤에 나오는 함수를 cleanup 함수라 하며 컴포넌트가 unmount 될 때 실행된다.