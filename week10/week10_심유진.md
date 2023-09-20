# useContext, useMemo, useCallback

![Untitled (6)](https://github.com/COW-edu/COW-React-1/assets/98771235/d1d00331-9b9e-4493-9b1d-5b910cc05a38)


기존에 컴포넌트 간에 데이터를 전달하려면 props를 이용해야 했습니다.

props는 부모 자식 관계에서 데이터를 전달합니다. 따라서 A, B, C 컴포넌트가 각각 부모자식 관계일 때, A에서 C로 데이터를 내려보내주려면 중간 B 컴포넌트를 거쳐야 했죠. A, B, C, D, E 컴포넌트일 때 A에서 E로 데이터를 내려보내주려면 중간 B, C, D 컴포넌트를 거쳐야 합니다. 

### [useContext]

> context를 이용하면 단계마다 일일이 props를 넘겨주지 않고도 컴포넌트 트리 전체에 데이터를 제공할 수 있습니다
> 

**import**

```jsx
import { createContext } from 'react';
import { useContext } from 'react';
```

**[NumContext.js]**

```jsx
import { createContext } from 'react';

export const NumContext = createContext(null);
//null은 초기값을 의미합니다 
```

**[NameContext.js]**

```jsx
import { createContext } from 'react';

export const NameContext = createContext(null);
```

**[App.js]**

```jsx
import { NumContext } from './Context/NumContext';
import { NameContext } from './Context/NameContext';
import './App.css';
import Header from 'Header';

function App() {
  return (
    <NumContext.Provider value="20">
      <NameContext.Provider value="심유진">

//다음과 같이 트리 안에 포함된 컴포넌트에 값을 전달할 수 있습니다 

        <div className="App">
          <Header/>
        </div>
      </NameContext.Provider>
    </NumContext.Provider>
  );
}

export default App;
```

**[Header.js]**

```jsx
import { useContext } from 'react';
import { NumContext } from './Context/NumContext';
import { NameContext } from './Context/NameContext';
import './App.css';

const Header = () => {
		//useContext를 통해 값을 변수에 저장할 수 있습니다. 
    const num = useContext(NumContext);
    const user = useContext(NameContext);

    console.log(user);
    console.log(num);
    
    return (
        <header>
            <p>{user},{num} </p>
        </header>
    )
}

export default Header;
```

useContext를 사용할 때 주의해야 할 점은 Provider에서 제공한 value가 달라진다면 useContext를 사용하고 있는 모든 컴포넌트가 리렌더링 된다는 점입니다. 

따라서 useContext를 사용할 때 value 부분을 메모제이션 하는데에 신경을 써줘야 합니다.

---

### [useMemo]

> `useMemo`에서 memo는 **memoization**을 뜻하는데 이는 그대로 해석하면 **‘메모리에 넣기’**라는 의미이며 컴퓨터 프로그램이 동일한 계산을 반복해야 할 때, 이전에 계산한 값을 메모리에 저장함으로써 동일한 계산의 반복 수행을 제거하여 프로그램 실행 속도를 빠르게 하는 기술입니다.
> 

**useMemo의 구조**

```jsx
const value = useMemo(() => {
    return calculate();
},[item])

//useMemo는 useEffect처럼 첫 번째 인자로 콜백 함수, 두 번째 인자로 의존성 배열(dependancyArray)을 받는다.
//의존성 배열 안에있는 값이 업데이트 될 때에만 콜백 함수를 다시 호출하여 메모리에 저장된 값을 업데이트 해준다.
//빈 배열을 넣는다면 useEffect와 마찬가지로 마운트 될 때에만 값을 계산하고 그 이후론 계속 memoization된 값을 꺼내와 사용한다.
```

**useMemo를 사용하지 않았을 때**

```jsx
import React, { useState } from 'react';

const hardCalculate = number => {
  console.log('어려운 계산!');
  for (let i = 0; i < 999999999; i++) {} // 무거운 연산의 간단한 예시용. for문을 엄청나게 돌리고 나서 반환문 실행.
  return number + 10000; // 위의 연산 때문에 약 1초 후에 화면에 반영된다.
};

const easyCalculate = number => {
  console.log('쉬운 계산!');
  return number + 1;
};

function App() {
  const [hardNumber, setHardNumber] = useState(1);
  const [easyNumber, setEasyNumber] = useState(1);

//state가 변경되었기 때문에 
//App컴포넌트가 재렌더링되어 easySum변수의 함수 호출문도 다시 실행되기 때문에 
//딜레이가 생기는 것을 볼 수 있다.

  const hardSum = hardCalculate(hardNumber);
  const easySum = easyCalculate(easyNumber);

  return (
    <div>
      <h3>어려운 계산기</h3>
      <input
        type="number"
        value={hardNumber}
        onChange={e => setHardNumber(parseInt(e.target.value))}
      />
      <span> + 10000 = {hardSum} </span>

      <h3>쉬운 계산기</h3>
      <input
        type="number"
        value={easyNumber}
        onChange={e => setEasyNumber(parseInt(e.target.value))}
      />
      <span> + 1 = {easySum} </span>
    </div>
  );
}

export default App;

```

**리팩토링** 

```jsx

const [hardNumber, setHardNumber] = useState(1);
const [easyNumber, setEasyNumber] = useState(1);

// const hardSum = hardCalculate(hardNumber);
const hardSum = useMemo(() => {
    return hardCalculate(hardNumber); // hardNumber의 값이 변경이 있을 경우에만 hardSum 변수를 초기화.
}, [hardNumber]); // useMemo의 의존성 배열의 값이 변경이 있어야만 리턴문의 내용이 초기화된다.
const easySum = easyCalculate(easyNumber);

// ...
// jsx문 리턴부분 하단 생략
```

처음의 useState와 일반 변수만 사용했던 코드에서 쉬운 계산기만 실행할 때 어려운 계산기의 코드가 실행되지 않게 하기 위해 useMemo Hook을 사용해서 hardSum 변수를 의존성 배열의 요소 hardNumber의 값이 변경될 경우에만 초기화시키는 방식으로 리팩토링할 수 있습니다. 

**useMemo 유의할 점** 

- **최적화하려는 계산의 비용이 크지 않은 경우**useMemo를 사용함으로 발생하는 오버헤드가 더 클 수도 있습니다.
- **메모이제이션이 필요한지 확실하지 않은 경우**일단 useMemo 없이 코드를 작성한 다음, 문제가 발생하면 점진적으로 최적화를 하는 것이 좋습니다.
- **의존성 배열이 너무 자주 변경되는 경우**useMemo는 항상 재계산되어, 성능적인 이점을 보기 어렵습니다.

---

### [useCallback]

> `useCallback()`은 함수를 메모이제이션(memoization)하기 위해서 사용되는 hook 함수입니다. 첫번째 인자로 넘어온 함수를, 두번째 인자로 넘어온 배열 내의 값이 변경될 때까지 저장해놓고 재사용할 수 있게 해줍니다.
> 

useMemo는 메모이제이션을 통해서 특정 값을 재사용하는 것이고, useCallback은 메모이제이션을 통해서 특정 함수를 재사용한다는 것입니다.

함수를 재 선언 하는것은 CPU, 큰 메모리도 차지하지 않지만, 한번 만든 함수를 재 사용하고, 필요할 때만 재 생성 하는것은 최적화에 있어서 중요합니다.

**useCallback구조**

```jsx
const calculate = useCallback((num) => {
	return num + 1;
}, [item])
//첫번째 인자로는 메모이제이션 해줄 콜백함수 그리고 두번째 인자는 의존성 배열이다.
```

**useCallback을 사용하지 않았을 때**

```jsx
import React, { useState } from "react";

const CounterButton = function ({ onClicks, count }) {
  console.log("카운터 버튼 렌더링");
  return <button onClick={onClicks}>{count.num}</button>;
};

export default function Counter() {
  const [count1, setCount1] = useState({ num: 0 });

  const increament1 = () => {
    setCount1({ num: count1.num + 1 });
  };

  const [count2, setCount2] = useState({ num: 0 });

  const increament2 = () => {
    setCount2({ num: count2.num + 1 });
  };

  return (
    <div className="App">
      <div>{count1.num}</div>
      <div>{count2.num}</div>
      <CounterButton onClicks={increament1} count={count1} />
      <CounterButton onClicks={increament2} count={count2} />
    </div>
  );
}
```

해당 코드는 버튼을 클릭하면 CounterButton 컴포넌트가 2번 렌더링 되게 됩니다.

1. 첫 렌더링이 되고 increament함수와 count state가 생성되어 렌더링 됩니다.
2. 버튼을 클릭하게 되면 increament함수가 작동하게 되고 setState로 인해 state가 변경됩니다.
3. state가 변경됐으니, 부모 컴포넌트는 리 렌더링이 되게 되고, 변경된 props를 내려주게 됩니다.
4. 자식컴포넌트는 props를 받아 다시 뿌려주게 됩니다.

위 과정을 통해 CounterButton이 두번 렌더링 되게 됩니다. 

**리팩토링**

```jsx
import {useCallback} from 'react';
  
  const increament1 = useCallback(() => {
    setCount1({ num: count1.num + 1 });
  },[count1]);
```

useCallback의 첫번째 인자로는 인라인 콜백과 의존성 값의 배열을 받게 됩니다.

의존성 배열인 deps에 변경을 감지해야할 값을 넣어주게 되면 count1이 변경될 때마다 콜백 함수를 새로 생성하게 됩니다.

따라서 useCallback을 통해 불필요한 렌더링을 방지해줍니다. 

유**의할 점** 

- `useCallback` 또한 무분별하게 사용한다면, 이를 사용하는 코드와 메모제이션용 메모리가 추가로 필요하게 되므로 적절하게 사용해야합니다.
- 실제로 컴포넌트가 랜더링될 때, 함수 선언과 관련된 것은 성능 최적화에 큰 문제가 되지는 않습니다.

```jsx
const add1 = () => x + y;
undefined
> const add2 = () => x + y;
undefined
> add1 === add2
false
//JavaScript에서는 함수의 동등함 비교는 위 결과가 도출됨. 
// 함수도 객체 취급을 하기 때문에 함수 비교에 새로운 메모리 주소에 의한 참조 비교가 일어나기 때문이다. 
```