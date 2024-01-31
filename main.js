'use strict';

/*
<li>
  <label>
    <input />
    <span> </span>
  </label>
  <button></button>
</li>
*/

let todos;

if (localStorage.getItem('todos')===null) {
  todos = [];
} else {
  todos = JSON.parse(localStorage.getItem('todos'));
}


const renderTodo = (todo) => {
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.checked = todo.isCompleted;

  input.addEventListener('change', () => {
    todo.isCompleted = !todo.isCompleted;
    localStorage.setItem('todos', JSON.stringify(todos));
  });

  const span = document.createElement('span');
  span.textContent = todo.title;

  const label = document.createElement('label');
  label.appendChild(input);
  label.appendChild(span);

  const button = document.createElement('button');
  button.textContent = '×';

  button.addEventListener('click', () => {
    if(!confirm('削除します')){
      return;
    }
    li.remove();

    todos = todos.filter((item) => {
      return item.id !== todo.id
    });
    localStorage.setItem('todos', JSON.stringify(todos));
  });

  const li = document.createElement('li');
  li.appendChild(label);
  li.appendChild(button);

  document.getElementById('todos').appendChild(li);
};


document.getElementById('add-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.querySelector('#add-form input');
  const todo = {
    id: Date.now(),
    title: input.value,
    isCompleted: false,
  };
  renderTodo(todo);
  
  todos.push(todo);

  localStorage.setItem('todos', JSON.stringify(todos));

  input.value = '';
  input.focus();
});


const renderTodos = () => {
  todos.forEach((todo) => {
    renderTodo(todo);
  });
};

document.getElementById('purge').addEventListener('click', () => {
  if (!confirm('チェック済みの項目をすべて削除します')) {
    return;
  }
  todos = todos.filter((item) => {
    return item.isCompleted === false;
  });
  localStorage.setItem('todos', JSON.stringify(todos));
  document.querySelectorAll('#todos li').forEach((li) => {
    li.remove();
  });
  renderTodos();
});

renderTodos();