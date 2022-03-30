// const elForm = document.querySelector(".form");
// const elFormInput = document.querySelector(".form__input");
// const elList = document.querySelector(".todo-list");
// const elAllList = document.querySelector(".all-list")

// const todos = [];

// elList.addEventListener("click" , evt => {

 

//   if(evt.target.matches(".todo-list__btn")){

//     const btnId = evt.target.dataset.todoId;

//     const findIndexArr = todos.findIndex(todo => todo.id == btnId);

//     todos.splice(findIndexArr, 1);

//     renderTodo(todos , elList);
    
//   }else if(evt.target.matches(".todo-list__checkbox")){

//     const inputCheckedId = evt.target.dataset.todoId;

//     const findElement = todos.find(todo => todo.id == inputCheckedId);

//     findElement.isComplated = !findElement.isComplated;

//     renderTodo(todos , elList);
//   }
// });


// function renderTodo(arr, element) {

//   element.innerHTML = "";

//   arr.forEach(todo => {
//     const newItem = document.createElement("li");
//     const newInput = document.createElement("input");
//     const newBtn = document.createElement("button");


//     newItem.textContent = todo.title;
//     newInput.type = "checkbox";
//     newInput.classList.add("todo-list__input");
//     newBtn.textContent = "Delete";
//     newBtn.classList.add("todo-list__btn");
//     newBtn.dataset.todoId = todo.id;
//     newInput.dataset.todoId = todo.id;
//     newInput.classList.add("todo-list__checkbox");
//     elAllList.textContent = todos.length;


//     if(todo.isComplated){
//       newInput.checked = true;
//       newItem.style.textDecoration = "line-through";
//     }

//     newItem.appendChild(newInput);
//     newItem.appendChild(newBtn);

//     element.appendChild(newItem);
//   });

// }



// elForm.addEventListener("submit", evt =>{

//   evt.preventDefault();

//   const elInputValue = elFormInput.value.trim();


//   const todo = {
//     id: todos.length > 0 ? todos[todos.length -1].id + 1 : 1,
//     title: elInputValue,
//     isComplated: false,
//   };

//   todos.push(todo);

//   renderTodo(todos , elList);

//   elFormInput.value = "";

// })


// =========================================================

const form = document.querySelector(".form");
const formInput = form.querySelector(".form__input");
const todoList = document.querySelector(".todo-list");
const todoAll = document.querySelector(".all-list");
const todoComplete = document.querySelector(".todo-complete");
const todoUncomplete = document.querySelector(".todo-uncomplete");

const todos = [];

const renderTodos = (arr, element) => {
  element.innerHTML = "";
  todoAll.textContent = arr.length;
  todoComplete.textContent = 0;
  todoUncomplete.textContent = arr.length;
  arr.forEach((todo) => {
    const todoItem = document.createElement("li");

    const todoTitle = document.createElement("h3");
    todoTitle.textContent = todo.title;
    todoItem.append(todoTitle);

    const todoInput = document.createElement("input");
    todoInput.type = "checkbox";
    todoInput.classList.add("list__input");
    todoInput.dataset.id = todo.id;
    todoItem.append(todoInput);

    if (todo.isCompleted) {
      todoComplete.textContent++;
      todoUncomplete.textContent--;
      todoInput.checked = true;
      todoTitle.style.textDecoration = "line-through";
    }

    const todoBtn = document.createElement("button");
    todoBtn.textContent = "delete";
    todoBtn.type = "button";
    todoBtn.classList.add("list__btn");
    todoBtn.dataset.id = todo.id;
    todoItem.append(todoBtn);

    element.append(todoItem);
  });
};

form.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const formInputValue = formInput.value;

  if (!formInputValue.trim() || isFinite(Number(formInputValue))) {
    const inputError = document.createElement("p");
    inputError.textContent = "Enter your tasks, please";
    todoList.append(inputError);
    return;
  }

  todos.push({
    id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
    title: formInputValue.trim(),
    isCompleted: false,
  });

  renderTodos(todos, todoList);

  formInput.value = "";
});

todoList.addEventListener("click", (evt) => {
  if (evt.target.matches(".list__btn")) {
    const todoBtnId = evt.target.dataset.id - 0;
    const foundIndex = todos.findIndex((todo) => todo.id === todoBtnId);
    todos.splice(foundIndex, 1);
    renderTodos(todos, todoList);
  }
  if (evt.target.matches(".list__input")) {
    const todoInputId = evt.target.dataset.id - 0;
    const foundTodo = todos.find((todo) => todo.id === todoInputId);
    foundTodo.isCompleted = !foundTodo.isCompleted;
    renderTodos(todos, todoList);
  }
});
