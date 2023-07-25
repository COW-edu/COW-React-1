# 실행 컨텍스트

작성일시: 2023년 7월 17일 오후 5:37
복습: No

# 실행 컨텍스트

- 자바스크립트 코드가 동작할 수 있는 환경을 모아둔 객체로 실행컨텍스트를 통해 자바스크립트의 동작 원리를 이해할 수 있다.
- 실행 컨텍스트는 전역 실행 컨텍스트, 함수 실행 컨텍스트, eval 실행 컨텍스트가 존재한다.
- 실행 컨텍스트는 코드 평가 후 실행 과정을 거친다.
- 평가 과정에서는 실행 컨텍스트를 생성하고 변수, 함수 등의 선언문만 먼저 실행하여 생성된 변수나 함수 식별자를 키로 실행 컨텍스트가 관리하는 스코프에 등록한다.
- 평가 과정이 끝난 후 소스코드가 실행되며 필요한 정보는 실행 컨텍스트가 관리하는 소코프에 검색해서 취득한다.

## 실행 컨텍스트 스택

![https://joontae-kim.github.io/images/execution_stack.png](https://joontae-kim.github.io/images/execution_stack.png)

- 생성된 실행 컨텍스트는 스택 자료구조로 보관된다.
- 실행 컨텍스트 스택은 코드의 실행 순서를 관리한다.
- 실행 컨텍스트 최상위에 존재하는 실행 컨텍스트는 언제나 현재 실행 중인 코드의 실행 컨텍스트다.

## 전역 컨텍스트 생성과 렉시컬 환경

```jsx
var x = 1;
const y = 2;

function foo(a){
	console.log(a)
}
```

![https://velog.velcdn.com/images%2Fhangem422%2Fpost%2F148a74ef-a9fd-411c-b61a-6ca895de14df%2Fjavascript-context11.png](https://velog.velcdn.com/images%2Fhangem422%2Fpost%2F148a74ef-a9fd-411c-b61a-6ca895de14df%2Fjavascript-context11.png)

- 렉시컬 환경은 환경 레코드(EnvironmentRecord)와 외부 렉시컬 환경에 대한 참조(OuterLexicalEnvironmentReference)로 구성된다
- 환경 레코드는 스코프에 포함된 식별자를 등록하고 등록된 식별자에 바인딩된 값을 관리하는 저장소다.
- 전역 환경 레코드는 객체 환경 레코드와 선언적 환경 레코드로 구성된다.
- 객체 환경 레코드는 var 키워드로 선언한 전역 변수와 함수 선언문으로 정의된 전역 함수는 전역 환경 레코드의 객체 환경 레코드에 연결된  BindingObject를 통해 전역 객체의 프로퍼티와 메서드가 된다.
- 선언적 환경 레코드에는 let,const 키워드로 선언한 전역 변수가 등록되고 관리된다.
- 외부 렉시컬 환경에 대한 참조는 상위 스코프를 가르킨다. 해당 실행 컨텍스트를 생성한 소스코드를  포함하는 상위 코드의 렉시컬 환경을 말하며 위의 사진은 전역 실행 컨텍스트의 렉시컬 환경이기에 외부 렉시컬 환경에 대한 참조가 존재하지 않는다.

## 함수 컨텍스트 생성

![https://blog.kakaocdn.net/dn/OkuFG/btrxkJTPaNi/ItW7ik1KJEic5mj8lfBHq0/img.png](https://blog.kakaocdn.net/dn/OkuFG/btrxkJTPaNi/ItW7ik1KJEic5mj8lfBHq0/img.png)

- 함수가 호출되면 전역 코드의 실행을 일시 중단하고 함수 내부로 코드의 제어권이 이동한다.
- 함수 실행 컨텍스트가 생성되며 함수 렉시컬 환경이 생성된다.
- 함수 환경 레코드 생성, this 바인딩, 외부 렉시컬 환경에 대한 참조 결정 순으로 생성된다.
- 외부 렉시컬 환경에 대한 참조에 foo 함수 정의가 평가된 시점에서 실행 중인 실행 컨텍스트의 렉시컬 환경의 참조가 할당된다. (렉시컬 스코프)

## 클로저

```jsx
const x = 1;

function outer(){
	const x = 10;
	const inner = function(){console.log(x)};
	return inner;
}

const innerFunc = outer();
innerFunc();
```

- outer 함수를 호출하면 outer 함수는 중첩 함수 inner를 반환하고 생명 주기를 마감한다.
- outer 함수가 실행 종료되면 outer 함수의 실행컨텍스트는 스택에서 제거된다.
- 이론상 outer 함수가 생명 주기를 마감한 순간 outer 함수의 지역 변수 x는 더이상 유효하지 않게 되어 접근 방법이 없어 보인다.
- 하지만 위 코드의 실행 결과는 10이 나온다.
- 이처럼 외부 함수보다 중첩 함수가 더 오래 유지되는 경우 중첩 함수는 이미 생명 주기가 종료한 외부 함수의 변수를 참조할 수 잉ㅆ다. 이러한 중첩 함수를 클로저라고 부른다.
- 위의 경우 outer 함수의 실행 컨텍스트는 실행 컨텍스트 스택에서 제거되지만 outer 함수의 렉시컬 환경까지 소멸하는것은 아니기에 inner 함수에서 접근이 가능하다.

[https://joontae-kim.github.io/images/execution_stack.png](https://joontae-kim.github.io/images/execution_stack.png)

[https://joontae-kim.github.io/images/execution_stack.png](https://joontae-kim.github.io/images/execution_stack.png)

[https://velog.velcdn.com/images%2Fhangem422%2Fpost%2F148a74ef-a9fd-411c-b61a-6ca895de14df%2Fjavascript-context11.png](https://velog.velcdn.com/images%2Fhangem422%2Fpost%2F148a74ef-a9fd-411c-b61a-6ca895de14df%2Fjavascript-context11.png)