# [11주차] axios vs fetch

## Ajax

- `Asynchronous Javascript And Xml`  - 비동기식 자바스크립트와 Xml
- Javascript와 Xml을 활용한 비동기적 정보교환비법
- `XMLHttpRequest` 객체를 활용하여 전체 페이지를 고치지 않고 페이지의 일부를 위한 데이터를 로드하는 기법이다.

## 비동기 방식

- JS엔진 : 한 번에 하나의 테스크만을 가지는 싱글 스레드 방식 → 처리에 시간이 걸리는 경우 블로킹발생
    
    ⇒ 실행중인 테스크가 종료될 때까지 다음 테스크가 대기하는 방식 : `동기(Synchrounous) 처리`
    
- `비동기(Asynchrounous) 처리` : 실행중인 테스크가 종료되지 않더라도 다음 테스크를 실행하는 방식

## axios

- backend ↔ frontend통신 원활히 하기 위해 Ajax와 더불어 사용
- 브라우저, Node.js를 위한 Promise API를 활용하는 HTTP비동기 통신 라이브러리
- 서드파티 라이브러리 → npm, yarn 패키지 매니저 통해서 설치해야된다.
- 운영 환경에 따라 `XMLHttpRequest` 객체 or `http api` 사용
- 요청, 응답 데이터의 변형
- HTTP 요청 취소, HTTP 요청 & 응답을 JSON 형태로 변경

```jsx
axios({
	url: 'http 웹문서 주소',
	method: 'get', //통신방식 설정
	headers: { 'X-Requested-With': 'XMLHttpRequest'}, //헤더 설정
	params: { ... }, //파라미터 설정
	responseType: 'json' //default값
	...
})
.then(function(response) {
	...
}
```

- 기본 Params → method, url, data(optional), Params(optional)

### axios method

- GET : `axios.get(url[,config])`
- POST: `axios.post(url, data[,config])`
- PUT : `axios.put(url,data[,config])`
- DELETE : `axios.delete(url[,config])`

```jsx
//example
axios({
	method: 'get',
	url: 'url',
	responseType: 'type'
}).then(function(response){
	...
});

//단축 사용법
axios.get('url)
	.then(response => {
		//response시
	}).catch(error => {
		//error발생
	}).then(() => {
		//항상 실행
	});
// async await 함수 사용시
try {
	const data = await axios.get('url');
} catch {
	...
}
```

---

## Fetch API

- 네트워크 요청을 위해 `fetch()` 메서드를 제공하는 인터페이스
- promise 기반의 HTTP 클라이언트

```jsx
//fetch 커스텀 설정
fetch(url, {
	method: 'method Type',
	headers: {
		...
	},
	body: JSON.stringfy({}),
});

//사용예
fetch(url)
	.then((response) => response.json())
	.then((data) => console.log(data));

```

- fetch() : promise반환 → JSON데이터 포맷이 아니기에 `.json()` 메서드 호출 → `JSON` 형식의 데이터로 resolve된 promise반환
- fetch는 네트워크 장애의 경우에만 promise거부, 나머지 예외 상황에서는 수동으로 HTTP에러 처리해야한다.
- HTTP메서드 → POST, GET, PUT, DELETE
    - GET : 자원 요청
    
    ```jsx
    fetch(url)
    	.then((response) => response.json())
    	.then((data) => console.log(data));
    ```
    
    - POST: 새로운 자원 생성 요청 (폼을 사용해 데이터를 만들 때, 데이터의 양이 많을 때, 개인정보 보낼때 사용)
    
    ```jsx
    fetch('url', {
    	method: 'POST',
    	headers: {
    		'Content-Type': 'application/json',	
    	},
    	body: JSON.stringfy({
    		title: 'T
    )
    ```
    
    - 
- 응답 본문 얻을 때 쓰는 메서드
    - `response.text()`
    - `response.json()`
    - `response.formData()` : FormData객체 형태로 반환

---

## fetch & axios 차이 정리

| axios | Fetch |
| --- | --- |
| 요청객체에 url | 요청 객체에 url 없음 |
| 써드파티 패키지 | Builts-in APIs이기에 모던 브라우저에서 사용 가능하다 |
| 사이트간 요청 위조 보호해준다. | 별도 보호 없음 |
| data속성 & object포함 | body속성 & body 문자열화 |
| 자동으로 JSON데이터 형식으로 변환 | .json()메서드로 수동 변환해야한다. |