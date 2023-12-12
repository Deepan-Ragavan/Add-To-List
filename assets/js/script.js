let card = document.getElementById("card")
let inputEl = document.getElementById("textInput");
let listContainer = document.getElementById("listOutput")
let badge = document.getElementById("badge")
card.hidden = true


document.addEventListener('DOMContentLoaded', () => {
    //fetch Local Storage
    const taskStorage = [...JSON.parse(localStorage.getItem('tasks'))]

    taskStorage.forEach(key => {

        var list = document.createElement("div")
        listContainer.appendChild(list)
        let listItem = document.createElement("li")
        list.append(listItem)
        listItem.textContent = key.task

        let btnDiv = document.createElement("div")
        list.append(btnDiv)
        let closeBtn = document.createElement("button")
        closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
        btnDiv.append(closeBtn)

        closeBtn.addEventListener('click', removeTask)
    })

    refreshUI()
})

let addList = () => {

    let pattern = /^[\w]/g;
    if (pattern.test(inputEl.value) != true) {
        alert("Enter a valid name")
        return false
    }

    let list = document.createElement("div")
    listContainer.appendChild(list)
    let listItem = document.createElement("li")
    list.append(listItem)
    listItem.textContent = inputEl.value

    let btnDiv = document.createElement("div")
    list.append(btnDiv)
    let closeBtn = document.createElement("button")
    closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    btnDiv.append(closeBtn)

    // local storage

    localStorage.setItem('tasks',
        JSON.stringify([
            ...JSON.parse(localStorage.getItem('tasks') || '[]'),
            { task: inputEl.value }
        ])
    )

    inputEl.value = ""


    //Remove Item
    closeBtn.addEventListener('click', removeTask)

    refreshUI()
}

function removeTask(e) {
    let existingList = e.target.parentNode.parentNode.parentNode
    existingList.remove()

    let taskStorage = [...JSON.parse(localStorage.getItem('tasks'))]
    taskStorage.forEach(key => {
        if (key.task === existingList.innerText) {
            taskStorage.splice(taskStorage.indexOf(key), 1)
        }
    })

    localStorage.setItem('tasks', JSON.stringify(taskStorage))

    refreshUI()
}


// keypress Event
inputEl.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addList()
    }
})

function refreshUI() {
    badge.innerText = listContainer.children.length
    listContainer.children.length > 0
        ? ((card.hidden = false))
        : ((card.hidden = true))
}
