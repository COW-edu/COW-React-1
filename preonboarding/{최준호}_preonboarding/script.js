const $todoInput = document.getElementById("todo-input");
const $addButton = document.getElementById("add-button");
const $todoList = document.getElementById("todo-list");
let todoArray = [];
let doneArray = [];
let notdoneArray = [];
let isAdded = false;

function addText() {
  $addButton.addEventListener("click", function addTextmain(){
    if($todoInput.value === "") {
      alert("할 일이 입력되지 않았습니다.")
    } else{
      //기본 생성자 모음
      let list = document.createElement('li');
      let buttoncontainer = document.createElement('span');
      buttoncontainer.id = `buttonContainer`;
      let removeButton = document.createElement(`button`);
      let checkbutton = document.createElement(`button`);
      removeButton.textContent = "지우기";
      checkbutton.textContent = "완료!";
      addFilter();

      let todoInputValue = $todoInput.value;
      list.textContent = todoInputValue;
      list.className = `dolist notdone`;
      removeButton.className = `removeButton`;
      checkbutton.className = `checkbutton doneButton`;
      buttoncontainer.appendChild(checkbutton);
      buttoncontainer.appendChild(removeButton);
      list.appendChild(buttoncontainer);
      

      //리스트에 저장하기
      todoArray.push(list);
      notdoneArray.push(list);
      
      //삭제, 체크 기능 이벤트 생성자
      removeButton.addEventListener(`click`, function() {
        let indexToRemove = Array.from($todoList.childNodes).indexOf(list);
        removeTodo(indexToRemove);
      })
      checkbutton.addEventListener(`click`, function() {
        let indexToCheck = Array.from($todoList.childNodes).indexOf(list);
        checkTodo(indexToCheck);  
      })
    }

    for(let i = 0; i<todoArray.length; i++) {
      $todoList.appendChild(todoArray[i]);
    }
    $todoInput.value = "";
    $todoInput.focus();
  });

}

function removeTodo(index) {
  if(confirm("정말 삭제하실건가요?")){
    // 전체 배열에서삭제하기
    let indexTodo = $todoList.childNodes[index];
    todoArray.splice(todoArray.indexOf(indexTodo),1);
    //doneArray에 있나 확인하고 있으면 삭제
    let doneIndex = doneArray.indexOf(indexTodo);
    if(doneIndex !== -1) {
      doneArray.splice(doneIndex,1);
    }
    //notdoneArray에 있나 확인하고 있으면 삭제
    let notdoneIndex = notdoneArray.indexOf(indexTodo);
    if(notdoneIndex !== -1) {
      notdoneArray.splice(notdoneIndex, 1);
    }
    //화면에서 삭제하기
    $todoList.removeChild(indexTodo);
  }
}
//check했니?
function checkTodo(index) {
  let indexTodo = $todoList.childNodes[index];

  //완 -> 미완 변경
  if(indexTodo.className === "dolist done"){
    indexTodo.className = "dolist notdone";
    indexTodo.querySelector(`.checkbutton`).textContent = "완료!";
    indexTodo.querySelector(`.checkbutton`).className = "checkbutton doneButton"

    let doneIndex = doneArray.indexOf(indexTodo);
    if(doneIndex !== -1) {
      doneArray.splice(doneIndex, 1);
    }
    notdoneArray.push(indexTodo);
  } 
  //미완 -> 완 변경
  else if (indexTodo.className === "dolist notdone"){
    indexTodo.className = "dolist done";
    indexTodo.querySelector(`.checkbutton`).textContent = "안함!";
    indexTodo.querySelector(`.checkbutton`).className = "checkbutton notdoneButton"
    let notdoneIndex = notdoneArray.indexOf(indexTodo);
    if(notdoneIndex !== -1) {
      notdoneArray.splice(notdoneIndex, 1);
    }
    doneArray.push(indexTodo);
  }
}
//필터 생성자
function addFilter() {
  if(isAdded === false) {
    //더 이상 실행되지 않도록 하기
    isAdded = true;
    //버튼 생성
    const FilterContainer = document.createElement(`div`);
    FilterContainer.id = "filterButtonContainer"
    const allItem = document.createElement(`button`);
    const DoneFilter = document.createElement(`button`);
    const NotBeDoneFilter = document.createElement(`button`);
    allItem.textContent = "전체 보기"
    DoneFilter.textContent = "한 것만 보기"
    NotBeDoneFilter.textContent = "안한거 보기"
    const ClearallButton = document.createElement(`button`);
    ClearallButton.textContent = "전부 지우기";
    //버튼들 부모 연결하기
    FilterContainer.appendChild(allItem);
    FilterContainer.appendChild(DoneFilter);
    FilterContainer.appendChild(NotBeDoneFilter);
    FilterContainer.appendChild(ClearallButton);
    $todoList.appendChild(FilterContainer);
    //버튼 클릭하는 이벤트 생성

    DoneFilter.addEventListener(`click`, seeDone);
    allItem.addEventListener(`click`,seeAll);
    NotBeDoneFilter.addEventListener(`click`,seeNotDone);
    ClearallButton.addEventListener(`click`, clearAll);
  }
}
//filter별로 다른것들 보이게 
function seeDone() {
  while($todoList.children[1]) {
    $todoList.children[1].remove();
  }
  for(let i = 0; i<doneArray.length; i++) {
    $todoList.appendChild(doneArray[i]);
  }
}

function seeAll() {
  while($todoList.children[1]) {
    $todoList.children[1].remove();
  }
  for(let i = 0; i<todoArray.length; i++) {
    $todoList.appendChild(todoArray[i]);
  }
}

function seeNotDone() {
  while($todoList.children[1]) {
    $todoList.children[1].remove();
  }
  for(let i = 0; i<notdoneArray.length; i++) {
    $todoList.appendChild(notdoneArray[i]);
  }
}
function clearAll() {
  doneArray = []
  notdoneArray = []
  todoArray = []
  while($todoList.children[1]) {
    $todoList.children[1].remove();
  }
}
addText();
