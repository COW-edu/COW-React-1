# axios vs fetch

작성일시: 2023년 9월 19일 오후 7:17
복습: No

# fetch

- Fetch API는 HTTP 파이프라인을 구성하는 요청과 응답 등의 요소를 JS에서 접근하고 조작할 수 있는 인터페이스를 제공한다

```jsx
async function logJSONData() {
  const response = await fetch("http://example.com/movies.json"); // option을 따로 주지 않으면 GET 요청
  const jsonData = await response.json();
  console.log(jsonData);
}
```

- fetch 함수는 첫번째 인자로 URL, 두번째 인자로 옵션 객체를 받는다.

### fetch- GET

- 존재하는 자원을 요청
- 단순히 원격 API에 있는 데이터를 가져올 때 사용
- fetch 함순ㄴ 디폴트로 GET 방식으로 작동하고 옵션 인자고 필요 없음
- response 객체는 json 메서드를 제공하고 이 메서드를 호출하면 response 객체로부터 JSON 형태의 데이터를 자바스크립트 객체로 변경

### fetch-POST

- 폼 등을 사용해서 데이터를 만들어 낼 때 사용
- method 옵션을 POST로 지정해주고 header 옵션으로 JSON 포맷을 사용한다고 알려줘야 함. body 옵션에는 요쳥 데이터를 JSON 포맷으로 넣어줌

```jsx
fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST", // POST
  headers: { // 헤더 조작
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ // 자바스크립트 객체를 json화 한다.
    title: "Test",
    body: "I am testing!",
    userId: 1,
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
```

### fetch-PUT

- 존재하는 자원 변경 요청
- API에서 관리하는 데이터의 수정을 위해 사용
- 아예 전체를 body의 데이터로 교체해버림

```jsx
fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    title: "Test" // 아예 title 엘리먼트로 전체 데이터를 바꿈. 마치 innerHTML같이.
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
```

### fetch-PATCH

- 존재하는 자원 일부 변경
- body의 데이터와 알맞은 일부만을 교체함

```jsx
fetch("https://jsonplaceholder.typicode.com/posts/1", { // posts의 id 1인 엘리먼트를 수정
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    title: "Test" // title만 바꿈. 나머지 요소는 건들지 않음.
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
```

### fetch-DELETE

- 존재하는 자원 삭제
- 보낼 데이터가 없기 때문에 headers,body 옵션이 필요 없다

```jsx
fetch("https://jsonplaceholder.typicode.com/posts/1", {
  method: "DELETE",
})
  .then((response) => response.json())
  .then((data) => console.log(data))
```

# axios

- 브라우저, Node.js를 위한 Promise API를 활용하는 HTTP 비동기 통신 라이브러리다

```jsx
axios({
    method: "get", // 통신 방식
    url: "www.naver.com", // 서버
    headers: {'X-Requested-With': 'XMLHttpRequest'} // 요청 헤더 설정
    params: { api_key: "1234", langualge: "en" }, // ?파라미터를 전달
    responseType: 'json', // default
    
    maxContentLength: 2000, // http 응답 내용의 max 사이즈
    validateStatus: function (status) {
      return status >= 200 && status < 300; // default
    }, // HTTP응답 상태 코드에 대해 promise의 반환 값이 resolve 또는 reject 할지 지정
    proxy: {
      host: '127.0.0.1',
      port: 9000,
      auth: {
        username: 'mikeymike',
        password: 'rapunz3l'
      }
    }, // proxy서버의 hostname과 port를 정의
    maxRedirects: 5, // node.js에서 사용되는 리다이렉트 최대치를 지정
    httpsAgent: new https.Agent({ keepAlive: true }), // node.js에서 https를 요청을 할때 사용자 정의 agent를 정의
})
.then(function (response) {
    // response Action
});
```