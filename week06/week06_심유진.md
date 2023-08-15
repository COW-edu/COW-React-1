# React hook (기초) **<useState, useEffect>**

## hook

> *Hook*은 React 버전 16.8부터 React 요소로 새로 추가되었습니다.
> 
- Hook을 이용하여 기존 Class 바탕의 코드를 작성할 필요 없이 상태 값과 여러 React의 기능을 사용할 수 있습니다.

### **hook 이전에 사용된 class**

> Class 컴포넌트가 이러한 최적화를 더 느린 경로로 되돌리는 **의도하지 않은 패턴**을 장려할 수 있다는 것을 발견했습니다. 또한 Class는 코드의 최소화를 힘들게 만들고, 핫 리로딩을 깨지기 쉽고 신뢰할 수 없게 만듭니다.
> 

핫 리로드 : 앱을 처음부터 다시 시작하지 않고 새로운 코드 변경에 따른 코드 변경사항만 표시하며 변경된 코드에만 적용된다.

→ 때문에 코드가 최적화 가능한 경로에서 유지될 가능성이 더 높은 API를 제공하길 원하였습니다. Hook은 Class없이 React 기능들을 사용하는 방법을 제공합니다. 

### **hook의 장점**

- Hook을 사용하면 컴포넌트로부터 상태 관련 로직을 추상화할 수 있습니다. 이를 이용해 독립적인 테스트와 재사용이 가능합니다.
- 서로 비슷한 것을 하는 작은 함수의 묶음으로 컴포넌트를 나누는 방법을 사용할 수 있습니다.
- 로직의 추적을 쉽게 할 수 있도록 리듀서를 활용해 컴포넌트의 지역 상태 값을 관리하도록 할 수 있습니다.
- Hook은 명령형 코드로 해결책을 찾을 수 있게 해주며 복잡한 함수형 또는 반응형 프로그래밍 기술을 배우도록 요구하지 않습니다.

---

## useState

> useState 는 가장 기본적인 Hook 으로서, 함수형 컴포넌트에서도 가변적인 상태를 지니고 있을 수 있게 해줍니다.  추가적으로 컴포넌트에서 동적인 값을 상태(state)라고 부릅니다.
> 

```jsx
import { useState } from 'react';
```

useState 를 사용 할 땐 코드의 상단에서 import 구문을 통하여 불러옵니다. 

```jsx
const [value, setValue] = useState(0);
//const [<상태 값 저장 변수>, <상태 값 갱신 함수>] = useState(<상태 초기 값>);
```

사용은 다음과 같이 할 수 있습니다. 

상태 값 갱신 함수를 사용하지 않고 직접 변수를 다른 상태 값으로 할당하면 화면에 반영되지 않습니다. 

```jsx
import {useState} from "react" ;  

export default function fc() {
    const [name, setName] = useState('심');

    return (

        <div>
            <h1>state</h1>
            <h2 id='name'>{name}</h2>
            <button onClick = {()=> {setName(name === "심" ? "유진" : "심")}}>~버튼~</button>

        </div>
    );
}
```

useState를 사용하여 버튼 클릭시 이름을 성으로 성을 이름으로 바꾸는 코드를 짤 수 있습니다. 

```jsx
export default function fc() {
    let name ='심'

    function changeName(){
        name = name=== "심" ? "유진" : "심" ;
        console.log(name);
        document.getElementById('name').innerHTML = name;
       
    }

    return (

        <div>
            <h1>state</h1>
            <h2 id='name'>{name}</h2>
            <button onClick = {changeName}>버튼</button>

        </div>
    );
}
```

useState를 사용하면 해당 코드와 같이 화면을 따로 바꿔주지 않아도 됩니다. 

 

```jsx
let person = {
  name: 'David',
  age: 15,
  job: 'Programmer'
}

const { name, age } = person; // Takes the property/method from the object

console.log(name); // 'David'
console.log(age); // '15'
```

비슷한 코드로 ‘{ }’ 와 ‘[ ]’ 를 혼동하지 않도록 주의합니다. 

---

### useEffect

> useEffect는 React component가 렌더링 될 때마다 특정 작업(Sied effect)을 실행할 수 있도록 하는 Hook입니다.
> 

Side effect

: component가 렌더링 된 이후에 비동기로 처리되어야 하는 부수적인 효과들을 뜻합니다.

- **Mounting** : 컴포넌트가 **최초**로 나타낼 때
- **Rendering** : 컴포넌트가 **마운트 된 후** 컴포넌트가 호출 될 때
- **UnMount** : 컴포넌트가 **사라질 때**

→ 해당 기능을통해 생명주기 메서드를 사용할 수 있습니다. 

```jsx
import { useEffect } from "react";
```

useEffect를 사용 할 땐 코드의 상단에서 import 구문을 통하여 불러옵니다. 

```jsx
1. useEffect의 기본 형태

useEffect(() => {
  ... // 실행할 내용들
});
```

위와 같이 사용하면 모든 경우에 해당 useEffect 함수가 실행됩니다.

```jsx
2. 비어있는 dependency 추가

useEffect(() => {
  ... // 실행할 내용들
}, []);
```

컴포넌트가 처음으로 마운트되었을 때만 실행됩니다. 

```jsx
3. dependency 값 추가

let something = 2;

useEffect(() => {
  ... // 샐행할 내용 
}, [파라미터 값]); 
// useEffect에는 [] 안에 값이 들어가거나 들어가지 않는 경우가 있다. 
// -> dependency 라고 부르는데 dependency 파라미터 값에 의존하여 useEffect 함수가 실행될지 말지를 결정한다.
```

위와같이 dependency값에 들어가 있는 **해당 변수의 값이 변경될 때**, useEffect 함수가 실행됩니다. 

만약 파라미터 값을 순차적으로 3, 4, 5로 총 세 번 변경하게 되면, 해당 useEffect함수는 3번 실행되게 됩니다. 

```jsx
4. cleanup 함수 
****
useEffect(() => {
  ...// 실행할 내용

  return () => {
    ...// cleanup
  }
});
```

cleanup함수는 언마운트 될 때 실행됩니다. 

컴포넌트가 사라질 때 호출되는 부분으로 메모리누수를 방지하여 메모리 관리를 하거나 컴포넌트가 사라질 때, 수행할 작업들을 추가하기 위해 사용합니다. 

[예제]

```jsx
import React, { useEffect }from 'react';

const Timer = (props) => {
    useEffect(() => {
        const timer = setInterval(() => {
            console.log('타이머 진행중....');
        }, 1000);
    }, [])
    return(
        <div>
            <span>start or stop</span>
        </div>
    )
}

export default Timer;
```

```jsx
import React, { useEffect }from 'react';

const Timer = (props) => {
    useEffect(() => {
        const timer = setInterval(() => {
            console.log('타이머 진행중....');
        }, 1000);
    }, []) //비어있다 
    return(
        <div>
            <span>내가 없어지면 타이머가 끝나도록..</span>
        </div>
    )
}

export default Timer;
```

위 예제는 dependency가 비어있기 때문에 컴포넌트가 처음으로 마운트되었을 때만 실행됩니다. 때문에 버튼을 클릭해서 unMount가 되더라도 타이머가 계속 돌아가게 됩니다. 

<img width="1046" alt="가짜1" src="https://github.com/COW-edu/COW-React-1/assets/98771235/1335a281-754b-408b-b44c-5dc811f7c91c">
<img width="873" alt="가짜" src="https://github.com/COW-edu/COW-React-1/assets/98771235/a1b0e686-88a9-4f1d-8304-132c5527bc63">

```jsx
import React, { useEffect }from 'react';

const Timer = (props) => {
    useEffect(() => {
        const timer = setInterval(() => {
            console.log('타이머 진행중....');
        }, 1000);
        
        // clean-up
        return () => {
            clearInterval(timer);
        }
    }, [])
    return(
        <div>
            <span>진짜 내가 없으면 끝나도록..</span>
        </div>
    )
}

export default Timer;
```

clean-up을 실행하여 effect를 끝낼 수 있습니다. 

여기서 effect는 렌더링이 실행되는 때마다 실행됩니다. 다음 effect실행 전에 이전 렌더링에서 파생된 effect를 정리하는 것입니다.

<img width="964" alt="진짜2023-08-15 오후 8 41 03" src="https://github.com/COW-edu/COW-React-1/assets/98771235/33e8787e-7cae-46f8-ba23-7acdeaffe1d1">
<img width="937" alt="진짜1" src="https://github.com/COW-edu/COW-React-1/assets/98771235/8a8b434a-a35c-4048-9d26-2fe693ac7b38">