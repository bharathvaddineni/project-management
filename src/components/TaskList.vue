<template>
  <div class="flex-1">
    <h2 class="text-lg font-semibold mb-2">{{ title }}</h2>
    <div class="bg-gray-100 p-4 rounded">
      <draggable ref="el" v-model="tasklist" group="tasks" animation="150" @update="onUpdate" @add="onAdd"
        @remove="remove">
        <task v-for="task in tasklist" :key="task.id" :task="task" @task-status-changed="handleTaskStatusChanged" />
      </draggable>
    </div>
  </div>
</template>

<script>
import Task from './Task.vue';
import { VueDraggable } from 'vue-draggable-plus'

export default {
  components: {
    Task,
    draggable: VueDraggable
  },
  props: {
    tasks: Array,
    title: String
  },
  data() {
    return {
      tasklist: []
    }
  },
  methods: {
    handleTaskStatusChanged(changedTask) {
      this.$emit('task-changed', changedTask);
    },
    onUpdate(event){
      const newIndex = event.newIndex;
      const movedTask = this.tasklist.splice(event.oldIndex, 1)[0];
      this.tasklist.splice(newIndex, 0, movedTask);
      this.$emit('tasks-updated', this.tasklist);
    },
    onAdd(event){
      const newTask = event.item;
      this.tasklist.splice(event.newIndex, 0, newTask);
      this.$emit('task-added', newTask);
    },
    remove(event){
       const removedTask = this.tasklist.splice(event.oldIndex, 1)[0];
      this.$emit('task-removed', removedTask);
    },
    toggleCompleted(task) {
      task.completed = !task.completed;
      this.$emit('task-toggled', task);
    }
  },
  watch: {
    tasks(newTasks) {
      this.tasklist = newTasks;
    }
  }
};
</script>
