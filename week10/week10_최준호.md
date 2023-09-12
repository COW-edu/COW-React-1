# [10주차] useContext, useMemo, useCallback

## useContext

- 부모 → 자식 컴포넌트로 정보전달 간 `props` 사용 ⇒ 전달하고자 하는 컴포넌트가 너무 많은 경우 `Prop drilling` 상황 초래되어 유지보수 간 더욱 불편해짐 → Prop drilling 상황을 만들지 않고 한 번에 정보를 전달하기 위해 사용되는 React Hook이다.
- `Context` 를 통해서 트리 아래에 위치한 모든 곳에서 데이터를 제공하도록 돕는다.
- `createContext` : context 객체 생성
- `Provider` : context를 하위 컴포넌트에 전달
- 사용법
    1. `createContext` 함수 통해서 context 생성
    
    ```jsx
    // App.js
    
    export const MyContext = createContext();
    ```
    
    1. `useContext` 와 생성된 context 가져오기 
    
    ```jsx
    // mainSection.js
    import { useContext } from 'react';
    import { MyContext } from './App.js';
    ```
    
    1. context 전달을 위해 context provider로 감싸기 
    
    ```jsx
    // mainSection.js
    
    ...
    	<MyContext.provider value={전달값}>
    		<DetailSection />
    	</MyContext.Provider>
    ```
    
    1. context 불러오기 
    
    ```jsx
    function DetailSection () {
    	const myContextDetail = useState(전달값);
    	return (...)
    }
    ```
    
- context 업데이트 방법
    1. Context 통해서 값 업데이트 
    
    ```jsx
    const myContext = createContext(null);
    
    function App() {
    	const [score, setScore] = useState(50);
    	return(
    		<myContext.provider value={score}>
    			<input onChange{(e)=>{setScore(e.target.value)}/>
    		</myContext.Provider>
    
    ```
    
    1. context 통한 object 업데이트 
    
    ```jsx
    const MyContext = createContext(null);
    
    function App() {
    	const [score, setScore] = useState(null);
    	return(
    		<MyContext.Provider value={{score, setScore}}>
    			<Detail/>
    		</MyContext.Provider>
    	)
    }
    
    function Detail() {
    	const { score, setScore } = useContext(MyContext);
    	return(
    		<input onChange{(e)=>{setScore(e.target.value)}/>
    	)
    }
    ```
    
- fallback 기본값 지정 ⇒ React가 부모 트리에서 context provider를 찾지 못하는 경우 반환되는 context값은 context 생성시의 값과 동일하게 지정된다.

```jsx
const myContext = createContext(null); //이거보단
const myContext = createContext(100); //의미있는 값으로 넣기
```

---

## useMemo

- Memo ⇒ memoization : 프로그래밍이 동일한계산을 반복할 때 이전 계산 값을 메모리에 저장하여 동일한 계산 반복 수행을 제거하여 프로그램 실행 속도를 빠르게 하는 기술

```jsx
useMemo(calculateValue, dependencies)
```

- `calculateValue` : 반드시 값을 가지는 계산하려는 함수
- `dependencies` : `calculateValue`에서 참조하는 반응형 값 목록
- 초기렌더링에서는 인자없이 `caluclateValue`를 호출한 결과값을 반환하고, 이후 반응형 값 목록, 의존성이 변경되지 않은 경우 이전 결과값을 반환, 의존성에 변화가 생겼다면 다시 `calculateValue`를 호출한 후 결과값을 반환한다.

```jsx
const value = useMemo(() => {
	return cacluateValue();
}, [dependencies]);
```

- 컴포넌트 리렌더링시 자식 컴포넌트도 항상 재렌더링 되는데 이때의 렌더링 시간을 줄여주는 이점이 있다.

```jsx
//useMemo example
import {useMemo, useState} from 'react'

function forcalculate(){
	...
  return result
}

function Cart(){ 

  let result = useMemo(()=>{ return forcalculate() }, [])

  return (
    <Child />
    <button onClick={()=>{ setCount(count+1) }}> + </button>
  )
}
```

- useMemo는 계산에 대한 입력이 변경되지 않으면 업데이트 되지 않는다 ⇒ 입력이 유지되는 경우에만 유용하다

---

## useCallback

- 리렌더링간 함수 정의를 캐싱해주는 React Hook ⇒ 이미 생성된 함수를 반환하는 리액트 훅
    - `useMemo` → 계산값을 반환, `useCallback` → 함수를 반환

```jsx
const cachedFn = useCallback(fn, dependencies)
```

- `function`: 반환할 함수
- `dependencies` : `fn`에서 참조하는 반응형 값 목록

```jsx
// ko.react.dev 인용

function ProductPage({ productId, referrer, theme }) {
  // React에게 리렌더링 간에 함수를 캐싱하도록 요청합니다...
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]); // ...이 의존성이 변경되지 않는 한...

  return (
    <div className={theme}>
      {/* ...ShippingForm은 같은 props를 받게 되고 리렌더링을 건너뛸 수 있습니다.*/}
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}
```

- `function() {}`, `() => { }` 같은 경우 항상 다른 함수를 생성하기 때문에 이때 `useCallback` hook을 사용하여 리렌더링 간 의존성 변경이 되기 전까지는 같은 함수임을 보장한다. → 해당 함수의 의존성에 변화가 없다면 리렌더링을 건너뛴다.
- `useCallback` hooks를 사용하면 좋은 경우
    - 자식 컴포넌트에 함수를 props로 전달할 때 유용하다
    - 의존성 배열 안에 함수가 의존하는 상태나 props를 명시적으로 지정 가능하다 → 함수가 관련없는 업데이트에 영향을 받지 않도록 할 수 있다.
- 단 `useCallback` 을 사용할 때 과도하게 사용하게 된다면 함수를 메모이제이션하는 것으로 메모리를 사용하게 되고, 이때 함수가 자주 갱신되지 않는 경우에 메모리를 낭비하게 될 수 있다.
- 함수를 `useCallback`으로 감싸기 때문에 가독성이 떨어져 보인다는 단점 또한 존재한다.