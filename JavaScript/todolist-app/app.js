// Variables
let todoItems = []
const todoInput = document.querySelector('.todo-input')
const completedItemsDiv = document.querySelector('.completed-items')
const incompleteItemsDiv = document.querySelector('.incomplete-items')

window.onload = () => {
    let storageTodoItems = localStorage.getItem('todoItems')
    if(storageTodoItems !== null) {
        todoItems = JSON.parse(storageTodoItems)
    }
    render()
}

// Get the content typed into the input box by the user.
todoInput.onkeyup = ((e) => {
    let value = e.target.value.replace(/^\s+/, '')
    // when enter is pressed, add the todo item to the list.
    if(value && e.keyCode === 13){
        addTodo(value)
        todoInput.value = ''
        todoInput.focus()
    }
}) 

// Add Todo
function addTodo(text) {
    todoItems.push({
        id: Date.now(),
        text,
        completed: false
    })
    saveAndRender()
}

// Remove Todo
function removeTodo(id) {
    todoItems = todoItems.filter(todo => todo.id !== Number(id))
    saveAndRender()
}

// Mark as Completed
function markAsCompleted(id) {
    todoItems = todoItems.filter(todo => {
        if(todo.id === Number(id)) {
            todo.completed = true
        }
        return todo 
    })
    saveAndRender()
}

// Mark as Incompleted
function markAsIncompleted(id) {
    todoItems = todoItems.filter(todo => {
        if(todo.id === Number(id)){
            todo.completed = false
        }
        return todo
    })
    saveAndRender()
}

// Save to local storage
function save() {
    localStorage.setItem('todoItems', JSON.stringify(todoItems))
}

// Render 
function render() {
    // completedItems and incompleteItems are copies of todoItems with a filter that filters out todo objects that are either completed or incomplete.
    let completedItems = todoItems.filter(item => item.completed)
    let incompleteItems = todoItems.filter(item => !item.completed)

    incompleteItemsDiv.innerHTML = ''
    completedItemsDiv.innerHTML = ''



    if(incompleteItems.length > 0) {
        incompleteItems.forEach(todo => {
            incompleteItemsDiv.append(createTodoElement(todo))
        })
    }else{
        incompleteItemsDiv.innerHTML = `<div class='empty'>No missions.</div>`
    }

    if(completedItems.length > 0){
        completedItemsDiv.innerHTML = `<div class='completed-title'>Completed (${completedItems.length} / ${todoItems.length})</div>`

        completedItems.forEach(todo => {
            completedItemsDiv.append(createTodoElement(todo))
        })
    }
}

// Save and Render
function saveAndRender() {
    save()
    render()
}

// Create Todo list item
function createTodoElement(todo) {
    // create the todo container
    const todoDiv = document.createElement('div')
    todoDiv.setAttribute('data-id', todo.id)
    todoDiv.className = 'todo-item'
    // creat todo item text
    const todoTextSpan = document.createElement('span')
    todoTextSpan.innerHTML = todo.text
    // create the checkbox for the list
    const todoInputCheckbox = document.createElement('input')
    todoInputCheckbox.type = 'checkbox'
    todoInputCheckbox.checked = todo.completed
    todoInputCheckbox.onclick = (e) => {
        let id = e.target.closest('.todo-item').dataset.id
        e.target.checked ? markAsCompleted(id) : markAsIncompleted(id)
    }
    // create delete button
    const todoRemoveButton = document.createElement('a') 
    todoRemoveButton.href = '#'
    todoRemoveButton.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>` 
    todoRemoveButton.onclick = (e) => {
         let id = e.target.closest('.todo-item').dataset.id
         removeTodo(id) 
    }
    todoTextSpan.prepend(todoInputCheckbox)
    todoDiv.appendChild(todoTextSpan)
    todoDiv.appendChild(todoRemoveButton)
    return todoDiv
}
