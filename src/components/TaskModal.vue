<template>
    <transition name="modal">
      <div class="fixed inset-0 flex items-center justify-center">
        <div class="absolute inset-0 bg-gray-900 opacity-50"></div>
        <div class="bg-white p-6 rounded shadow-lg z-50">
          <div class="flex flex-row justify-between items-center ">

            <h2 class="text-lg font-semibold mb-4">Add Task</h2>
          </div>
          <form @submit.prevent="addTask">
            <div class="mb-4">
              <label class="block text-sm font-semibold">Task Name:</label>
              <input v-model="taskName" type="text" class="border rounded px-3 py-2 w-full" required>
            </div>
            <div class="mb-4">
              <label class="block text-sm font-semibold">Start Date:</label>
              <input v-model="startDate" type="date" class="border rounded px-3 py-2 w-full" required>
            </div>
            <div class="mb-4">
              <label class="block text-sm font-semibold">End Date:</label>
              <input v-model="endDate" type="date" class="border rounded px-3 py-2 w-full" required>
            </div>
            <div class="mb-4">
              <label class="block text-sm font-semibold">Members:</label>
              <input v-model="members" type="text" class="border rounded px-3 py-2 w-full" required>
            </div>
            <div class="text-right flex justify-between">
              <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Add</button>
              <button class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600" @click.prevent="close">Close</button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </template>
  
  <script>
  export default {
    props: {
      visible: Boolean,
      projectName: String,
      numberOfTasks: Number
    },
    data() {
      return {
        taskName: '',
        startDate: '',
        endDate: '',
        members: '',
      };
    },
    methods: {
      addTask() {
        const newTask = {
          task_id: this.numberOfTasks + 1,
          task_name: this.taskName,
          start_date: this.startDate,
          expected_completion_date: this.endDate,
          members_assigned: this.members.split(',').map(member => member.trim()),
          completed: false,
          overdue:false
        };
        this.resetForm();
        this.$emit('task-added', newTask);
      },
      close(){
        this.resetForm();
        this.$emit('close-modal');
      },
      resetForm() {
        this.taskName = '';
        this.startDate = '';
        this.endDate = '';
        this.members = '';
      }
    }
  };
  </script>
  
  <style>
  .modal-enter-active, .modal-leave-active {
    transition: opacity 0.3s ease;
  }
  .modal-enter, .modal-leave-to {
    opacity: 0;
  }
  </style>
  