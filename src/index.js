
import { displayTodayTaskList } from './todayTask';
import './style.css';
import { displayTaskList } from './displayFunctions';
import { inputSection } from './inputDisplay';
import { displayThisWeekTasks } from './thisWeek';
import {projectList, deleteProject} from './projectManager';

import {taskList, deleteTodo} from './todoManager';

const addTaskBtn = document.querySelector('.addTaskButton');
const allTaskBtn = document.querySelector('.allTaskBtn')
const todayTasks = document.querySelector('.todayTasks');
const ThisWeekBtn = document.querySelector('.thisWeek');


addTaskBtn.addEventListener('click', () => {
  inputSection();
});
todayTasks.addEventListener('click', displayTodayTaskList);
allTaskBtn.addEventListener('click', displayTaskList);
ThisWeekBtn.addEventListener('click', displayThisWeekTasks)


displayTaskList()

//localStorage.clear();
