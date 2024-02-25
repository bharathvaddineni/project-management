<template>
  <header class="bg-gray-800 text-white py-4">
    <div class="container mx-auto flex justify-between items-center">

      <h1 class="text-lg font-semibold">Kanban Dashboard</h1>


      <nav>
        <ul class="flex space-x-4">
          <li><router-link to="/" class="hover:text-gray-300">Dashboard</router-link></li>

        </ul>
      </nav>


      <div class="flex items-center space-x-2">
        <span class="mr-2">John Doe</span>
        <img src="https://via.placeholder.com/40" alt="User avatar" class="rounded-full">
        <button @click="logout" class="bg-gray-600 hover:bg-gray-700 text-white py-1 px-4 rounded">
          Logout
        </button>
      </div>
    </div>
  </header>
</template>
  
<script>
export default {
  methods: {
    logout() {
      console.log("User logged out");
    }
  }
}
</script>
 
  