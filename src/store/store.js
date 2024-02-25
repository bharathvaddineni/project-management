import { createStore } from "vuex";
import projectsData from "@/assets/data/projects";
export const store = createStore({
  state: {
    projects: projectsData,
  },
  actions: {
    addTaskToProject: ({ commit }, payload) =>
      commit("addTaskToProject", payload),
    updateTaskInProject: ({ commit }, payload) =>
      commit("updateTaskInProject", payload),
  },
  mutations: {
    addTaskToProject(state, { projectId, task }) {

        const projectIndex = state.projects.findIndex((proj) => proj.id === projectId);
        if (projectIndex !== -1) {
            state.projects[projectIndex].tasks.push(task);
            state.projects[projectIndex].total_tasks += 1
            state.projects[projectIndex].tasks_incomplete += 1
            state.projects = [...state.projects];
          }
    },
    updateTaskInProject(state, { projectId, taskId, updatedTask }) {

      const project = state.projects.find((proj) => proj.id === projectId);

      if (project) {
        const taskIndex = project.tasks.findIndex((task) => task.task_id === taskId);
        if (taskIndex !== -1) {
          project.tasks.splice(taskIndex, 1, updatedTask);
          if(updatedTask.completed){
            project.tasks_completed += 1
            project.tasks_incomplete -= 1
          }else{
            project.tasks_completed -= 1
            project.tasks_incomplete += 1
          }
        }
      }
      state.projects = state.projects.map(proj => proj.id === projectId ? { ...proj, tasks: [...proj.tasks] } : proj);

    },
  },
});
