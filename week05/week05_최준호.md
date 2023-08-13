# [5주차] 상태와 props (props Drilling)

## 상태(State)

- 컴포넌트 내부에서 변경할 수 있는 데이터
- onClick, onChange 등 이벤트에 의해 변경되는 동적인 값이다.
- `Functional Component`에서는 `useState`라는 hook을 사용하여 상태관리를 할 수 있다.
    - `useState` import
    - useState호출 → [ ] 안에 상태 저장 변수, 상태 변경 함수 선언, useState( 초기값 )

```jsx
import react, { useState } from 'react'

function Example() {
	const [isChecked, setIsChecked] = useState(false);
	//isChecked : 상태 저장 변수, setIsChecked : 상태 변경 함수, false : 상태 초기값

	const checkedHandler = (e) => {
		setIsChecked(e.target.checked);
	}
	// checkbox 이벤트 핸들러를 통해 isChecked의 상태를 변경한다

	return (
		<div>
			<input type='checkbox' checked={isChecked} onChange={checkedHandler} />
			<span>{isChecked ? 'true' : 'false'}</span>
		</div>
	)
}
```

- state 값 변경시 state값을 직접 수정하면 안된다. → 상태 변경 함수를 통해 수정한다.
- state 값이 객체나 배열인 경우 불변성(immutability)을 지키기 위해 새로운 객체를 만들어 덮는 방식으로 state 값을 변경해야한다.
    - 렌더링 과정에서 기존 state값과 변경된 state값을 비교 판단하는데 이때 불변성이 지켜지지 않는다면 객체나 배열이 변경되었다하여도 React에서 이를 감지하지 못하기 때문이다.
    - spread연산자 `...` 을 통해서 기존 객체를 복사하고 값 업데이트 후 상태 변경함수를 통해 수정
    
    ```jsx
    const [card, setCard] = useState({brand : "givenchy", item : "wallet"})
    
    //변경할 때
    const copy = {...card};
    copy.brand = "gucci";
    setCard(copy);
    ```
    
- state 변수 값은 렌더링 내에서 절대 변경되지 않는다. → useState 호출시 해당 렌더링에 대한 스냅샷 제공 → 이벤트 핸들러 내에서 state값을 고정으로 유지하기에 최신 state를 읽기위해선 업데이터 함수( `updater function` ) 사용해야한다.

```jsx
const [number, setNumber] = useState(0);
...
		<h1> { number } </h1>
		<button onClick = { () => {
			setNumber(number + 1);
			setNumber(number + 1);
		}}>+2</button>
//버튼 1번 클릭시 number !== 2, number === 1이다. => 렌더링 과정에서 0+1, 0+1이 두 번 반복임
		<h1> { number } </h1>
		<button onClick = { () => {
			setNumber(n => n+1);
			setNumber(n => n+1);
		}}>+2</button>
// 버튼 1번 클릭시 number === 2 업데이터 함수를 사용했기에
```

## props

- 자식 컴포넌트에게 정보를 전달할 때 부모 컴포넌트에서 props를 사용하여 전달한다.

```jsx
function Parents() {
	return(
		<Child brand = 'givenchy', item = 'wallet' />
	)
}

function Child(props) {
	let brand = props.brand;
	let item = props.item;
... }
// 동일하게 props전달받기
function Child( { brand, item } ) {
```

- props는 변경할 수 없다. → state 설정을 통해 상호작용한다.
- 자식 → 부모 또는 자식 → 다른 자식으로의 전달은 불가능하다.
- `Props Drilling` : props 전달 외에 다른 이용 가치가 없는 컴포넌트를 통해 데이터를 전달하는 과정

```jsx
function App() {
	return(
		<FirstComponent brand = 'givenchy' />
	) 
}
function FirstComponent( {brand} ) {
	return(
		<>
			<h1>FirstComponent</h1>
			<SecondComponent brand = {brand} /> //Props Drilling
		</>
	)
}

function SecondComponent( {brand} ) {
	return(
		<>
			<h2>SecondComponent</h2>
			<FinalComponent brand = {brand} /> //Props Drilling
		</>
	)
}
function FinalComponent( {brand} ) {
	return(
		<h3>{brand}</h3>
	)
}
```

## React에서의 상태 관리

### Local State - 지역 상태

- 특정 컴포넌트 내에서만 데이터를 관리하는 것
- React Hook & props를 사용하여 상태관리하는 방법
- 컴포넌트 개수가 많아지고 공유해야하는 state가 늘어나면 과도한 Props Drilling이 일어나며 매번 전달과정을 작성하는 비효율적인 과정이 발생한다는 단점, 코드 읽고 고치는 과정에서 props 추적이 힘들어진다는 단점 존재한다.
    - 전역 상태관리 라이브러리 사용을 통해 해결하는 방법
    - Children을 사용해 해결하는 방법

### Global State - 전역 상태

- 상태를 전역에서 관리하기에 어디서든 값 변경하고 적용이 가능하다.
- 유지보수가 간편해지는 장점이있지만 사이드 이펙트가 커지는 단점도 있다.
- Redux, Context API, Recoil 등의 도구를 통해 관리한다.

> [https://velog.io/@ykh0316/ReactState상태-란](https://velog.io/@ykh0316/ReactState%EC%83%81%ED%83%9C-%EB%9E%80)
[http://www.tcpschool.com/react/react_data_state](http://www.tcpschool.com/react/react_data_state)
[https://ko.react.dev/learn/queueing-a-series-of-state-updates](https://ko.react.dev/learn/queueing-a-series-of-state-updates)
[https://javascript.plainenglish.io/how-to-avoid-prop-drilling-in-react-using-component-composition-c42adfcdde1b](https://javascript.plainenglish.io/how-to-avoid-prop-drilling-in-react-using-component-composition-c42adfcdde1b)
>
