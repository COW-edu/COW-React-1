# useContext,useMemo,useCallback

작성일시: 2023년 9월 12일 오후 10:01
복습: No

# useContext

- react useContext를 통해 props drilling을 방지할 수 있다

```jsx
import React, { createContext, useMemo, useState } from 'react';
import Parent from './Parent';

export const UserContext = createContext({
  setLoggedIn: () => {},
  setLoading: () => {},
});
const GrandParent = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const value = useMemo(() => ({ setLoggedIn, setLoading }), [setLoggedIn, setLoading]);
  return (
    <UserContext.Provider value={value}>
      <Parent />
      <div>{loggedIn ? '로그인' : '로그인안해'}</div>
      <div>{loading ? '로딩중' : '로딩안해'}</div>
    </UserContext.Provider>
  );
};
export default GrandParent;
```

```jsx
import React from 'react';
import Children from './Children';

const Parent = () => {
  return <Children />;
};
export default Parent;
```

```jsx
import React, { useContext } from 'react';
import { UserContext } from './GrandParent';

const Children = () => {
  const { setLoading, setLoggedIn } = useContext(UserContext);
  return (
    <>
      <button onClick={() => setLoading((prev) => !prev)}>로딩토글</button>
      <button onClick={() => setLoggedIn((prev) => !prev)}>로딩토글</button>
    </>
  );
};
export default Children;
```

- GrandParent →Parent→ Child 순으로 props를 전달해주지 않아도 setLoading과 setLoggedIn이 정상 작동한다
- useContext를 사용 할 때 Provider에서 제공한 value가 달라지면 useContext를 사용하는 모든 컴포넌트가 리렌더링 된다
- 이는 상황에 따라 과도한 리렌더링을 유도할 수 있다.
- 따라서 자주 바뀌는 값들은 별도의 컨텍스트로 묶거나 자식 컴포넌트를 적절히 분리해주어야 한다.

# Memoization

- 메모이제이션은 값비싼 함수 호출의 결과를 캐싱하고 동일한 입력이 다시 발생할 대 캐싱된 결과를 반환하는 프로그래밍 기술이다
- 이 기술은 동일한 입력으로 여러 번 호출되는 함수 또는 컴포넌트가 있을 때 React에서 유용할 수 있다
- 메모이제이션을 사용하면 동일한 결과를 불필요하게 다시 계산하지 않고, 캐시된 결과를 반환할 수 있다

# useMemo

- 컴포넌트의 성능을 최적하 하기 위해 사용하는 훅이다
- useMemo의 memo는 memoization을 뜻하며 동일한 계산을 반복할 때, 이전에 계산한 값을 메모리에 저장함으로 써 실행 속도를 빠르게 하는 기술이다
- 동일한 값을 반환하는 함수를 반복적으로 호출하는 경우 useMemo를 통해 최적화를 시도한

```jsx
function Component() {
    const value = calculate();
    return <div>{value}</div> 
}

function calculate() {
    return 10;
}
```

- 위의 상황에서 컴포넌트를 렌더링할 때 마다 value 변수는 초기화 된다
- 즉 calculate 함수가 불필요하게 재호출되며 만약 calculate 함수가 로직이 복잡하다면 매우 비효율적으로 작동한다

```jsx
function Component() {
   const value = useMemo(() => {
    return calculate();
},[item])
    return <div>{value}</div> 
}

function calculate() {
    return 10;
}
```

- useMemo는 첫 번째 인자로 콜백함수, 두번째 인자로 의존성 배열을 받는다
- 의존성 배열 안에 있는 값이 업데이트 될 때에만 콜백함수를 다시 호출하여 메모리에 저장된 값을 업데이트 한다
- 하지만 useMemo는 값을 재활용 하기 위해 메모리를 소비해 저장해놓는 것이므로 불필요한 값을 모두 Memoization 해버리면 성능이 오히려 안 좋아질 가능성도 있다.

# useCallback

- 함수를 메모이제이션 하기 위해 사용되는 hook이다
- 첫번째 인자로 넘어온 함수를, 두번째 인자로 넘어온 배열의 값이 변경될 때까지 저장하고 재사용할 수 있게 한다.

```jsx
import React, { useState, useEffect } from "react";

function Profile({ userId }) {
  const [user, setUser] = useState(null);

  const fetchUser = () =>
    fetch(`https://your-api.com/users/${userId}`)
      .then((response) => response.json())
      .then(({ user }) => user);

  useEffect(() => {
    fetchUser().then((user) => setUser(user));
  }, [fetchUser]);

  // ...
}
```

- 위 코드에서 useEffect를 통해 fetchUser가 변할때만 fetchUser를 호출하는 의도로 코드를 작성했다
- 하지만 fetchUser는 함수이기에 userId 값이 바뀌든 말든 컴포넌트가 랜더링될 때 마다 새로운 참조값으로 변경된다.
- 그렇다면 user 상태값이 바뀌게 되며 다시 렌더링이 된다
- user 상태 값이 바뀌어 재렌더링 되면 다시 useEffect가 함수를 호출하는 악순환이 반복된다

```jsx
import React, { useState, useEffect } from "react";

function Profile({ userId }) {
  const [user, setUser] = useState(null);

  const fetchUser = useCallback(
    () =>
      fetch(`https://your-api.com/users/${userId}`)
        .then((response) => response.json())
        .then(({ user }) => user),
    [userId]
  );

  useEffect(() => {
    fetchUser().then((user) => setUser(user));
  }, [fetchUser]);

  // ...
}
```

- useCallback을 통해 함수의 참조값을 동일하게 유지시키며 userId 값이 변경될때만 함수를 호출한다.