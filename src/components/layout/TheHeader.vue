<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">Simple Forum WebApp</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarScroll">
          <!-- Left Side Of Navbar -->
          <ul class="navbar-nav me-auto">

          </ul>

          <!-- Right Side Of Navbar -->
          <ul class="navbar-nav ms-auto">
            <li class="nav-item"><router-link class="nav-link" to="/">Home</router-link></li>
            <li v-if="!isLoggedIn" class="nav-item"><router-link class="nav-link" to="/login">Login</router-link></li>
            <li v-if="!isLoggedIn" class="nav-item"><router-link class="nav-link" to="/register">Register</router-link></li>
            <li v-if="isLoggedIn" class="nav-item"><router-link class="nav-link" to="/panel">{{ userName }}</router-link></li>
            <li v-if="isLoggedIn" class="nav-item"><a href="#" class="nav-link" @click="logout">Logout</a></li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const isLoggedIn = computed(function () {
  return store.getters.getToken != null;
});

const userName = computed(function () {
  return store.getters.getUser.name;
});

function logout() {
  store.dispatch('logout');
}

</script>

<style scoped>
nav {
  background: #784ada;
}

nav ul li a.router-link-active {
  color: white;
}
</style>