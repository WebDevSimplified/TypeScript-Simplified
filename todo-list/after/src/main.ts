type Todo = {
  id: string
  name: string
  complete: boolean
}

const form = document.querySelector<HTMLFormElement>("#new-todo-form")!
const todoInput = document.querySelector<HTMLInputElement>("#todo-input")!
const list = document.querySelector<HTMLUListElement>("#list")!
const LOCAL_STORAGE_PREFIX = "ADVANCED_TODO_LIST"
const TODOS_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-todos`
let todos = loadTodos()
todos.forEach(renderTodo)

form.addEventListener("submit", e => {
  e.preventDefault()

  const todoName = todoInput.value
  if (todoName === "") return
  const newTodo = {
    name: todoName,
    complete: false,
    id: new Date().valueOf().toString(),
  }
  todos.push(newTodo)
  renderTodo(newTodo)
  saveTodos()
  todoInput.value = ""
})

function renderTodo(todo: Todo) {
  const listItem = document.createElement("li")
  listItem.classList.add("list-item")

  const label = document.createElement("label")
  label.classList.add("list-item-label")

  const textElement = document.createElement("span")
  textElement.classList.add("label-text")
  textElement.innerText = todo.name

  const checkbox = document.createElement("input")
  checkbox.type = "checkbox"
  checkbox.classList.add("label-input")
  checkbox.checked = todo.complete
  checkbox.addEventListener("change", () => {
    todo.complete = checkbox.checked
    saveTodos()
  })

  const deleteButton = document.createElement("button")
  deleteButton.classList.add("delete-btn")
  deleteButton.innerText = "Delete"
  deleteButton.addEventListener("click", () => {
    listItem.remove()
    todos = todos.filter(t => t.id !== todo.id)
    saveTodos()
  })

  label.append(checkbox, textElement)
  listItem.append(label, deleteButton)
  list.appendChild(listItem)
}

function loadTodos() {
  const todosString = localStorage.getItem(TODOS_STORAGE_KEY)
  return todosString == null ? [] : (JSON.parse(todosString) as Todo[])
}

function saveTodos() {
  localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos))
}
