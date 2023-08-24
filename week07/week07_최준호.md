# [7주차] React hook (심화) <useRef, customhook>

## useRef

- 저장공간 또는 DOM요소에 접근하기 위하여 사용되는 Hook
    - `querySelector` 와 같은 DOM선택자를 사용하는 것 처럼 리액트에서 DOM직접 선택시 `useRef` 라는 Hook을 사용한다.
- 렌더링에 필요하지 않은 값을 참조할 수 있다.

```jsx
const ref = useRef(initialValue)
//initial Value : ref객체의 current 초기 설정값
```

- `ref`를 변경하더라도 리렌더링을 촉발하지 않는다. ⇒ 컴포넌트의 시각적 출력에 영향을 미치지 않는 정보를 저장하는데 적합하다.
- `useRef()` 로 Ref객체 생성, 선택하고 싶은 DOM에 `ref` 값 설정 → Ref객체의 `.current` 는 ref값을 설정한 DOM을 가르킨다.

```jsx
import {useRef} from 'react';

function RefExample() {
	const refExample = useRef();

	function focus() {
		refExample.current.focus();
		console.log(refExample.current);
	}

	return(
		<div>
			<input ref ={refExample} type='text' placeholder='입력해봐' />
			<button onClick={focus}>focus</button>
		</div>
```

- focus 버튼 누르면 `input` 요소를 콘솔에 로그해주는 걸 확인할 수 있다.

### `useRef` 를 사용하는 경우

1. 포커스 관리, 텍스트 선택 혹은 미디어 플레이백
2. 중요한 애니메이션 트리거
3. 서드파티 DOM라이브러리와의 통합

## custom Hook

- 개발자가 정의하여 만드는 hook으로 반복되는 훅 활용 메소드를 하나로 줄여 정의하여 간편하게 호출할 수 있다.
- 커스텀 훅을 사용해 만든 기능은 컴포넌트에서 독립된 상태를 가진다.

```jsx
// custom hook을 사용하기 전 input field 유효성검사, 클릭 이벤트 등등
function App() {
const [value, setValue] = useState('');

const onClick = () => {
    클릭 이벤트
};

const isValid = (value) => value.length <= 10 // 유효성 검사

const onChange = (e) => {
        const { value } = e.target;

    let willUpdate = true;
    willUpdate = isValid(value);

    if (willUpdate) {
      setValue(value);
    }
};

    return (
        <div className='box'>
                <input placeholder='Name' value={value} onChange={onChange}/>
                <button onClick={onClick} />
        </div>
    );
}
```

```jsx
// 위 코드를 custom hook으로 분리하면?
const useInput = () => {
  const [value, setValue] = useState('');

  const isValid = (value) => value.length <= 10 // 유효성 검사

  const onChange = (e) => {
        const { value } = e.target;

    let willUpdate = true;
    willUpdate = isValid(value);

    if (willUpdate) {
      setValue(value);
    }
  };

  return { value, onChange };
};

function App() {
  const { value, onChange } = useInput();

  const onClick = () => {
    클릭 이벤트
   };

  return (
    <div className='box'>
      <input placeholder='Name' value={value} onChange={onChange} />
            <button onClick={onClick} />
    </div>
  );
}

export default App;
```

- 커스텀훅을 만들 때 이름을 항상 `use`로 시작해야한다.
    - `use내꺼1` `use너꺼2`
    - Hook을 호출하지 않는 함수는 use로 시작하지 않아도 된다. 이런 규칙들을 잘 적용한다면 use가 붙지 않은 함수는 곧 Hook을 사용하지 않는 함수구나라는 것을 미리 알 수 있을 것이다.
- 커스텀훅은 state 자체 공유가 아닌 state 저장 로직을 공유하도록 한다.

```jsx
... 
  const [firstName, setFirstName] = useState('Mary');
  const [lastName, setLastName] = useState('Poppins');

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
  }

// 위 코드를 커스텀 훅으로 만들기

export function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }

  const inputProps = {
    value: value,
    onChange: handleChange
  };

  return inputProps;
}

// App.js에 적용할 때 
...
	const firstNameProps = useFormInput('Mary');
  const lastNameProps = useFormInput('Poppins');
// state 자체 공유가 아닌 state저장 로직을 공유하도록 한다는 예시
```

- 커스텀 Hook으로 Effect를 감싸는 것이 유용한 이유
    1. 매우 명확하게 Effect로 주고받는 데이터 흐름을 만들 때
    2. 컴포넌트가 Effect의 정확한 실행보다 목적에 집중하도록 할 때
    3. React가 새 기능을 추가할 때, 다른 컴포넌트의 변경 없이 이 Effect를 삭제할 수 있을 때
- 하나의 Hook에서 다른 Hook으로 반응형 값 전달 가능하고 값은 최신 상태로 유지된다.

### api연동하는 커스텀 훅 예시

> https://react.vlpt.us/integrate-api/03-useAsync.html
> 

```jsx
import { useReducer, useEffect } from "react";

function reducer(state, action) {
  switch(action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null
      };
    case 'SUCCESS':
      return{
        loading: false,
        data: action.data,
        error: null
      };
    case 'ERROR' :
      return{
        loading: false,
        data: null,
        error: action.error
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function useAsync(callback, deps = [], skip = false) {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: false
  });
  
  const fetchData = async () => {
    dispatch({type: 'LOADING'});
    try{
      const data = await callback();
      dispatch({type: 'SUCCESS', data});
    } catch(e) {
      dispatch({type: 'ERROR', error: e});
    }
  };
  useEffect(() => {
    if(skip) return;
    fetchData();
  }, deps);

  return [state, fetchData];
}

export default useAsync;
```
