// Todo 아이템 전체 목록 조회 (배열로 만들기)
function getTodoList() {
  const todoItems = [];
  const todoList = document.getElementById('todo-list').children;

  for (let i = 0; i < todoList.length; i++) {
    const todoText = todoList[i].textContent;
    todoItems.push(todoText);
  }

  return todoItems;
}

// Todo 아이템 추가
function addTodoItem() {
  const input = document.getElementById('todo-input');
  const inputValue = input.value.trim();

  if (inputValue !== '') {
    const todoList = document.getElementById('todo-list');
    const newTodoItem = document.createElement('li');
    newTodoItem.classList.add('todo-item');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('todo-checkbox');
    newTodoItem.appendChild(checkbox);

    const todoText = document.createElement('span');
    todoText.textContent = inputValue;
    todoText.classList.add('todo-span');
    newTodoItem.appendChild(todoText);

    const editButton = document.createElement('button');
    editButton.textContent = '수정';
    editButton.classList.add('edit-button');
    editButton.addEventListener('click', function () {
      const newText = prompt('수정할 내용을 입력하세요:');
      if (newText !== null) {
        todoText.textContent = newText;
      }
    });
    newTodoItem.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '제거';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', function () {
      newTodoItem.remove();
    });
    newTodoItem.appendChild(deleteButton);

    todoList.appendChild(newTodoItem);
    input.value = '';
  }
}

// 특정 Todo 아이템 삭제
function deleteTodoItem(index) {
  const todoList = document.getElementById('todo-list').children;

  if (index >= 0 && index < todoList.length) {
    todoList[index].remove();
  }
}

// "추가" 버튼 클릭 시 Todo 아이템 추가
const addButton = document.getElementById('add-button');
addButton.addEventListener('click', addTodoItem);
