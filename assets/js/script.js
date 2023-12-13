let input = document.getElementById("textInput");
let listContainer = document.getElementById("listOutput");
let addBtn = document.getElementById('addBtn');
let btnContainer = document.querySelector('.btn-container')
let clearBtn = document.querySelector('.clear-btn')
let completedClear = document.querySelector('completed-clear-btn')
let countTxt = document.querySelector('.mainContainer .count-container')
let tasks = JSON.parse(localStorage.getItem('all-tasks') || '[]');

let showTask = () => {
    let pattern = /^[\w]/g;
    if (pattern.test(input.value) != true) {
        alert("Enter a valid name")
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

let createTasks = (userTasks) => {
    let taskInfo = { task: userTasks, status: 'pending' };
    tasks.push(taskInfo);
    localStorage.setItem('all-tasks', JSON.stringify(tasks));
    input.value = '';
    addList()
}

let addList = () => {
    let li = '';
    tasks.forEach((todo, id) => {
        let completed = todo.status == 'completed' ? 'checked' : '';
        li += `<div>
        <div class='task task-${id} d-flex'>
        <input type="checkbox" name="" id="${id}" ${completed} onclick="taskComplete(this)" class='me-2'>
        <li class=${completed}>${todo.task}</li>
        </div>
        <div class='btns'>
            <button class='dlt-btn' onclick="deleteTask(${id})">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>
    </div>`;
    });

    listContainer.innerHTML = li || `<img src='https://cdni.iconscout.com/illustration/premium/thumb/empty-state-concept-3428212-2902554.png' class='img-fluid'>
        <p class='no-task-message'>No tasks here yet</p>`;

    countTasks()
    if (tasks.length == 0) {
        countTxt.style.display = 'none'
        btnContainer.style.display = 'none'
    }
    else{
        countTxt.style.display = 'block'
        btnContainer.style.display = 'flex'
    }
}

let taskComplete = (elem) => {
    if (elem.checked) {
        elem.nextElementSibling.classList.add('checked');
        tasks[elem.id].status = 'completed';
    } else {
        elem.nextElementSibling.classList.remove('checked');
        tasks[elem.id].status = 'pending';
    }
    localStorage.setItem("all-tasks", JSON.stringify(tasks));
}

let deleteTask = (deleteId) => {
    tasks.splice(deleteId, 1);
    localStorage.setItem("all-tasks", JSON.stringify(tasks));
    addList();
}

clearBtn.addEventListener('click', () => {
    tasks = []
    localStorage.setItem('all-tasks', JSON.stringify(tasks))
    addList()
})

let clearCompletedTasks = (elem) => {
    for (let i = tasks.length - 1; i >= 0; i--) {
        if (tasks[i].status === 'completed') {
            tasks.splice(i, 1);
        }
    }
    localStorage.setItem('all-tasks', JSON.stringify(tasks));
    addList();
}

let countTasks = () => {
    let noOfTasks = tasks.length
    if (noOfTasks == 1) {
        countTxt.innerHTML = `<p>You have <strong>${noOfTasks}</strong> task pending`
    }
    else {
        countTxt.innerHTML = `<p>You have <strong>${noOfTasks}</strong> tasks pending`
    }
}

addList();