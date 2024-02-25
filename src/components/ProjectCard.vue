<template>
    <div class="bg-teal-500 text-white rounded-lg shadow-md overflow-hidden">
      <div class="p-6">
        <h2 class="text-lg font-semibold mb-2">{{completedTasks.name }}</h2>
        <p class="text-sm text-white mb-4">{{ truncateDescription(completedTasks.description) }}</p>
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center">
            <div class="w-4 h-4 rounded-full mr-2" :class="{ 'bg-green-500': completedTasks.tasks_completed === completedTasks.total_tasks, 'bg-yellow-500': completedTasks.tasks_completed > 0 && completedTasks.tasks_completed < completedTasks.total_tasks, 'bg-red-500': completedTasks.tasks_completed === 0 }"></div>
            <div class="text-sm text-white">
              {{ completedTasks.tasks_completed }} / {{ completedTasks.total_tasks }} tasks completed
            </div>
          </div>
          <div class="text-sm text-white">{{ completedTasks.tasks_incomplete }} tasks incomplete</div>
        </div>
        <div class="text-xs text-gray-500">{{ completedTasks.last_updated }}</div>
      </div>
      <div class="bg-gray-100 px-6 py-3 flex justify-between items-center">
        <router-link :to="`/project/${completedTasks.id}`" class="text-sm font-semibold text-blue-500 hover:text-blue-700">View Tasks</router-link>
        <button class="text-sm font-semibold text-black hover:text-gray-800 focus:outline-none">More Details</button>
      </div>
    </div>
  </template>
  <script>
  export default {
    props: {
      project: Object
    },
    computed: {
    completedTasks() {
      return this.project;
    },
  },
    methods: {
      truncateDescription(description) {
        if (!description || description.length <= 50) return description;
        return description.slice(0, 50) + '...';
      },

    },
  };
  </script>
  