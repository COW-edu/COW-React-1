# React 동작방식 및 JSX, tailwind

작성일시: 2023년 8월 1일 오후 2:46
복습: No

# React 동작 방식

## 컴포넌트

```jsx
import React from 'react';

function MyComponent(props) {
	return <div>Hello, {props.name}</div>;
}

export default MyComponent; // 컴포넌트 예시입니다
```

- 리액트는 화면에서 UI 요소를 구분할 때 컴포넌트 단위를 사용한다.
- 컴포넌트는 데이터(props)를 입력받아 상태에 따라 DOM Node를 출력하는 함수이다
- 컴포넌트의 이름은 항상 대문자로 시작한다
- UI를 재사용 가능한 개별적인 여러 조각으로 나누고, 각 조각을 개별적으로 나누어 코딩한다.

## VDOM

- 가상 DOM이란 실제 DOM의 구조를 분석하여 메모리에 저장하고 관리하는 객체이다.
- 렌더링마다 새로운 가상 DOM 을 생성하여 이전의 가상 DOM과 비교하여 렌더링을 결정한다.

## 리액트 UI 업데이트 단계

- Render Phase
    - 리액트는 렌더링 할 때마다 매번 새로운 가상 DOM을 생성
    - 이전 가상 DOM과 비교하여 바뀐 부분 탐색
    - 실제 DOM 에 반영할 부분 결정
- Commit Phase
    - 렌더 단계를 거쳐 바꾸기로 결정된 부분만 실제 DOM 에 반영
    - 브라우저는 변경된 실제 DOM을 화면에 pain 한다
- 위의 과정을 재조정(Reconcilation)이라고 부른다.

## 리액트 Diffing Algorithm

- 리액트의 Render 함수는 jsx 문법에 맞는 React Element를 반환한다.
- 이때 상태가 변하거나 프로퍼티가 변해서 DOM을 업데이트해야 하는 경우 변경된 부분만 감지해서 바뀐 부분만 업데이트한다.
- 이 변경된 부분을 감지하는 방법을  Diffing Alogrithm이라 한다.

### Element의 타입이 다른 경우

- 두 루트 엘리먼트의 타입이 다르면, React는 이전 트리를 버리고 완전히 새로운 트리를 구축한다.
- 트리를 버릴 때 이전 DOM 노드들은 모두 파괴된다.
- 루트 엘리먼트 아래의 모든 컴포넌트도 언마운트되고 state도 사라진다.

### DOM Element 타입이 같은 경우

- 같은 타입의 두 React DOM 엘리먼트를 비교할 때, React는 두 Element의 속성을 확인한다.
- 동일한 내역은 유지하고 변경된 속성들만 갱신한다.

```jsx
<div className="before" title="stuff" />

<div className="after" title="stuff" />
```

- 이러한 경우 React는 현재 DOM 노드 상에 className만수정한다.

### 자식에 대한 재귀적 처리

- DOM 노드의 자식들을 재귀적으로 처리할 때 , React는 기본적으로 동시에 두 리스트를 순회하고 차이점이 있으면 변경을 생성한다.

```jsx
<ul>
  <li>first</li>
  <li>second</li>
</ul>

<ul>
  <li>first</li>
  <li>second</li>
  <li>third</li>
</ul>
```

- 위의 경우 React는 두 트리에서 첫번째, 두번째 li가 일치하는것을 확인하고 마지막 li를 트리에 추가한다.

```jsx
<ul>
  <li>Duke</li>
  <li>Villanova</li>
</ul>

<ul>
  <li>Connecticut</li>
  <li>Duke</li>
  <li>Villanova</li>
</ul>
```

- 반면 아래의 경우 첫번째 li 부터 일치하지 않기에 모든 자식을 변경하여 성능 비효율 문제를 야기한다.

### Key

- 아래 문제를 해결하기 위해 React는 key 속성을 제공한다
- 자식들이 key를 가지고 있다면, React는 key를 통해 기존 트리와 이후 트리의 자식들이 일치하는지 확인한다.

```jsx
**<ul>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>

<ul>
  <li key="2014">Connecticut</li>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>**
```

- key를 통해 비효율 문제를 해결할 수 있다.

# JSX

- JSX는 JS를 확장한 문법이다.
- 브라우저에서 실행되기 전에 코드가 번들링되는 과정에서 바벨을 사용하여 일반 JS 형태의 코드로 변환된다.
- JSX를 통해 리엑트 엘리먼트를 생성할 수 있다.

```jsx
const name = '정승연';
const element = <h1>{name}</h1>;
```

- JSX의 중괄호 안에는 JS의 표현식을 넣을 수 있다.

```jsx
// 잘못된 코드
function App(){
	return(
    	<h1>Hello</h1>
        <h2>Is it working well?</h2>
    )
}

// 올바른 코드
function App(){
	return(
    	<div> // 반드시 부모 요소로 감싸야
          <h1>Hello</h1>
          <h2>Is it working well?</h2>
        </div>
    )
}

export default App;
```

- 컴포넌트에 요소가 있다면 반드시 부모 요소로 감싸야 한다.

# Tailwind

- Utility-First를 지향하는 CSS 프레임워크이다
- Utility-First는 미리 세팅된 유틸리티 클래스를 활용하여 HTML 코드 내에서 스타일링하는 방법이다
- CSS 각 속성들을 클래스에서 직관적으로 표현하여 효율적으로 사용할 수 있다.

## 장점

- CSS 작성 시 클래스의 이름을 고민하지 않아도 된다.
- 반응형 페이지를 비교적 쉽게 구현할 수 있다.
- 커스터마이징이 가능하다.

## 단점

- 코드의 가시성이 떨어져 유지보수가 쉽지 않다.
- CSS 속성들의 우선순위 문제가 존재한다.

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
//예시
```