<template>
    <div class="container mx-auto p-4">
      <input type="text" v-model="search" placeholder="Search Project" class="border rounded px-3 py-2 mb-4 w-full md:w-1/2 lg:w-1/3">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <ProjectCard v-for="project in filteredProjects" :key="project.id" :project="project" @click="navigateToTaskDetails(project.id)" />
      </div>
      <div v-if="filteredProjects.length === 0" class="text-center mt-4 text-gray-600">No projects found.</div>
    </div>
  </template>
  
  <script>
  import ProjectCard from './ProjectCard.vue';
  import { router } from '../main';
  import projectData from '../assets/data/projects'
  import {useStore} from 'vuex'
  import { ref } from 'vue';
  
  export default {
    components: {
      ProjectCard
    },
    data() {
      return {
        search: '',
        projects: projectData,  
      };
    },
    computed: {
      filteredProjects() {
        const projects = this.$store.state.projects;
        if (!this.search.trim()) return projects;
        const searchLower = this.search.toLowerCase();
        return projects.filter(project => project.name.toLowerCase().includes(searchLower));
      }
    },
    methods: {
      navigateToTaskDetails(projectId) {
        router.push(`/project/${projectId}`);  
      }
    }
  };
  </script>
  