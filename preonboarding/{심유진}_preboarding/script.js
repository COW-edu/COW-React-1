// 추가된 to do 담는 배열
let todoArr = [];

// input값 가져오기
document.addEventListener("DOMContentLoaded", function () {
  const $add_button = document.getElementById("add-button");
  let currentFilter = "all"; // 현재 필터 상태

  // 추가하기
  $add_button.addEventListener("click", function () {
    const $todo_input = document.getElementById("todo-input");
    const inputText = $todo_input.value;

    if (inputText !== "") {
      todoArr.unshift({ text: inputText, completed: false });
      $todo_input.value = "";
      console.log(todoArr);
    }
    showArr(currentFilter);
  });

  function toggleTodoItem(index) {
    todoArr[index].completed = !todoArr[index].completed;
    showArr(currentFilter);
  }

  function deleteTodoItem(index) {
    todoArr.splice(index, 1);
    showArr(currentFilter);
  }

  function showArr(filter) {
    const $todo_list = document.getElementById("todo-list");
    // 추가한거 보여주기
    let Arr = "<ul>";
    for (let i = 0; i < todoArr.length; i++) {
      const listItemClass = todoArr[i].completed ? "completed" : "";
      const listItemContent = todoArr[i].text;
      const checkboxText = todoArr[i].completed ? "☑️" : "🔘";
      const checkboxClass = todoArr[i].completed ? "check" : "uncheck";

      if (filter === "uncheck" && checkboxClass === "uncheck") {
        Arr += `<li class="${listItemClass}">
                  <a class="${checkboxClass}" id=${i}>${checkboxText}</a>
                  ${listItemContent}
                  <span class='close' id=${i}> ✖️ </span>
               </li>`;
      } else if (filter === "check" && checkboxClass === "check") {
        Arr += `<li class="${listItemClass}">
                  <a class="${checkboxClass}" id=${i}>${checkboxText}</a>
                  ${listItemContent}
                  <span class='close' id=${i}> ✖️ </span>
               </li>`;
      } else if (filter === "all") {
        Arr += `<li class="${listItemClass}">
                  <a class="${checkboxClass}" id=${i}>${checkboxText}</a>
                  ${listItemContent}
                  <span class='close' id=${i}> ✖️ </span>
               </li>`;
      }
    }
    Arr += "</ul>";

    $todo_list.innerHTML = Arr;

    // 엑스한거 클릭 이벤트 추가
    const closeButtons = document.getElementsByClassName("close");
    for (let i = 0; i < closeButtons.length; i++) {
      closeButtons[i].addEventListener("click", function () {
        const index = parseInt(this.id);
        deleteTodoItem(index);
      });
    }

    // 체크박스 클릭 이벤트 추가
    const checkboxes = document.getElementsByClassName("uncheck");
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].addEventListener("click", function () {
        const index = parseInt(this.id);
        toggleTodoItem(index);
      });
    }

    const checkButtons = document.getElementsByClassName("check");
    for (let i = 0; i < checkButtons.length; i++) {
      checkButtons[i].addEventListener("click", function () {
        const index = parseInt(this.id);
        toggleTodoItem(index);
      });
    }
  }

  const buttonContainer = document.getElementsByClassName("input-container")[0];

  // 버튼 생성 함수
  function createButton(id, text, onClick) {
    const button = document.createElement("button");
    button.id = id;
    button.textContent = text;
    button.addEventListener("click", onClick);
    buttonContainer.prepend(button);
  }

  // 버튼 생성
  createButton("button1", "완료 계획", function () {
    currentFilter = "check";
    showArr(currentFilter);
  });

  createButton("button2", "미완료 계획", function () {
    currentFilter = "uncheck";
    showArr(currentFilter);
  });

  createButton("button3", "전체보기", function () {
    currentFilter = "all";
    showArr(currentFilter);
  });
});
