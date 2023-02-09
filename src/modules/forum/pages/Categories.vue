<template>
  <div class="container">
    <div v-if="isLoading">
      <div class="row mt-4">
        <div class="col-12 text-center">
          <loading-box></loading-box>
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
import { ref, computed } from 'vue';

// Loading Box
import LoadingBox from './../../../components/layout/LoadingBox.vue';
const isLoading = computed(function () {
  return categories.value == null;
});

// Categories hook
import useCategories from "../hooks/categories.js";
const categoriesHook = useCategories();

// Categories list
const categories = ref(null);

async function loadCategories() {
  try {
    const categoryResponse = await categoriesHook.getCategories();
    if (categoryResponse.success === true) {
      categories.value = categoryResponse.data;
    }
  } catch (error) {
    console.log('error', error);
  }
}
loadCategories();

</script>