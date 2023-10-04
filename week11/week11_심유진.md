# axios vs fetch

> Fetch 와 axios는 모두 promise 기반의 HTTP 클라이언트입니다. 즉 이 클라이언트를 이용해 네트워크 요청을 하면 이행(resolve) 혹은 거부(reject)할 수 있는 promise가 반환됩니다.
> 

**promise ?**

웹 페이지에서 서버로 데이터를 요청했을 때, 데이터를 모두 받기 전에 웹에 출력하려고 하는 경우를 방지하기 위해 활용됩니다. 즉, Promise 객체는 비동기 로직을 마치 동기처럼 사용할 수 있는 기능을 가집니다.

예를 들어 비동기 로직인 A, B, C 로직이 있다고 했을때 이를 Promise를 사용하지 않고 실행시키면 먼저 로직이 끝나는 순서로 출력이 되지만, Promise를 사용하면 A, B, C 순서대로 출력을 시킬 수 있습니다.

---

### **Fetch와 Axios의 문법**

```jsx
fetch(url, { 
//첫 번째 인자 : 가져오고자 하는 리소스의 URL입니다. 
//두 번째 인자 : 요청의 설정 옵션을 포함하는 객체로 선택적 인자

  method: "GET", // 다른 옵션도 가능합니다 (POST, PUT, DELETE, etc.)
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({}),
});
```

Axios의 문법도 비슷하나, 다양한 방법으로 요청할 수 있습니다.

```jsx
axios(url, {
  method: "get", // 다른 옵션도 가능합니다 (post, put, delete, etc.)
  headers: {},
  data: {},
});
```

fetch 메서드처럼 HTTP 메서드 없이 요청할 경우 기본적으로 GET 요청을 생성합니다.

- Fetch()는 body 프로퍼티를 사용하고, axios는 data 프로퍼티를 사용합니다.
- Fetch의 url이 Fetch() 함수의 인자로 들어가고, axios에서는 url이 option 객체로 들어갑니다.
- Fetch에서 body 부분은 stringify()가 됩니다.

---

### **응답 처리의 차이**

```jsx
fetch("https://localhost:8080/urlurl", {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow', 
        referrer: 'no-referrer',
        body: JSON.stringify(obj),
    })//fetch 실행이 끝나면 then의 내용 실행
    //응답을 JSON 형태로 파싱한다
    .then(response => response.json()) 
    .then(function (res){
    
    })
```

`fetch()`는 `.then()` 메서드에서 처리된 promise를 반환합니다. 이 때는 아직 우리가 필요한 JSON 데이터의 포맷이 아니기 때문에 응답 객체의 `.json()` 메서드를 호출합니다. 그러면 JSON 형식의 데이터로 이행된 또 다른 promise를 반환합니다. → 일반적인 fetch 요청은 두 개의 `.then()` 호출을 갖습니다.

```jsx
const url = "https://jsonplaceholder.typicode.com/todos";

axios.get(url).then((response) => console.log(response.data));
```

Axios를 사용하면 응답 데이터를 기본적으로 JSON 타입으로 사용할 수 있습니다. 

---

### **데이터 전송**

**Fetch**

Fetch API를 사용한다면 `JSON.stringify()`를 사용하여 객체를 문자열으로 변환한 뒤 `body`에 할당해야 합니다.

```jsx
const url = "https://jsonplaceholder.typicode.com/todos";

const todo = {
  title: "A new todo",
  completed: false,
};

fetch(url, {
  method: "post",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(todo),
})
  .then((response) => response.json())
  .then((data) => console.log(data));
```

또한 Fetch를 사용하면 명시적으로 `Content-Type`을 `application/json`으로 설정해야 합니다.

**Axios**

`POST` 메서드로 JavaScript 객체를 API로 전송하면 Axios가 자동으로 데이터를 문자열로 변환해줍니다.

다음은 Axios를 사용해 `post` 요청을 수행하는 코드입니다.

```jsx
const url = "https://jsonplaceholder.typicode.com/todos";

const todo = {
  title: "A new todo",
  completed: false,
};

axios
  .post(url, {
    headers: {
      "Content-Type": "application/json", // 컨텐츠 유형 헤더도 설정
    },
    data: todo,
  })
  .then(console.log);
```

Axios로 `post`요청을 할 때 요청 본문(request body)으로 보내고자 하는 `data`는 data 프로퍼티에 할당합니다. 컨텐츠 유형 헤더도 설정할 수 있습니다. 

---

### **에러 처리**

**Fetch**

Fetch는 404 에러나 다른 HTTP 에러 응답을 받았다고 해서 promise를 거부(reject)하지 않습니다. Fetch는 네트워크 장애가 발생한 경우에만 promise를 거부(reject) 합니다. 따라서 `.then`절을 사용해 수동으로 HTTP 에러를 처리해야 합니다.

```jsx
const url = "https://jsonplaceholder.typicode.com/todos";

fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error(
        `This is an HTTP error: The status is ${response.status}`);
    }
    return response.json();
  })
  .then(console.log)
  .catch((err) => {
    console.log(err.message);
  });
```

응답 블록에서 응답의 ok 상태가 false인 경우 에러 상황을 예외처리를 해줘야 하는데 이 때 `catch`를 사용해서 에러 상황을 핸들링할 수 있습니다.

다음과 같이 응답 객체에서 사용할 수 있는 메서드를 살펴볼 수 있습니다.

만약 잘못된 URL 엔드포인트를 요청했을 경우 `ok`와 `status` 속성은 각각 `false`와 `404`값을 가지게 됩니다. 이에 에러를 발생시키고 `.catch()`절에서 커스텀 에러 메세지를 출력합니다.

그런데 아예 서버가 다운돼있어서 생기는 에러가 아니라 데이터를 어떻게든 가져오지만 그 데이터 안에 에러가 있는 경우는 catch 구문으로 들어오지 않습니다. 그래서 fetch를 통해서 받아오는 응답객체인 res의 상태를 검사하는 방법도 있습니다. 

```jsx
setTimeout(() => {
      fetch("http://localhost:8000/blogs")
        .then(res => {
      	//fetch를 통해 받아온 res객체 안에
        //ok 프로퍼티가 있음
          if (!res.ok) {
            throw Error("could not fetch the data that resource");
          }
          return res.json();
        })
        .then(data => {
          setBlogs(data);
          setIsPending(false);
          setError(null);
        //정상적으로 데이터가 오면
        //Loading, error메세지가 출력이 되지 않게
        })
```

**Axios**

Axios에서 `.catch()`를 사용한 일반적인 에러 처리는 다음과 같습니다.

```jsx
const url = "https://jsonplaceholder.typicode.com/todos";

axios
  .get(url)
  .then((response) => console.log(response.data))
  .catch((err) => {
    console.log(err.message);
  });
```

Axios의 promise는 상태코드가 2xx의 범위를 넘어가면 거부(reject)합니다. 에러 객체에 응답(response) 또는 요청(request) 프로퍼티가 포함되어 있는지 확인하여 에러에 대한 자세한 정보를 확인할 수 있습니다.

```jsx
.catch((err) => {
// 에러 처리
if (err.response) {
// 요청이 이루어졌고 서버가 응답했을 경우

    const { status, config } = err.response;

    if (status === 404) {
      console.log(`${config.url} not found`);
    }
    if (status === 500) {
      console.log("Server error");
    }

  } else if (err.request) {
    // 요청이 이루어졌으나 서버에서 응답이 없었을 경우
    console.log("Error", err.message);
  } else {
    // 그 외 다른 에러
    console.log("Error", err.message);
  }
});
```

에러 객체의 `response` 프로퍼티는 클라이언트가 2xx 범위를 벗어나는 상태 코드를 가진 에러 응답을 받았음을 나타냅니다. 에러 객체의 `request` 프로퍼티는 요청이 수행되었지만 클라이언트가 응답을 받지 못했음을 나타냅니다. 요청 또는 응답 속성이 모두 없는 경우는 네트워크 요청을 설정하는 동안 오류가 발생한 경우입니다.

---

**응답 시간 초과 / 요청 취소**

Fetch를 통한 요청을 취소하기 위해서는 [AbortController 인터페이스](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)를 사용할 수 있습니다. 다음과 같이 사용할 수 있습니다.

```jsx
const url = "https://jsonplaceholder.typicode.com/todos";

const controller = new AbortController();
const signal = controller.signal;
setTimeout(() => controller.abort(), 4000);

fetch(url, {
  signal: signal,
})
  .then((response) => response.json())
  .then(console.log)
  .catch((err) => {
    console.error(err.message);
  });
```

`controller` 객체를 생성하고나서 `signal` 객체와 `abort()` 메서드에 접근했습니다. 이 `signal`객체를 설정 옵션을 통해 `fetch()`에 넘깁니다. 이렇게 하면 abort 메서드가 호출될 때마다 fetch 요청이 종료됩니다. 보시다시피 `setTimeout` 기능을 사용하여 서버가 4초 이내에 응답하지 않으면 작업이 종료됩니다.

Axios에서는 `timeout` 속성을 설정 객체에 추가하여 요청이 종료될 때까지의 시간을 밀리초로 지정할 수 있습니다.

다음 코드 스니펫에서는 만약 요청이 4초 이상 걸릴 경우에 종료하고 console창에 error를 로깅하고 있습니다.

```jsx
const url = "https://jsonplaceholder.typicode.com/todos";

axios
  .get(url, {
    timeout: 4000, // 기본 설정은 '0'입니다 (타임아웃 없음)
  })
  .then((response) => console.log(response.data))
  .catch((err) => {
    console.log(err.message);
  });
```

**axios와 fetch의 차이를 정리하면 다음과 같습니다.** 

| axios | fetch |
| --- | --- |
| 써드파티 라이브러리로 설치가 필요 | 현대 브라우저에 빌트인이라 설치 필요 없음 |
| XSRF 보호를 해준다. | 별도 보호 없음 |
| data 속성을 사용 | body 속성을 사용 |
| data는 object를 포함한다 | body는 문자열화 되어있다 |
| status가 200이고 statusText가 ‘OK’이면 성공이다 | 응답객체가 ok 속성을 포함하면 성공이다 |
| 자동으로 JSON데이터 형식으로 변환된다 | .json()메서드를 사용해야 한다. |
| 요청을 취소할 수 있고 타임아웃을 걸 수 있다. | 해당 기능 존재 하지않음 |
| HTTP 요청을 가로챌수 있음 | 기본적으로 제공하지 않음 |
| download진행에 대해 기본적인 지원을 함 | 지원하지 않음 |
| 좀더 많은 브라우저에 지원됨 | Chrome 42+, Firefox 39+, Edge 14+, and Safari 10.1+이상에 지원 |