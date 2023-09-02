const inputBox = document.querySelector(".input-box input");
const plusIcon = document.querySelector("#plus-icon");
const tasksList = document.querySelector(".tasks-list");
const pendingTasks = document.querySelector(".pending-tasks");
const btnAllTasks = document.querySelector(".all-tasks");
const tasksCount = document.querySelector(".tasks-count");
const btnCompletedTasks = document.querySelector(".completed-tasks");
const btnClearCompleted = document.querySelector(".clear-completed");
const btnClearAll = document.querySelector(".clear-all");

// Initialize an empty string to store the user-entered value
let taskName = "";

inputBox.addEventListener("input", function (e) {
  taskName = e.target.value;
});

console.log(taskName);
plusIcon.addEventListener("click", function () {
  //   console.log("btnclicked");
  addTask();
});
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
}
