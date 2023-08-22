# React hook (심화)                                <useRef, customhook>

use state와 같은 hook을 사용하면 상태가 변할 때 마다 React 컴포넌트 함수가 호출되어 화면이 갱신됩니다.

하지만 그에 따른 부작용으로 함수 내부의 변수들이 기존에 저장하고 있는 값들을 잃어버리고 초기화된다는 점이 있습니다.

 간혹 다시 랜더링이 되더라도 기존에 참조하고 있던 컴포넌트 함수 내의 값이 그대로 보존되야 하는 경우가 있습니다.

그럴 때 useRef를 사용하면 함수 내의 값을 그대로 보존할 수 있습니다. 

### useRef

```jsx
import { useRef } from 'react';
```

해당 방법을 통해 import 할 수 있습니다. 

```jsx
const name = useRef("mango");
// useRef의 괄호 안은 해당 변수의 기본값을 나타낸다.
console.log(name);// {current: "mango"}
console.log(name.current);
// mangoconsole.log(typeof name);
// useRef는 해당 변수를 object로 생성시킨다.
```

기본형태는 다음과 같습니다. 

```jsx

function App() {
  const users = [
    {
      id: 1,
      username: 'yujin',
      email: 'yujin@example.com'
    },
    {
      id: 2,
      username: 'user1',
      email: 'user1@example.com'
    },
    {
      id: 3,
      username: 'user2',
      email: 'user2@example.com'
    }
  ];

  const nextId = useRef(4);
  const onCreate = () =>  {

// 배열에 새로운 항복 추가하는 로직 생략

    nextId.current += 1;
  };
  return <UserList users={users} />;
}

export default App;
컴포넌트의 속성 정보를 조회 & 리렌더링 없이 수정할 때 사용됩니다.
```

useRef를 활용한 변수는 아래와 같은 곳에 쓰입니다. 

- setTimeout, setInterval을 통해 만들어진 id
- scroll 위치
- 배열에 새 항목을 추가할 때 필요한 고유값 key

```jsx

import React, { useState, useRef } from 'react';

function InputTest() {
  const [text, setText] = useState('');
  const nameInput = useRef();

  const onChange = e => {
    setText(e.target.value)
  };

  const onReset = () => {
    setText('');
    nameInput.current.focus();
  };

  return (
    <div>
      <input
        name="name"
        onChange={onChange}
        value={text}
        ref={nameInput}
      />

      <button onClick={onReset}>초기화</button>
      <div>
        <b>내용: </b>
        {text}
      </div>
    </div>
  );
}

export default InputTest;
```

또한 useRef는 선택하고 싶은 DOM에 속성으로 ref 값을 설정해줍니다.

**nameInput.current.focus();**:에서 Ref 객체의 current 값은 우리가 선택하고자 하는 DOM을 가리키고, 포커싱을 해주는 DOM API focus() 를 호출합니다.

텍스트 선택영역, 혹은 미디어의 재생을 관리할 때 등 useRef를 사용하는 사례가 있습니다.  

---

### customhook

> 커스텀 훅은 개발자가 직접 만든 hook입니다. 반복되는 로직을 묶어 하나의 컴포넌트로 만들듯이 반복되는 메서드를 하나로 묶어 사용합니다. 보통 Input과 Fetch를 관리할 때 자주 쓰입니다. 그리고 만들어진 기능은 컴포넌트에서 독립돼있습니다.
> 

장점 

- 코드, 로직의 간결해지고 가독성이 좋아집니다
- 필요없는 반복을 줄이고 재사용성을 높입니다
- 수정사항이 있을 시 커스텀 훅에서만 수정하면 되기 때문에 유지보수에 용이합니다

제작방법

```jsx

// useInput
import { useState, useCallback } from "react";

export default (initalValue = null) => {
  // state 정의
  const [data, setData] = useState(initalValue);

  // 함수 정의
  const handler = useCallback(
    e => {
      const { value, name } = e.target;
      setData({
        ...data,
        [name]: value
      });
    },
    [data]
  );
  return [data, handler];
};
```

중복이 되는 로직을 넣습니다. 파일이름은 use...로 만듭니다. 

```jsx
import React from "react";
import useInput from "useInput";

// state
const [text, setText] = useInput({
  email: "",
  password: ""
});

return (
  <>
    <input id="email" value={text.email} onChange={setText} />
    <input id="password" value={text.password} onChange={setText} />
  </>
);
 
     
    

```

useInput훅 안에 useState, useCallback에 있는 함수를 미리 정의 했기 때문에, 컴포넌트에서는 훅을 사용하기만 하면 됩니다.

보시다시피, useState, onChange 함수가 없어져서 코드양도 적어지고, 저 커스텀 훅을 다른 컴포넌트에서도 재활용 가능하기 때문에 동일한 로직을 수행하는 컴포넌트가 많을 경우 커스텀 훅을 더욱 유용히 사용할 수 있습니다