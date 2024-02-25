<template>
  <div class="flex flex-col h-screen">
    <div>
      <header-item />
    </div>
    <div>
      <h1 class="text-center my-4 mx-auto font-bold text-2xl">Project Management Dashboard</h1>
    </div>
    <div class="flex-grow">
      <router-view></router-view>
      <!-- <projects /> -->
    </div>
    <div>
      <footer-item />
    </div>

  </div>
</template>

<script>
import HeaderItem from './components/HeaderItem.vue';
import FooterItem from './components/FooterItem.vue';
import projectsData from './assets/data/projects';
import membersData from './assets/data/team_members';
import Projects from './components/Projects.vue';
export default {
  data() {
    return {
      projects:  projectsData,
      members:   membersData
    }
  },
  components: {
    HeaderItem,
    FooterItem,
    Projects
  }
}
</script>
