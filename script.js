const inputBox = document.querySelector(".input-box input");
const plusIcon = document.querySelector("#plus-icon");
const tasksList = document.querySelector(".tasks-list");
const btnPendingTasks = document.querySelector(".pending-tasks");
const btnAllTasks = document.querySelector(".all-tasks");
const tasksCount = document.querySelector(".tasks-count");
const btnCompletedTasks = document.querySelector(".completed-tasks");
const btnClearCompleted = document.querySelector(".btn-clear-completed");
const btnClearAll = document.querySelector(".btn-clear-all");

// Initialize an empty string to store the user-entered value
let taskName = "";

inputBox.addEventListener("input", function (e) {
  taskName = e.target.value.trim();
  updatePlusIconVisibility(); // Call the function to update plusIcon visibility
});

plusIcon.addEventListener("click", function () {
  if (taskName === "") {
    alert("Please add a task");
  } else {
    addTask();
    inputBox.value = "";
    taskName = "";
    updatePlusIconVisibility(); // Call the function to update plusIcon visibility
  }
});

function updatePlusIconVisibility() {
  plusIcon.style.display = taskName !== "" ? "inline-block" : "none";
}
updatePlusIconVisibility();
let taskElements = [];
function addTask() {
  const list = document.createElement("li");
  list.innerHTML = `<li class="task">
                <div class="task-name">
                     <input class="checkinput" name="task" type="checkbox" />
              <span>${taskName}</span>
            </div>
            <span>
              <i class="fa-solid fa-trash del"></i>
            </span>
          </li>`;

  tasksList.appendChild(list);
  taskElements.push(list);
  updateTaskCount();
  // Add a click event listener for the delete button within this newly created task
  const deleteBtn = list.querySelector(".del");
  deleteBtn.addEventListener("click", function () {
    list.remove(); // Remove the entire task when the delete button is clicked
    taskElements.splice(taskElements.indexOf(list), 1);
    updateTaskCount();
  });
}

function updateTaskCount() {
  tasksCount.textContent = taskElements.length;
}

function completeAllTasks() {
  btnClearAll.addEventListener("click", function () {
    taskElements.forEach((task) => task.remove());
    taskElements = [];
    updateTaskCount();
  });
}
completeAllTasks();

btnClearCompleted.addEventListener("click", function () {
  const completedTasks = taskElements.filter((task) => {
    const Checkbox = task.querySelector(".checkinput");
    return Checkbox.checked;
  });
  completedTasks.forEach((task) => task.remove());
  completedTasks.forEach((item) => {
    const index = taskElements.indexOf(item);
    if (index !== -1) {
      taskElements.splice(index, 1);
    }
  });
  updateTaskCount();
});

btnClearAll.addEventListener("click", function () {
  tasksList.innerHTML = "";
  taskElements = [];
  updateTaskCount();
});

// Set the default filter to "All Tasks"
let currentFilter = "all";

// Add an event listener to handle all filter buttons
btnCompletedTasks.addEventListener("click", function () {
  filterTasks("completed");
});

btnPendingTasks.addEventListener("click", function () {
  filterTasks("pending");
});

btnAllTasks.addEventListener("click", function () {
  filterTasks("all");
});

// Function to filter and display tasks based on the selected filter
function filterTasks(filter) {
  // Set the current filter
  currentFilter = filter;

  // Filter tasks based on the selected filter
  const filteredTasks = taskElements.filter((item) => {
    const checkbox = item.querySelector(".checkinput");
    if (filter === "completed") {
      return checkbox.checked;
    } else if (filter === "pending") {
      return !checkbox.checked;
    } else {
      return true; // "All Tasks" filter, show all tasks
    }
  });

  // Clear the current tasks list
  tasksList.innerHTML = "";

  // Append the filtered tasks to the tasks list
  filteredTasks.forEach((item) => {
    tasksList.appendChild(item);
  });

  // Update the task count based on the filtered tasks
  updateTaskCount(filteredTasks.length);
}

// Function to update the task count
function updateTaskCount(count) {
  tasksCount.textContent = count;
}

// Initialize the task list with all tasks
filterTasks("all");
