## 1. React 동작방식

React의 3가지 구성 요소인 virtualDOM, JSX, Component를 통해 간단하게 설명해보려고 한다.

### 1. JSX와 Component 정의

React에서 UI를 구성하기 위해 JSX를 사용한다. JSX는 js의 확장 문법으로 XML과 비슷하게 생겼지만, 실제로는 Babel에 의해 js 코드로 변환된다. 아래 코드에서 'App'은 함수형 Component로 JSX를 반환하는 함수이다. JSX에서는 `<div></div>`와 같은 HTML 태그를 사용하여 UI 구조를 표현한다.

```
import React from 'react';

const App = () => {
  return (
    <div>
      <h1>Hello, React!</h1>
      <p>예시입니다!</p>
    </div>
  );
};

export default App;
```

<br>

### 2. Component tree 생성

React가 실행이 되면 Root Component부터 시작하여 Component tree를 생성한다. Component tree는 Component들의 계층 구조를 나타내고, 이 구조를 바탕으로 전체적인 UI를 구성한다.

<br>

### 3. virtualDOM 생성

JSX 코드는 virtualDOM 요소로 변환된다. virtualDOM은 실제 DOM과 유사하지만, 메모리에 존재하는 가벼운 가상의 DOM 구조이다. virtualDOM은 실제 DOM과 동기화되지 않으며, 실제 DOM에 바로 적용되지 않는다.

<br>

### 4. 초기 렌더링

'RenderDOM.render()'함수를 사용하여 Component tree를 virtualDOM으로 렌더링한다. 이때, Component의 'render()'함수가 호출되고, JSX 코드가 virtualDOM으로 변환된다. 생성된 virtualDOM은 메모리에 존재하는 상태이므로 화면에 직접적으로 보이지 않는다.

<br>

### 5. Diffing 과정

Diffing 과정이란 상태가 변경되거나, Component가 업데이트되어 다시 렌더링될 때 이전의 virtualDOM과 변경된 이후의 virtualDOM을 비교하는 과정을 의미한다. Diffing 과정을 통해 React는 변경된 부분을 식별한다.

<br>

### 6. 변경사항 식별 후 실제 DOM 업데이트

![](https://velog.velcdn.com/images/junnkyuu/post/3660b6d6-4b50-41cd-86bb-c2c38b15403d/image.png)

virtualDOM 비교를 통해 변경된 부분이 식별되면, 해당 변경사항을 실제 DOM에 적용해야 한다. 이전 virtualDOM과 비교된 변경사항만을 실제 DOM에 적용하여 화면에 반영한다. 이때, 변경된 부분만을 업데이트하므로, 전체 화면을 다시 그릴 필요가 없어서 성능이 향상된다.

만약 변경된 부분이 여러 개가 있다면 Diffing 과정 이후 변경된 부분을 한 번에 반영하는 Batch Update 과정을 통해서 효율적으로 실제 DOM에 업데이트한다.

<br>

### 7. Component LiftCycle

Component Lifecycle을 메서드를 통해 Component의 생성, 업데이트, 소멸과 관련된 작업을 수행할 수 있다. Lifecycle 메서드는 Component의 생명 주기에 따라 호출되는 함수들을 말한다. 대표적으로 Component가 렌더링된 후에 호출되는 'componentDidMount()', 업데이트가 완료된 후 호출되는 'componentDidUpdate()', 제거되기 전에 호출되는 'componentWillUnmount()'가 있다.

<br>

### 8. 상태 변경 시 재렌더링

Component의 상태나 속성이 변경되면, 해당 Component와 이에 영향을 받는 하위 Component들이 다시 렌더링된다. 이때, 위의 4번 ~ 7번 과정이 반복되고 변경된 부분만을 업데이트하여 성능을 최적화한다.

---

<br>

## 2. JSX

### JSX?

JSX는 'Javascript XML'의 줄임말로 XML 구문에 js 코드를 결합하는 용도로 만들어진 구문이다. JSX는 React.createElement 호출 코드를 간결하게 하려고 고안한 것으로, js 언어를 확장하는 방식으로 구현되었다.

여기서 'js 언어를 확장한다'는 의미는 표준 ESNext js나 ts 문법 자체에는 jsx 구문이 없다는 의미이다. React를 만든 페이스북은 마치 jsx 구문이 표준 js 문법에 포함되어 있는 것처럼 동작하도록 설계했다.

따라서 React 코드 작성자는 복잡한 React.createElement 호출 코드를 여러 번 작성하는 대신 훨씬 간결한 JSX 코드만 작성하면 되므로 개발 생상성이 크게 향상되었다.

<br>

### JSX의 기본 규칙

JSX는 React에서 UI를 정의할 때 사용하는 문법이다. 얼핏보면 HTML 같이 생겼지만 실제로는 js이다.

    return <div>Hello!</div>;

React Component 파일에서 XML 형태로 코드를 작성하면 Babel이 JSX를 js로 변환해준다. JSX가 js로 올바르게 변환이 되려면 지켜야할 규칙이 존재한다.

<br>

#### 1. 태그는 꼭 닫아주어야 한다.

```
import React from 'react';
import Hello from './Hello';

function App() {
	return (
    	<div>
  			<Hello />
  			<Hello />
  			<Hello />
  			<div>
  		</div>
  	);
}

export default App;
```

위의 코드와 같이 태그를 닫지않으면 오류가 발생한다. 태그를 열었으면 `<div></div>`와 같이 닫아주어야 한다.

![](https://velog.velcdn.com/images/junnkyuu/post/9f3dfd35-3ceb-42b3-906e-9ee98e74dffa/image.png)

<br>

#### 2. 태그는 꼭 감싸져야 한다.

두 개 이상의 태그는 무조건 하나의 태그로 감싸져있어야 한다.

```
import React from 'react';
import Hello from './Hello';

function App() {
  return (
    <Hello />
    <div>Bye!</div>
  );
}

export default App;
```

두 개 이상의 태그가 있는데 감싸져있지 않으면 아래와 같은 오류가 발생하게 된다.

![](https://velog.velcdn.com/images/junnkyuu/post/2b3874ca-5918-40ea-bdaf-e1bd7a1d2800/image.png)

<br>

이를 해결하려면 하나의 태그로 감싸주면 된다.

```
import React from 'react';
import Hello from './Hello';

function App() {
  return (
    <div>
      <Hello />
      <div>Bye!</div>
    </div>
  );
}

export default App;
```

하지만 불필요한 `<div></div>`로 감싸는 경우 코드가 복잡해지는 경우도 있으므로 아래와 같이 React의 Fragment를 사용하는 것이 좋을 때도 있다.

```
import React from 'react';
import Hello from './Hello';

function App() {
  return (
    <>
      <Hello />
      <div>Bye!</div>
    </>
  );
}

export default App;
```

태그를 작성할 때 이름 없이 작성을 하게 되면 Fragment라는 것이 만들어지는데 브라우저 상에서 따로 별도의 요소로 나타나지 않는다.

<br>

### JSX안에 js 값 사용

JSX 안에 js 변수를 사용해야할 때는 {}으로 감싸서 사용한다.

```
import React from 'react';
import Hello from './Hello';

function App() {
  const name = 'Jun';
  return (
    <>
      <Hello />
      <div>{name}</div>
    </>
  );
}

export default App;
```

<br>

CSS class를 사용할 때는 class가 아닌 className을 사용한다.

```
// App.css
.blue-box {
	background-color: 'blue';
    width: 60px;
    height: 60px;
}
```

```
import React from 'react';
import Hello from './Hello';

function App() {
  const name = 'Jun';
  return (
    <>
      <Hello />
      <div>{name}</div>
      <div className='blue-box'></div>
    </>
  );
}

export default App;
```

<br>

### style, className 사용

JSX에서 태그에 style과 CSS class를 설정하는 방식은 HTML과 비슷하지만 다르다. inline style은 객체 형태로 작성을 해야하고, background-color처럼 -으로 구분되어 있는 이름들은 backgroundColor처럼 CamelCase로 사용해야 한다.

```
import React from 'react';
import Hello from './Hello';

function App() {
  const name = 'Jun';
  const style = {
    backgroundColor: 'blue',
    color: 'black',
    fontSize: 24px,
    padding: '10px'
  }

  return (
    <>
      <Hello />
      <div style={style}>{name}</div>
    </>
  );
}

export default App;
```

---

<br>

## 3. Tailwind CSS

![](https://velog.velcdn.com/images/junnkyuu/post/146ee561-d9a2-4fa0-8e78-89c7b0623ef7/image.png)

### Tailwind?

Tailwind는 Bootstrap과 같이 인기있는 CSS 프레임워크 중 하나이다. Tailwind는 기존의 CSS 프레임워크들과 다르게 디자인의 커스터마이징이 편하다. Tailwind는 Utility-First 컨셉을 가진 CSS 프레임워크이다. Bootstrap과 비슷하게 미리 세팅된 utility class를 사용하는 방식으로 HTML 코드 내에서 스타일링을 할 수 있다. [공식문서](https://tailwindcss.com/)에 나와있는 예시를 통해 Tailwind의 장점을 보여주려고 한다.

#### Tailwind 예시

CSS를 적용하기 위해서는 아래와 같이 class를 지정해야 했다.

```
<div class="chat-notification">
  <div class="chat-notification-logo-wrapper">
    <img class="chat-notification-logo" src="/img/logo.svg" alt="ChitChat Logo">
  </div>
  <div class="chat-notification-content">
    <h4 class="chat-notification-title">ChitChat</h4>
    <p class="chat-notification-message">You have a new message!</p>
  </div>
</div>
<style>
  .chat-notification {
    display: flex;
    max-width: 24rem;
    margin: 0 auto;
    padding: 1.5rem;
    border-radius: 0.5rem;
    background-color: #fff;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
  .chat-notification-logo-wrapper {
    flex-shrink: 0;
  }
  .chat-notification-logo {
    height: 3rem;
    width: 3rem;
  }
  .chat-notification-content {
    margin-left: 1.5rem;
    padding-top: 0.25rem;
  }
  .chat-notification-title {
    color: #1a202c;
    font-size: 1.25rem;
    line-height: 1.25;
  }
  .chat-notification-message {
    color: #718096;
    font-size: 1rem;
    line-height: 1.5;
  }
</style>
```

그러나 tailwind를 사용하면 길었던 코드를 미리 지정되어 있는 class를 사용해서 코드 길이를 확 줄일 수 있다. 그러나 단점은 class 이름이 많아서 가독성이 떨어진다는 점이다. 가독성이 떨어지는 문제는 @apply를 통해 해결할 수 있다.

```
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

<br>

#### Tailwind의 장점

- 쉽고 빠른 디자인 개발: 미리 지정된 utility class를 사용하므로 화면 분할을 해서 CSS, HTML을 왔다갔다 하고, 필요한 CSS 코드를 찾을 필요가 없다.
- 일관된 디자인: 미리 지정된 utility class를 사용하므로 일관된 스타일링이 가능하다.
- 자유로운 커스터마이징: 다른 CSS 프레임워크들에 비해 기본 스타일 값을 쉽게 커스터마이징이 가능하다.
- 로우 레벨의 스타일 제공: CSS 각 요소 수준의 utility class를 제공하기 때문에 세밀하게 원하는 디자인을 구현할 수 있다.
- Intelli Sense 플러그인 제공: 로우 레벨의 스타일을 제공한다는 것은 그만큼의 학습이 필요하다는 것을 의마한다. 이 문제를 해결하기 위해 Intelli Sense 플러그인을 제공한다. 자동완성 및 미리보기와 같은 기능을 기원하기 때문에 쉽게 익혀서 사용할 수 있다.

#### Tailwind의 단점

- 가독성이 떨어짐: 위의 장점들을 모두 상쇄하는 가장 큰 단점이다. 위의 코드를 보면 직관적이라고 할 수 있겠지만 가독성이 떨어지는 것은 분명한 사실이다.
- class 이름을 익혀야 사용가능: class 이름을 알아야 사용이 가능하기 때문에 초반에는 각 스타일의 class 이름을 익히느라 시간이 오래 걸린다. 그러나 이 단점은 기존의 css 속성과 비슷하고 Intelli Sense 플러그인이 자동완성을 도와주므로 금방 익숙해진다.

---

<br>

### 설치 및 사용법

설치 방법은 [Tailwind 공식문서](https://tailwindcss.com/)에 자세하게 나와있으므로 사용할 프레임워크에 따라 설치 가이드를 보고 쉽게 프로젝트에 적용시킬 수 있다.

Tailwind를 사용하는 방법은 html 태그에는 class, React에는 className에 원하는 속성을 적어주면 된다.

```
// html 가운데 정렬
<div class='flex justify-center items-center'>
	<h1>Tailwind 사용예시!</h1>
</div>
```

스타일링에 필요한 다양한 class 이름들은 [Tailwind 공식문서](https://tailwindcss.com/)에 자세하게 나와있으니 참고하면 된다.

<br>

### 가독성 문제 해결을 위한 @apply

위에서 설명했듯이 가장 큰 단점은 가독성이 떨어진다는 점이다. tailwind는 이 문제를 해결하기 위해서 @apply를 지원한다. @apply를 사용해서 긴 class 이름을 짧게 줄일 수 있다.

```
<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg
flex items-center space-x-4">
...
</div>
```

<br>

위 코드를 아래와 같이 @apply를 사용해서 class 이름을 줄일 수 있다.

```
.container {
	@apply p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4;
}
```

---

<br>

#### 참고 및 출처

- [벨로퍼트 모던리액트](https://react.vlpt.us/)
- [Tailwind 공식문서](https://tailwindcss.com/)
