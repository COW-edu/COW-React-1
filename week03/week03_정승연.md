# DOM VS VirtualDom, MPA VS SPA, CSR VS SSR

작성일시: 2023년 7월 24일 오후 9:32
복습: No

# DOM

![https://www.tcpschool.com/lectures/img_js_htmldom.png](https://www.tcpschool.com/lectures/img_js_htmldom.png)

- DOM은 HTML 문서를 브라우저가 파싱한 결과물이며 트리 자료 구조를 가진다.
- DOM은 HTML 문서의 계층적 구조와 정보를 표현하며 이를 제어할 수 있는 API를 제공한다.

## 노드

- HTML 요소는 렌더링 엔진에 의해 파싱되어 DOM을 구성하는 요소 노드 객체로 변환된다.
- 노드의 타입은 대표적으로 문서노드, 요소노드, 어트리뷰트 노드, 텍스트 노드가 존재한다.

### 문서노드

- 문서 노드는 DOM 트리의 최상위에 존재하는 루트 노드로 document 객체를 가르킨다.
- 문서 노드는 window.document 또는 document 로 참조할 수 있다.
- HTML 문서당 document 객체는 유일하다.
- 다른 노드에 접근하려면 문서 노드를 통해 접근해야 한다.

### 요소노드

- 요소 노드는 HTML 요소를 가르키는 객체이다.
- 요소 간의 중첩에 의해 부자 관계를 가지며 이 부자 관계를 통해 정보를 구조화한다.

### 어트리뷰트 노드

- HTML 어트리뷰트를 가르키는 객체로 HTML 요소의 요소 노드와 연결되어 있다.
- 어트리뷰트 노드를 참조하거나 변경하려면 먼저 요소 노드에 접근해야한다.

### 텍스트 노드

- 텍스트 노드는 HTML 요소의 텍스트를 가르키는 객체이다.
- 텍스트 노드는 문서의 정보를 표현한다.
- 텍스트 노드는 DOM 트리의 최종단이다.

# VDOM 등장 배경

- DOM API를 사용하여 DOM 트리를 조작하면 리플로우와 리페인트 과정이 발생한다.
- 오타 수정, 문구 제거 혹은 이미지를 첨부하는 작업 등 DOM을 조작하는 작업은 렌더링 과정을 다시 거친다.
- 이는 생각보다 많은 비용이 드는 작업으로 웹페이지의 성능을 저하한다.
- 이러한 단점을 극복하기 위해 VDOM 이 등장하였다.

# VDOM

![https://codingmedic.files.wordpress.com/2020/11/virtualdom.png?w=1024](https://codingmedic.files.wordpress.com/2020/11/virtualdom.png?w=1024)

- VDOM은 실제 DOM을 복사한 자바스크립트 객체이다.
- DOM의 상태를 메모리에 저장하고 변경 전과 후의 상태를 비교한다.
- 웹페이지의 변경사항이 생겼을 때 직접 DOM을 수정하는 것이 아닌 VDOM을 수정 후 DOM을 수정한다.
- VDOM에서 변경 내역을 한번에 모으고 실제 DOM과 변경된 VDOM의 차이를 판단한 후 , 구성요소의 변경이 된 부분만 찾아 변경하고 그에 따른 최종 결과를 한 번만 렌더링한다.

# MPA와 SSR

## MPA

![https://i0.wp.com/hanamon.kr/wp-content/uploads/2021/03/MPA.png?resize=768%2C415&ssl=1](https://i0.wp.com/hanamon.kr/wp-content/uploads/2021/03/MPA.png?resize=768%2C415&ssl=1)

- 여러 개의 Page로 구성된 Applicaton이다
- MPA는 새로운 페이지를 요청할 때마다 정적 리소스가 다운로드된다. 즉 매번 전체 페이지가 다시 렌더링 된다.
- 새로운 페이지를 요청할 때 마다 서버에서 렌더링 된 정적 리소스가 다운로드된다.
- 정적인 웹페이지를 만들 때 유용하다.

## SSR

![https://i0.wp.com/hanamon.kr/wp-content/uploads/2021/03/SSR.png?resize=768%2C547&ssl=1](https://i0.wp.com/hanamon.kr/wp-content/uploads/2021/03/SSR.png?resize=768%2C547&ssl=1)

- SSR 서버에서 이미 렌더 가능한 상태로 HTML문서를 클라이언트에게 제공한다.
- 클라이언트에 전달 되는 순간 이미 렌더링 준비가 되어있기 때문에 HTML문서는 즉시 렌더링 된다.
- JS 다운 받는 시간 전까지는 웹페이지를 조작할 수 없는 시간이 존재한다.
- 웹페이지의 초기 로딩 시간이 매우 빠르다.
- SEO 최적화에 유리하다.(검색엔진이 크롤링할 정보가 존재함)

# SPA와 CSR

## SPA

![https://i0.wp.com/hanamon.kr/wp-content/uploads/2021/03/SPA.png?resize=768%2C415&ssl=1](https://i0.wp.com/hanamon.kr/wp-content/uploads/2021/03/SPA.png?resize=768%2C415&ssl=1)

- 한 개의 Page로 구성된 Application이다.
- 단 한 번만 리소스를 로딩하며 그 후에는 데이터를 받아 올 때만 서버와 통신한다.
- 첫 웹페이지 진입시 모든 리소스를 다운받기에 초기 로딩시간이 느리다.
- 웹페이지 전환 시 자연스러운 변화가 존재한다.

## CSR

[https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbkJ0my%2FbtrcOM9GT1V%2FaKDCRhm77MfHF8ushplGi0%2Fimg.png](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbkJ0my%2FbtrcOM9GT1V%2FaKDCRhm77MfHF8ushplGi0%2Fimg.png)

- Client가 웹페이지에 접속하면 클라이언트는 웹페이지에 필요한 정적 리소스 모두를 초기에 다운로드한다.
- 다운로드를 받는 시점에서 클라이언트는 아무것도 볼 수 없다.
- 첫 페이지의 로딩 시간은 SSR에 비해 길지만 사이트 안에서의 이동은 매우 자연스럽고 빠르다.
- SEO 최적화에는 불리하다.

[https://i0.wp.com/hanamon.kr/wp-content/uploads/2021/03/SSR.png?resize=768%2C547&ssl=1](https://i0.wp.com/hanamon.kr/wp-content/uploads/2021/03/SSR.png?resize=768%2C547&ssl=1)

[https://i0.wp.com/hanamon.kr/wp-content/uploads/2021/03/SSR.png?resize=768%2C547&ssl=1](https://i0.wp.com/hanamon.kr/wp-content/uploads/2021/03/SSR.png?resize=768%2C547&ssl=1)

[https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbkJ0my%2FbtrcOM9GT1V%2FaKDCRhm77MfHF8ushplGi0%2Fimg.png](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbkJ0my%2FbtrcOM9GT1V%2FaKDCRhm77MfHF8ushplGi0%2Fimg.png)
