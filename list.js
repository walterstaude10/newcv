// Define an array to store to-do items
let todos = [];

// Get references to HTML elements
const todoList = document.getElementById("todoList");
const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");

// Function to render the to-do list
function renderTodos() {
  // Clear the existing HTML
  todoList.innerHTML = "";

  // Loop through the array of to-do items and create HTML elements for each one
  todos.forEach(function(todo, index) {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todoItem");
    todoItem.innerHTML = `
      <input type="checkbox" id="todo${index}" ${todo.completed ? "checked" : ""}>
      <label for="todo${index}">${todo.title}</label>
      <button class="deleteButton" data-index="${index}">Delete</button>
    `;
    todoList.appendChild(todoItem);

    // Add event listener to checkbox to update the completed status
    const checkbox = todoItem.querySelector("input[type=checkbox]");
    checkbox.addEventListener("change", function() {
      todos[index].completed = checkbox.checked;
      saveTodos();
    });

    // Add event listener to delete button to remove the item from the array and update the HTML
    const deleteButton = todoItem.querySelector(".deleteButton");
    deleteButton.addEventListener("click", function() {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    });
  });
}

// Function to add a new to-do item to the array and update the HTML
function addTodo() {
  const todoTitle = todoInput.value;
  const todo = {
    title: todoTitle,
    completed: false
  };
  todos.push(todo);
  saveTodos();
  todoInput.value = "";
  renderTodos();
}

// Function to save the array of to-do items to localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to load the array of to-do items from localStorage
function loadTodos() {
  const todosJson = localStorage.getItem("todos");
  if (todosJson) {
    todos = JSON.parse(todosJson);
  }
}

// Add event listener to form submit to add a new to-do item
todoForm.addEventListener("submit", function(event) {
  event.preventDefault();
  addTodo();
});

// Load the to-do items from localStorage and render the list
loadTodos();
renderTodos();
