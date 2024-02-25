// router.js

import Vue from 'vue';
import VueRouter from 'vue-router';
import Projects from '../components/Projects.vue';
import ProjectTasks from '../components/ProjectTasks.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Projects },
  { path: '/project/:id', component: ProjectTasks, props: true }
];

const router = new VueRouter({
  routes
});

export default router;
