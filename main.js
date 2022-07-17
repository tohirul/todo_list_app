// clear button
const clear = document.querySelector(".clear");
// date element
const dateElement = document.querySelector("#date");
// task list
const list = document.querySelector("#list");
// task title box
const input = document.querySelector("#taskInput");
// submit button
const submitButton = document.querySelector("#taskSubmit");

let taskList = [];
const savedTasks = JSON.parse(localStorage.getItem("tasks"));
if (Array.isArray(savedTasks)) {
  taskList = savedTasks;
}

// generate date
let options = {
  weekday: "long",
  month: "short",
  day: "numeric",
  year: "numeric",
};

let date = new Date();
dateElement.innerHTML = date.toLocaleDateString("en-us", options);

// refreshing the task element
clear.onclick = () => {
  list.innerHTML = "";
  renderTasks();
};

// check input field if it is a string
const checkInputField = () => {
  if (input.value === "") {
    alert("Please enter a task name");
  } else if (input.value.trim() !== "") {
    taskUpload();
  }
};

// enter key event to submit the task
window.addEventListener("keyup", (event) => {
  if (event.keyCode == 13) {
    checkInputField();
  }
});
// upload the task
const taskUpload = () => {
  let newTask = {
    title: input.value,
    id: taskList.length + 1,
    done: false,
    trash: false,
  };
  taskList.push(newTask);
  input.value = "";
  saveLocalStorage(taskList);
};
// saving the task to local storage
const saveLocalStorage = (taskList) => {
  // every task update will be saved to local storage
  localStorage.setItem("tasks", JSON.stringify(taskList));
  // render the task list every time it is updated
  renderTasks();
};
// render the tasks from the list to the webpage
const renderTasks = () => {
  // clearing the list element before rendering updated task list from local storage
  list.innerHTML = "";
  taskList.map((task) => {
    const listItem = document.createElement("li");
    listItem.classList.add("item");
    // check if the tasks are already completed
    if (task.done === true) {
      listItem.innerHTML = `
          <i class="co fa fa-check-circle " job="complete" id=${
            task.title.split(" ")[0] + "remove"
          } onclick=completeTask(event) ></i>
          <p class="text lineThrough">
          ${task.title}
          </p>
          <i class="de fa fa-trash-o" job="delete" id=${
            task.title.split(" ")[0] + "remove"
          } onclick= updateTask(event) ></i>
      `;

      list.appendChild(listItem);
    } // if the task has not been completed yet
    else if (task.done === false) {
      listItem.innerHTML = `
          <i class="co fa fa-circle-thin" job="incomplete" id=${
            task.title.split(" ")[0] + "remove"
          } onclick=completeTask(event) ></i>
          <p class="text">
          ${task.title}
          </p>
          <i class="de fa fa-trash-o" job="delete" id=${
            task.title.split(" ")[0] + "remove"
          } onclick= updateTask(event) ></i>
      `;

      list.appendChild(listItem);
    }
  });
};
renderTasks();

const updateTask = (event) => {
  removeTask(event);
};
// mark completed on toggle
const completeTask = (event) => {
  // find the targeted element
  const taskToComplete = event.target;
  // verify that the task is completed or not
  if (taskToComplete.getAttribute("job") === "incomplete") {
    // if the targeted task in incomplete map the taskList find the task
    //  in localStorage and mark it as completed and update the localStorage
    taskList.map((task) => {
      if (
        task.title.split(" ")[0] + "remove" === taskToComplete.id &&
        task.done === false
      ) {
        task.done = true;
      }
    });
    // save the task list to the localStorage after updating
    saveLocalStorage(taskList);
  } else if (taskToComplete.getAttribute("job") === "complete") {
    // to uncheck the completed task from the list locate the task and update it as incomplete
    taskList.map((task) => {
      if (
        task.title.split(" ")[0] + "remove" === taskToComplete.id &&
        task.done === true
      ) {
        task.done = false;
      }
    });
    // saving to local storage after the update
    saveLocalStorage(taskList);
  }
};

// remove the task from the list
const removeTask = (event) => {
  // locate the targeted task in the list to remove
  const taskToRemove = event.target;
  // filter the task list and update the task list in the localStorage
  taskList = taskList.filter(function (task) {
    if (task.title.split(" ")[0] + "remove" === taskToRemove.id) {
      return false;
    } else {
      return true;
    }
  });
  saveLocalStorage(taskList);
};
