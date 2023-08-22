## 1. React Hook?

![](https://velog.velcdn.com/images/junnkyuu/post/7ca243b6-2963-4fe9-bd3b-fef6ce660c22/image.png)

Hook이란 사용자 인터페이스에서 상태 변화와 상태 변화에 동반하는 연관 작용을 간단하게 해주는 방법이다. Hook은 React에서 처음 적용되었고, Vue, Svelt와 같은 프레임워크에서도 이를 채택하였다.

Hook은 React 16.8 version에 새로 도입된 기능으로, 함수형 컴포넌트에서도 상태 관리를 할 수 있는 useState, 렌더링 직후 작업을 설정하는 useEffect등의 기능을 제공하여 기존의 함수형 컴포넌트에서 할 수 없었던 다양한 작업을 할 수 있게 해준다.

<br>

### useState

useState는 가장 기본적인 Hook으로 함수형 컴포넌트에서도 변하는 상태를 지닐 수 있게 해준다. 만약 코드를 작성하다가 함수형 컴포넌트에서 상태 변화를 관리해야한다면 useState를 사용하면 된다.

![](https://velog.velcdn.com/images/junnkyuu/post/1be6561a-9876-45f7-9136-4b36cd0fb7ef/image.png)

이름과 닉네임을 입력하면 화면에 보여주는 간단한 실습을 통해 useState를 알아보려고 한다.

먼저 useState를 사용하기 위해서 useState를 import 해주었다. useState는 다음과 같이 사용한다.

```
const [value, setValue] = useState(0);
```

useState의 파라미터에는 상태의 기본값을 넣어준다. 위 코드는 이름, 닉네임의 텍스트 값을 입력하면 변하는 기능을 구현한 것이므로 value의 기본값으로 빈 문자열`('')` 을 넣어준다.

useState가 호출되면 배열을 반환하는데, 배열의 첫번째 원소는 상태의 값이고, 두번째 원소는 상태의 값을 바꿔주는 set함수이다. 보통 set함수는 첫번째 원소 이름 앞에 set을 붙여준다. set함수에 파라미터로 원하는 값을 넣어주면 상태의 값이 바뀌게 되고, 컴포넌트가 리렌더링 된다.

useState의 개념을 바탕으로 위의 코드를 보면

```
const [name, setName] = useState('');
const [nickName, setNickName] = useState('');
```

코드의 의미는 빈 문자열을 기본값으로 갖는 name, nickName과 name, nickName 변화시킬 setName, setNickName함수를 만들었다는 것이다. input에 이준규, Jun을 입력하면 아래와 같이 화면에 출력된다.

![](https://velog.velcdn.com/images/junnkyuu/post/2111cea9-2409-4606-8f6d-759c14ec0c92/image.png)

---

<br>

### useEffect

useEffect는 useState와 같이 가장 많이 쓰이는 Hook이고, React 컴포넌트가 렌더링 될 때마다 특정한 작업을 수행하도록 설정할 수 있는 Hook이다.

![](https://velog.velcdn.com/images/junnkyuu/post/d4d9d26d-be96-4d22-b5c9-257430d2c6f6/image.png)

위 실습에 useEffect를 추가해서 useEffect를 알아보려고 한다.

#### 1. 마운트 될 때, 값이 변할 때마다

먼저 useEffect를 사용하기 위해 import 해준다. useEffect에서 설정한 함수를 컴포넌트가 처음 실행될 때와 값이 변할 때마다 실행시키고 싶으면 위처럼 작성하면 된다. 그러면 아래와 같이 console창에 출력된다.

![](https://velog.velcdn.com/images/junnkyuu/post/41c58ec7-1aae-4c93-84a2-186c3be0b504/image.png)

#### 2. 마운트 될 때만

![](https://velog.velcdn.com/images/junnkyuu/post/4fde701e-05b8-40e8-b672-3f9dcf4b8694/image.png)

처음 마운트 될 때만 useEffect에서 설정한 함수를 실행시키고 싶으면 useEffect의 두번째 파라미터에 `[]`를 추가해주면 된다.

![](https://velog.velcdn.com/images/junnkyuu/post/bcb58502-ccd0-45d5-bba8-df7f0fe64237/image.png)

#### 3. 특정한 값이 변할 때

![](https://velog.velcdn.com/images/junnkyuu/post/715f1ea5-ebc2-4dc4-b03a-ff8d19da5ac0/image.png)

특정한 값이 변할 때 useEffect에서 설정한 함수를 실행시키고 싶으면 useEffect의 두번째 파라미터로 `[특정한 값]`을 추가해주면 된다.

![](https://velog.velcdn.com/images/junnkyuu/post/4f23e722-e8d7-4b69-9046-9908ce281fcc/image.png)

#### 4. cleanup

useEffect를 사용할 때 컴포넌트가 언마운트 혹은 업데이트 되기 직전에 사용하고 싶은 함수가 있으면 cleanup 함수를 반환해주면 된다.

![](https://velog.velcdn.com/images/junnkyuu/post/0ad51cb0-4393-492e-94a8-400a3b8534d9/image.png)

![](https://velog.velcdn.com/images/junnkyuu/post/59ce6ff5-cdc4-4c33-bd63-e1718f8d5989/image.png)

위와 같이 코드를 작성하면 컴포넌트가 나타날 때 console에 effect, 사라질 때 cleanup이 출력된다.

![](https://velog.velcdn.com/images/junnkyuu/post/17303427-ba33-40b4-bfbe-a1faf951d91a/image.png)

이름을 입력하면 아래와 같이 출력된다.

![](https://velog.velcdn.com/images/junnkyuu/post/d520fc34-1657-4b85-98c8-114764723133/image.png)

<br>

즉, useEffect는 렌더링 직후 실행되고, 두번째 파라미터에 어떤 값을 넣느냐에 따라 실행되는 조건이 위의 예시와 같이 달라진다.

---

<br>

### 참고 및 출처

- [Netlify Blog - swyx](https://www.netlify.com/blog/2019/03/11/deep-dive-how-do-react-hooks-really-work/)
- [별코딩 - React Hooks에 취한다](https://www.youtube.com/watch?v=G3qglTF-fFI&list=PLZ5oZ2KmQEYjwhSxjB_74PoU6pmFzgVMO)
- [velopert - React Hooks](https://velog.io/@velopert/react-hooks)
