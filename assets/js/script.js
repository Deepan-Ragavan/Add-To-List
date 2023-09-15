let i = 0
let badge = document.getElementById("badge")
badge.textContent = i
let card = document.getElementById("innerContainer")

if (badge.textContent == 0) {
    badge.textContent = ""
    card.style.display = "none"
}


let inputEl = document.getElementById("textInput");
let textOutput = document.getElementById("listOutput")


addList = () => {

    let pattern = /^[\w]/g;
    if(pattern.test(inputEl.value) != true){
        alert("Enter a valid name")
        return false
    }

    card.style.display = "block"

    let list = document.createElement("li")
    textOutput.appendChild(list)
    let listItem = document.createElement("div")
    list.append(listItem)
    listItem.textContent = inputEl.value

    let btnDiv = document.createElement("div")
    list.append(btnDiv)
    let closeBtn = document.createElement("button")
    closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    btnDiv.append(closeBtn)

    badge.textContent = ++i
    inputEl.value = ""



    closeBtn.onclick = () => {
        list.style.display = "none"
        badge.textContent = --i
        if (badge.textContent == 0) {
            badge.textContent = ""
            card.style.display = "none"
        }
        
    }
}

inputEl.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addList()
    }
})

