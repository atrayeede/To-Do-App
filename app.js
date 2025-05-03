document.addEventListener("DOMContentLoaded", () => {
  const StoredTasks = JSON.parse(localStorage.getItem("tasks"));
  if (StoredTasks) {
    StoredTasks.forEach((task) => tasks.push(task));
    UpdateTasksList();
    UpdateStats();
  }
});
let tasks = [];
const SaveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
const addTask = () => {
  const TaskInput = document.getElementById('TaskInput')
  const text = TaskInput.value.trim();

  if (text) {
    tasks.push({ text: text, completed: false });
    TaskInput.value = "";
    UpdateTasksList();
    UpdateStats();
    SaveTasks();
  }
};
const ToggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  UpdateStats();
  UpdateTasksList();
  SaveTasks();
};
const DeleteTask = (index) => {
  tasks.splice(index, 1);
  UpdateTasksList();
  UpdateStats();
  SaveTasks();
};
const EditTask = (index) => {
  const TaskInput = document.getElementById("TaskInput");
  TaskInput.value = tasks[index].text;
  tasks.splice(index, 1);
  UpdateTasksList();
  UpdateStats();
  SaveTasks();
};
const UpdateStats = () => {
  const CompletedTasks = tasks.filter(task => task.completed).length
  const TotalTasks = tasks.length
  const progress = (CompletedTasks / TotalTasks) * 100
  const ProgressBar = document.getElementById("progress")
  ProgressBar.style.width = `${progress}%`
  document.getElementById('numbers').innerText = `${CompletedTasks}/${TotalTasks}`
  if (tasks.length && CompletedTasks == TotalTasks) {
    fireworks();
  }
};
const UpdateTasksList = () => {
  const TaskList = document.getElementById("task_list");
  TaskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const ListItem = document.createElement("li");
    ListItem.innerHTML = `
        <div class="TaskItem">
        <div class="task ${task.completed ? 'completed' : ''}">
        <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''}/>
        <p>${task.text}</p>
        </div>
        <div class="icons">
        <img src="copy_icon.webp" alt="Edit" onClick="EditTask(${index})"/>
        <img src="delete_icon.png" alt="Delete" onClick="DeleteTask(${index})"/>
        </div>
        </div>
        `;
    ListItem.querySelector(".checkbox").addEventListener("change", () => ToggleTaskComplete(index));
    TaskList.appendChild(ListItem);
  });
};
document.getElementById("NewTask").addEventListener("click", function (e) {
  e.preventDefault();
  addTask();
});
const fireworks = () => {
  const duration = 15 * 1000,
  animationEnd = Date.now() + duration;

let skew = 1;

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

(function frame() {
  const timeLeft = animationEnd - Date.now(),
    ticks = Math.max(200, 500 * (timeLeft / duration));

  skew = Math.max(0.8, skew - 0.001);

  confetti({
    particleCount: 1,
    startVelocity: 0,
    ticks: ticks,
    origin: {
      x: Math.random(),
      y: Math.random() * skew - 0.2,
    },
    colors: ["#ffffff"],
    shapes: ["circle"],
    gravity: randomInRange(0.4, 0.6),
    scalar: randomInRange(0.4, 1),
    drift: randomInRange(-0.4, 0.4),
  });

  if (timeLeft > 0) {
    requestAnimationFrame(frame);
  }
})();
};
const script = document.createElement("script");
script.src ="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@3.0.3/tsparticles.confetti.bundle.min.js";
document.body.appendChild(script);