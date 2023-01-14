<template>
  <the-header></the-header>
  <main>
    <router-view v-slot="slotProps">
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
  </main>
</template>

<script setup>
  import TheHeader from './components/layout/TheHeader.vue';
  import { useStore } from 'vuex';

  const store = useStore();
  store.dispatch('restoreLogin');
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: 'Nunito Sans', sans-serif;
}

body {
  margin: 0;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.btn-primary {
  --bs-btn-color: #fff !important;
  --bs-btn-bg: #8657ea !important;
  --bs-btn-border-color: #8657ea !important;

  --bs-btn-hover-color: #fff !important;
  --bs-btn-hover-bg: #784ada !important;
  --bs-btn-hover-border-color: #784ada !important;
  --bs-btn-focus-shadow-rgb: 49,132,253 !important;
  --bs-btn-active-color: #fff !important;
  --bs-btn-active-bg: #784ada !important;
  --bs-btn-active-border-color: #784ada !important;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125) !important;
  --bs-btn-disabled-color: #fff !important;
  --bs-btn-disabled-bg: #926ae7 !important;
  --bs-btn-disabled-border-color: #926ae7 !important;
}

</style>
