# [3주차] DOM과 virtualDOM, MPA vs SPA, CSR vs SSR

## DOM & virtualDOM

### DOM : The Documnet Object Model

- 문서객체모델, HTML, XML 문서의 프로그래밍 interface
- 문서의 구조화된 표현을 제공하며 프로그래밍 언어가 DOM 구조에 접근할 수 있는 방법을 제공하여 구조, 스타일, 내용 등을 변경하도록 돕는다.
- 동일한 문서를 표현하고 저장하며, 조장하는 방법을 제공한다.
- 웹 페이지의 객체 지향 표현이며, 자바스크립트와 같은 스크립팅 언어를 이용해 DOM을 수정할 수 있다.

⇒ HTML과 스크립팅 언어(JS)를 이어주는 역할이다.

- DOM을 변경해야할 소요가 있을 때 CRP과정을 처음부터 다시 반복하며 상당히 비효율적인 비용 발생한다.

⇒ DOM 복잡도 증가에 따라 최적화 및 유지보수가 더 어려워진 문제를 해결하기 위한 `Virtual DOM` 등장

### Virtual DOM

- 실제 DOM을 모방하는 형태로 메모리 상에서만 존재하는 가상의 DOM의미한다.
- 변경사항을 DOM에 직접 수정하는 것이 아닌 중간 단계로 Virtual DOM을 수정하고 Virtual DOM을 통해 DOM을 수정하게 한다.

→ 딱 한 번만 렌더링을 진행하도록 한다.

![https://codingmedic.files.wordpress.com/2020/11/virtualdom.png](https://codingmedic.files.wordpress.com/2020/11/virtualdom.png)

- 수정 사항이 생겼을 때 가상 DOM이 달라진 값 확인 후 변경, 최종 결과물을 DOM에 전달한다.
- DOM에 직접 변경을 하게 되면 전체가 재렌더링 되기에 브라우저 과부화가 올 수 있다. → 최대한 DOM에 직접 접근하지 말아야한다.
- 메모리의 사용량이 많다는 단점도 존재한다.

연산 횟수와 비용의 비교

- Virtual DOM : 30개의 노드를 하나씩 수정시 모든 변화를 하나로 묶어서 한 번만 DOM에 던지기에 레이아웃 계산과 리렌더링의 규모가 커지지만 연산의 횟수가 단 1회이다.
- DOM : 30개의 노드를 하나씩 수정시 30번의 (잠재적)레이아웃 재계산 및 (잠재적) 리렌더링을 초래하기에 연산의 횟수가 많지만 연산의 비용이 적다.

### React

- 두 개의 가상돔 객체를 가지고 있다.
    - 렌더링 이전 화면 구조를 나타내는 Virtual DOM
    - 렌더링 이후 화면에 보이게될 화면 구조를 나타내는 Virtual DOM
- `Diffing` : 렌더링 이전 화면 구조를 가진 Virtual DOM과 업데이트 이후 화면구조를 가질 Virtual DOM을 비교해 어떤 요소가 변화했는지 비교
- 변경된 모든 요소를 집단화하여 실제 DOM에 적용하는 `Batch Update` 를 통해 한 번의 연산을 통해 그려지게된다.

## SPA & MPA

### SPA : Single Page Application

- 하나의 페이지로 구성된 애플리케이션
- 웹 애플리케이션에 필요한 모든 정적 리소스를 최초에 다운받는다. 캐시에 저장해놓는다.
- 필요한 데이터만 요청해 JSON으로 받아 동적으로 렌더링하기에 화면에 노출되는 속도가 빠르다.

[https://github.com/COW-edu/COW-React-1/assets/127816010/460477e2-7985-4816-adc5-c850013932d4](https://github.com/COW-edu/COW-React-1/assets/127816010/460477e2-7985-4816-adc5-c850013932d4)

- 화면에 노출되는 속도가 빠르다.
- 맨 처음 로딩시 전체 리소스를 다운받기에 로딩시간이 걸린다.
- CSR방식으로 만든 SPA는 검색엔진최적화(SEO)가 어렵다.

### MPA : Multi Page Application

- 새로운 페이지 요청시마다 정적 리소스를 다운받는다.
- 페이지 이동시나 새로고침시 전체 페이지를 재렌더링한다.

[https://github.com/COW-edu/COW-React-1/assets/127816010/6f467dac-e239-48b3-bef6-d026b3e4b4cb](https://github.com/COW-edu/COW-React-1/assets/127816010/6f467dac-e239-48b3-bef6-d026b3e4b4cb)

- 검색엔진 최적화 관점에서 굉장히 유리하다.
- 첫 로딩이 매우 짧다. (서버에서 렌더링해 가져오기에)
- 새로운 페이지 이동시마다 재렌더링하여 깜빡거린다.
- 페이지 이동시 불필요한 템플릿도 중복하여 로딩한다.
- 서버 렌더링에 따른 부하가 발생한다.

## CSR & SSR

### CSR : Client Side Rendering

- 사용자가 처음 접속할 때 서버 측에서 HTML과 JS를 사용자에게 보내주면 렌더링을 시작한다.

[https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FEk28V%2FbtrFde42IHr%2Fyb4wyWVcsqkV96kkrpS4Z0%2Fimg.png](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FEk28V%2FbtrFde42IHr%2Fyb4wyWVcsqkV96kkrpS4Z0%2Fimg.png)

- 동작과정
    1. 웹페이지 방문시 브라우저가 서버에 콘텐츠를 요청, 서버는 빈 뼈대만 있는 html을 응답으로 보내준다.
    2. 브라우저가 js링크를 통해 서버로부터 js파일을 다운받고 이를 통해 동적으로 페이지를 만들어 띄운다.
- 장점
    - 필요한 데이터만 서버에 요청하기에 초딩 이후 구동 속도 빠르다.
    - 서버가 뼈대만 있는 html만 보내주면 되기에 부하가 적다.
    - 클라이언트가 연산, 라우팅 직접 처리하기에 반응 속도가 빠르다.
- 단점
    - js파일을 다운받고, 동적으로 dom을 생성하는 시간을 기다려야하기에 초기 속도 느리다.
    - js가 실행되어야 metadata가 바뀌기에 검색엔진최적화에 불리하다.

### SSR : Server Side Rendering

- 서버 측에서 렌더링 준비가 다 끝난 채로 사용자에게 전달된다.

[https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FctbYqm%2FbtrE8OfqPyZ%2FV89cr1aPQZemy8tNmnhLek%2Fimg.png](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FctbYqm%2FbtrE8OfqPyZ%2FV89cr1aPQZemy8tNmnhLek%2Fimg.png)

- 동작과정
    1. 웹페이지 방문시 브라우저가 서버에 컨텐츠를 요청한다.
    2. 서버는 페이지에 필요한 데이터를 모두 삽입하고 css까지 적용하여 렌더링 준비를 마친 html과 js를 전달한다.
    3. 브라우저가 전달받은 페이지를 띄우고 js code를 다운한 후 로직을 연결한다.
- 장점
    - 초기 구동 속도가 빠르다.
    - 검색엔진 최적화에 유리하다.
- 단점
    - js 로직이 연결될 때 까지 사용자의 입력에 응답할 수 없다.
        
        ⇒ TTV(Time To View) 와 TTI(Time to Interact)간 시간차가 존재한다.