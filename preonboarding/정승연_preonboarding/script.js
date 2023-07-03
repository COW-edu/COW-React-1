const todo_input = document.getElementById("todo-input");
const add_button = document.getElementById("add-button");
const todo_list = document.getElementById("todo-list");

let todoArr = []; // 추가된 리스트 담는 배열

let select = document.createElement("select");
select.setAttribute("id", "select");
select.innerHTML = `<option value = "1">All Task </option> <option value = "2">Incomplete Task</option> <option value = "3">Complete Task</option>`;
//select 버튼들 구현
todo_list.appendChild(select);
const getSelect = document.getElementById("select");

const deleteList = (event) => {
  const li = event.target.parentElement;

  li.remove();
};
const complete = (event) => {
  // 완료, 미완료 체크하는 함수
  const li = event.target.parentElement; // 클리된 엘리먼트의 부모 태그를 선택
  const value = li.childNodes; // 부모 태그의 자식 태그들을 선택
  const checkBox = li.firstChild; // 첫번째 자식이 체크박스

  if (checkBox.checked === true) {
    // checkBox.checked === true 면 완료된 작업임
    value[1].style.textDecoration = "line-through"; // 두번째 자식인 span을 줄쳐서 완료된 작업으로 구분
    li.setAttribute("class", "complete"); // complete classname을 통해 미완료된 작업과 구분
  } else {
    // checkBox.checked === true 아니면 미완료된 작업임
    value[1].style.textDecoration = "none";
    li.setAttribute("class", "incomplete"); // incomplete classname 부여를 통해 완료된 작업과 구분
  }
};

const addList = (todo_input_value) => {
  let list = document.createElement("li");
  let span = document.createElement("span"); // input value 담는 span
  let deleteButton = document.createElement("button"); // delete 버튼
  let checkBox = document.createElement("input"); // 완료된 일을 체크하는 체크박스

  deleteButton.setAttribute("class", "deleteButton");
  checkBox.setAttribute("type", "checkbox");
  checkBox.setAttribute("class", "checkbox");

  span.innerHTML = todo_input_value;
  deleteButton.innerHTML = "X";

  list.appendChild(checkBox);
  list.appendChild(span);
  list.appendChild(deleteButton);
  list.setAttribute("class", "incomplete");
  todo_list.appendChild(list);

  checkBox.addEventListener("click", complete);
  deleteButton.addEventListener("click", deleteList);
  todo_input.value = " "; // input 입력후 input 비워버리기
};

const getInputValue = () => {
  // input에 입력된 값 가져오기
  let todo_input_value = todo_input.value;
  todoArr.push(todo_input_value); // 배열에 input value 추가

  if (todo_input_value !== " ") {
    // 만약 input 값에 빈 값이 들어오면 리스트에 추가하지 않음
    addList(todo_input_value); // 리스트 만드는 함수에 input value를 매개변수로 전달
  }
};

const filter = () => {
  const select = document.getElementById("select");
  const complete = document.getElementsByClassName("complete");
  const incomplete = document.getElementsByClassName("incomplete");
  const completeArr = Array.from(complete); // getElementsByclassname 가져 온 결과 array로 변경
  const incompleteArr = Array.from(incomplete);
  let value = select.options[select.selectedIndex].value;

  if (value === "1") {
    // 모든 task를 보고 싶을 때
    completeArr.map((complete) => {
      // getElementsByclassname array로 변경 후 실행
      complete.style.display = "block"; // 모든 리스트 보이게 하기
    });
    incompleteArr.map((complete) => {
      complete.style.display = "block"; // 모든 리스트 보이게 하기
    });
  } else if (value === "2") {
    completeArr.map((complete) => {
      complete.style.display = "none"; // 체크된 리스트 안보이게 하기
    });
    incompleteArr.map((incomplete) => {
      incomplete.style.display = "block"; // 체크안된 리스트 보이게 하기
    });
  } else if (value === "3") {
    completeArr.map((complete) => {
      complete.style.display = "block"; // 체크된 리스트 보이게 하기
    });
    incompleteArr.map((incomplete) => {
      incomplete.style.display = "none"; // 체크 안된 리스트 안보이게 하기
    });
  }
};

const backgroundImage = () => {
  // 배경 이미지 랜덤하게 바뀌는 함수
  const number = Math.floor(Math.random() * 3);
  document.body.style.background = `url(./img/background${number}.png) no-repeat `;
};
backgroundImage();
add_button.addEventListener("click", getInputValue); // 추가 버튼 눌렀을 때 이벤트 리스너
getSelect.addEventListener("change", filter); // select option 변경됐을때 발생하는 이벤트
