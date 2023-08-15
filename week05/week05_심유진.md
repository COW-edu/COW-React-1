# 상태와 props (props Drilling)

## **State**

> State는 한 컴포넌트 안에서 **유동적인 데이터**를 다룰 때 사용되며, 컴포넌트 안에서 데이터를 변경할 수 있다. 즉, State는 한 컴포넌트의 상태(State)를 나타낸다.
> 

```jsx
`+` 버튼을 누르면, 화면에 표시된 값을 1 증가 시키는 코드

import React, { useState } from 'react';

const Text = ({text}) => {
  return <div>{text}</div>
}

const App = () => {
  const [count, setCount] = useState(0);

  return <div><Text text={count} />
    <div onClick={() => setCount(count + 1)}>+</div>
  </div>
}
```

React의 함수 컴포넌트에서는 State를 사용하기 위해 useState라는 훅(Hook)을 사용해야 한다.

useState는 State 변수의 초기값을 매개변수로 전달 하여 호출하며, 결과값으로는 배열을 반환하게 된다.

반환된 배열에서는 useState 함수를 호출할 때 설정한 초기값이 할당된 변수와 해당 변수를 수정하기 위한 Set 함수가 포함되어 있다. 

**hook** 

> 함수형 컴포넌트가 클래스형 컴포넌트의 기능을 사용할 수 있도록 해주는 기능이다.
> 
- hook을 사용해 함수형 컴포넌트에서도 state와 생명주기를 다룰 수 있기에 **클래스형 컴포넌트에서만 가능하던 상태관리를 더 손쉽게 할 수 있어 필요하다.**

```jsx
const 배열 = useState (데이터 초기값);
```

- 배열[0]: 데이터 초기값이 들어간 변수
- 배열[1]: 데이터를 수정할 수 있는 Set 함수

보통은 반환된 결과값을 자바스크립트의 구조 분해 할당(Destructuring assignment)을 통해 변수와 Set 함수를 할당하여 사용하게 된다. 

```jsx
const [변수명, Set함수명] = useState (데이터 초기값);
```

useState를 사용하여 할당받은 변수는 불변값(Immutable)이다. 따라서 해당 값은 직접 수정이 불가능하며 해당 값을 변경하기 위해서는 반드시 Set 함수를 사용해야 한다.

```jsx
const App = () => {
  const [count, setCount] = useState(0);

  return <div>
    <Text text={count} />
    <div onClick={() => setCount(count + 1)}>+</div>
  </div>
}
```

## **Props**

> Props(Properties)는 부모 컴포넌트에서 자식 컴포넌트로 전달되는 데이터를 말한다.
> 

- 부모 컴포넌트로부터 받는 데이터이므로 자식 컴포넌트에서는 변경할 수 없다.
- 이는 한 컴포넌트의 속성(Properties)과 같음을 의미한다.

```jsx
<div id="name" class="label" onclick="alert('Hello World!');">
  Hello world!
</div>
```

이전에 HTML의 속성이라는 개념을 사용 해 왔다.

(HTML의 div 태그에 id와 class 속성을 설정하고 onclick 속성에 직접 자바스크립트의 alert 코드 사용) 

React에서는 이 속성 개념에 데이터를 전달한다는 개념을 추가 확장한 것이다.

```jsx
const Text = ({text}) => {
  return <div>{text}</div>
}

const App = () => {
  return <Text text='Hello world!'/>
}
```

부모 컴포넌트(App)에서 자식 컴포넌트(Text)에 속성(Props)을 이용하여 `Hello world!`라는 문자열 데이터를 전달하는 것을 확인할 수 있다. 

---

### Props

- 불변의 데이터
- 부모로부터 전달됨
- 변경 불가

### State

- 가변 데이터
- 구성 요소에 의해 유지
- 변경 가능

### Props와 State의 차이점

- Props는 외부(부모 컴포넌트)에서 상속 받는 데이터이며, 부모 컴포넌트로부터 받는 데이터이므로 자식 컴포넌트에서는 데이터를 변경할 수 없음.
- State는 내부 (컴포넌트)에서 생성하고 활동하고, set함수로 데이터를 변경할 수 있음

---

## Prop Drilling?

> props를 오로지 하위 컴포넌트로 전달하는 용도로만 쓰이는 컴포넌트들을 거치면서 React Component 트리의 한 부분에서 다른 부분으로 데이터를 전달하는 과정이다.
> 

**Prop Drilling에서 발생하는 문제** 

prop 전달이 3~5개 정도의 컴포넌트라면 Prop Drilling이 문제가 되지 않는다. 

하지만,  prop 전달이 10개, 15개 같이 더 많은 과정을 거치게 된다면 코드를 읽을 때 해당 prop을 추적하기 힘들어진다. 

예시 코드 

```jsx
import React from "react";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <FirstComponent content="Who needs me?" />
    </div>
  );
}

function FirstComponent({ content }) {
  return (
    <div>
      <h3>I am the first component</h3>;
      <SecondComponent content={content} />|
    </div>
  );
}

function SecondComponent({ content }) {
  return (
    <div>
      <h3>I am the second component</h3>;
      <ThirdComponent content={content} />
    </div>
  );
}

function ThirdComponent({ content }) {
  return (
    <div>
      <h3>I am the third component</h3>;
      <ComponentNeedingProps content={content} />
    </div>
  );
}

function ComponentNeedingProps({ content }) {
  return <h3>{content}</h3>;
}
```

**해결방법** 

1. 전역 상태관리 라이브러리 사용
- `redux`, `MobX`, `recoil` 등을 사용하여 해당 값이 필요한 컴포넌트에서 직접 불러서 사용할 수 있다.
- 프로젝트가 커져서 컴포넌트 갯수가 많아지고 그들간에 서로 공유하는 state 값들이 많아진다면, state가 어디서 어떻게 변하는지, 그리고 이 업데이트가 어떤 컴포넌트의 어떤 작업으로 인해 발생했는지, 손쉽게 파악하기가 힘든데 이를 도와준다.

1. `children` 을 적극적으로 사용
- 하나의 컴포넌트에서 값을 관리하고, 그 값을 하위요소로 전달할 때 전혀 코드의 추적이 어려워지지 않는다
- Store와 연결되어 있는 부분을 따로 뺄 수 있다.

예시 코드 

```jsx
import React from "react";
import "./styles.css";

export default function App() {
  const content = "Who needs me?";
 return (
    <div className="App">
      <FirstComponent>
        <SecondComponent>
          <ThirdComponent>
            <ComponentNeedingProps content={content}  />
          </ThirdComponent>
        </SecondComponent>
      </FirstComponent>
    </div>
  );
}

function FirstComponent({ children }) {
  return (
    <div>
      <h3>I am the first component</h3>;
     { children }
    </div>
  );
}

function SecondComponent({ children }) {
  return (
    <div>
      <h3>I am the second component</h3>;
     {children}
    </div>
  );
}

function ThirdComponent({ children }) {
  return (
    <div>
      <h3>I am the third component</h3>
        {children}
    </div>
  );
}

function ComponentNeedingProps({ content }) {
  return <h3>{content}</h3>
}
```