# 실행 컨텍스트

## 필요한 개념

### 1. 스코프 (Scope)

> 스코프란 식별자의 유효 범위를 말한다.
> 

### 1-1. 전역 변수 (Global Variables)와 지역 변수 (Local Variables)

```jsx
let global = 30;

function scope() {
  let local = 21;
  console.log(global);
};

scope(); // 30
console.log(local); // Uncaught ReferenceError: local is not defined
```

`scope`라는 함수의 내부에선 변수 `global`의 값을 참조할 수 있다. 모든 코드 블럭에서 접근하여 값을 알아낼 수 있는 변수를 **전역 변수**라고 한다.

반면 외부에서 변수 `local`에 접근하여 값을 콘솔창에 출력하려니 참조 오류(Reference Error)가 발생한다.

이처럼 코드 블럭 안에서 선언되어 전역에서 접근할 수 없는 변수를 **지역 변수**라고 한다.

### 1-2. 함수-레벨 스코프 (Function-Level Scope)와 블록-레벨 스코프 (Block-Level Scope)

블록, 함수 레벨 스코프는 참조 가능한 유효 범위의 경계를 조건문, 반복문을 포함한 코드 블럭`{ }`으로 할지, 오직 함수의 코드 블럭으로 할지의 차이이다.

### 1-2-1. 함수 레벨 스코프

`var`로 선언된 변수와 함수는 함수 내부만 스코프로 인정해주며, 다른 코드 블럭의 변수와 함수는 전역 변수, 전역 함수로 간주한다.

```jsx
function sayHi(name) {
  if (name) {
    var greet = `Hi, ${name}!`;
  }
  console.log(greet);
}

sayHi('Wonkook');
// "Hi, Wonkook!"

//위와 같이 console.log 명령어가 조건문 바깥에 있음에도 greet의 값을 참조할 수 있는 것을 확인할 수 있다.
```

### 1-2-2. 블록 레벨 스코프

ES6부터 등장한 `let`과 `const`로 선언된 변수는 블록 레벨 스코프를 지원한다.

```jsx
function sayHi(name) {
  if (name) {
    let greet = `Hi, ${name}!`;
  }
  console.log(greet);
}

sayHi('Wonkook');
// Uncaught ReferenceError: greet is not defined

//함수 레벨 스코프와 달리 조건문을 포함한 모든 실행 블럭을 스코프로 간주하기 때문에 `greet`을 참조할 수 없게 된다.

**스코프**는 필요한 영역에 한정하여 유효 범위가 좁을수록 좋다.
```

### 1-3. 스코프 체인

> 스코프 체인(Scope Chain)은 일종의 리스트로서 전역 객체와 중첩된 함수의 스코프의 레퍼런스를 차례로 저장하고, 의미 그대로 각각의 **스코프가 어떻게 연결(chain)되고 있는지 보여주는 것**을 말한다.
> 

```jsx
const x = 'x';
function c() {
	const y = 'y';
	console.log('c');
	function b() {
		const z = 'z';
		console.log('b');
		c();
	}
} 

function a() {
	const x = 'x';
	console.log('a');
	b();
}
```

<img width="226" alt="스크린샷 2023-07-18 오후 6 36 48" src="https://github.com/COW-edu/COW-React-1/assets/98771235/376d7fc1-f630-43aa-b8d3-ed1cac85dbb1">


### 1-4. 정적 / 렉시컬 스코프 (Static / Lexical Scope)

> 렉시컬 스코프란 함수를 호출한 곳이 아닌 선언한 곳을 기준으로 스코프를 결정하는 원칙이다.
> 

```jsx
var name = 'zero';
function log() {
  console.log(name);
}

function wrapper() {
  name = 'nero';
  log();
}
wrapper();
//'nero'
```

```jsx
var name = 'zero';
function log() {
  console.log(name);
}

function wrapper() {
  var name = 'nero';
  log();
}
wrapper();
//'zero'
```

수를 처음 선언하는 순간, 함수 내부의 변수는 자기 스코프로부터 가장 가까운 곳(상위 범위에서)에 있는 변수를 계속 참조하게 됩니다. 

위의 예시에서는 log 함수 안의 name 변수는 선언 시 가장 가까운 전역변수 name을 참조하게 됩니다. 그래서 wrapper 안에서 log를 호출해도 지역변수 name='nero'를 참조하는 게 아니라 그대로 전역변수 name의 값인 zero가 나옵니다. 

---

### 2. 호이스팅

> 변수를 선언하고 초기화했을 때 (변수, 함수)선언 부분이 최상단으로 끌어올려지는 현상을 의미합니다. (초기화 또는 대입 부분은 그대로 남아있습니다.)
> 
- var 키워드는 선언과 함께 undefined로 초기화되어 메모리에 저장되는데 let과 const는 초기화되지 않은 상태로 선언만 메모리에 저장된다.

---

### 2-1 호이스팅 규칙

*부등호가 큰 쪽이 먼저 인식된다*

- 변수 선언 > 함수 선언
- 할당되어있는 변수 > 할당되지 않은 변수

---

### 2-2 변수의 호이스팅

**변수는 어떻게 생성되는가**

### 1단계: 선언 단계(Declaration phase)

- 변수를 실행 컨텍스트의 변수 객체에 등록한다.이 변수 객체는 스코프가 참조하는 대상이 된다.

### 2단계: 초기화 단계(Initialization phase)

- 변수 객체에 등록된 변수를 위한 공간을 메모리에 확보한다.이 단계에서 변수는 undefined로 초기화 된다.

### 3단계: 할당 단계(Assignment phase)

- undefined로 초기화된 변수에 실제 값을 할당한다.

### var

- var 키워드로 선언한 변수는 선언 단계와 초기화 단계가 한번에 이뤄진다. 즉, 스코프에 변수를 등록(선언 단계)하고 메모리에 변수를 위한 공간을 확보한 후, undefined로 초기화한다.
- 따라서 변수 선언문 이전에 변수에 접근하여도 스코프에 변수가 존재하기 때문에 에러가 발생하지 않는다. 다만 undefined를 반환한다.

### let , const

- 선언 단계와 초기화 단계가 분리되어 진행된다. 즉, 스코프에 변수를 등록(선언 단계)하지만 초기화 단계는 변수 선언문에 도달했을 때(코드 실행 후) 이뤄진다.
- 초기화 이전에 변수에 접근하려고 하면 참조 에러가 발생한다. 이는 아직 변수가 초기화되지 않았기 때문이다. 즉, 변수를 위한 메모리 공간이 아직 확보되지 않았기 때문이다.

```jsx
// 호이스팅 때문에 선언이 끌어올려져서 오류 안남.
console.log(text); // (선언 + 초기화 된 상태)
text = 'Hanamon!'; // (선언 + 초기화 + 할당 된 상태)
var text;
console.log(text);

// 호이스팅 때문에 선언이 끌어올려졌지만 초기화 안된 상태에서 참조해서 오류 남.
console.log(text); // (선언 된 상태, 초기화(메모리 공간 확보와 undefined로 초기화) 안되서 참조 불가능 -> 에러남)
let text; // 여기서 초기화 단계가 실행됨

const text; // const 키워드로 재할당 불가능! 그래서 선언과 동시에 할당해야함
```

### let, const 도 호이스팅이 될까?

```jsx
var hoist = "AA";

(function func() {
  console.log(hoist); // Output: ReferenceError
  let hoist = "BB";
})();
```

만약 let과 const가 호이스팅이 되지 않는다면 `console.log(hoist)` 에 'AA' 가 출력되어야 하는데 ReferenceError 가 발생한다. 즉 let과 const도 호이스팅된다.

---

### 2-3. 함수의 호이스팅

### 함수 선언식 (Function declarations)

```jsx
hoisted(); // Output: "This function has been hoisted."

function hoisted() {
  console.log('This function has been hoisted.');
};

//함수 선언식은 호이스팅 된다.
```

### 함수 표현식 (Function expressions)

```jsx
expression(); //Output: "TypeError: expression is not a function

var expression = function() {
  console.log('Will this work?');
};
//함수 표현식은 호이스팅 되지 않는다.
```

```jsx
expression(); // Ouput: TypeError: expression is not a function

var expression = function hoisting() {
  console.log('Will this work?');
};

//함수 표현식과 함수 선언식을 조합하여도 마찬가지로 호이스팅 되지 않는다.
```

---

## 실행 컨텍스트

### 1.  실행 컨텍스트

> 실행할 코드에 제공할 환경 정보들을 모아놓은 객체로, 자바스크립트의 동적 언어로서의 성격을 가장 잘 파악할 수 있는 개념이다.
> 
- 코드의 실행 환경

---

### 2. 언제 생성됨?

> 자바스크립트 엔진이 스크립트를 처음 마주할 때 전역 컨텍스트를 생성하고, 콜 스택에 push 한다.
> 
- 엔진이 스크립트를 쭉 읽어내려가면서 함수 호출을 발견할 때마다, 함수의 실행 컨텍스트를 스택에 push한다.
- 중요한 점은 함수 실행 컨텍스트는 함수가 **실행 (선언 X)** 될 때 만들어진다.

---

### 3. 실행 컨텍스트 구성요소

 

- `VariableEnvironment`
    - 현재 컨텍스트 내의 식별자(변수)들에 대한 정보
    - 외부 환경 정보
    - 선언 시점의 LexicalEnvironment의 스냅샷(변경사항 반영 X)

- `LexicalEnvironment`
    - 처음에는 VariableEnvironment와 같음.(복사했기 때문)
    - 변경 사항이 실시간으로 반영됨
    - 실행 컨텍스트를 생성할 때, **variableEnvironment에 정보를 먼저 담은 다음, 이를 그대로 복사해서 Lexical environment를 만들고, 이후에는 Lexical environment를 주로 활용**한다.

![Untitled](%E1%84%89%E1%85%B5%E1%86%AF%E1%84%92%E1%85%A2%E1%86%BC%20%E1%84%8F%E1%85%A5%E1%86%AB%E1%84%90%E1%85%A6%E1%86%A8%E1%84%89%E1%85%B3%E1%84%90%E1%85%B3%205996404cd1034444b7d412c3b6ca956c/Untitled.png)

---

### 4. 실행 컨텍스트의 네 가지 원칙

- 먼저 전역 컨텍스트 하나 생성 후, 함수 호출 시마다 컨텍스트가 생깁니다.
- 컨텍스트 생성 시 컨텍스트 안에 **변수객체**(**arguments, variable), scope chain, this**가 생성됩니다.
- 컨텍스트 생성 후 함수가 실행되는데, 사용되는 변수들은 변수 객체 안에서 값을 찾고, 없다면 스코프 체인을 따라 올라가며 찾습니다.
- 함수 실행이 마무리되면 해당 컨텍스트는 사라집니다.(클로저 제외) 페이지가 종료되면 전역 컨텍스트가 사라집니다.

---

### 5. 실행 컨텍스트의 종류

**1. 전역 실행 컨텍스트**

> : 전역 영역에 존재하는 코드.
> 
- 모든 스크립트 코드는 전역 실행 컨텍스트 안에서 실행된다.
- 프로그램에 단 한 개만 존재하며 실행 컨텍스트의 기본이다. 함수 밖에 있는 코드는 전역 실행 컨텍스트에 있다.
- 전역 컨텍스트는 **arguments**(함수의 인자)가 없고, **variable**은 해당 스코프의 변수들이다.

**2. 함수 실행 컨텍스트**

> : 함수 내에 존재하는 코드.
> 
- 함수가 실행될 때마다 만들어지는 실행 컨텍스트이다.
- 각 함수는 고유의 실행 컨텍스트를 가지며, 함수가 실행되거나 call 될 때에만 생성된다.

**3. eval() 실행 컨텍스트**

> : eval 함수로 실행되는 코드.
> 
- 이제 쓰지 않는 eval() 함수에 의해 생성되는 실행 컨텍스트이다.

---

### 6. 예제

예제 1번 

```jsx
var name = 'zero'; // (1)변수 선언 (6)변수 대입
function wow(word) { // (2)변수 선언 (3)변수 대입
  console.log(word + ' ' + name); // (11)
}
function say () { // (4)변수 선언 (5)변수 대입
  var name = 'nero'; // (8)
  console.log(name); // (9)
  wow('hello'); // (10)
}
say(); // (7)

//nero, hello zero 
```

**전역 컨텍스트** 

전역 컨텍스트가 생성된 후 두 번째 원칙에 따라 변수객체, scope chain, this가 들어옵니다. 전역 컨텍스트는 **arguments**(함수의 인자를 말합니다)가 없고요. **variable**은 해당 스코프의 변수들입니다.

```jsx
'전역 컨텍스트': {
  변수객체: {
    arguments: null,
    variable: ['name', 'wow', 'say'],
  },
  scopeChain: ['전역 변수객체'],
  this: window,
}
```

이제 코드를 위에서부터 실행하는데요. wow랑 say는 **호이스팅** 때문에 선언과 동시에 대입이 됩니다. 그 후 variable의 name에 'zero'가 대입됩니다.

```jsx
variable: [{ name: 'zero' }, { wow: Function }, { say: Function }]
```

**함수 컨텍스트** 

(7)번에서 `say();`를 하는 순간 새로운 컨텍스트인 say 함수 컨텍스트가 생깁니다. 아까 전역 컨텍스트는 그대로 있습니다.

 **arguments**는 없고, **variable**은 name뿐이네요. **scope chain**은 say 변수객체와 상위의 전역 변수객체입니다. **this**는 따로 설정해준 적이 없으니까 window입니다.

```jsx
'say 컨텍스트': {
  변수객체: {
    arguments: null,
    variable: ['name'], // 초기화 후 [{ name: 'nero' }]가 됨
  },
  scopeChain: ['say 변수객체', '전역 변수객체'],
  this: window,
}
```

(10)번에서 wow함수가 호출되었으니 wow 컨텍스트도 생깁니다. **arguments**는 word = 'hello'고, **scope chain**은 wow 스코프와 전역 스코프입니다. 

lexical scoping에 따라 wow 함수의 스코프 체인은 선언 시에 이미 정해져 있습니다. 따라서 say 스코프는 wow 컨텍스트의 **scope chain**이 아닙니다. **variable**은 없고, **this**는 window입니다.

```jsx
'wow 컨텍스트': {
  변수객체: {
    arguments: [{ word : 'hello' }],
    variable: null,
  },
  scopeChain: ['wow 변수객체', '전역 변수객체'],
  this: window,
}
```

**함수표현식과 선언식을 컨텍스트로 분석 (호이스팅)** 

 예제 2번 

```jsx
sayWow(); // (3)
sayYeah(); // (5) 여기서 대입되기 전에 호출해서 에러
var sayYeah = function() { // (1) 선언 (6) 대입
  console.log('yeah');
}
function sayWow() { // (2) 선언과 동시에 초기화(호이스팅)
  console.log('wow'); // (4)
}
```

일단 처음 실행 시는 전역 컨텍스트가 먼저 생성되고, sayWow 함수는 함수 선언식이므로 컨텍스트 생성 후 바로 대입됩니다.

```jsx
'전역 컨텍스트': {
  변수객체: {
    arguments: null,
    variable: [{ sayWow: Function }, 'sayYeah'],
  },
  scopeChain: ['전역 변수객체'],
  this: window,
}
```

컨텍스트 생성 및 코드가 순차적으로 실행되는데 sayYeah는 대입되기 전에 호출해서 에러가 발생합니다. 

### 7. 클로저

```jsx
var makeClosure = function() {
  var name = 'zero';
  return function () {
    console.log(name);
  }
};
var closure = makeClosure(); // function () { console.log(name); }
closure(); // 'zero';
```

closure 함수 안에 console.log(name)이 있는데요. name은 closure 함수의 매개변수도 아니고, closure 함수 내부에서 생성한 변수도 아닙니다. 

바로 이런 것이 비공개 변수입니다. `function() { console.log(name) }`은 name 변수나, name 변수가 있는 스코프에 대해 클로저라고 부를 수 있습니다.

**컨텍스트로 분석**

```jsx
"전역 컨텍스트": {
  변수객체: {
    arguments: null,
    variable: [{ makeClosure: Function }, 'closure'],
  },
  scopeChain: ['전역 변수객체'],
  this: window,
}
"makeClosure 컨텍스트": {
  변수객체: {
    arguments: null,
    variable: [{ name: 'zero' }],
  },
  scopeChain: ['makeClosure 변수객체', '전역 변수객체'],
  this: window,
}
```

주목할 점은 `closure = makeClosure()`할 때의 상황입니다. function을 return하는데 그 function 선언 시의 **scope chain**은 lexical scoping을 따라서 `['makeClosure 변수객체', '전역 변수객체']`를 포함합니다. 따라서 closure을 호출할 때 컨텍스트는 다음과 같습니다.

```jsx
"closure 컨텍스트":  {
  변수객체: {
    arguments: null,
    variable: null,
  scopeChain: ['closure 변수객체', 'makeClosure 변수객체', '전역 변수객체'],
  this: window,
}
```

따라서 closure 함수에서 **scope chain**을 통해 makeClosure의 name 변수에 접근할 수 있습니다.

---