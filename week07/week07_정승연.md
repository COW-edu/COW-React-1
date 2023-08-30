# React hook (심화) <useRef, customhook>

작성일시: 2023년 8월 22일 오후 12:40
복습: No

# useRef

- useRef 훅을 통해 리액트에서 직접 DOM을 선택할 수 있다
- DOM 요소에 접근을 위해 사용되는 React hook이다

## useRef를 통한 변수관리

- Ref의 유용한점은 Ref안에 있는 값을 아무리 변경해도 컴포넌트는 다시 렌더링되지 않는다.
- State 대신 Ref를 사용한다면 불필요한 렌더링을 막을 수 있다.
- 컴포넌트가 아무리 렌더링 되어도 Ref 안에 저장되어 있는 값은 변화되지 않고 그대로 유지가 된다.
- 즉 상태 변경시 렌더링을 발생시키지 말아야 하는 값을 다룰때 사용한다.

```jsx
import { useState, useRef } from 'react'
import './App.css';

function App() {
  const [render, setRender] = useState(false);
  const countRef = useRef(0);
  let countVar = 0;

  
  console.log('***** 렌더링 후 Ref:', countRef.current);
  console.log('***** 렌더링 후 Var:', countVar);
  
  const increaseRef = () => {
    countRef.current = countRef.current + 1;
    console.log('Ref Up! --->', countRef.current);
  }

  const increaseVar = () => {
    countVar = countVar + 1;
    console.log('Var Up! --->', countVar);
  }

  const doRender = () => {
    setRender(!render);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Ref: {countRef.current}</p>
        <p>Var: {countVar}</p>
        
        <div>
          <button onClick={increaseRef}>Ref Up!</button>
          <button onClick={increaseVar}>Var Up!</button>
          <button onClick={doRender}>Render!</button>
        </div>
      </header>
  </div>
  );
}

export default App;
```

- 실행시 각각의 버튼을 눌러보면 콘솔에서 각각의 값들이 증가하는 것을 확인할 수 있다.
- 하지만 ref의 값이 변경되어도 재렌더링되지 않는다
- Render 버튼을 눌러 화면을 렌더링 시키면 Var값은 0으로 초기화되지만 ref의 값은 유지되는것을 확인할 수 있다.
- Ref 값은 컴포넌트의 전 생애주기를 통해 유지가 된다.

## useRef를 통한 DOM 요소 접근

- JS에 document.querySelector()와 비슷한 역할을 한다.
- 대표적으로 input 요소를 클릭하지 않고 포커스를 주고 싶을때 많이 사용한다.

```jsx
import { useEffect, useRef } from 'react'
import './App.css';

function App() {
  const inputRef = useRef();

  useEffect(() => {
    console.log(inputRef);
    inputRef.current.focus();
  }, [])

  const loginAlert = () => {
    alert(`환영합니다. ${inputRef.current.value}`);
    inputRef.current.focus();
  }
  return (
    <div className="App">
      <header className="App-header">
        <input ref={inputRef} type="text" placeholder="id"/>
        <button onClick={loginAlert}>Login</button>
      </header>
  </div>
  );
}

export default App;
```

# 커스텀 Hook

- 컴포넌트 작성 시 반복되는 로직이 자주 발생한다.
- 커스텀 Hook 활용을 통해 반복되는 훅 활용 메소드들을 하나로 줄여줌으로써 더 간결하고 보기 좋은 코드를 만들 수 있다.
- custom hook을 통해 코드의 가독성을 높이고 짧고 간결한 코드를 작성할 수 있다.

## 커스텀 Hook 생성 시 고려해야 할 점

- 이름이 use로 시작하고, 안에서 다른 Hook을 호출하면 그 함수를 custom Hook이라고 부를 수 있다.
- custom Hook은 동시에 사용할 수 있어야 한다.
- 즉 하나의 컴포넌트에서 여러개의 custom Hooks 사용시 state  업데이트는 고유성을 유지해야 하며 서로에게 영향을 주면 안된다.
- custom hook은 자신을 포함하여 다른 hook이나 component에 영향을 끼치지 않아야 한다.