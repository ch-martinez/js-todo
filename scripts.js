/////////////
// Constantes
/////////////

const form__entry = document.getElementById('form__entry')
const entry__input = document.getElementById('entry__input')
const todo__list = document.getElementById('todo__list')
const pending__text = document.getElementById('pending__text')
const template = document.getElementById('template').content
const fragment = document.createDocumentFragment()

const btn__add = document.getElementById('btn--add')
const btn__del = document.getElementById('btn--del')
const btn__clear = document.getElementById('btn--clear')

let todoList = {} // Registro de objetos

/////////////
// Funciones
/////////////


const renderTodo = () => {
    todo__list.innerHTML = ''
    let cantTodo = Object.values(todoList).length

    // Verifica si hay tareas cargadas antes de renderizar
    if ( cantTodo == 0){
        pending__text.textContent = 'Sin tareas'
        return
    }

    Object.values(todoList).forEach((todo) => {
        const clone =  template.cloneNode(true)
        clone.querySelector(".todo__text").textContent = todo.text
        fragment.appendChild(clone)
    })

    pending__text.textContent = `Tienes ${cantTodo} pendientes`
    todo__list.appendChild(fragment)
}

const addTodo = () => {
    const entry__Value = entry__input.value
    // Verifica que no se haya ingreasado un valor nulo
    if (entry__Value.trim() == ''){
        return
    }
    // Crea el todo para añadir al regisro
    const todo = {
        id: Date.now(),
        text: entry__Value,
        state: false
    }
    todoList[todo.id] = todo
    renderTodo()
}

///////////
// Eventos
///////////

//Inicializa la lista de tareas
renderTodo()

// Ingresa una nueva nota
form__entry.addEventListener('submit', (e) => {
    e.preventDefault()
    addTodo()
    // Restablece el valor del input
    form__entry.reset()
    entry__input.focus()
})

// Limpia toda la lista
btn__clear.addEventListener('click', (e) => {
    todoList = {}
    renderTodo()
    form__entry.reset()
    entry__input.focus()
})