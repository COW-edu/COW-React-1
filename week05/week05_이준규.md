## 1. State?

State(상태)는 계속해서 변화하는 동적인 값, 상태에 따라 각각 다른 동작을 한다. 이를 우리가 사용할 React에 빗대어 설명해보자면, Component는 계속 바뀌는 동적인 데이터를 갖고, 상태를 바꾸는 등의 관리는 각 Component가 직접 관리하게 된다. 사용자와의 상호작용을 통해 화면을 동적으로 바꿔주기 위해 `useState`함수를 사용한다.

### State 실습

React에서 State에 대해 실습할 때 가장 많이 사용하는 것이 Counter이다. Counter는 +버튼을 누르면 값이 증가하고, -버튼을 누르면 값이 감소하는 기능을 하는 Component이다.

![](https://velog.velcdn.com/images/junnkyuu/post/cd985b91-2aee-4cf6-bfd3-8d0fc96244f2/image.png)

Counter.js 파일을 만들고 위처럼 코드를 작성했다.

React 패키지에 있는 `useState` 함수를 사용하기 위해 import했다. 그 다음 Counter라는 Component를 함수 형식으로 만들었다. `useState`함수를 사용할 때는 파라미터로 기본 값을 넣어줘야 해서 0으로 넣었다. `useState`함수를 호출하면 배열이 반환되는데, 첫 번째 원소는 값, 두 번째 원소는 값을 변화시킬 함수이다.

`const [count, setCount] = useState(0);` 코드의 의미는 0을 기본값으로 갖는 count와 count를 변화시킬 setCount함수를 만들었다는 것이다.

다음으로 버튼을 클릭했을 때 count 값을 변화시킬 increase, decrease 함수를 만들었다. button에 onClick이벤트를 알맞게 적용시킨 후 export 해주면 된다.

![](https://velog.velcdn.com/images/junnkyuu/post/ec10d029-cbe7-47a3-9613-0dc708632660/image.png)

App.js에서 Header와 Counter를 import 후 실행을 하면 아래와 같다.

![](https://velog.velcdn.com/images/junnkyuu/post/e2b54c65-f3b6-4fe3-a5af-776553fe9775/image.gif)

---

<br>

## 2. Props

지난 State 실습에서 진행한 Counter에서 초기값을 0이 아니라 지정하고 싶으면 어떻게 해야할까?

이때 Props 개념을 사용한다. Props란 Properties의 줄임말로, 부모 Component에서 자식 Component에 값을 전달할 때 사용한다. 사용법은 문자열을 전달할 때는 "", 값을 전달할 때는 {}를 사용한다. 실제로 데이터를 전달해보며 Props 사용법을 익혀보려고 한다.

### Props 데이터 전달

![](https://velog.velcdn.com/images/junnkyuu/post/909d57a7-7c0d-42a8-8db0-f313d40dcd93/image.png)

count의 초기값이 0으로 설정되어있다. 초기값을 10으로 바꿔주고 싶으면 아래처럼 부모 Component인 App안에 value라는 객체 안에 값을 넣어주고, 객체를 펼쳐서 전달하는 spread 연산자를 사용한다.

![](https://velog.velcdn.com/images/junnkyuu/post/4763d73e-6429-42e2-af13-dca74ffddbab/image.png)

자식 Component인 Counter는 props를 매개변수로 넣어주고 useState의 괄호안에 원하는 값을 넣어주면 된다.

![](https://velog.velcdn.com/images/junnkyuu/post/689d4fdc-ec8e-4b06-8578-e7de2d8a9d6b/image.png)

그림과 같이 초기값이 10인 것을 확인할 수 있다.

![](https://velog.velcdn.com/images/junnkyuu/post/bf8c4e75-f025-4d7a-ba03-aa2050ea57c7/image.png)

부모 Component에서 객체의 형태로 값을 전달하니 받는 자식 Component 쪽에서는 위처럼 비구조화 할당으로 값을 받을 수 있다. 이를 설명하자면 전달받은 객체에서 원하는 num값만 꺼내쓴 것이다.

![](https://velog.velcdn.com/images/junnkyuu/post/2df3e251-34df-45ee-90e2-625b951b09a5/image.png)

주의해야할 점은 num이라는 값을 비구조화 할당으로 자식 Component에서 받으려고 했는데, 만약 부모 Component에서 정의한 객체에 num이라는 값이 없다면 num은 undefined가 된다.

![](https://velog.velcdn.com/images/junnkyuu/post/1a8b044e-5a3f-4e37-b0d8-0f287f8e9575/image.png)

![](https://velog.velcdn.com/images/junnkyuu/post/f6baf275-1e28-4a53-9b77-f5e28c9e15a1/image.png)

undefined값이 counter의 초기값이 되었기 때문에 이 상태에서 버튼을 클릭하면 undefined + 1이 되어서 숫자가 아니라는 의미인 NaN이 화면에 출력된다.

![](https://velog.velcdn.com/images/junnkyuu/post/905ce38a-d370-451f-be3d-a52392462dc2/image.png)

이 경우를 해결하기 위해서는 위에 코드와 같이 App.js에서 Counter의 defalutProps값으로 num을 정의해주면 된다.

![](https://velog.velcdn.com/images/junnkyuu/post/8cde5633-0f9b-4ebd-bf0c-977d997f4e69/image.png)

다음과 같이 정상적으로 초기값이 10으로 출력된다.

---

<br>

## 3. Props Drilling

위의 Counter 실습처럼 React에서 데이터는 보통 상위 Component -> 하위 Component 방향으로 전달된다. 계층이 적으면 괜찮겠지만, 프로젝트를 진행하다 보면 많은 계층을 통해 props를 전달하게 될 수 있고, 이렇게 되면 코드가 복잡해지고 유지보수가 힘들어진다. 이런 문제를 보통 Props Drilling이라고 한다.

![](https://velog.velcdn.com/images/junnkyuu/post/01114b98-9411-47c7-a2dd-9031c1083715/image.png)

코드가 복잡해지는 경우를 예로 들면 상위 Component의 데이터를 여러 계층 밑에 있는 하위 Component에 전달해야하는 경우가 있다. 이때 여러 계층을 통과하면서 중간에 있는 Component들은 상위 Component에서 가져오는 데이터를 사용하지않고 전달만 하므로 코드가 복잡해진다.

코드가 복잡해지고, 유지보수가 힘들어진다는 점이 있기 때문에 Props Drilling을 방지하기 위해 미리 생각하며 코드를 작성하는게 중요하다. Props Drilling을 방지하기 위해서 Component와 관련된 State는 가까이 유지하고, Children을 이용하고, 상태관리 라이브러리를 사용하는등의 방법들을 사용하여 Props Drilling을 최소화하고 코드의 가독성과 유지보수성을 높이는게 좋다.

---

<br>

### 참고 및 출처

- [인프런 소플-React 강의](https://www.inflearn.com/course/%EC%B2%98%EC%9D%8C-%EB%A7%8C%EB%82%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8)
- [블로그](https://velog.io/@abc2752/propsdrilling)
