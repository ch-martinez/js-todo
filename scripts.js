////////////////
// Constantes //
////////////////

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

///////////////
// Funciones //
///////////////

// Renderiza la lista de tareas
const renderTodo = () => {
    todo__list.innerHTML = ''
    let cantTodo = Object.values(todoList).length

    // Verifica si hay tareas cargadas antes de renderizar
    if ( cantTodo == 0){
        pending__text.textContent = 'Sin tareas'
        
        // Estilos footer si la lista esta vacia
        btn__clear.classList.add('btn--hide')
        pending__text.classList.add('peding__text--emptyTodo')
        return
    }
    // Remueve los estilos de footer de lista vacia
    pending__text.classList.remove('peding__text--emptyTodo')
    btn__clear.classList.remove('btn--hide')
    
    let pendientes = 0

    // Crea la lista de tareas
    Object.values(todoList).forEach((todo) => {
        const clone =  template.cloneNode(true)
        clone.querySelector('li').setAttribute('id',todo.id) // Asigna el ID de la tarea para su manipulacion
        clone.querySelector(".todo__text").textContent = todo.text

        // Revisa si la tarea fue realizada, en caso de que no, suma una tarea a las pendientes
        if (todo.complete) 
            (clone.querySelector('span').classList.add('todo__text--completed'))
        else
            pendientes++
        fragment.appendChild(clone)        
    })

    pending__text.textContent = `Tienes ${pendientes} tareas pendientes`
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
        complete: false
    }
    todoList[todo.id] = todo
 
}

// Elimina una tarea
const todo_delete = (id) => {
    delete todoList[id]
}

// Swichea entre tarea completada o por completar
const todo_complete = (id) => {
    (todoList[id].complete) ? todoList[id].complete = false : todoList[id].complete = true
}


/////////////
// Eventos //
/////////////

//Inicializa la lista de tareas
renderTodo()

// Ingresa una nueva nota
form__entry.addEventListener('submit', (e) => {
    e.preventDefault()
    addTodo()
    // Restablece el valor del input
    form__entry.reset()
    entry__input.focus()
    renderTodo()
})

// Limpia toda la lista
btn__clear.addEventListener('click', (e) => {
    todoList = {}
    renderTodo()
    form__entry.reset()
    entry__input.focus()
})

// Escucha cual boton fue presionado para invocar su funcion
todo__list.addEventListener('click', (e) => {
    const todoId = e.target.parentNode.id // Obtiene la tarea seleccionada
    const btn = e.target.id // Obtiene el boton presionado
    if (btn == 'btn--del') todo_delete(todoId)
    if (btn == 'btn--complete') todo_complete(todoId)
    renderTodo()
})