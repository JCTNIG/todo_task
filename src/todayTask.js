import { localList } from './storage';
import { appendChildren } from './displayFunctions';
import { deleteTodo } from './todoManager';
import { format, isToday } from 'date-fns';
import { editTask } from './inputDisplay';

export function displayTodayTaskList() {
  const main = document.querySelector('.main');
  main.innerHTML = '';

  const taskList = localList.getList('taskList') || [];

  const todayTasks = taskList.filter(task => isToday(new Date(task.due)));

  if (todayTasks.length < 1) {
    const noTask = document.createElement('p');
    noTask.textContent = 'No task for today';
    main.appendChild(noTask);
    return;
  }

  const listDiv = document.createElement('div');
  const taskUl = document.createElement('ul');

  todayTasks.forEach(task => {
    const taskLi = document.createElement('li');

    const taskTitle = document.createElement('p');
    taskTitle.textContent = task.title;
    if (task.status === 'completed') {
      taskTitle.style.textDecoration = 'line-through';
    }

    const taskDesc = document.createElement('p');
    taskDesc.textContent = task.description;

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
      }
    });

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    
    editBtn.addEventListener('click', () => {
      editTask(task.id,
      displayTodayTaskList)
    })

    const taskDeleteBtn = document.createElement('button');
    taskDeleteBtn.textContent = 'Delete';
    taskDeleteBtn.classList.add('taskDeleteBtn');
    taskDeleteBtn.addEventListener('click', () => {
      deleteTodo(task.id);
      displayTodayTaskList();
    });

    appendChildren(taskLi, [taskTitle, taskDesc, taskDue, taskCheckBox, editBtn, taskDeleteBtn]);
    taskUl.appendChild(taskLi);
  });

  listDiv.appendChild(taskUl);
  main.appendChild(listDiv);
};
