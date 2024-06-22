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

  // priority logic
  const inputPriority = document.createElement('select');
  inputPriority.id = 'select';
  inputPriority.name = 'select';
    const option1 = document.createElement('option');
      option1.value = 'High';
      option1.textContent = 'High';
    const option2 = document.createElement('option');
      option2.value = 'Medium';
      option2.textContent = 'Medium';
    const option3 = document.createElement('option');
      option3.value = 'Low';
      option3.textContent = 'Low';
  appendChildren(inputPriority, [option1, option2, option3]);

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.textContent = 'Create Todo';

  const cancelBtn = document.createElement('button');
  cancelBtn.type = 'button';
  cancelBtn.textContent = 'Cancel';

  appendChildren(form, [titleInput, descriptionInput, dueInput, inputPriority, submitBtn, cancelBtn]);
  modal.appendChild(form);
  backdrop.appendChild(modal);
  document.body.appendChild(backdrop);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const now = new Date();
    const idDate = format(now, 'MM/dd_HH:mm:ss');
    createTodo(titleInput.value, descriptionInput.value, dueInput.value, `${idDate}T`, inputPriority.value);

    form.reset();
    backdrop.style.display = 'none';
    displayTaskList();
  });

  cancelBtn.addEventListener('click', () => {
    form.reset();
    document.body.removeChild(backdrop);
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

  const priorityInput = document.createElement('select');
  priorityInput.id = 'select';
  priorityInput.name = 'select';

    const placeholderOption = document.createElement('option');
      placeholderOption.value = '';
      placeholderOption.textContent = 'Select priority';
      placeholderOption.selected = true;
      placeholderOption.disabled = true;
    const option1 = document.createElement('option');
      option1.value = 'High';
      option1.textContent = 'High';
    const option2 = document.createElement('option');
      option2.value = 'Medium';
      option2.textContent = 'Medium';
    const option3 = document.createElement('option');
      option3.value = 'Low';
      option3.textContent = 'Low';
  appendChildren(priorityInput, [placeholderOption, option1, option2, option3]);
  priorityInput.value = task.priority;
  
  const saveBtn = document.createElement('button');
  saveBtn.type =  'submit';
  saveBtn.textContent = 'Save Changes';

  appendChildren(editForm, [titleInput, descriptionInput, dueInput, priorityInput, saveBtn]);

  modal.appendChild(editForm);
  backdrop.appendChild(modal);
  document.body.appendChild(backdrop);

  editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    task.title = titleInput.value;
    task.description = descriptionInput.value;
    task.due = dueInput.value;
    task.priority = priorityInput.value;
    localList.save('taskList', taskList);
    backdrop.style.display = 'none';
    callback()
  })
}