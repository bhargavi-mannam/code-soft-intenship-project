document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage if available
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to update the task list in the UI
    function updateTaskList() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${task.title}</span>
                <button class="edit-button">Edit</button>
                <button class="delete-button">Delete</button>
            `;
            if (task.completed) {
                listItem.classList.add('completed');
            }
            listItem.querySelector('.edit-button').addEventListener('click', () => editTask(index));
            listItem.querySelector('.delete-button').addEventListener('click', () => deleteTask(index));
            listItem.addEventListener('click', () => toggleCompletion(index));
            taskList.appendChild(listItem);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to add a new task
    function addTask() {
        const newTask = { title: taskInput.value, completed: false };
        tasks.push(newTask);
        taskInput.value = '';
        updateTaskList();
    }

    // Function to edit a task
    function editTask(index) {
        const newTitle = prompt('Edit the task title:', tasks[index].title);
        if (newTitle !== null) {
            tasks[index].title = newTitle;
            updateTaskList();
        }
    }

    // Function to delete a task
    function deleteTask(index) {
        if (confirm('Are you sure you want to delete this task?')) {
            tasks.splice(index, 1);
            updateTaskList();
        }
    }

    // Function to mark/unmark a task as completed
    function toggleCompletion(index) {
        tasks[index].completed = !tasks[index].completed;
        updateTaskList();
    }

    // Event listener to add a new task
    addTaskButton.addEventListener('click', addTask);

    // Initialize the task list
    updateTaskList();
});
