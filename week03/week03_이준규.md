## 1. DOM?

![](https://velog.velcdn.com/images/junnkyuu/post/acd375ae-8783-4032-a071-4703f4b3273d/image.png)

웹페이지에서 버튼, 이미지, 텍스트 같은 것들을 Element(요소)라고 하고, 이 모든 요소를 담고 있는 웹페이지 화면을 document라고 한다. 웹페이지는 html을 분석해서 화면에 보여주는데, Element가 tree형태로 되어있는 것을 DOM(Document Object Model)이라고 한다. 개발자는 API를 사용해서 원하는 DOM 객체에 접근해 이를 조작할 수 있다.

---

<br>

## 2. 브라우저 렌더링 과정

![](https://velog.velcdn.com/images/junnkyuu/post/59e78456-84e1-477d-b17c-d15648b44cdb/image.png)

먼저 일반적인 브라우저 렌더링 과정을 간략하게 설명해보려고 한다.

1. DOM tree 생성: 개발자가 작성한 HTML을 브라우저가 전달받으면 브라우저의 렌더 엔진이 이를 파싱하고 DOM node로 이루어진 DOM tree를 생성한다.

2. Render tree 생성: CSS 파일과 각 요소의 Inline 스타일을 파싱하고 스타일 정보를 추가하여 Render tree를 생성한다.

3. Layout: 각 node들은 스크린의 좌표가 주어지고 정확히 어디에 위치해야 할 지가 정해진다.

4. Painting: 앞선 과정에서 얻을 수 있는 정보들로 모든 요소에 색을 입히는 과정이다. 이 과정을 거치고 나면 화면에 UI가 렌더된다.

<br>

### DOM 조작의 비효율성

DOM을 직접 조작하여 화면을 업데이트하려면 위에 설명했던 브라우저에서 받은 정보들을 사용해서 HTML, CSS 파싱부터 화면에 Painting하는 과정까지 모두 진행하게 된다. DOM을 조작할 때 마다 이러한 과정을 반복하는 것은 실제로 많은 양의 연산이 필요하고, 비용이 많이드는 작업이기 때문에 프로그램의 성능을 저하시키게 된다.

예전에는 서버에서 데이터와 함께 완전한 페이지를 렌더해주는 SSR(Server Side Rendering) 방식이 많이 사용했다. 원래 DOM은 정적인 페이지를 보여주는데 많이 사용되었기 때문에 DOM의 동적인 변화가 많이 없었던 당시에는 DOM 조작에 큰 문제가 발생하지 않았다.

하지만 SPA(Single Page Application)의 등장과 함께 CSR(Client Side Rendering) 방식이 많이 사용되면서 현재는 DOM의 동적인 변화, 즉 업데이트가 상당히 많고 복잡하게 발생하는 애플리케이션들이 많아졌다. 따라서 DOM 조작을 통해 화면을 렌더링하는 과정의 비효율성을 해결하고 최적화를 할 필요성을 느끼게 되었고, 이러한 과정에서 등장한 것이 Virtual DOM이다.

---

<br>

## 3. Virtual DOM?

Virtual DOM(가상돔)이란 우리가 흔히 부르는 DOM인 Physical DOM(물리돔)의 가벼운 버전의 복사본이다. 가벼운 이유는 class, style 등의 속성들을 가지고 있지만 화면에 변화를 직접 줄 수 있는 getElementById 등과 같은 DOM.api들은 갖고 있지 않기 때문이다. 실제 DOM이 아니고, js 객체형태로 메모리상에 저장되어있다. 실제 DOM이 아닌 Virtual DOM은 화면에 접근할 수 없기 때문에 화면을 조작할 수 없다. 화면을 조작할 수 없는 Virtual DOM을 왜 복사해서 메모리에 저장해놓은 걸까?

<br>

### Virtual DOM의 동작 방식

![](https://velog.velcdn.com/images/junnkyuu/post/5b76cda0-a5ef-4302-9073-205f7c7ed304/image.png)

최초에 브라우저가 실제 DOM tree를 생성하고 브라우저 화면에 우리의 애플리케이션 UI가 렌더된다. 이때 Virtual DOM은 DOM tree를 가벼운 버전으로 복사한다.

![](https://velog.velcdn.com/images/junnkyuu/post/1e3a4e1b-73d8-44c2-83bd-7f23ecbd5948/image.png)

그리고 DOM node에 변화가 생기면 Virtual DOM은 다시 새로운 가상의 DOM tree를 처음부터 다시 만든다. 이 과정에서 변화가 생길 때마다 새로운 DOM tree를 만드는 것이 비효율적이라고 생각할 수 있다. 하지만 DOM node를 조작하는 것의 비효율성은 DOM tree를 업데이트하는 과정에서 발생하는 것이 아니라 렌더링하는 과정에서 비싼 비용이 드는 것이다. 하지만 Virtual DOM은 렌더링을 하지 않고 메모리 상에서 tree를 변경하는 일이기 때문에 상당히 빠르게 작업이 진행될 수 있다.

<br>

    diff(previous: VTree, current: Vtree) -> PatchObject

위에서 DOM node에 변화가 생기면 Virtual DOM은 새로운 DOM tree를 생성한다고 설명했다. Virtual DOM의 내부 구현체를 살펴보면, diff 함수에서 매개변수로 이전 상태의 DOM tree와 새롭게 만들어진 DOM tree를 각각 previous, current라는 이름으로 받아오는 것을 볼 수 있다. 이 함수를 통해서 변경 전의 DOM tree와 변경 후의 DOM tree의 변화된 부분만을 확인하게 된다.

<br>

    patch(rootNode: DOMNode, patches: PatchObject) -> DOMNode newRootNode

이렇게 변경된 부분을 확인한 이후에는 실제 DOM에 변경된 부분을 적용한다. Virtual DOM의 구현체에서 Patch 함수를 보면, rootNode와 이전 단계에서 diff 함수를 통해 얻을 수 있었던 변경된 부분만 담겨있는 patches를 인자로 받는 것을 볼 수 있다. 이 함수는 변경된 사항만을 실제 DOM node에 적용해 렌더링 과정을 수행하게 한다. 이 일련의 과정을 봤을 때, Virtual DOM은 사실상 버퍼링 또는 캐싱의 역할을 한다고 볼 수 있다. DOM 조작을 할 때마다 브라우저 렌더링 과정을 계속해서 반복하는 것이 아니라 변화들을 전부 Virtual DOM에 반영한 이후에 변경된 부분만을 모아서 실제 DOM에 적용하여 한 번만 렌더링 하도록 하는 Batch Update를 함으로써 성능을 최적화한다.

<br>

### React에서의 Virtual DOM

![](https://velog.velcdn.com/images/junnkyuu/post/bd1d7ea7-53f7-49e3-bb33-51e00f16ef22/image.png)

React에서 작성한 코드가 어떻게 화면에 보여지는지에 대해 설명해보려고 한다.

<br>

    const element = <h1 title='foo'>Hello</h1>;

위 코드와 같이 React의 Component를 정의할 때 jsx 문법을 많이 사용한다. jsx는 js를 확장한 문법이기 때문에 js 문법이 아니다.

<br>

    const element = React.createElement(
    	'h1',
        { title: 'foo' },
        'Hello'
    );

이러한 jsx는 Babel과 같은 tool에 의해 js로 변환되는데, 이때 createElement 함수를 호출하게 된다.

<br>

    const element = {
    	type: 'h1',
        props: {
        	title: 'foo',
            children: 'Hello',
        },
    };

함수를 통해 jsx는 위와 같은 js 객체로 변환된다. 이 객체에는 type과 props라는 key가 존재하는데, type은 DOM node의 tag 이름이고, props는 jsx에 포함된 모든 속성들을 포함한다. props의 children에는 하위 node들이 포함된다. 이렇게 생성된 js 객체를 활용해서 Virtual DOM tree를 구성하게 되는 것이다.

<br>

    const container = document.getElementById('root');
    ReactDOM.render(element, container);

이러한 객체를 사용해서 render 함수를 호출하면 비로소 실제 DOM 요소가 된다. 즉 코드가 있으면 Babel 같은 tool을 이용하여 js 객체 형태로 변환하고, DOM에 적용하는 것이다.

<br>

### Reconciliation(재조정)

![](https://velog.velcdn.com/images/junnkyuu/post/466c31fb-bae1-493e-b3d9-7ec5851abc4a/image.png)

React 공식문서에서는 재조정을 다음과 같이 설명하고 있다. 즉 재조정은 Virtual DOM과 실제 DOM을 비교하고 일치시키는 과정을 말한다.

![](https://velog.velcdn.com/images/junnkyuu/post/5675d950-0215-4fe1-96d6-9d8855908079/image.png)

React는 변경 전의 Virtual DOM과 변경 이후의 Virtual DOM 2가지 tree를 모두 유지하고 있다. 이 2가지의 tree를 snapshot을 비교하여 변화된 부분만을 감지한 후에 변경된 부분만을 실제 DOM에 적용한다. 이 비교하는 과정에서 Diffing Algorithm이 사용된다.

<br>

    const element = {
    	type: 'h1',
        props: {
        	title: 'foo',
            children: 'Hello',
        },
    };

Diffing Algoritm에 대해 간략하게 설명해보려고 한다. 위에서 jsx가 js 객체로 변환된 결과에서 type이라는 key 값을 갖는다고 설명했다. 변경 전 React 요소의 타입과 변경 후 React 요소의 type을 비교하여 2가지 다른 유형의 행동을 하게 된다.

첫째로, 타입이 같은 경우에는 변경 전의 속성과 변경 후의 속성을 비교하여 동일한 내역은 유지하고 변경된 속성들만 갱신한다. 둘째로 a tag에서 img tag로, 또는 A Component에서 B Component로의 경우처럼 type이 달라진 경우 React는 이전 tree를 삭제하고 완전히 새로운 tree를 만든다.

<br>

![](https://velog.velcdn.com/images/junnkyuu/post/b88f5170-cb7a-4667-9561-f372675d81b1/image.png)

React로 개발을 할 때 위와 같은 에러 메세지를 본 적이 있을 것이다. List를 렌더할 때 key prop이 있어야 한다는 에러 메세지인데, React에서 key prop을 사용하는 이유가 재조정과 깊은 연관이 있다. React 요소가 변화할 때 재조정 과정에서 이전의 Virtual DOM과 새로 생성된 Virtual DOM을 비교한다고 했다.

<br>

    // 변경 전
    <ul>
    	<li>first</li>
        <li>seconde</li>
    </ul>

    // 변경 후
    <ul>
    	<li>first</li>
        <li>seconde</li>
        <li>third</li>
    </ul>

위 코드와 같은 List의 변화가 있을 수 있다. third라는 li tag가 새로 추가되었는데, 첫 번째 node와 두 번째 node는 같고 마지막에 하나만 더 추가되었기 때문에 문제없이 추가된 node만 새로 그리게 된다.

<br>

    // 변경 전
        <ul>
            <li>Duke</li>
            <li>Villanova</li>
        </ul>

    // 변경 후
    <ul>
    	<li>Connecticut</li>
        <li>Duke</li>
        <li>Villanova</li>
    </ul>

하지만 위와 같은 코드는 경우가 달라진다. 새로운 li tag 요소가 첫 번째 위치에 추가되었다. React는 이 상태를 보고 모든 요소가 제자리에 위치하지 않았다고 생각하고 자식 node를 전부 새로 그리게 된다. 이 문제는 성능 이슈를 만들 수 있게 된다.

이러한 문제를 해결하기 위해서 React는 식별자로 key prop을 제공한다. 자식 node들이 key prop을 갖고 있으면 React는 key 값으로 변경 전의 tree와 변경 후의 tree를 비교한다. 그러면 두 번째 코드처럼 첫 번째에 새로운 node가 추가 되어도 문제없이 추가된 node만 그릴 수 있게 된다. 그런데 key 값에는 변경되지 않은 유일한 값을 넣어줘야 한다.

만약에 array의 index를 key 값으로 주면 문제가 발생하게 된다. array의 index는 변화하는 값으로 array가 바뀔 때마다 0 ~ n까지 새롭게 할당된다. array의 맨 앞에 새로운 node가 추가될 때 기존 array에서 첫 번째 array item의 key 값인 index 0이 새로 추가된 array item의 key 값으로 전달된다. 그러면 React는 key 값으로 item의 변경여부를 비교하기 때문에 key 값이 0인 새로 추가된 item array의 value에 기존 DOM tree에서 key 값이 0이었던 value 값을 그대로 유지하게 된다.

이 문제를 해결하기 위해서는 변하지 않는 key 값을 전달해서 React가 착각하지 않도록 해야한다. item이 고유하게 갖고 있는 id 값을 활용한다면 변하지 않는 값이기 때문에 이전과 같은 문제를 해결할 수 있고 불필요한 DOM 업데이트를 하지 않을 수 있다.

---

<br>

## 3. MPA와 SSR

### MPA?

![](https://velog.velcdn.com/images/junnkyuu/post/7eb38f12-0631-4a89-86c2-986b95e299fe/image.png)

MPA(Multi-Page Application)이란 두 개 이상의 페이지로 구성된 애플리케이션을 의미한다. MPA는 사용자의 클릭과 같이 사용자와의 상호작용이 발생할 때마다 해당 링크로 이동하여 애플리케이션이 다시 새로고침되는 전통적인 방식으로 작동한다.

<br>

### SSR?

![](https://velog.velcdn.com/images/junnkyuu/post/f86f760f-9988-4a3b-bda9-bc462d2585b7/image.png)

MPA는 렌더링 방식으로 SSR(Server Side Rendering) 방식을 사용한다. SSR 방식이란 서버로부터 완전하게 만들어진 HTML 파일을 받아와 페이지 전체를 렌더링하는 방식이다. SSR의 과정은 먼저 클라이언트에서 초기 화면을 로드하기 위해 서버에 요청을 보낸다. 그러면 서버는 HTML로 화면에 표시하는데 필요한 완전한 리소스를 응답한다.

만약 화면을 구성하는 요소 중 하나만 변경을 원하는 경우를 생각해보자. 클라이언트는 이전과 같이 서버에 요청을 보낸다. 그러면 이전과 마찬가지로 서버는 HTML로 화면에 표시하는데 필요한 완전한 리소스를 응답한다. 그런데 이 과정에서 클라리언트가 변경하기를 원하는 하나의 요소 뿐만 아니라 화면의 전체 요소를 전부 서버로부터 다시 다운받아 온다. 이러한 이유로 애플리케이션이 다시 시작되고 화면이 깜빡인 이후에 표시된다.

<br>

#### MPA with SSR의 장단점

SSR 방식의 장점은 SEO(Search Engine Optimization, 검색 엔진 최적화)를 제공한다. SEO란 검색 엔진이 웹을 크롤링하면서 페이지의 컨텐츠 색인을 생성하는 과정을 말한다. SSR 방식을 사용하는 MPA는 화면을 구성하는 각각의 페이지가 있기 때문에 SEO에 유리한 장점이 있다. 또한 빠른 초기 로딩을 할 수 있다. 서버로부터 화면을 렌더하기 위한 필수적인 요소를 먼저 가져오기 때문에 뒤에 설명할 CSR(Client Side Rendering) 방식보다 초기 로딩 속도가 빠르다.

SSR 방식의 단점은 불편한 사용자 경험이 있다. 매번 페이지를 요청할 때마다 새로고침이 되기 때문에 사용자 경험이 다소 떨어지게 된다. 또한 서버 부하가 증가한다. 페이지를 요청할 때마다 서버에서 페이지를 구성하는 모든 리소스를 준비해서 응답하므로 서버 부담이 증가된다.

<br>

| 장점                | 단점               |
| ------------------- | ------------------ |
| SEO에 유리          | 불편한 사용자 경험 |
| 빠른 초기 로딩 속도 | 서버 부하 증가     |

---

<br>

## 4. SPA와 CSR

### SPA?

![](https://velog.velcdn.com/images/junnkyuu/post/9a3ddb13-f546-4b7c-8d35-097c3374942d/image.png)

SPA(Single Page Application)란 하나의 페이지로 구성된 애플리케이션을 의미한다.

<br>

![](https://velog.velcdn.com/images/junnkyuu/post/889fee2e-0ec4-4055-aebe-90f994c3f28c/image.png)

SPA는 렌더링 방식으로 CSR(Client Side Rendering) 방식을 사용한다. CSR 방식이란 사용자의 요청에 따라 필요한 부분만 응답받아 렌더링하는 방식이다. CSR의 과정은 먼저 클라이언트에서 초기 화면을 로드하기 위해 서버에 요청을 보낸다. 그럼 서버는 화면에 표시하는데 필요한 완전한 리소스를 응답한다. 그런데 여기서 CSR 방식이 SSR 방식과 다른 점은 모든 js 파일을 다운 받아야 하기 때문에 초기 로딩 시간이 더 오래 걸린다는 점이다.

만약 화면을 구성하는 요소 중 하나만 변경을 원하는 경우가 CSR 방식에서는 어떻게 될지 생각해보자. 클라이언트는 이전과 같이 서버에 요청을 보낸다. 그러면 서버는 변경을 원하는 하나의 요소에 관련된 리소스만 응답한다. CSR 방식인 SSR 방식과 다르게 화면이 깜빡이지 않고 바로 수정된 데이터가 표시된다.

<br>

#### SPA with CSR의 장단점

CSR 방식의 장점은 빠른 속도 및 서버 부하 감소가 있다. CSR 방식은 변경된 부분과 관련된 데이터만 가져오므로 SSR 방식보다 빠른 속도를 보인다. 또한, 변경된 부분만 요청하므로 서버의 부담을 줄일 수 있다. 그리고 사용자 친화적이다. 페이지 안의 컨텐츠를 클릭하여 다음 단계로 전환하는 과정에서 링크가 없기 때문에 깜빡임 없이 부드러운 이동을 경험할 수 있다.

CSR 방식의 단점으로는 SEO에 불리하다는 점이다. CSR 방식을 사용하는 SPA는 js를 사용하여 사용자와 상호작용 후에 페이지 내용을 로드하기 때문에 웹 크롤러가 페이지를 색인화하려고 하면 내용의 빈 페이지처럼 보이게 된다. 또한, 초기 로딩 속도가 느리다. CSR 방식은 초기에 모든 js 파일을 다운받아와야 하기 때문에 초기 로딩 시간이 오래 걸린다.

| 장점                        | 단점                |
| --------------------------- | ------------------- |
| 빠른 속도 및 서버 부하 감소 | SEO에 불리          |
| 사용자 친화적               | 느린 초기 로딩 속도 |

---

<br>

## 5. 궁금증

### SPA에서는 SSR 방식을 사용하지 못하는 건가?

그렇다 사용하지 못한다. 구현하려는 페이지가 여러 개인 경우 전부를 SSR 방식으로 구현하는 것은 불가능하다. 이런 상황이 발생하면 더 이상 SPA가 아니라 MPA가 되어버리기 때문이다. 반대의 경우도 마찬가지이다.

<br>

### 어떤 방식으로 개발해야 할까?

![](https://velog.velcdn.com/images/junnkyuu/post/f74f86ad-f360-4763-a77b-f73a51f9202b/image.png)

컨텐츠 중심으로 개발해야 한다. CSR 방식을 사용하여 개발한다고 하면 모든 부분을 CSR 방식으로 구현해야하는 것은 아니다. 애플리케이션을 구성하는 부분에 따라 단순 정보 제공과 같은 부분은 SSR 방식으로, 동적인 변화가 필요한 부분은 CSR 방식으로 개발하는 것이 좋다.

---

<br>

### 참고 및 출처

- [블로그 - DOM, Virtual DOM](https://www.howdy-mj.me/dom/what-is-dom)
- [10분 테코톡 - DOM,Virtua lDOM](https://www.youtube.com/watch?v=6rDBqVHSbgM)
- [10분 테코톡 - MPA, SSR, SPA, CSR](https://www.youtube.com/watch?v=vM_zQLnlyKw)
