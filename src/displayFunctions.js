import { localList } from './storage';
import { createTodo, deleteTodo } from './todoManager';
import { format } from 'date-fns';

export function inputSection() {
  const backdrop = document.createElement('div');
  backdrop.classList.add('modal-backdrop');

  const modal = document.createElement('div');
  modal.classList.add('modal');

  const form = document.createElement('form');

  const titleInput = document.createElement('input');
  titleInput.id = 'title';
  titleInput.type = 'text';
  titleInput.name = 'title';
  titleInput.placeholder = 'Todo Title';

  const descriptionInput = document.createElement('input');
  descriptionInput.type = 'text';
  descriptionInput.id = 'description';
  descriptionInput.name = 'description';
  descriptionInput.placeholder = 'Description';

  const dueInput = document.createElement('input');
  dueInput.type = 'date';
  dueInput.id = 'due';
  dueInput.name = 'due';

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.textContent = 'Create Todo';

  const cancelBtn = document.createElement('button');
  cancelBtn.type = 'button';
  cancelBtn.textContent = 'Cancel';

  appendChildren(form, [titleInput, descriptionInput, dueInput, submitBtn, cancelBtn]);
  modal.appendChild(form);
  backdrop.appendChild(modal);
  document.body.appendChild(backdrop);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const now = new Date();
    const idDate = format(now, 'MM/dd_HH:mm:ss');
    createTodo(titleInput.value, descriptionInput.value, dueInput.value, `${idDate}T`);

    form.reset();
    backdrop.style.display = 'none';
    displayTaskList();
  });

  cancelBtn.addEventListener('click', () => {
    form.reset();
    backdrop.style.display = 'none';
  });
}

function appendChildren(parent, childrenArray) {
  childrenArray.forEach(element => {
    parent.appendChild(element);
  });
}

export function displayTaskList() {
  const main = document.querySelector('.main');
  main.innerHTML = '';
  const taskList = localList.getList('taskList') || [];

  const listDiv = document.createElement('div');
  const taskUl = document.createElement('ul');
  taskList.forEach(task => {
    const taskLi = document.createElement('li');

    const taskTitle = document.createElement('p');
    taskTitle.textContent = task.title;

    const taskDesc = document.createElement('p');
    taskDesc.textContent = task.description;

    const taskDue = document.createElement('p');
    taskDue.textContent = task.due;

    const taskCheckbox = document.createElement('input');
    taskCheckbox.type = 'checkbox';

    const taskDeleteBtn = document.createElement('button');
    taskDeleteBtn.textContent = 'Delete';
    taskDeleteBtn.classList.add('taskDeleteBtn');
    taskDeleteBtn.addEventListener('click', () => {
      deleteTodo(task.id);
      displayTaskList();
    });

    appendChildren(taskLi, [taskTitle, taskDesc, taskDue, taskCheckbox, taskDeleteBtn]);
    taskUl.appendChild(taskLi);
  });

  listDiv.appendChild(taskUl);
  main.appendChild(listDiv);
}

