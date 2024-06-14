import { createTodo } from './todoManager';
import { displayTaskList } from './displayFunctions'
import { localList } from './storage';
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
  titleInput.required = true;

  const descriptionInput = document.createElement('input');
  descriptionInput.type = 'text';
  descriptionInput.id = 'description';
  descriptionInput.name = 'description';
  descriptionInput.placeholder = 'Description';
  descriptionInput.required = true;

  const dueInput = document.createElement('input');
  dueInput.type = 'date';
  dueInput.id = 'due';
  dueInput.name = 'due';
  dueInput.required = true;

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

export function appendChildren(parent, childrenArray) {
  childrenArray.forEach(element => {
    parent.appendChild(element);
  });
}


export function editTask( taskId, callback = () => {}) {
  const taskList = localList.getList('taskList') || [];

  const task = taskList.find(t => t.id === taskId);

  if (!task) return;

  const backdrop = document.createElement('div');
  backdrop.classList.add('modal-backdrop');

  const modal = document.createElement('div');
  modal.classList.add('modal');

  const editForm = document.createElement('form');
  editForm.id = 'editForm';
  

  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.value = task.title;
  titleInput.required = true;

  const descriptionInput = document.createElement('input');
  descriptionInput.type = 'text';
  descriptionInput.value = task.description;
  descriptionInput.required = true;

  const dueInput = document.createElement('input');
  dueInput.type = 'date';
  dueInput.value = task.due;
  dueInput.required = true;

  const saveBtn = document.createElement('button');
  saveBtn.type =  'submit';
  saveBtn.textContent = 'Save';

  appendChildren(editForm, [titleInput, descriptionInput, dueInput, saveBtn]);

  modal.appendChild(editForm);
  backdrop.appendChild(modal);
  document.body.appendChild(backdrop);

  editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    task.title = titleInput.value;
    task.description = descriptionInput.value;
    task.due = dueInput.value;
    localList.save('taskList', taskList);
    backdrop.style.display = 'none';
    callback()
  })
}