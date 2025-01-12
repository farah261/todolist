let tasks = [];
let showAllTasks = false;
const inputBox = document.getElementById("input-box");
const errorMessage = document.getElementById("error-message");
const taskList = document.getElementById("task-list");
const addTaskBtn = document.getElementById("add-task");
const showAllBtn = document.getElementById("show-all");
const deleteModal = document.getElementById("deleteModal");
const editModal = document.getElementById("editModal");
const editInput = document.getElementById("edit-input");
let taskToDeleteIndex = null;
let taskToEditIndex = null;

inputBox.addEventListener("input", function () {
    const task = inputBox.value.trim();
    if (task === "") {
        errorMessage.textContent = "Task cannot be empty";
    } else if (/^\d/.test(task)) {
        errorMessage.textContent = "Task cannot start with a number";
    } else if (task.length < 5) {
        errorMessage.textContent = "Task must be at least 5 characters long";
    } else {
        errorMessage.textContent = "";
    }
});

addTaskBtn.addEventListener("click", () => {
    const taskText = inputBox.value.trim();
    if (taskText !== "" && errorMessage.textContent === "") {
        tasks.push({ text: taskText, done: false });
        inputBox.value = "";
        renderTasks();
    }
});

showAllBtn.addEventListener("click", () => {
    showAllTasks = !showAllTasks;
    renderTasks();
});

function renderTasks() {
    taskList.innerHTML = "";
    if (showAllTasks) {
        tasks.forEach((task, index) => {
            const taskDiv = document.createElement("div");
            taskDiv.className = "task-item";

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.done;
            checkbox.addEventListener("change", () => {
                tasks[index].done = checkbox.checked;
                renderTasks();
            });

            const taskText = document.createElement("span");
            taskText.textContent = task.text;
            if (task.done) {
                taskText.classList.add("done");
            }

            const editIcon = document.createElement("button");
            editIcon.className = "edit-btn-yellow";
            editIcon.innerHTML = '<i class="fa-solid fa-pen"></i>';
            editIcon.addEventListener("click", () => {
                taskToEditIndex = index;
                editInput.value = tasks[index].text;
                editModal.style.display = "block";
            });

            const deleteIcon = document.createElement("button");
            deleteIcon.className = "edit-btn";
            deleteIcon.innerHTML = '<i class="fa-solid fa-trash"></i>';
            deleteIcon.addEventListener("click", () => {
                taskToDeleteIndex = index;
                deleteModal.style.display = "block";
            });

            taskDiv.appendChild(checkbox);
            taskDiv.appendChild(taskText);
            taskDiv.appendChild(editIcon);
            taskDiv.appendChild(deleteIcon);
            taskList.appendChild(taskDiv);
        });
    }
}

document.getElementById("confirmDelete").addEventListener("click", () => {
    if (taskToDeleteIndex !== null) {
        tasks.splice(taskToDeleteIndex, 1);
        renderTasks();
        deleteModal.style.display = "none";
    }
});

document.getElementById("cancelDelete").addEventListener("click", () => {
    deleteModal.style.display = "none";
});

document.getElementById("saveEdit").addEventListener("click", () => {
    if (taskToEditIndex !== null && editInput.value.trim() !== "") {
        tasks[taskToEditIndex].text = editInput.value.trim();
        renderTasks();
        editModal.style.display = "none";
    }
});

document.getElementById("cancelEdit").addEventListener("click", () => {
    editModal.style.display = "none";
});