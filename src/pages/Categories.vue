<template>
  <div class="container">
    <div v-if="isLoading">
      <div class="row mt-4">
        <div class="col-12 text-center">
          <p>Loading...</p>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="row mt-4">
        <div v-for="category in categories" v-bind:key="category.id" class="col-8 offset-2 mb-4">
          <div class="card">
            <div class="card-header">
              {{ category.name }}
            </div>
            <ul class="list-group list-group-flush">
              <li v-for="forum in category.forums" v-bind:key="forum.id" class="list-group-item d-flex">
                <router-link :to="{name: 'forums.details', params: {id: forum.id}}" class="flex-fill">{{ forum.name }}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import categoryService from './../services/category.js';

const categories = ref(null);

const isLoading = computed(() => {
  return categories.value == null;
});

onMounted(async () => {
  const categoryResponse = await categoryService.getCategories();
  if (categoryResponse.data.success === true) {
    categories.value = categoryResponse.data.data;
  }
});
</script>