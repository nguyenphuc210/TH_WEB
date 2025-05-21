// script.js
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

let tasks = [];

function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = storedTasks;
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.done ? "done" : "";
    li.innerHTML = `
      <span class="task-title" data-index="${index}">${task.title}</span>
      <button class="delete-btn" data-index="${index}">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

function addTask() {
  const title = taskInput.value.trim();
  if (title === "") {
    alert("Please enter a task.");
    return;
  }
  tasks.push({ title: title, done: false });
  saveTasksToLocalStorage();
  renderTasks();
  taskInput.value = "";
}

function toggleTaskDone(index) {
  tasks[index].done = !tasks[index].done;
  saveTasksToLocalStorage();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasksToLocalStorage();
  renderTasks();
}

addTaskBtn.addEventListener("click", addTask);
taskList.addEventListener("click", function (e) {
  const index = e.target.getAttribute("data-index");
  if (e.target.classList.contains("delete-btn")) {
    deleteTask(index);
  } else if (e.target.classList.contains("task-title")) {
    toggleTaskDone(index);
  }
});

// Load tasks on page load
loadTasksFromLocalStorage();
