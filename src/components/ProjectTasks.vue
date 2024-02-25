<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-semibold mb-4">{{ project?.name }}</h1>
    <div class="flex justify-end mb-4">
      <button @click.prevent="showTaskModal" class="text-black hover:bg-slate-200 font-bold py-2 px-4 rounded-full shadow-md">Add Task</button>
    </div>
    
      
    <div class="flex space-x-4">
      <task-list title="Completed Tasks" :tasks="completedTasks" @task-changed="handleTaskStatusChanged"
        @tasks-updated="updateProjectTasks" @task-added="addTask" @task-removed="removeTask" />
      <task-list title="Incomplete Tasks" :tasks="incompleteTasks" @task-changed="handleTaskStatusChanged"
        @tasks-updated="updateProjectTasks" @task-added="addTask" @task-removed="removeTask" />
    </div>
    
    <task-modal v-if="taskModalVisible" :projectName="project.name" :numberOfTasks="project.tasks.length"
      @task-added="handleTaskAdded" @close-modal="closeModal"/>
  </div>
</template>
<script>
import TaskList from './TaskList.vue';
import TaskModal from './TaskModal.vue';
import projectsData from '../assets/data/projects';

import { VueDraggable } from 'vue-draggable-plus'
import { reactive } from 'vue';

export default {
  components: {
    TaskList,
    TaskModal,
    draggable: VueDraggable
  },
  data() {
    return {
      taskModalVisible: false,
      pid: "", 
      projects: '',
      project: ''
    };
  },
  computed: {

    completedTasks() {
      if (!this.project) return [];
      return this.project.tasks.filter(task => task.completed);
    },
    incompleteTasks() {
      if (!this.project) return [];
      return this.project.tasks.filter(task => !task.completed);
    }
  },
  methods: {
    handleTaskStatusChanged(changedTask) {
      if (!this.project) return; 
      const taskIndex = this.project.tasks.findIndex(task => task.task_id === changedTask.task_id);
      if (taskIndex !== -1) {
        this.$store.dispatch('updateTaskInProject', { projectId: this.pid,taskId:changedTask.task_id, updatedTask: changedTask })
      }
    },
    showTaskModal() {
      this.taskModalVisible = true;
    },
    closeModal(){
      console.log("Yes I am closing")
      this.taskModalVisible = false;
    },
    handleTaskAdded(task) {
      this.$store.dispatch('addTaskToProject', { projectId: this.pid,task:task})
      this.taskModalVisible = false;
    },
    addTask(task) {
      this.project.tasks.push(task);
    },
    removeTask(removedTask) {
      const index = this.project.tasks.findIndex(task => task.id === removedTask.id);
      if (index !== -1) {
        this.project.tasks.splice(index, 1);
      }
    },
    updateProjectTasks(newTaskList) {
      this.project.tasks = newTaskList;
    }
  },
  watch: {
    '$route.params.id'(newValue) {
      this.pid = newValue;
      this.project = this.projects.find(project => project.id === newValue);
    }
  },
  mounted() {
    this.pid = this.$route.params.id
    this.projects = this.$store.state.projects;
    this.project = this.projects.find(project => project.id === this.pid);
  }
};
</script>