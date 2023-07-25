# 실행컨텍스트

# 스코프(Scope)

- JS엔진이 식별자를 검색할 때 사용하는 규칙
- 모든 식별자(변수 이름, 함수 이름, 클래스 이름 등)는 선언된 위치에 의해 식별자의 유효범위가 결정된다.

```jsx
function add(x,y) {
	console.log(x+y);
	return x+y;
}

add(2,5); //7
console.log(x,y) //Error => x,y가 스코프 범위에서 벗어낫기에 오류 발생
```

- **렉시컬 환경 : 코드가 어디서 실행되며 주변에 어떤 코드가 있는지를 알려줌 → 실행 컨텍스트**
- var: 같은 스코프 내에 중복 선언 허용 / let, const : 같은 스코프 내에 중복 선언 허용x

```jsx
//var의 경우
function name {
	var name1 = "junho";
	var name1 = "juno";
	console.log(name1); //juno
}
name();

//let, const의 경우
function name {
	let name2 = "junho";
	let name2 = "juno"; //Syntax Error (중복 선언 불가)
	console.log(name2);
}
name();
```

### 스코프의 구분

- 전역 스코프 & 지역 스코프로 구분한다.
    - 전역 스코프(`Global Scope`) : 코드 어디에서든 참조 가능하다.
    - 지역 스코프(`Local Scope` / `Function-level Scope`): 자기 자신의 함수와 자신의 하위 함수에서만 참조 가능하다.

| 전역 | 코드 가장 바깥쪽 영역에 선언 | 전역 스코프 | 전역 변수 |
| --- | --- | --- | --- |
| 지역 | 함수 몸체 내부에 선언 | 지역 스코프 | 지역 변수 |

```jsx
let globalScopevar = "global";   //  전역스코프 (전역변수)
      
function isGlobal() {
  return `${globalScopevar} 입니다.`;
}
console.log(isGlobal());   //  global 입니다.

function isLocal() {
  let localScopevar = "local"    //지역(함수)스코프 (지역변수)
  return `${localScopevar} 입니다.`
}
console.log(isLocal());   // local 입니다.
console.log(localScopevar);  //Uncaught ReferenceError: local is not defined
```

- `globalScopevar` 의 경우 전역 변수이기에 전역 스코프를 가지고, `isGlobal, console.log(isGlobal())` 모두 유효하다.
- `localScopevar`의 경우 지역 변수이기에 지역 스코프를 가지고 `isLocal`함수 내부에서는 유효하지만 지역 변수를 함수 외부에서 사용시(`console.log(localScopevar)`) 에러가 난다.

### 스코프 체인

```jsx
let hi = "hihi";

function outer() {
	...
	function inner() {
		...
	}
}
// inner() => outer()의 중첩 함수 (하위 스코프)
// outer() => inner()의 외부 함수(상위 스코프),
```

- `함수의 중첩` ⇒ 함수 몸체 내부에서 함수가 정의된 것
- 중첩 함수 : 함수 몸체 내부에서 정의된 함수 , 외부 함수 : 중첩 함수를 포함하는 함수
- 계층 관계 : inner 스코프 → outer 스코프 → 전역 스코프
- 계층 관계를 연결한 것 : **스코프 체인**
- 변수 참조할 때 변수 참조하는 코드의 스코프에서 상위 스코프 방향으로 이동하면서 변수 검색한다.
    
    ex) inner() 안 변수 참조 → inner()스코프 검색 → outer()스코프 검색 → 전역 스코프 검색
    

---

# 실행 컨텍스트

- 자바스크립트의 코드들이 실행되기 위한 환경
- 실행할 코드에 제공할 환경 정보들을 모아놓은 객체

## 실행 컨텍스트를 생성시키는 종류

- 전역 코드 (global code) ⇒ 전역에 존재하는 소스코드, 정의된 함수, 클래스 등의 내부 코드 포함x
    - 자동으로 생성된다.
    - `전역 컨텍스트 생성`
- 함수 코드 (function code) ⇒ 함수 내부에 존재하는 소스코드, 함수 내부의 함수, 클래스 등의 내부코드 포함 x
    - `함수 컨텍스트 생성`
- eval 코드 ⇒ `eval()` 실행
    - 문자열로 구성된 자바스크립트 코드 전달시 그대로 실행하는 함수 (현재 거의 사용하지 않는다.)
- `block` 만들기

⇒ 위 종류가 실행되면 콜 스택(call stack)에 쌓인다.

---

## 컨텍스트 원칙

1. 제일 먼저 전역컨텍스트 생성 후 함수 호출 시마다 컨텍스트 생성된다.
2. 컨텍스트 생성시 컨텍스트 안 변수 객체, scope chain, this가 생성된다.
3. 컨텍스트 생성 후 함수 실행되고, 사용되는 변수를 변수 객체 안에서 찾고 없으면 스코프체인에 따라 올라가면서 찾는다.
4. 함수 실행이 마무리 되면 해당 컨텍스트는 사라진다.

```jsx
var a = 1; // 전역 컨텍스트
function outer () { // outer 컨텍스트
  function inner () { // inner 컨텍스트
    console.log(a); // undefined
    var a = 3;
    console.log(a); // 3
  }
  inner();
  console.log(a); // 1
}
outer();
console.log(a); // 1
```

1. 프로그램 실행 : 전역 컨텍스트
2. outer 실행 : 전역 컨텍스트 - outer
3. inner 실행 : 전역 컨텍스트 - outer - inner
4. inner 종료 :  전역 컨텍스트 - outer
5. outer종료 : 전역 컨텍스트

## 실행 컨텍스트 구성

- `Variable Environment`
    - 컨텍스트 내의 식별자(변수)들에 대한 정보
    - 외부 환경 정보
    - 선언 시점의 LexicalEnvironment의 스냅샷(변경사항 반영 x)
- `Lexical Environment`
    - 처음에는 Variable Environment와 같음
    - 변경 사항이 실시간으로 반영된다.
    - `environmentRecord` → 호이스팅 발생
    - `outerEnvironmentReference` → 스코프 & 스코프체인 형성된다.
- `ThisBinding`
    - 식별자가 바라봐야 할 대상 객체

![https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fb8GGt2%2FbtrOR2WnrGp%2Fi8gP5eHGjuIlZS37WFMT01%2Fimg.png](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fb8GGt2%2FbtrOR2WnrGp%2Fi8gP5eHGjuIlZS37WFMT01%2Fimg.png)

## environmentRecord & hoisting

- 식별자 정보 → 매개변수 식별자, 선언된 함수, 함수 내부의 식별자, `var`로 선언된 변수의 식별자
- 현재 실행될 컨텍스트의 대상 코드 내에 어떤 식별자가 있는지 먼저 수집 ⇒ 식별자만 위로 끌어올리고 할당은 원래 자리에서 진행 (호이스팅 )
- 즉 식별자와 식별자에 바인딩 된 값을 기록한다.

### Variable Hoisting

```jsx
// var case
console.log(TVChannel); //undefined
var TVChannel = 'Netflix';
console.log(TVChannel); //Netflix

//const, let의 경우 case
console.log(TVChannel); //Reference Error (일시적 사각지대)
const TVChannel = 'Netflix';
console.log(TVChannel); //Netflix
```

`var` 콜스택 : [{TVChannel : undefined}] → [ {TVChannel : undefined} ,console.log ]  → [ {TVChannel : undefined} ] → [ {TVChannel : ‘Netflix’} ] →  [ {TVChannel : undefined} ,console.log ] → [ {TVChannel : ‘Netflix’} ]

`const` 콜스택 : [{TVChannel  }] → [ {TVChannel  } ,console.log ] ⇒ `Reference Error`

- **생성단계 (Creation Phase)** : Execution Context 생성, 선언문만 실행해서 Environment Record에 기록한다.
- **실행 단계 (Execution phase)** : 선언문 외 나머지 코드를 실행, Environment Record참조 및 업데이트
- 일시적 사각지대 : `let`, `const`로 선언한 경우 선언 이전 식별자를 참조할 수 없는 구역

<aside>
<img src="https://www.notion.so/icons/info-alternate_gray.svg" alt="https://www.notion.so/icons/info-alternate_gray.svg" width="40px" /> 선언 : 메모리 공간을 확보하고 식별자와 연결
{ TVChannel }
초기화 : 식별자에 암묵적으로 undefined값 바인딩
{ TVChannel : undefined }

</aside>

- `var`키워드로 변수 선언시 선언과 초기화가 동시에 이루어짐
- `let`, `const`키워드로 변수 선언시 선언만 이루어짐 : 할당 직전까지 아무 값이 담기지 않기에 일시적 사각지대가 생긴다.

### Function Hoisting

```jsx
// Function Expression case 
study(); //TypeError
var study = () => {
	...
} 
// call Stack : { study : undefined } => TypeError

study(); //ReferenceError
const study = () => {
	...
}
// call Stack : { study } => ReferenceError

//Function Declaration case
study();
function study() {
	...
}
//call Stack : { study : f { } }
```

- 함수 표현식 : 변수 호이스팅과 동일하게 동작한다.
- 함수 선언문 : 선언과 동시에 함수가 생성되어 선언 전에도 함수를 사용할 수 있다.

## outerEnvironmentReference

- `outerEnvironmentReference`에 의해 스코프 체인이 가능하다.

```jsx
let hi = "hihi";

function outer() {
	function inner() {
		console.log(hi);
		let hi = "hello";
		console.log(hi);
	}
	inner();
	console.log(hi);
}
outer();
console.log(hi);
// 위 코드의 경우의 scope chain
inner LexicalEnvironment{
	식별자 hi
	outerEnvironmentReference = outer LexicalEnvironment{
		식별자 hi
		outerEnvironmentReference = global LexicalEnvironment{
			식별자 hi
		}
	}
}
```

- 여러 스코프에 동일한 식별자를 선언할 경우  무조건 scope chain상에 먼저 발견된 식별자에만 접근 가능해진다.

> [https://www.youtube.com/watch?v=EWfujNzSUmw&t=723s](https://www.youtube.com/watch?v=EWfujNzSUmw&t=723s)
> 

> [https://heycoding.tistory.com/86#2. 정리](https://heycoding.tistory.com/86#2.%20%EC%A0%95%EB%A6%AC)
> 

> [https://junilhwang.github.io/TIL/Javascript/Domain/Execution-Context/#lexcial-environment](https://junilhwang.github.io/TIL/Javascript/Domain/Execution-Context/#lexcial-environment)
> 

> [https://velog.io/@kwonh/ES6-Javascript-Execution-Context실행문맥-실행컨텍스트](https://velog.io/@kwonh/ES6-Javascript-Execution-Context%EC%8B%A4%ED%96%89%EB%AC%B8%EB%A7%A5-%EC%8B%A4%ED%96%89%EC%BB%A8%ED%85%8D%EC%8A%A4%ED%8A%B8)
> 

---

# this

- 실행 컨텍스트 생성 → ThisBinding 결정 ⇒ this : 함수를 호출할 때 결정되는 것 (현재 실행되는 코드의 실행 컨텍스트)
- binding :  식별자와 값을 연결하는 과정 → this(식별자) 와 this가 가리킬 객체를 바인딩 하는 것
- JS의 this는 동적으로 결정되고, strict mode(엄격 모드) 또한 ThisBinding에 영향을 준다.
- 함수 선언 위치와 상관없이 어디서 어떻게 함수를 호출하느냐에 따라 결정된다.

## 함수 호출 방법

- 기본 바인딩
- 암시적 바인딩
- 명시적 바인딩
- new 바인딩
- 화살표 함수

### 기본 바인딩

- 일반 함수 호출
- 브라우저 환경에선 `window`

```jsx
function foo() {
	console.log(this) //window
	function bar() {
		console.log(this); //window
	}
	bar();
}
foo();

//callback 함수의 경우 제어권을 가지는 함수가 this결정
setTimeout(function() {
	console.log(this); //window
}, 100);
[1,2,3,4,5].forEach((num) => {
	console.log(this, num); // window, num
}); 

document.body.querySelector('#id').addEventListener('click', function(e) {
  console.log(this, e); // '#id' 엘리먼트와 클릭 이벤트에 대한 객체
});
```

### 암시적 바인딩 (메서드 호출)

- 함수가 객체의 메서드로서 호출되는 상황에서 this가 바인딩되는 것
- 콘텍스트 객체에 바인딩 된다.
- 해당 함수를 호출하는 구문 앞 점 또는 대괄호 표기 있는 경우 암시적 바인딩이다.

```jsx
const obj = {
  outer: function() {
    console.log(this);
    const inner = function() {
      console.log(this); // 함수 실행=> window
    };
    inner();
  },
};
obj.outer(); // 메서드 호출=> obj
```

### 명시적 바인딩

- 프로토타입 메소드 : `call()`, `apply()`, `bind()`  중 하나를 호출하여 this 바인딩을 코드에 명시하는 것
- 명시한 객체에 바인딩된다.

```jsx
//call : 함수 즉시 실행, 첫 번째 인자를 this로 바인딩
// 두 번째 인자들을 호출할 함수의 매개변수로 쓴다.
function foo() {
	console.log(this.a);
}
const obj = { a : 2};
foo.call(obj); //obj를 바인딩하라고 call했기에 this = obj
foo(obj); //undefined

//apply : call과 유사하나 두 번째 매개변수에서 배열을 받는다.
function foo(a, b, c) {
  console.log(this, a, b, c);
}
const obj = { a: 2 };

foo.call(obj, 4, 5, 6); // { a: 2 } 4 5 6
// apply는 두 번째 인자로 함수 인수들의 배열을 받는다.
foo.apply(obj, [4, 5, 6]); // { a: 2 } 4 5 6

//bind : 함수 호출 x, this로 사용할 객체만 전달한다.
const foo = {
  a: 20,
}

function bar() {
  console.log(this.a);
}

const bound = bar.bind(foo) // 하드 바인딩
//bound는 호출될 때마다 처음 정해진 this바인딩(foo)를 가지고 호출된다.

bound(); // 20
```

### new 바인딩

- 함수 호출 시 `new`키워드를 사용하는 것으로 객체를 초기화 할 때 사용
    
    ⇒ 이때의 함수 : 생성자 함수
    
- 생성자 함수에서 this키워드를 해당 생성자를 이용해 생성할 객체에 대한 참조로 사용한다.

```jsx
function Toy(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}

const woody = new Toy('PIXAR', 'cowboy', 1995);
const wallE = new Toy('PIXAR', 'robot', 2008);
const remy = Toy('PIXAR', 'rat', 2007);

console.log(woody.make); // 'PIXAR'
console.log(wallE.model); // 'robot'
console.log(remy); // undefined. new 생성자를 사용하지 않았기 때문에 일반함수로 호출되어 this는 전역객체를 가리킨다.
```

### 화살표 함수

- 함수 자체의 this 바인딩을 갖지 않고 렉시컬 스코프로 this를 바인딩한다.
- 화살표 함수 내부에서 this를 참조하면 상위 스코프의 this를 그대로 참조한다.
- 콜백 함수로 사용할 때 유용하다. (`apply`, `bind`, `new 함수`로 오버라이드를 할 수 없기 때문이다.

```jsx
const foo = {
  a: 20,
  bar: function () {
    setTimeout(() => {
      console.log(this.a); //this : foo
    }, 1);
  }
}

foo.bar(); // 20
```

> [https://velog.io/@edie_ko/js-this](https://velog.io/@edie_ko/js-this)
> 

> [https://seungtaek-overflow.tistory.com/21](https://seungtaek-overflow.tistory.com/21)
> 

# 클로저

```jsx
function outerFunc() {
  var x = 10;
  var innerFunc = function () { console.log(x); };
  return innerFunc;
}
var inner = outerFunc();
inner(); // 10
```

- `outerFunc`가 `innerFunc`를 반환하고 콜스택에서 제거되었지만 `innerFunc`가 `outerFunc`를 기억하고있다.
- 자신을 포함하고 있는 외부함수보다 내부함수가 더 오래 유지되는 경우, 외부 함수 밖에서 내부함수가 호출되더라도 외부 함수의 지역 변수에 접근할 수 있는 함수
- **함수와 그 함수가 선언됐을 때의 렉시컬 환경과의 조합이다. → 함수가 속한 렉시컬 스코프를 기억해 함수가 렉시컬 스코프 밖에서 실행될 때 그 스코프에 접근할 수 있게 하는 기능**
- 클로저에 의해 참조되는 외부함수의 변수를 자유변수라 한다.
    
    ⇒ 위 코드에서 `outerFunc`의 x : 자유변수
    

```jsx
var counter = function() {
  var count = 0;
  function changeCount(number) {
    count += number;
  }
  return {
    increase: function() {
      changeCount(1);
    },
    decrease: function() {
      changeCount(-1);
    },
    show: function() {
      alert(count);
    }
  }
};
var counterClosure = counter();
counterClosure.increase();
counterClosure.show(); // 1
counterClosure.decrease();
counterClosure.show(); // 0
```

- couter() 호출시 counterClosure과 counter가 담긴 scope chain생성
- couterClosure에서 count로 접근이 가능하다.
- return 안에 들어있는 함수들은 count변수, changeCount 함수와 이를 포함하는 스코프에 대한 클로저이다.
- 자바스크립트에서 사용자를 통제하기 위한 기본적인 방법이 `클로저`이다.
- 잘못 사용하면 성능 문제와 메모리 문제가 발생할 수 있다.
