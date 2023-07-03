const $addBtn = document.querySelector('#add-button');
const $todoInput = document.querySelector('#todo-input');
const $todoUl = document.querySelector('#todo-list');
const $body = document.querySelector('body');

let todos = []; // todo 배열
let id = 0; // 구분하기 위한 id

//클릭한 버튼에 따라 클래스를 찾아서 curType으로 지정
let curType = 'all';
const setCurType = (newCurType) => {
  curType = newCurType;
}

const filterToShow = (e) => {
  const curBtn = e.target;
  const newCurType = curBtn.dataset.type;

  if(curType === newCurType) { return; } 

  const preBtn = document.querySelector(`.${curType}-Btn`);
  preBtn.classList.remove('selected');

  curBtn.classList.add('selected');
  setCurType(newCurType);

  showTodos();
}

// btn container
const createBtnContainer = () => {
  const showBtnContainer = document.createElement('div');
  showBtnContainer.classList.add('showBtnContainer');
  $body.appendChild(showBtnContainer);

  // 필터해서 보여주기 위한 버튼 추가
  const createBtns = () => {
    const allBtn = document.createElement('button');
    allBtn.classList.add('all-Btn');
    allBtn.classList.add('selected');
    allBtn.dataset.type = 'all';
    allBtn.innerText = '모두';
    allBtn.addEventListener('click', filterToShow);
  
    const toDoBtn = document.createElement('button');
    toDoBtn.classList.add('toDo-Btn');
    toDoBtn.dataset.type = 'toDo';
    toDoBtn.innerText = '남은 일';
    toDoBtn.addEventListener('click', filterToShow);

    const doneBtn = document.createElement('button');
    doneBtn.classList.add('done-Btn');
    doneBtn.dataset.type = 'done';
    doneBtn.innerText = '한 일';
    doneBtn.addEventListener('click', filterToShow);
  
    showBtnContainer.appendChild(allBtn);
    showBtnContainer.appendChild(toDoBtn);
    showBtnContainer.appendChild(doneBtn);
  }
  createBtns();
}
createBtnContainer();

// enter 입력하면 todo추가
const enterToAdd = () => {
  $todoInput.addEventListener('keypress', (event) => {
    if((event.key === 'Enter')) {
      if($todoInput.value === '') {
        alert('할 일을 입력하세요!');
      } else {
        appendTodos(event.target.value);
        $todoInput.value = '';
      }
    }
  });
}
enterToAdd();

// click하면 todo 추가
const clickToAdd = () => {
  if($todoInput.value === '') {
    alert('할 일을 입력하세요!');
  } else {
    appendTodos($todoInput.value);
    $todoInput.value = '';
  }
}

$addBtn.addEventListener('click', () => clickToAdd($todoInput.value));

// todo 만들기
const setTodos = (newTodos) => {
  todos = newTodos;
}

// 모든 todo 가져오기
const getTodos = () => {
  return todos;
}

// 해야하는 todo 가져오기
const getToDoTodos = () => {
  return todos.filter(todo => todo.isDone === false);
}

// 한 todo 가져오기
const getDoneTodos = () => {
  return todos.filter(todo => todo.isDone === true);
}

// todo에 입력한 내용 추가
const appendTodos = (text) => {
  const newId = id++;
  const newTodos = getTodos().concat({
    id: newId,
    isDone: false,
    content: text
  });

  setTodos(newTodos);
  showTodos();
}

// 삭제
const deleteTodo = (todoId) => {
  const newTodos = getTodos().filter(todo => todo.id !== todoId);
  setTodos(newTodos);
  showTodos();
}

// 한 일 체크
const doneTodo = (todoId) => {
  const newTodos = getTodos().map(todo => todo.id === todoId ? {...todo, isDone: !todo.isDone} : todo);
  setTodos(newTodos);
  showTodos();
}

// 화면에 todo 보여주기
const showTodos = () => {
  $todoUl.innerHTML = '';

  switch (curType) {
    case 'all':
      const allTodos = getTodos();
      allTodos.forEach(todo => {showTodo(todo)});
      break;
    case 'toDo':
      const toDoTodos = getToDoTodos();
      toDoTodos.forEach(todo => {showTodo(todo)});
      break;
    case 'done':
      const doneTodos = getDoneTodos();
      doneTodos.forEach(todo => {showTodo(todo)});
      break;
    default:
      break;
  }
}

const showTodo = (todo) => {
  const todoContainer = document.createElement('div');
  todoContainer.classList.add('todoContainer');

  const innerContainer = document.createElement('div');
  innerContainer.classList.add('innerContainer');

  const todoLi = document.createElement('li');
  todoLi.classList.add('todo-li');

  const checkBox = document.createElement('div');
  checkBox.classList.add('checkbox');
  checkBox.addEventListener('click', () => doneTodo(todo.id));

  const todoItem = document.createElement('div');
  todoItem.classList.add('todoItem');
  todoItem.innerText = todo.content;

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('deleteBtn');
  deleteBtn.innerHTML = '제거';

  deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

  if(todo.isDone === true) {
    todoItem.classList.add('done');
    checkBox.innerText = '✔';
    todoItem.style.color = '#dddddd';
    todoItem.style.textDecorationLine = 'line-through';
  }

  innerContainer.appendChild(checkBox);
  innerContainer.appendChild(todoItem);
  todoLi.appendChild(innerContainer);
  todoLi.appendChild(deleteBtn);

  todoContainer.appendChild(todoLi);

  $todoUl.appendChild(todoContainer);
}