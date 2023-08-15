# 상태와 props (props Drilling)

작성일시: 2023년 8월 8일 오후 8:20
복습: No

# 리액트 상태(state)

- 리액트에서 상태란 컴포넌트의 변경 가능한 데이터 저장소다
- 리액트 개발의 중요한 점은 상태를 효율적으로 관리하는것과 상태값에 따라 화면의 불필요한 렌더링을 줄여야한다.

```jsx
import react, {useState} from 'react'

function Component() {
  const [isLogIn, setIslogIn] = useState(false);
  
  return (
    {
      isLogin ? <div>로그인이 되어야 볼수있는 페이지</div> : <div>로그인이 필요합니다 !</div>
    }
  )
}

// isLogin 상태가 초기에는 false 만약 상태 변화를 통해 isLogin이 true가 되면 div 변화
```

## useState

- useState는 상태를 다룰 수 있는 React Hook이다
    - useState 사용법
        - React로 부터 useState를 import 해온다
            
            ```jsx
            import react, {useState} from 'react'
            ```
            
        - 이후 useState를 컴포넌트 안에서 호출한다
            
            ```jsx
            import react, { useState } from 'react'
            
            function Example() {
              // isChecked 라는 state 변수를 선언한다([]안에 작성해야 한다)
              const [isChecked, setIsChecked] = useState(false);
            
            	return(
            				{<div>{isChecked ? "Checked !" : "unChecked"}</div>} // jsx문법에서의 사용법
            			)
            }
            ```
            
        - 상태를 갱신하기 위해 위의 예시에서는 setIsChecked 를 통해 갱신해준다
            
            ```jsx
            import react, { useState } from 'react'
            
            function Example() {
              const [isChecked, setIsChecked] = useState(false);
             
              const checkHandler = (e) => {
                setIsChecked(e.target.checked);
              }
              
              return (
                <div>
                  <input type="checkbox" checked={isChecked} onChange={checkHandler} />
                  <span>{isChecked ? "Checked !" : "unChecked"}</span>
                </div>
              )
            }
            ```
            
        - 상태변경 함수를 사용하지 않고 상태를 강제로 변경하면 안된다.
        
        # 리액트 props
        
        - 컴포넌트에게 어떠한 값을 전달해줘야 할 때 사용한다.
        - 상위 컴포넌트에서 하위 컴포넌트로 값을 전달할 수 있으며 반대로는 불가능하다. (단방향 데이터흐름)
        - 부모 컴포넌트는 props의 값을 수정 가능하지만 자식 컴포넌트에서는 읽기만 가능하다.
        
        ## props사용법
        
        ```jsx
        import React from 'react';
        
        function App() {
          return (
            <Hello name="react" />
          );
        }
        
        function Hello(props) {
          return <div>안녕하세요 {props.name}</div>
        }
        
        export default App;
        ```
        
        ## PropTypes: 데이터 타입 검증
        
        - propTypes는 상위 컴포넌트로부터 전달받은 데이터의 타입을 확인하는 라이브러리다.
        - propTypes을 사용하여 예상치 못한 타입 오류를 방지할 수 있다.
        
        ```jsx
        import React from "react";
        import PropType from 'prop-types';
        function MyComponent(props) {
            return(
                <div>
                    {props.name},{props.age}, {props.isChecked ? "true" : "false"}
                </div>
            );
        }
        
        MyComponent.prototype = {
            name : PropType.string,
            age : PropType.oneOf(['string','number']),
            isChecked : PropType.bool
        }
        export default MyComponent;
        // propTypes 예시
        ```
        
        ## Prop Drilling
        
        - Prop Drilling은 props를 오로지 하위 컴포넌트로 전달하는 용도로만 쓰이는 컴포넌트를 거치면서 React Component 트리의 한부분에서 다른 부분으로 데이터를 전달하는 과정이다.
        - 즉 중간 컴포넌트는 데이터가 필요하지 않음에도 오로지 자식 컴포넌트에게 전달하기 위해 props를 전달해야 한다.
        - Prop Drilling은 오류 발생 시 prop 추적을 힘들게 하여 코드 유지 보수에 어려움을 만든다.
        
        ![Untitled](%E1%84%89%E1%85%A1%E1%86%BC%E1%84%90%E1%85%A2%E1%84%8B%E1%85%AA%20props%20(props%20Drilling)%207e163733fa6e4b4bb634bed0b59f504e/Untitled.png)
        
        ### Prop Drilling 극복하기
        
        - 전역 상태관리 라이브러리를 사용한다.
        - redux, Mobx, recoil 등을 통해 상태를 전역으로 관리하여 해당 값이 필요한 컴포넌트에서 직접 사용한다.
        - childer props를 사용한다
    
    ### Children Prop
    
    - children prop을 통해 부모 컴포넌트 내부에서 자식 컴포넌트 정보에 접근할 수 있다.
    
    ```jsx
    <ParentComponent>
    	<ChildComponent/>
    </ParantComponent>
    
    const ParantComponent =(props) =>{
    	return <>
        	{props.children}
        </>
    }
    
    // 예시
    ```
    
    ```jsx
    import React,{useState} from 'react';
    
    const ChildComponent = () =>{
    	console.log("ChildComponent is rendering!");
    	return <div>Hello World!</div>
    }
    
    const ParentComponent = ({children}) =>{
    	console.log("ParentComponent is rendering!");
        const [toggle, setToggle] = useState(false);
    	return <div>
     		{children}
            <button onClick={()=>{setToggle(!toggle)}}>
            	re-render
            </button>
        </div>
    }
     // 버튼을 클릭해도 ChildComponent는 리렌더링 되지 않
    const Container =() =>{
    	return <div>
        	<ParentComponent>
            	<ChildComponent/>
            </ParentComponent>
        </div>
    }
    ```
    
    - children prop을 통해 props Drilling을 방지하며 렌더링 최적화를 달성할 수 있다.