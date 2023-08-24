# 23-React Project Guide

## 📖 프로젝트 개요

---

### 프로젝트 주제

- 텀블벅 페이지 클론 코딩
- 예시 화면은 아래 GIF 파일 참고
  - 텀블벅 페이지 내의 요소들 중 제공한 이미지에 포함된 요소들만 포함하시면 됩니다.
- 기간은 2023.08.23(수) ~ 2022.09.05 23시 59분 (화)

[텀블벅 - 크리에이터를 위한 크라우드펀딩](https://tumblbug.com/)

![KakaoTalk_Image_2023-08-21-23-36-04](https://github.com/youkyeong60/vanillaJS_SPA/assets/75975946/6450bbcc-1cf3-4cc3-acde-ce70ef116d96)

## 👉 과제 진행 및 제출 방식

1. react project를 생성한 이후 요구사항에 맞춰 개발을 진행한다.
2. 과제 진행 후 README.md의 체크리스트를 체크하고, 과제 프로젝트와 함께 본인 폴더에 저장한다.
3. 구현 후 구현 화면 역시 폴더에 저장한다.
4. pr을 작성한다.

## 🙆🏻‍♂️ 요구사항

👇 Original Site

텍스트 등을 참고만 하시고 아래 **요구사항**을 준수하여 과제 진행 바랍니다.

[텀블벅 - 크리에이터를 위한 크라우드펀딩](https://tumblbug.com/)

- Image & Data

  - image는 public 하위에 위치해야한다.
  - data는 data.js 사용한다.

    ```jsx
    //data.js

    export const categories = [
      "보드게임·TRPG",
      "디지털게임",
      "웹툰·만화",
      "웹툰 리소스",
      "디자인 문구",
      "캐릭터·굿즈",
      "홈·리빙",
      "테크·가전",
      "반려동물",
      "푸드",
      "향수·뷰티",
      "의류",
      "잡화",
      "주얼리",
      "출판",
      "디자인",
      "예술",
      "사진",
      "음악",
      "영화·비디오",
      "공연",
    ];

    export const banners = [
      {
        id: 0,
        title: "제철 과일로 돌아왔다\n치아가 환영하는 사탕",
        sub_title: "수박, 망고, 애플쥬스까지 여름 한정 에디션",
        text_color: "black",
        url: "https://tumblbug.com/xylocubesummer",
      },
      {
        id: 1,
        title: "둘 다 입긴 덥고 습해\n속옷과 바지를 하나로!",
        sub_title: "특수 설계로 속 안이 보이지 않는 트렁크",
        text_color: "black",
        url: "https://tumblbug.com/inafree",
      },
      {
        id: 2,
        title: "나의 작가 덕후지수는?\n김초엽 영역 덕력평가",
        sub_title: "한 권으로 알아보는 김초엽의 작품 세계",
        text_color: "white",
        url: "https://tumblbug.com/mdlabpress6",
      },
      {
        id: 3,
        title: "후원자가 반응하는\n패션 사진 촬영법",
        sub_title: "누적 펀딩 2억 달성한 창현의 촬영 가이드",
        text_color: "white",
        url: "https://brunch.co.kr/@tumblbug/204",
      },
    ];

    export const popular_projects = [
      {
        id: 0,
        title: "입에서 굴릴수록 치아가 건강해지는 마법의 사탕, 자일로큐브",
        category: "푸드",
        creator: "mintea",
        sponsorship_rate: 12202,
        url: "https://tumblbug.com/xylocubesummer",
      },
      {
        id: 1,
        title: "읽기 쉽고 화려한 '덕질 타로' [로제딕]",
        category: "디자인",
        creator: "쥬나",
        sponsorship_rate: 1154,
        url: "https://tumblbug.com/rosethic",
      },
      {
        id: 2,
        title: "이것만 알아도 대화가 통한다! IT/기획/개발/마케팅 용어",
        category: "출판",
        creator: "그로스쿨",
        sponsorship_rate: 5873,
        url: "https://tumblbug.com/it_terms",
      },
      {
        id: 3,
        title: "[섹스 온 더 비치] 너의 사랑을 이뤄줄 은밀한 칵테일향기",
        category: "향수·뷰티",
        creator: "퍼퓸바",
        sponsorship_rate: 458,
        url: "https://tumblbug.com/perfumebar",
      },
      {
        id: 4,
        title: "넥타르와 함께 즐긴, 승도복숭아를 품은 '암브로시아 향수'",
        category: "향수·뷰티",
        creator: "소아모",
        sponsorship_rate: 247,
        url: "https://tumblbug.com/ambrosia",
      },
      {
        id: 5,
        title: "[타로 퍼퓸] 달콤한 라즈베리빛 & 잔잔한 바이올렛빛 사랑",
        category: "향수·뷰티",
        creator: "닉스",
        sponsorship_rate: 322,
        url: "https://tumblbug.com/lefaytarot01",
      },
      {
        id: 6,
        title: "2D처럼 자연스럽게! 그대로 쓰는 3D < 프릴&레이스 >",
        category: "웹툰 리소스",
        creator: "팀 플래터",
        sponsorship_rate: 168,
        url: "https://tumblbug.com/platter_frill",
      },
      {
        id: 7,
        title: "네이버웹툰 <도롱이> 단행본 1-5권 세트 제작",
        category: "웹툰·만화",
        creator: "네이버웹툰",
        sponsorship_rate: 1908,
        url: "https://tumblbug.com/dolongi",
      },
    ];

    export const notable_projects = [
      {
        id: 0,
        title: "악필은 고칠 수 있어. 그것도 매우 쉽게! 글씨 교정 노트",
        category: "디자인 문구",
        creator: "Wearingeul(글입다)",
        sponsorship_rate: 1717,
        url: "https://tumblbug.com/better",
      },
      {
        id: 1,
        title: "스타급 성우진과 함께 하는 <집이 없어> 오디오웹툰 시즌1",
        category: "웹툰·만화",
        creator: "네이버웹툰",
        sponsorship_rate: 152,
        url: "https://tumblbug.com/wananaudio1",
      },
      {
        id: 2,
        title: "참치 아니었어? 식물성참치 UNTUNA! 이제는 대체참치다",
        category: "푸드",
        creator: "UNFISK109",
        sponsorship_rate: 1723,
        url: "https://tumblbug.com/untuna",
      },
      {
        id: 3,
        title: "세상으로 생명을 배달하는 [숲 속의 배달부]",
        category: "디지털 게임",
        creator: "나라이엔씨",
        sponsorship_rate: 113,
        url: "https://tumblbug.com/deliverykore",
      },
      {
        id: 4,
        title: "감성까지 충전하는 다재다능한 5 in 1 충전기 C.C",
        category: "테크·가전",
        creator: "주식회사 하만",
        sponsorship_rate: 34,
        url: "https://tumblbug.com/cablecutter",
      },
      {
        id: 5,
        title: "귀신들의 소망을 그린 만화 [꿈의 유실물]",
        category: "웹툰·만화",
        creator: "박인주",
        sponsorship_rate: 299,
        url: "https://tumblbug.com/missingdreams",
      },
      {
        id: 6,
        title: "자연이 만든 아름다운 모양, 조약돌처럼 귀여운 향수목걸이",
        category: "주얼리",
        creator: "SUITTE(수티)",
        sponsorship_rate: 1463,
        url: "https://tumblbug.com/suitte7",
      },
      {
        id: 7,
        title: "한강을 제대로 즐기고 싶다면, <한강의 대교>",
        category: "출판",
        creator: "초점, magazine focus",
        sponsorship_rate: 134,
        url: "https://tumblbug.com/magazine_focus",
      },
    ];
    ```

- 실제 요구사항

  - Responsesive(반응형) 웹 구현

    1. 1100px 이하의 화면 사이즈에서는 아래와 같은 화면으로 표현한다.

       ![Untitled](https://github.com/youkyeong60/vanillaJS_SPA/assets/75975946/4a11a2f8-62a2-465a-9fe7-903fdb77eccf)

  - 기본 구조 레이아웃 구현
    ![Untitled 1](https://github.com/youkyeong60/vanillaJS_SPA/assets/75975946/ebe35da1-25f2-49cb-bd20-ef8529706c5c)
    1. Header - 빨간 영역
    2. Footer - 초록 영역
       1. Main Contents - 노란 영역
  - Nav bar

    1.  카테고리에 마우스를 올리면 세부 메뉴가 보여야 한다.
        ![Untitled 2](https://github.com/youkyeong60/vanillaJS_SPA/assets/75975946/c7cde77e-5d2c-4a42-ad8f-94f8f2baeed4)
    2.  카테고리 외에 다른 메뉴들은 마우스 올리면 글자 색상이 변해야 한다.

        ![Untitled 3](https://github.com/youkyeong60/vanillaJS_SPA/assets/75975946/f9ac6342-fed6-45f2-a8e6-1f2aa3c9d51d)

        ![Untitled 4](https://github.com/youkyeong60/vanillaJS_SPA/assets/75975946/e224ec1f-64f2-4018-80be-510db14327b8)

    3.  검색어 입력을 위한 클릭 혹은 돋보기 아이콘을 클릭할 경우 화면 전체가 검색창으로 보여진다.(**새로운 화면으로 이동하면 안됨)**

        ![Untitled 5](https://github.com/youkyeong60/vanillaJS_SPA/assets/75975946/cadbe62f-7b70-4537-b2e6-87d9138ade0e)

    4.  검색창은 아래와 같이 구성되어야 한다.
        검색어 입력 오른쪽 X 버튼을 누르면 검색창 사라지고 홈 화면이 보여야 한다.**(화면 이동 X)**
        ![Untitled 6](https://github.com/youkyeong60/vanillaJS_SPA/assets/75975946/56ab7134-8a1e-4bd9-b0a6-5917f13c7416)
    5.  검색창에 글자를 입력하면 글자가 입력될 때마다 새로운 추천 검색어 리스트를 보여주어야 하고, 검색어를 리셋하는 작은 x버튼이 있어야 한다.

        ![Untitled 7](https://github.com/youkyeong60/vanillaJS_SPA/assets/75975946/ef9f1d35-8a17-465a-aa18-1eedcdbed5df)

    6.  Nav bar는 화면 이동과 무관하게 상단에 보여져야 한다.

        ![Untitled 8](https://github.com/youkyeong60/vanillaJS_SPA/assets/75975946/b928cf95-4e1b-40a5-91c2-de4c0547cdf2)

  - Side bar

    1. 인기 프로젝트 페이지 이동을 위한 버튼은 3가지로 구성한다.

       ![Untitled 9](https://github.com/youkyeong60/vanillaJS_SPA/assets/75975946/0e5eff4c-a666-4065-a652-8c9e5074a774)

    2. 하단 인기 프로젝트 전체 보기 버튼은 마우스가 올라가면 색이 변한다.

       ![Untitled 10](https://github.com/youkyeong60/vanillaJS_SPA/assets/75975946/9c89ea4c-5a3b-4f13-b152-13fa9c54b445)

       ![Untitled 11](https://github.com/youkyeong60/vanillaJS_SPA/assets/75975946/242c784f-0203-4021-9bbe-44878b80f2d6)

    3. 상단의 현재 시각은 `년.월.일 시:분:초` 로 나타내고 실시간으로 변해야 한다.

       ![Untitled 12](https://github.com/youkyeong60/vanillaJS_SPA/assets/75975946/79d92381-4e5b-4f7d-8b4b-eb96f9ce91ce)

    4. 인기 프로젝트 리스트 아이템의 이미지는 마우스를 올리면 살짝 확대 되어야 한다.

       ![Untitled 13](https://github.com/youkyeong60/vanillaJS_SPA/assets/75975946/96e37e6a-2927-448f-8d76-47434f249a76)

       ![Untitled 14](https://github.com/youkyeong60/vanillaJS_SPA/assets/75975946/1588bc24-78c2-43a1-a7a5-543b85878704)

    5. 인기 프로젝트 리스트 아이템의 카테고리와 창작자는 마우스를 올리면 밑줄이 생겨야 한다.

       ![Untitled 15](https://github.com/youkyeong60/vanillaJS_SPA/assets/75975946/a93fd6d5-70a5-4662-ba04-b654fca9ff89)

  - Banner

    1. 현재 배너가 몇 번째 배너인지 표시 되어야 한다.

       ![Untitled 16](https://github.com/youkyeong60/vanillaJS_SPA/assets/75975946/0d411582-79e1-435c-b458-006b0f46339b)

    2. 일정 시간마다 다음 배너로 변경되어야 하며 좌우 슬라이드 형식으로 변경되어야 한다.

       ![Untitled 17](https://github.com/youkyeong60/vanillaJS_SPA/assets/75975946/7fe1cc4a-43cf-43ee-a90c-46ff435d7001)

    3. 배너 좌우 버튼 클릭을 통해서도 배너 제어가 가능해야 한다.

       ![Untitled 18](https://github.com/youkyeong60/vanillaJS_SPA/assets/75975946/b224b93f-cd45-47e2-9a01-8a25a3b2b95e)

    4. 좌우 버튼은 마우스를 올릴 시 색상이 변해야 한다.

       ![Untitled 19](https://github.com/youkyeong60/vanillaJS_SPA/assets/75975946/572b3157-4c89-4d49-a0ee-a1d6ee367e3f)

  - Main Article

    1. 주목할만한 프로젝트 리스트 아이템의 이미지는 마우스를 올리면 살짝 확대 되어야 한다.

       ![Untitled 20](https://github.com/youkyeong60/vanillaJS_SPA/assets/75975946/ceeb7b30-849d-4082-863d-b0c7ad545108)

    2. 주목할만한 프로젝트 리스트 아이템의 카테고리와 창작자는 마우스를 올리면 밑줄이 생겨야 한다.

       ![Untitled 21](https://github.com/youkyeong60/vanillaJS_SPA/assets/75975946/407b980c-5927-43c5-b2e8-171127148002)

  - Footer

    1. 푸터의 하위 메뉴는 마우스를 올릴 시 강조되어야 한다.

       ![Untitled 22](https://github.com/youkyeong60/vanillaJS_SPA/assets/75975946/bb0420c1-aa88-4fac-9313-e0e8dd3ba620)

    2. 고객 지원 관련 버튼은 마우스를 올릴 시 강조되어야 한다.

       ![Untitled 23](https://github.com/youkyeong60/vanillaJS_SPA/assets/75975946/ff9f8129-789d-4620-87a5-75161f6207f9)

    3. 소셜 네트워크 이동 버튼은 마우스를 올릴 시 강조되어야 한다.

       ![Untitled 24](https://github.com/youkyeong60/vanillaJS_SPA/assets/75975946/41cb716e-5e26-4a39-b90c-aad9bd140ecc)

  - 회원가입 페이지
    1. custom hook 사용해야한다.
    2. validation
       - 이메일 주소, 이메일 및 비밀번호 불일치 여부
       - 충족하지 못하는 경우에 안내 텍스트 제공
    3. 유효성 검사와 필수 동의를 체크한 사용자만 가입할 수 있어야한다.
       <img width="546" alt="new signup" src="https://github.com/youkyeong60/vanillaJS_SPA/assets/75975946/d637981e-280d-486d-8ae0-6a9086a112ba">

  ## ❗ 주의 사항

  ***

  - **해당 문서를 꼭 꼼꼼하게 읽고 빠짐없이 준수하여야 합니다.**
  - **모르는 것이 있다면 스스로 찾아보거나 디스코드 질문 채널(#react)을 활용해서 꼭꼭 정확히 알고 프로젝트 진행해야합니다.**
