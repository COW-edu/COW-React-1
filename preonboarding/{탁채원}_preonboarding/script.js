// --------------------MVC Pattern 없는 버전

// const todoInput = document.getElementById("todo-input");
// const todoList = document.getElementById("todo-list");
// let tasks = []; // task 저장할 배열 선언

// function addTask() {
//   if (todoInput.value === "") {
//     alert("할 일을 입력하세요!");
//   } else {
//     let task = {
//       content: todoInput.value,
//       completed: false,
//     };
//     tasks.push(task); // 배열에 task 추가
//     renderTasks();
//   }
//   todoInput.value = "";
//   saveData();
// }

// todoList.addEventListener(
//   "click",
//   function (e) {
//     if (e.target.tagName === "LI") {
//       const taskIndex = e.target.dataset.index;
//       tasks[taskIndex].completed = !tasks[taskIndex].completed; // 토글
//       renderTasks(); // Render the updated tasks
//       saveData();
//     } else if (e.target.tagName === "SPAN") {
//       const taskIndex = e.target.parentElement.dataset.index;
//       tasks.splice(taskIndex, 1); // 배열에서 task 지우기
//       renderTasks();
//       saveData();
//     }
//   },
//   false
// );

// function renderTasks() {
//   todoList.innerHTML = ""; // Task 지우기
//   tasks.forEach(function (task, index) {
//     let li = document.createElement("li");
//     li.innerHTML = task.content;
//     li.dataset.index = index;
//     if (task.completed) {
//       li.classList.add("checked");
//     }
//     todoList.appendChild(li);
//     let span = document.createElement("span");
//     span.innerHTML = "\u00d7"; // x 표시
//     li.appendChild(span);
//   });
// }

// function saveData() {
//   localStorage.setItem("data", JSON.stringify(tasks));
// }

// function showData() {
//   const storedData = localStorage.getItem("data");
//   if (storedData) {
//     tasks = JSON.parse(storedData);
//     renderTasks();
//   }
// }

// showData();

// --------------------MVC Pattern 이용한 버전

const Model = {
  tasks: [],

  addTask(content) {
    const task = {
      content,
      completed: false,
    };
    this.tasks.push(task);
  },

  toggleTaskCompletion(index) {
    this.tasks[index].completed = !this.tasks[index].completed;
  },

  removeTask(index) {
    this.tasks.splice(index, 1);
  },

  getAllTasks() {
    return this.tasks;
  },

  loadData() {
    const storedData = localStorage.getItem("data");
    if (storedData) {
      this.tasks = JSON.parse(storedData);
    }
  },

  saveData() {
    localStorage.setItem("data", JSON.stringify(this.tasks));
  },
};

const View = {
  todoList: document.getElementById("todo-list"),

  renderTasks(tasks) {
    this.todoList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.innerHTML = task.content;
      li.dataset.index = index;
      if (task.completed) {
        li.classList.add("checked");
      }
      this.todoList.appendChild(li);
      const span = document.createElement("span");
      span.innerHTML = "\u00d7";
      li.appendChild(span);
    });
  },
};

const Controller = {
  init() {
    this.loadData();
    this.setupEventListeners();
    this.render();
  },

  loadData() {
    Model.loadData();
  },

  addTask(content) {
    Model.addTask(content);
    this.render();
    this.saveData();
  },

  toggleTaskCompletion(index) {
    Model.toggleTaskCompletion(index);
    this.render();
    this.saveData();
  },

  removeTask(index) {
    Model.removeTask(index);
    this.render();
    this.saveData();
  },

  render() {
    const tasks = Model.getAllTasks();
    View.renderTasks(tasks);
  },

  saveData() {
    Model.saveData();
  },

  setupEventListeners() {
    const todoList = document.getElementById("todo-list");

    todoList.addEventListener("click", (e) => {
      if (e.target.tagName === "LI") {
        const taskIndex = e.target.dataset.index;
        this.toggleTaskCompletion(taskIndex);
      } else if (e.target.tagName === "SPAN") {
        const taskIndex = e.target.parentElement.dataset.index;
        this.removeTask(taskIndex);
      }
    });

    const addButton = document.getElementById("add-button");

    addButton.addEventListener("click", () => {
      const todoInput = document.getElementById("todo-input");
      const content = todoInput.value;
      this.addTask(content);
      todoInput.value = "";
    });
  },
};

Controller.init();
