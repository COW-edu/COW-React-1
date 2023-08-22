![](https://velog.velcdn.com/images/junnkyuu/post/9ffa5461-5e46-41bc-b7cd-13a8a99e188d/image.png)

## 2. React hook(심화)

### useRef

useRef는 함수형 컴포넌트 안에서 DOM 요소 혹은 변수를 저장하고 관리할 수 있게 해준다. useRef를 사용하면 컴포넌트가 리렌더링될 때마다 값이 유지되고, 값의 차이를 비교하거나 임시 데이터를 저장할 수 있다.

[React 공식문서](https://ko.legacy.reactjs.org/docs/hooks-reference.html#useref)에서는 useRef를 다음과 같이 설명한다.

- useRef는 .current 프로퍼티로 전달된 인자로 초기화된 변경 가능한 ref 객체를 반환한다. 반환된 객체는 컴포넌트의 전 생애주기를 통해 유지된다.
- useRef는 .current 프로퍼티에 변경 가능한 값을 담고 있는 상자와 같다.
- .current 프로퍼티를 변경하더라도 이것이 리렌더링을 발생시키지는 않는다.

즉, ref는 변경 가능한 값을 담고 있는 객체이다. ref 객체 안의 값은 React 생명주기에 독립적이고 리렌더링과는 상관없이 유지된다. 값이 변경되더라도 리렌터딩이 되지 않고, 리렌더링이 되더라도 값이 유지된다.

![](https://velog.velcdn.com/images/junnkyuu/post/102604d5-63e5-4281-b111-93532a197e0d/image.png)

useRef를 사용하면 값이 변경되더라도 리렌터딩이 되지 않고, 리렌더링이 되더라도 값이 유지된다고 했는데 아래 예시를 통해 알아보자.

![](https://velog.velcdn.com/images/junnkyuu/post/8706476b-6168-48a3-afc2-2634c65a6019/image.png)

Ref Up!, Var Up! 버튼으로 counterRef, counterVar의 변수 값을 증가시킬 수 있다. Render!버튼으로는 렌더링을 할 수 있다. Ref Up!, Var Up! 버튼을 통해 counterRef, counterVar의 값을 증가시키면 콘솔에 정상적으로 증가하는 것을 볼 수 있다.

그 다음으로 Render! 버튼을 클릭하면 렌더링이 되는데 이때 useRef를 사용한 counterRef는 값이 유지되고, counterVar는 값이 0이 되어버린다. 왜냐하면 counterRef의 Ref값은 React 생명주기에 독립적이어서 계속 값을 유지하기 때문이다. 컴포넌트가 브라우저의 마운팅 된 시점부터 마운트 해제될 때까지 같은 값을 계속 유지할 수 있다.

<br>

### customhook

customhook은 React 함수형 컴포넌트에서 반복적으로 사용해야하는 기능이 있는 경우 따로 만들어 사용에 편리하도록 만든 hook이다. 함수형 컴포넌트에서는 useState, useEffect와 같은 hook으로 상태 관리, 생명주기 관리를 한다. 그러나 코드를 작성하다보면 컴포넌트의 크기가 커지게 되고, 이때 특정 로직이 반복되거나 복잡해지는 경우가 발생한다. 이러한 경우에 반복되고, 복잡해진 특정한 로직을 customhook으로 분리해서 재사용성을 높일 수 있다.

customhook은 일반적으로 앞에 use를 붙여서 시작한다. customhook 안에서는 useState, useEffect등의 기존의 React hook을 사용해서 필요한 로직을 구현한다.

- customhook의 장점
  - 코드의 가독성 증가 및 컴포넌트의 간결성
  - 코드의 재사용성 증가 및 중복 방지
  - 테스트에 용이
  - 로직 분리 가능
  - 코드의 유지 보수에 용이

![](https://velog.velcdn.com/images/junnkyuu/post/da7229b6-396b-483e-bf99-64aa5b6443c7/image.png)

![](https://velog.velcdn.com/images/junnkyuu/post/7ceb60ba-1570-4f93-8622-1c8fe94d5166/image.png)

useInput이라는 customhook을 사용한 예시이다.

![](https://velog.velcdn.com/images/junnkyuu/post/f48abb2a-44ad-47d3-946c-3537563c4fd2/image.png)

---

<br>

#### 참고 및 출처

- [코딩병원 - useRef](https://itprogramming119.tistory.com/entry/React-useRef-%EC%82%AC%EC%9A%A9%EB%B2%95-%EB%B0%8F-%EC%98%88%EC%A0%9C)

- [nomadcoders React](https://nomadcoders.co/)
