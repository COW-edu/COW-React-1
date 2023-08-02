# React 동작방식 및 JSX

### 리엑트란?

> 상태값이 변경될 때마다 UI 를 자동으로 업데이트해주는 JS 라이브러리
> 

1. 리액트는 **컴포넌트의 상태값이 변경되면 UI를 자동 업데이트** 해주는 라이브러리다.
- 즉, state, props, redux store 등의 상태값이 변경되면,
- 리액트가 해당 컴포넌트 함수를 자동으로 재호출하여 재렌더링 해준다.

1. 이 때, 가상DOM(Virtual DOM)을 통해 변경된 부분의 UI만 효율적으로 업데이트한다.
- 가상DOM은 실제DOM을 분석하여 만든 Javascrip 객체이다.
- 컴포넌트의 상태값이 변경되면, 새로운 가상DOM 객체를 만들고, 이전 가상DOM 객체와 비교한다.
- 최종적으로 바뀐 부분이 있을 경우, 해당 부분만 실제 DOM에 반영하여 UI를 업데이트 한다.

### Virtual DOM

- DOM을 직접조작하는 것은 규모가 있는 웹, 앱의 경우 코드의 복잡도가 매우 높아지게 된다. 또한, 상태가 변할 때마다 매번 재 계산돼서 그려주기 때문에 브라우저 성능 문제도 생기게 된다. 이러한 문제 때문에 **Virtual DOM**이 나오게 되었다.

### React의 렌더링 과정

1. 먼저 도메인 주소(Ex.[https:](https://velog.io/@juno7803)~~~)에 접속합니다.
2. 이 주소는 **Domain 주소**에 해당하므로 위의 **DNS 서버**로 가서 실제 주소에 요청을 보냅니다.(서버에 요청을 보냅니다.)
3. 서버가 클라이언트에게 응답으로 index.html과 App.js 를 보내게 됩니다. (이때 React는 **SPA** 즉 Single Page Application이므로 index.html은 단 하나만 존재합니다.)
4. 서버로 부터 받아온 파일들로 Render Tree를 구성하고, 이를 바탕으로 실제 화면에 렌더링 합니다.

![Untitled (3)](https://github.com/COW-edu/COW-React-1/assets/98771235/e16fc04f-50f0-4804-bb66-e5518efe4e0d)


**DNS서버** 

 -사람이 읽을 수 있는 도메인 이름을 IP 주소로 변환할 수 있게 해주는 인터넷의 핵심 구성 요소

### **React의 리렌더링되는 경우**

**리렌더링** 

-렌더링을 다시 한다는 뜻으로, 바뀐 상태나 속성 값으로 화면을 그린다는 것이다. 


1. Props가 변경되었을 때

- `Props`는 컴포넌트에 값을 전달해줄 때 사용한다. 넘겨줄 수 있는 값은 변수, 배열, 객체, 함수 등 자바스크립트 요소 모두 가능하다.
- 단, props는 `읽기전용`으로 값이 변경되어서는 안 된다. props의 값을 변경하고 싶다면, props를 직접적으로 변경하는 것이 아닌 새로운 변수를 선언하여 사용한다. 또한, 데이터는 부모요소에서 자식요소로만 전달이 가능하다.



2. State가 변경되었을 때

- `State`는 컴포넌트의 현재 저장된 값이며, 변할 수 있는 값이다. 리액트는 값이 변경된 부분을 인지하고 그 부분만 재렌더링한다.

3. forceUpdate() 를 실행하였을 때.

- forceUpdate() 함수로 화면을 새로고침하면 render() 함수를 호출해 변경된 내용을 화면에 출력할 수 있다.

4. 부모 컴포넌트가 렌더링되었을 때

- 부모 컴포넌트가 리렌더링되면 자식 컴포넌트들도 리렌더링됨
- 자식 컴포넌트란 부모 컴포넌트의 JSX 안에서 사용된 모든 컴포넌트들
- 형제 관계인 컴포넌트들끼리는 서로 리렌더링에 영향을 미치지 않음

!![Untitled (4)](https://github.com/COW-edu/COW-React-1/assets/98771235/1ab16ccb-5ce7-4fbd-a323-f2533d953e84)

React는 상태나 속성 값이 변하게 되면 리렌더링 이라는 과정을 통해서 화면에서의 값을 갱신한다. 

또 값이 변할 때 화면의 깜빡임 없이 빠른 속도로 값을 변경 시키는데, 그 이유가 바로 Virtual DOM에 있다. 

만약 상태나 속성값이 변경되면, 변경된 값으로 React는 가상의 돔을 그리게 된다. 그린 **Virtual DOM**과 **Real DOM**을 비교하여 변경된 사항만 반영하여 해당 내용을 실제 돔에서 수정한 이후 새로운 화면을 렌더링 하게 된다. 

![Untitled (5)](https://github.com/COW-edu/COW-React-1/assets/98771235/09167bd5-10a2-4c32-b66b-ab34c2429cb2)
---

### JSX

> JSX(JavaScript XML)는 Javascript에 XML을 추가한 확장한 문법이다.
> 

- React “엘리먼트(element)” 를 생성한다.
- 리액트 컴포넌트 파일에서 XML형태로 코드를 작성하면 [babel](https://bit.ly/2wMpkk2)이 JSX를 JavaScript로 변환을 해준다.

### **React Element**

> **type**과 **props**를 가지는 **React만의 객체다**.
> 
- React.creatElement()를 이용해 만들 수 있으며, type으로 HTML 태그 이름을 가지고, 그 이외의 특징을 props로 관리하는 **객체 형태**로 정의된다.

```jsx
*// createElement를 이용해서 React Element 만들기*

React.createElement(
  'div',
  { className: 'name' },
  'React'
)

*// 위와 같은 의미 (JSX 문법)*

<div className='name'>React</div>

*// createElement를 이용해서 만들어진 React Element 객체*

{
  type: 'div',
  props: {
    className: 'name',
    children: 'React'
  }
}
```

위와 같은 createElement()라는 함수를 사용하기가 어렵고, 직관적이지도 않다. 

따라서 **JSX 문법**을 사용해 보통 위의 객체를 DOM 형태

(```<div className='name'>React</div>```)로 정의하여 사용한다. 

### **JSX 문법**

**1. 반드시 부모 요소 하나가 감싸는 형태여야 한다.**

Virtual DOM에서 컴포넌트 변화를 감지할 때 때 효율적으로 비교할 수 있도록 컴포넌트 내부는 하나의 DOM 트리 구조로 이루어져야 한다는 규칙이 있기 때문이다.

```js
function App(){
return(
        <h1>테스트1</h1>
        <h2>테스트2</h2>
    )
}
```

**2. 자바스크립트 표현식**

JSX 안에서도 자바스크립트 표현식을 사용할 수 있다. 자바스크립트 표현식을 작성하려면 JSX내부에서 코드를 { }로 감싸주면 된다.

- 유효한 모든 JavaScript 표현식을 넣을 수 있다.

```jsx
function App() {
	const name = 'GodDaeHee';
	return (
		<div>
			<div>Hello</div>
			<div>{name}!</div>
		</div>
	);
}
```

**3. if문(for문) 대신 삼항 연산자(조건부 연산자) 사용**

- if 구문과 for 루프는 JavaScript 표현식이 아니기 때문에 JSX 내부 자바스크립트 표현식에서는 사용할 수 없다.
- 그렇기 때문에 조건부에 따라 다른 렌더링 시 JSX 주변 코드에서 if문을 사용하거나, {}안에서 삼항 연산자(조건부 연산자)를 사용 한다.

```jsx
function App() {
	let desc = '';
	const loginYn = 'Y';
	if(loginYn === 'Y') {
		desc = <div>GodDaeHee 입니다.</div>;
	} else {
		desc = <div>비회원 입니다.</div>;
	}
	return (
		<>
			{desc}
		</>
	);
}
```

**4. React DOM은 HTML 어트리뷰트 이름 대신 camelCase 프로퍼티 명명 규칙을 사용 한다.**

1) JSX 스타일링

- JSX에서 자바스크립트 문법을 쓰려면 {}를 써야 하기 때문에, 스타일을 적용할 때에도 객체 형태로 넣어 주어야 한다.

- 카멜 표기법으로 작성해야 한다. (font-size => fontSize)

ex) css style

```jsx
functionApp() {
const style = {
		backgroundColor: 'green',
		fontSize: '12px'
	}
return (
		<div style={style}>Hello, GodDaeHee!</div>
	);
}
```

2) class 대신 className

- 일반 HTML에서 CSS 클래스를 사용할 때에는 class 라는 속성을 사용한다.

- JSX에서는 class가 아닌 className 을 사용한다.

ex) className

```jsx
functionApp() {
const style = {
		backgroundColor: 'green',
		fontSize: '12px'
	}
return (
		<div className="testClass">Hello, GodDaeHee!</div>
	);
}
```


3)JSX 내에서 주석 사용 방법

- JSX 내에서 {/*…*/} 와 같은 형식을 사용 한다.

ex)

```jsx
functionApp() {
return (
		<>
			{/* 주석사용방법 */}
			<div>Hello, GodDaeHee!</div>
		</>
	);
}
```

- 시작태그를 여러줄 작성시에는, 내부에서 // 의 형식을 사용할 수 있다.

```jsx
functionApp() {
return (
		<>
			<div
			// 주석사용방법
			>Hello, GodDaeHee!</div>
		</>
	);
}
```

- JSX를 작성하기만 하면, 리액트 엔진은 JSX를 기존 자바스크립트로 해석하여 준다.

→ 이를 '선언형 화면' 기술이라고 한다. 

---

### tailwind

> 미리 세팅된 유틸리티 클래스를 활용하여 HTML 코드 내에서 스타일링을 지향하는 CSS 프레임 워크다.
> 

코드예시 

```jsx
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

장점 

- 반복되는 스타일은 컴포넌트 추상화, 클래스 추상화를 통해서 재사용 가능
- 공식문서가 매우 친절하다
- 클래스의 이름을 고민하지 않아도 된다
- 쉽게 반응형 페이지를 구현할 수 있도록 지원한다

단점 

- 코드의 직관성은 좋으나 가시성은 떨어진다
- CSS 속성들의 우선순위 문제

    Tailwind CSS는 클래스가 출현한 빈도 / 출현한 순서에 상관없이 정의한 순서에 따라 스타일을 구성한다 

- 특정 프리픽스는 모든 CSS 속성을 지원하지 않는다

    `hover:` / `focus:` 등 특정 프리픽스는 일부 속성만 사용 가능하다

    모든 속성을 지원하기 위해서는 커스터마이징을 통해 추가 설정을 넣어주면 된다