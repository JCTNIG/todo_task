
import './style.css';
import { displayTaskList, inputSection } from './displayFunctions'
import {projectList, deleteProject} from './projectManager';

import {taskList, deleteTodo} from './todoManager';

const addTaskBtn = document.querySelector('.addTaskButton');
const taskDeleteBtn = document.querySelector('.taskDeleteBtn');

addTaskBtn.addEventListener('click', () => {
  inputSection();
});


displayTaskList()

localStorage.clear()
