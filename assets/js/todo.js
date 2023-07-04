const input = $('.todo__form__input')
const buttonAdd = $('.todo__form__button')
const todoListContent = $('.todo__list')
let idUpdate;

const render = (todoList) => {
    todoListContent.html('')
    todoList.map((todo, index) => {
        const html = `
            <li class="todo__list__item display-flex-center justify-content-between">
                <p class="stt text-center mg-r-8 font-size-24">${index + 1}</p>
                <input onclick="toggleStatus(${todo.id})" class="status mg-r-16r cursor-pointer" type="checkbox" ${todo.status ? 'checked' : ''} />
                <h2 class="name flex-grow-1 font-size-24 ${todo.status ? 'name--done' : ''}">${todo.name}</h2>
                <button class="button display-none color-light border-rd-8 cursor-pointer button--update border-none mg-l-8" onclick="handleEdit(${todo.id})">Edit</button>
                <button class="button display-none color-light border-rd-8 cursor-pointer button--delete border-none mg-l-8" onclick="handleDelete(${index})">Delete</button>
                <div class="icon">
                    <i onclick="displayTooltip(event)" class="fa-solid cursor-pointer fa-ellipsis-vertical font-size-28"></i>
                    <div class="icon__tooltip cursor-pointer">
                        <p class="icon__tooltip__edit">Edit</p>
                        <p class="icon__tooltip__delete">Delete</p>
                    </div>
                </div>
            </li>
        `
        todoListContent.append(html)
    })
    console.log(todoList)
}

let todoList = [
    {
        id: 1,
        name: 'ReactJS',
        status: false,
    }
]

render(todoList)

const handleSubmit = (e) => {
    e.preventDefault();
    const nameTodo = input.val().trim();

    if (nameTodo.length === 0) { 
        alert('You must enter todo name!')
        input.val('')
    } else {
        if (buttonAdd.attr('value') === 'add') {
            const newTodo = {};
            if (todoList.length === 0) {
                newTodo.id = 1;
            } else {
                newTodo.id = todoList[todoList.length - 1].id + 1;
            }
            newTodo.name = nameTodo;
            newTodo.status = false;
            todoList.push(newTodo)
            input.val('')
            render(todoList)
            input.focus()
        } else if (buttonAdd.attr('value') === 'update') {
            todoList.map((todo) => {
                if (todo.id === idUpdate) {
                    todo.name = input.val();
                }
            })
            console.log(todoList)
            render(todoList);
            buttonAdd.text('Add')
            buttonAdd.attr('value', 'add')
            input.val('').focus();
        }
    }
}

const handleDelete = (index) => {
    todoList.splice(index, 1)
    buttonAdd.text('Add')
    buttonAdd.attr('value', 'add')
    idUpdate = 0;
    render(todoList);
}

const handleEdit = (id) => {
    const todoUpdate = todoList.find(todo => todo.id === id);
    input.val(todoUpdate.name).focus()
    buttonAdd.text('Update')
    buttonAdd.attr('value', 'update')
    idUpdate = id;
}

const toggleStatus = function(id) {
    const todoToggle = todoList.find(todo => todo.id === id);
    todoToggle.status = !todoToggle.status;
    render(todoList)
}

const displayTooltip = function(e) {
    console.log(e.target.nextElementSibling.classList.toggle('active'))
}