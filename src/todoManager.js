import { format, isToday } from 'date-fns';
import { localList } from './storage.js';
import { Todo } from './todoClass.js';

let todoList = localList.getList('taskList') || [];



export function createTodo(title, description, due, id, priority, project) {
  const newTodo = new Todo(title, description, due, id, priority, project);

  todoList.push(newTodo);

  localList.save('taskList', todoList);

  return newTodo;
};

export function deleteTodo(todoId) {
  todoList = todoList.filter(todo => todo.id !== todoId);
  localList.save('taskList', todoList);
}

const now = new Date();
const idDate = format(now, 'MM/dd_HH:mm:ss');

export function addTodoProject(todoId, projectId) {
    const todoIndex = todoList.findIndex(todo => todo.id === todoId);
    if (todoIndex !== -1) {
      todoList[todoIndex].project = projectId;
      localList.save('taskList', todoList);
    } 
};




