import { createApp } from 'vue'
import './assets/main.css'
import App from './App.vue'
import Projects from './components/Projects.vue';
import ProjectTasks from './components/ProjectTasks.vue';
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { store } from './store/store';


const routes = [
    { path: '/', component: Projects },
    { path: '/project/:id', component: ProjectTasks }
  ];

  const router = createRouter({

    history: createWebHashHistory(),
    routes, 
  })

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')

export {router}