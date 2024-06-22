import { localList } from './storage';
import { deleteTodo } from './todoManager';
import { editTask } from './inputDisplay';
import { format } from 'date-fns';

export function appendChildren(parent, childrenArray) {
  childrenArray.forEach(element => {
    parent.appendChild(element);
  });
}

export function displayTaskList() {
  const main = document.querySelector('.main');
  main.innerHTML = '';
  const taskList = localList.getList('taskList') || [];

  if (taskList.length < 1) {
    main.textContent = 'No tasks';
    return }

  const listDiv = document.createElement('div');
  const taskUl = document.createElement('ul');
  taskList.forEach(task => {
    const taskLi = document.createElement('li');

    const taskTitle = document.createElement('p');
    taskTitle.textContent = task.title;
    if (task.status === 'completed') {
      taskTitle.style.textDecoration = 'line-through';
    }

    const taskDesc = document.createElement('p');
    taskDesc.textContent = task.description;

    const taskPriority = document.createElement('p');
    taskPriority.textContent = `Priority: ${task.priority};`

    const taskDue = document.createElement('p');
    taskDue.textContent = format(new Date(task.due), 'dd-MM-yyyy');

    const taskCheckBox = document.createElement('input');
    taskCheckBox.type = 'checkbox';
    taskCheckBox.name = 'taskCheckBox';
    taskCheckBox.checked = task.status === 'completed';

    taskCheckBox.addEventListener('change', (event) => {
      task.status = event.target.checked ? 'completed' : 'pending';
      taskTitle.style.textDecoration = event.target.checked ? 'line-through' : 'none';
      // Update the task status in local storage
      const taskIndex = taskList.findIndex(t => t.id === task.id);
      if (taskIndex !== -1) {
        taskList[taskIndex].status = task.status;
        localList.save('taskList', taskList);
      };
    });
    
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    
    editBtn.addEventListener('click', () => {
      editTask(task.id, displayTaskList);

    });

    const taskDeleteBtn = document.createElement('button');
    taskDeleteBtn.textContent = 'Delete';
    taskDeleteBtn.classList.add('taskDeleteBtn');
    taskDeleteBtn.addEventListener('click', () => {
      deleteTodo(task.id);
      displayTaskList();
    });

    appendChildren(taskLi, [taskTitle, taskDesc, taskDue, taskPriority, taskCheckBox, editBtn, taskDeleteBtn]);
    taskUl.appendChild(taskLi);
  });

  listDiv.appendChild(taskUl);
  main.appendChild(listDiv);
}

