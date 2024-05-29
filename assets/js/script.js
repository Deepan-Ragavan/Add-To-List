const API_URL = 'https://todo-backend-jz2g.onrender.com/todo'

let input = document.getElementById("textInput");
let listContainer = document.getElementById("listOutput");
let addBtn = document.getElementById('addBtn');
let btnContainer = document.querySelector('.btn-container')
let clearBtn = document.querySelector('.clear-btn')
let completedClear = document.querySelector('completed-clear-btn')
let countTxt = document.querySelector('.mainContainer .count-container')
let tasks = [];

const fetchTasks = async () => {
    try {
        let response = await fetch(API_URL);
        tasks = await response.json();
        addList();
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

fetchTasks();

let showTask = () => {
    let pattern = /^[\w]/g;
    if (pattern.test(input.value) != true) {
        alert("Enter a valid task")
        return false
    }
    else {
        createTasks(input.value);
    }
}

addBtn.addEventListener('click', () => {
    showTask()
})

input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        showTask()
    }
})

let createTasks = async (userTasks) => {
    let taskInfo = {
        task: userTasks,
    }
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskInfo)
        })
        const newTask = await response.json()
        tasks.push(newTask);
    } catch (err) { }
    input.value = '';
    addList();
}

let addList = () => {
    let li = '';
    tasks.forEach((todo, id) => {
        let completed = todo.completed ? 'checked' : '';
        li += `<div>
        <label class='task task-${id} d-flex'>
        <input type="checkbox" name="" id="${todo._id}" ${completed} onclick="taskComplete(this)" class='me-2'>
        <li class=${completed}>${todo.task}</li>
        </label>
        <div class='btns'>
            <button class='dlt-btn' onclick="deleteTask(${id})">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>
    </div>`;
    });

    listContainer.innerHTML = li || `<img src='https://cdni.iconscout.com/illustration/premium/thumb/empty-state-concept-3428212-2902554.png' class='img-fluid'>
        <p class='no-task-message'>No tasks added yet</p>`;

    countTasks()
    if (tasks.length == 0) {
        countTxt.style.display = 'none'
        btnContainer.style.display = 'none'
    }
    else {
        countTxt.style.display = 'block'
        btnContainer.style.display = 'flex'
    }
}

let taskComplete = async (elem) => {
    try {
        let task = tasks.filter(task => task._id === elem.id);
        task[0].completed ? task[0].completed = false : task[0].completed = true;
        await fetch(`${API_URL}/${elem.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed: task[0].completed })
        })
        addList();
        countTasks();
    } catch (err) {
        console.log(err);
    }
}

let deleteTask = async (id) => {
    try {
        const deleteId = tasks[id]._id
        await fetch(`${API_URL}/${deleteId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        fetchTasks();
        addList();
    } catch (err) {
        console.log(err);
    }
}

clearBtn.addEventListener('click', async () => {
    try {
        for (const task of tasks) {
            await fetch(`${API_URL}/${task._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }
        fetchTasks();
        addList();
    } catch (err) {
        console.log(err);
    }
})

let clearCompletedTasks = async () => {
    try {
        for (const task of tasks) {
            if (task.completed) {
                await fetch(`${API_URL}/${task._id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            }
            fetchTasks();
            addList();
        }
    } catch (err) {
        console.log(err);
    }
}

let countTasks = () => {
    let pendingTasks = tasks.filter(task => !task.completed)
    let noOfTasks = pendingTasks.length
    if (noOfTasks == 1) {
        countTxt.innerHTML = `<p>You have <strong>${noOfTasks}</strong> pending task</p>`
    } else if (noOfTasks == 0) {
        countTxt.innerHTML = `<p>No pending task</p>`
    }
    else {
        countTxt.innerHTML = `<p>You have <strong>${noOfTasks}</strong> pending tasks`
    }
}

addList();