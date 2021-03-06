const elForm = document.querySelector(".form");
const elFormInput = document.querySelector(".form__input");
const elList = document.querySelector(".todo-list");


const elBtnWrapper = document.querySelector(".btn-wrapper");
const elAllBtn = document.querySelector(".all-btn");
const elComplateBtn = document.querySelector(".complate__btn");
const elUnComplateBtn = document.querySelector(".un-complate__btn");
const elBookmarkBtn = document.querySelector(".bookmark__btn");


const elAllList = document.querySelector(".all-list");
const elComplate = document.querySelector(".todo-complete");
const elUnComplate = document.querySelector(".todo-uncomplete");
const elBookmark = document.querySelector(".todo-bookmark");

const elFragmentTemplate = document.querySelector(".template").content;

const todos = [];
const todoss = [];

elList.addEventListener("click" , evt => {

  if(evt.target.matches(".todo-list__btn")){

    const btnId = evt.target.dataset.todoId;

    const findIndexArr = todos.findIndex(todo => todo.id == btnId);

    todos.splice(findIndexArr, 1);
  
    renderTodo(todos, elList);
    
  }else if(evt.target.matches(".todo-list__checkbox")){

    const inputCheckedId = evt.target.dataset.todoId;

    const findElement = todos.find(todo => todo.id == inputCheckedId);

    findElement.isComplated = !findElement.isComplated;

    renderTodo(todos, elList);
  }
  
  else if(evt.target.matches(".todo-btn")){

    const bookmarkId = evt.target.dataset.todoId;

    const bookmarkArr = todoss.findIndex(todo => todo.id == bookmarkId);
    
    todos.splice(bookmarkArr , 1);

    renderTodo(todos , elList);
    
  }
  
});


function renderTodo(arr, element) {

  element.innerHTML = "";

  let all = elAllList.textContent = todos.length;
  let complate = elComplate.textContent = todos.filter(e => e.isComplated === true).length;
  elUnComplate.textContent = arr.filter(e => e.isComplated === false).length;
  elUnComplate.textContent = all - complate;
  elBookmark.textContent = todos.filter(e => e.isBookmarked === true).length;

  const todoFragmet = document.createDocumentFragment()
  arr.forEach(todo => {

    const newItem = document.createElement("li");
    const newButton = document.createElement("button");
    const newCheckbox = document.createElement("input");

    newItem.textContent = todo.title;
    
    newInput.type = "checkbox";
    newInput.classList.add("todo-list__input");
    newBtn.textContent = "Delete";
    newBtn.classList.add("todo-list__btn");
    newBtn.dataset.todoId = todo.id;
    newInput.dataset.todoId = todo.id;
    newInput.classList.add("todo-list__checkbox");
    newSpan.classList.add("todo-btn");

    if(todo.isComplated){
      newInput.checked = true;
      newItem.style.textDecoration = "line-through";
    }

    if(todo.isBookmarked){
      newInput.checked = true;
      newItem.style.textDecoration = "line-through";
    }

    const clonedTemplate = elFragmentTemplate.cloneNode(true);

    

    newItem.appendChild(newInput);
    newItem.appendChild(newBtn);
    newItem.appendChild(newSpan);
    element.appendChild(newItem);
  });

}


elForm.addEventListener("submit", evt =>{
  evt.preventDefault();

  const elInputValue = elFormInput.value.trim();


  const todo = {
    id: todos.length > 0 ? todos[todos.length -1].id + 1 : 1,
    title: elInputValue,
    isComplated: false
  };

 
  todos.push(todo);
  renderTodo(todos , elList);
  elFormInput.value = "";
});

elBtnWrapper.addEventListener("click", evt => {

  if(evt.target.matches(".all__btn")){
    renderTodo(todos , elList);
  };
  
  if (evt.target.matches(".complate__btn")){
    const complateFiltered = todos.filter(e => e.isComplated === true);
    renderTodo(complateFiltered , elList);
  };

  if (evt.target.matches(".un-complate__btn")){
    const unComplateFiltered = todos.filter(e => e.isComplated === false);
    renderTodo(unComplateFiltered , elList);
  };

  if(evt.target.matches(".bookmark__btn")){
    const bookmarkFiltered = todos.filter(e => e.isBookmarked === true);
    renderTodo(bookmarkFiltered  , elList);
  };
});