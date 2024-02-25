<template>
  <div :class="['bg-white', 'p-4', 'rounded', 'mb-4', 'shadow', { 'border-green-500 border-l-4': task.completed, 'border-red-500 border-l-4': !task.completed, 'border-gray-300': !task.completed && !isTaskOverdue(task) }]">
    <div class="flex justify-between items-center mb-2">
      <p class="font-semibold text-lg">{{ task?.task_name }}</p>
      <div class="text-sm">
        <span v-if="task.completed" class="text-green-500">Completed</span>
        <span v-else-if="isTaskOverdue(task)" class="text-red-500">Overdue</span>
        <span v-else class="text-gray-600">Incomplete</span>
      </div>
    </div>
    <div class="text-sm text-gray-700">
      <p><span class="font-semibold">Start Date:</span> {{ task?.start_date }}</p>
      <p><span class="font-semibold">End Date:</span> {{ task?.expected_completion_date }}</p>
      <p v-if="task.members_assigned && task.members_assigned.length > 0">
        <span class="font-semibold">Members:</span> {{ task.members_assigned.join(', ') }}
      </p>
    </div>
    <div class="mt-4">
      <button @click="toggleCompletion" :class="{ 'bg-green-500': !task.completed, 'bg-red-500': task.completed, 'text-white': true, 'py-1': true, 'px-3': true, 'rounded': true, 'hover:bg-green-600': !task.completed, 'hover:bg-red-600': task.completed }">
        {{ task.completed ? 'Mark Incomplete' : 'Mark Completed' }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    task: Object
  },
  methods: {
    isTaskOverdue(task) {
      return !task.completed && new Date(task.expected_completion_date) < new Date();
    },
    toggleCompletion() {
      this.task.completed = !this.task.completed;
      this.$emit('task-status-changed', this.task);
    }
  }
};
</script>
