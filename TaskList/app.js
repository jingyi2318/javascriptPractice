// UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Check if there are tasks in local storage and retrieve them
if (localStorage.getItem('tasks') !== null) {
    let tasks;
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(function(item) {
        // create li element and add input task
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(item));

        // create x link to delete
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class = "fa fa-remove"></i>';

        // append link to li
        li.appendChild(link);

        // append li to ui
        taskList.appendChild(li);
    });
}

loadEventListeners();

function loadEventListeners() {
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearTasks);
    filter.addEventListener('input', filterTasks);
}

function addTask(e) {
    // warning if no input
    if(taskInput.value === '') {
        alert('Add a task!!');
    } else {
        // create li element
        const li = document.createElement('li');
        // add class
        li.className = 'collection-item';
        // create text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));
        // create new link element
        const link = document.createElement('a');
        // add class
        link.className = 'delete-item secondary-content';
        // add icon html
        link.innerHTML = '<i class = "fa fa-remove"></i>';
        // append link to li
        li.appendChild(link);

        // append li to ui
        taskList.appendChild(li);

        // store task
        storeTaskLocal(taskInput.value);

        // clear input
        taskInput.value = '';

        e.preventDefault();
    }
}

function storeTaskLocal(task) {
    let tasks;

    // check if tasks already exists in local storage
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    // append new task onto end of tasks and add to local storage
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// requires: task list is not empty
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm("Are you sure you want to delete this task?")) {
            let tasks = JSON.parse(localStorage.getItem('tasks'));
            const index = tasks.indexOf(e.target.parentElement.parentElement.firstChild.textContent);
            console.log(index);

            // removes task from tasks, then local storage
            if (index != -1) {
                tasks.splice(index, 1);
            }
            localStorage.setItem('tasks', JSON.stringify(tasks));

            // remove task from display
            e.target.parentElement.parentElement.remove();
        }
    }
}

function clearTasks(e) {
    e.preventDefault();

    // warning for no tasks to clear
    if(taskList.children.length == 0) {
        alert("You have no tasks.");
    } else {
        localStorage.clear();
        while(taskList.firstChild) {
            taskList.firstChild.remove();
        }
    }
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    // loops through all tasks and hides ones that do not match filter
    document.querySelectorAll('.collection-item').forEach(function(task) {
        let item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });   
}
