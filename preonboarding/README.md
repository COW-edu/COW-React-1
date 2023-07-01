# 23-React Project Guide

---

## 📖 프로젝트 개요

---

### 프로젝트 주제

![Todo List는 전통적인 개발자의 학습을 위한 토이 프로젝트 주제입니다.](https://github.com/COW-edu/COW-React-1/assets/108217858/42df2a39-2746-4816-8ef5-21f97a4a7563)

Todo List는 전통적인 개발자의 학습을 위한 토이 프로젝트 주제입니다.

- 이 유명한 프로젝트 주제는 정형화되어 [TodoMVC](https://todomvc.com/)로 프로젝트화 되었으며, 해당 홈페이지에서는 각 라이브러리 별로 구현된 Todo List와 공식 Github를 볼 수 있습니다.
- 우리는 이를 조금 변형하여 **우리만의 Todo List**를 구현할 것입니다.
- 기간은 2023.07.01(토) ~ 2023.07.03 23시 59분 (월)

## 🔨 프로젝트 진행 방법

---

1. COW-React-1 포크 후 local 에서 개발 진행
2. 모든 기능 구현 완료 후 원격 저장소에 pr 올리기

## 🎯 프로젝트 요구사항

---

### 구현 요구사항

- 화면 레이아웃 구현
    - 형태
        - List view 구현
        - CSS 및 JS코드를 통한 구현 ( ex) 아래는 예시입니다. )
        
        ![Untitled](https://github.com/COW-edu/COW-React-1/assets/108217858/403d90c6-af4b-4317-af88-c63175cd2f8a)
        
        ![Untitled](https://github.com/COW-edu/COW-React-1/assets/108217858/d45f8fd7-fc12-4756-a8b8-c6d5202aea06)
        
    - 필터
        - Todo 전체 보기(기본 뷰)
        - 완료 여부에 따른 필터
            - 완료 안된 아이템(해야할 일) 보기
            - 완료된 아이템(한 일) 보기
- 기능 구현
    - Todo 아이템 전체 목록 조회 (배열로 만들것)
    - Todo 아이템 추가
    - 특정 Todo 아이템 삭제
- html 파일은 아래 요구되어 있는 틀에 더 이상 추가하지 않고, js만 사용하여 기능구현을 해야합니다.
    
    ```jsx
    <!DOCTYPE html>
    <html>
    <head>
      <title>Todo List</title>
      <link rel="stylesheet" href="styles.css">
    </head>
    <body>
      <h1>Todo List</h1>
      <div class="input-container">
        <input type="text" id="todo-input" placeholder="할 일을 입력하세요">
        <button id="add-button">추가</button>
      </div>
      <ul id="todo-list"></ul>
    
      <script src="script.js"></script>
    </body>
    </html>
    ```
    

## ❗ 주의 사항

---

- **해당 문서를 꼭 꼼꼼하게 읽고 빠짐없이 준수하여야 합니다.**
- **html 파일은 수정할 수 없습니다.**
- **파일명은 {이름}_preonboarding으로 올려주셔야합니다.**
- **모르는 것이 있다면 스스로 찾아보거나 디스코드 질문 채널(#react)을 활용해서 꼭꼭 정확히 알고 프로젝트 진행해야합니다.**