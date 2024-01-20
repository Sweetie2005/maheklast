document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
    document.getElementById('taskTitle').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
function addTask() {
    const title = document.getElementById('taskTitle').value.trim();
    const description = document.getElementById('taskDescription').value.trim();
    const dueDate = document.getElementById('taskDueDate').value;
    if (title === '') {
        alert('Task title cannot be empty.');
        return;
    }
    const task = {
        id: new Date().getTime(),
        title: title,
        description: description,
        dueDate: dueDate,
        completed: false,
    };
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDescription').value = '';
    document.getElementById('taskDueDate').value = '';
    loadTasks();
}
function loadTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(function (task) {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        if (task.completed) {
            taskElement.classList.add('completed');
        }

        taskElement.innerHTML = `
            <span>${task.title}</span>
            <span>${task.dueDate}</span>
            <span>${task.description}</span>
            <button onclick="editTask(${task.id})">Edit</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
            <button onclick="toggleTask(${task.id})">${task.completed ? 'Uncomplete' : 'Complete'}</button>
        `;

        taskList.appendChild(taskElement);
    });
}
function editTask(taskId) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks.find(function (t) {
        return t.id === taskId;
    });
    if (task) {
        document.getElementById('taskTitle').value = task.title;
        document.getElementById('taskDescription').value = task.description;
        document.getElementById('taskDueDate').value = task.dueDate;
        const index = tasks.indexOf(task);
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
    }
}
function deleteTask(taskId) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(function (task) {
        return task.id !== taskId;
    });
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    loadTasks();
}
function toggleTask(taskId) {

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks.find(function (t) {
        return t.id === taskId;
    });
    if (task) {
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
    }
}
