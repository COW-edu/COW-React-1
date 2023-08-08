# [4주차] React 동작방식 및 JSX, tailwind

## React 동작방식 및 JSX

### React

- 상태값이 변경될 때 마다 UI를 자동으로 업데이트해주는 JS라이브러리
    
    → 가상 DOM을 통해 변경된 부분만 효율적으로 업데이트
    
    ⇒ 동적으로 변하는 웹 서비스에서 사용자에게 더 좋은 UI와 UX를 제공해준다.
    
- React가 관리하는 내용 중 핵심 기능
    - `Props` : 컴포넌트에 전달해주는 data, 부모 자식 컴포넌트 간 데이터를 연결해준다.
    - `State` : 컴포넌트 내부의 데이터를 의미함
    - `Context` : 앱 구성하는 전체 컴포넌트의 데이터
    - `Component` : 위 기능들의 집합인 함수이다.
    
    → `Props`, `State`, `Context` 변경시 React에서 변경점이 적용되어 이에 관련한 컴포넌트가 화면에 새로운 것이 표시되는지를 확인 한 후 가상 DOM(React-DOM)을 통해 리렌더링 하도록 알려준다.
    
    ⇒ React가 변경전 스냅샷 변경 후 스냅샷 간 차이점을 React-DOM에 보고하고, React-DOM은 실제 DOM 업데이트 및 새롭게 추가된 요소를 집어넣는다. 이때 전체 DOM을 리렌더링하는 것이 아닌 변경사항이 적용되어야 할 부분만 변경하거나 추가한다.
    
- React VirtualDOM의 작동과정

```jsx
function HelloMessage(){
  const [name, setName] = React.useState('foo');
  
    return (
      <div>Hello {name}</div>
    );
}

ReactDOM.render(<HelloMessage name="bar" />, mountNode)
```

1. `HelloMessage` 에서 ‘Hello foo’ 리턴 후 렌더링 중
2. state의 name이 ‘foo’ → ‘bar’로 변경 → render함수 재호출
3. `HelloMessage` 에서 ‘Hello bar’ 리턴
4. Virtual DOM에서 변경된 내용(state) 감지 후 div태그 안 내용 DOM에서 수정
5. 브라우저 감지 후 화면 리렌더링

### JSX

- JavaScript를 확장한 문법, React element를 생성한다.
- 공식적인 자바스크립트 문법은 아니다.
- 브라우저가 실행되기 전에 바벨을 통해 일반적인 자바스크립트 코드로 변환된다.
- JSX파일 하나에 JS와 HTML을 동시에 작성 가능하다.
- JSX문법
    - 감싸인 요소 → Virtual Dom에서 컴포넌트 변화를 감지할 때 효율적으로 비교시키기 위해 컴포넌트 내부를 하나의 DOM트리 구조로 이루어야한다.
        - React v16 이상부터 `Fragment` 기능 사용 가능
    
    ```jsx
    function App() {
    	return(
    		<div> // 하나로 묶기
    			<h1>하이</h1>
    			<h2>방가방가</h2>
    		</div>
    	);
    }
    //Fragment기능 이용
    import React, { Fragment } from 'react';
     
    function App() {
      return (
        <>
          <h1>하이</h1>
          <h2>방가방가</h2>
        </>
      );
    }
     
    export default App;
    ```
    
    - JSX안에서 자바스크립트 표현식 사용 가능하다.
    
    ```jsx
    function App() {
    	const hello = '하이';
    	return(
    		<> 
    			<h1>{hello} 하이</h1>
    			<h2>방가방가</h2>
    		</>
    	);
    }
    ```
    
    - JSX 내부에서 if문 사용 불가 → 밖에서 if문 사용 or 삼항 연산자 사용
    
    ```jsx
    function App() {
      const name = '리액트';
      return (
        <div>
          {name === '리액트' ? (
            <h1>리액트입니다.</h1>
          ) : (
            <h2>리액트가 아닙니다.</h2>
          )}
        </div>
      );
    }
    ```
    
    - `&&` (AND연사자) 사용한 조건부 렌더링
        
        → 리액트에서 false 렌더링시 null과 같이 아무것도 나타나지 않는다.
        
        0은 예외적으로 화면에 나타난다.
        
    
    ```jsx
    function App() {
      const name = '뤼왝트';
      return <div>{name === '리액트' ? <h1>리액트입니다.</h1> : null}</div>;
    }
    // 위 코드를 and연사자를 활용해 간단히 표현
    function App() {
      const name = '뤼왝트';
      return <div>{name === '리액트' && <h1>리액트입니다.</h1>}</div>;
    }
    ```
    
    - `undefined` 렌더링 x,  JSX내부에서는 렌더링해도 괜찮다.
    
    ```jsx
    function App() {
    	const name = undefined;
    	return name;
    }
    //App(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.
    // or 연산자 활용해 오류 방지
    function App() {
    	const name = undefined;
    	return name || '값이 undefined입니다.';
    }
    //JSX내부에서는 undefined 렌더링 상관 없다.
    function App() {
    	const name = undefined;
    	return <div>{name}</div>;
    } //오류 발생하지 않는다.
    ```
    
    - cameCase활용, class 대신 className으로 작성
    - 단일 태그도 무조건 닫기 `<input></input>` , `<input />`
    - 주석 사용시 `{/* ~~~ */}` , 시작 태그를 여러 줄로 작성시 `//~` 가능
    
    ```jsx
    {/* 주석은 이렇게 작성한다. */}
    // 이렇게도 작성은 가능하긴합니다.
    ```
    

---

## Tailwind CSS

- `utility(클래스)`로 이루어진 CSS프레임워크
- 유틸리티 클래스 → 딱 한 가지 일만 하는 CSS코드를 담고있는 클래스
- .css 파일 따로 작성하지 않고 HTML파일을 벗어나지 않으며 스타일링 가능하다.
- 디자인 시스템에서 정의한 네이밍을 사용하기 위해 컴포넌트 내에 어떤 코드도 추가할 필요가 없다.
- 사용예시

[[https://tailwindcss.com/docs/utility-first](https://tailwindcss.com/docs/utility-first)](https://github.com/COW-edu/COW-React-1/assets/127816010/b189993a-d605-440f-8c84-056a2299a054)

[https://tailwindcss.com/docs/utility-first](https://tailwindcss.com/docs/utility-first)

```html
<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
  <div class="shrink-0">
    <img class="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo">
  </div>
  <div>
    <div class="text-xl font-medium text-black">ChitChat</div>
    <p class="text-slate-500">You have a new message!</p>
  </div>
</div>
```

- flexbox → `flex` , padding → `shrink-0` max-width → `max-w-sm`, margin → `mx-auto`

### Tailwind 사용 팁

- Arbitrary values 줄이기
    - `arbitary value` : 정해진 값 이외의 값을 입력해야 하는 경우 대괄호로 감싸서 임의값을 입력하도록 하는 기능

```html
<div className="p-[8px] h-[35px] text-[12px] rounded-[5px]">
```

- 이 때 줄 길어져서 복잡한데 이를 커스터마이징 가능하다.

```jsx
// tailwind.config.js
const px0_10 = { ...Array.from(Array(11)).map((_, i) => `${i}px`) };
const px0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) };
const px0_200 = { ...Array.from(Array(201)).map((_, i) => `${i}px`) };

module.exports = {
  theme: {
    extend: {
      borderWidth: px0_10,
      fontSize: px0_100,
      lineHeight: px0_100,
      minWidth: px0_200,
      minHeight: px0_200,
      spacing: px0_200,
      ...
    }
  }
}
//html
<div className="p-8 h-35 text-12 border-2 rounded-5">
```

> [https://velog.io/@juno7803/React가-태어난-배경](https://velog.io/@juno7803/React%EA%B0%80-%ED%83%9C%EC%96%B4%EB%82%9C-%EB%B0%B0%EA%B2%BD)
[https://ko.legacy.reactjs.org/docs/jsx-in-depth.html](https://ko.legacy.reactjs.org/docs/jsx-in-depth.html)
[https://velog.io/@tchaikovsky/useEffect-자세히-이해하기-4-React의-작동-원리](https://velog.io/@tchaikovsky/useEffect-%EC%9E%90%EC%84%B8%ED%9E%88-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-4-React%EC%9D%98-%EC%9E%91%EB%8F%99-%EC%9B%90%EB%A6%AC)
<리액트를 다루는 기술> - 김민준
> 

> [https://fe-developers.kakaoent.com/2022/220303-tailwind-tips/](https://fe-developers.kakaoent.com/2022/220303-tailwind-tips/)
[https://fe-developers.kakaoent.com/2022/221013-tailwind-and-design-system/](https://fe-developers.kakaoent.com/2022/221013-tailwind-and-design-system/)
[https://tailwindcss.com/docs/utility-first](https://tailwindcss.com/docs/utility-first)
>