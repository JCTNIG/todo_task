import { Project } from './projectClass';
import { format } from 'date-fns';
import { localList } from './storage';



let newProjectList = localList.getList('projectList');

export function createProject(title, description, due, id) {
  const newProject = new Project(title, description, due, id);
  newProjectList.push(newProject);

  localList.save('projectList', newProjectList);
};

export function deleteProject(id) {
  newProjectList = newProjectList.filter(project => project.id !== id);
  localList.save('projectList', newProjectList)
}

const now = new Date();
const projectId = format(now, 'MM/dd_HH:mm:ss');

// Create a new project and save it
//createProject('Travel Home', 'Go see my parents', '02/07/2024', projectId);

createProject('Travel Home', 'Go see my parents', '02/07/2024', projectId + 'P');


// Get the list of projects from local storage
export const projectList = localList.getList('projectList');

