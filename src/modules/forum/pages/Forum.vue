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
        <div class="col-8 offset-2 mb-4">
          <div class="card">
            <div class="card-header">
              {{ forum.name }}
            </div>
            <ul class="list-group list-group-flush">
              <li v-for="thread in forum.threads" v-bind:key="thread.id" class="list-group-item d-flex">
                <router-link :to="{name: 'threads.details', params: {id: thread.id}}" class="flex-fill">{{ thread.name }}</router-link>
                <span class="text-muted">created at {{ moment(thread.createdAt).format('DD.MM.YYYY') }}</span>
              </li>
              <li v-if="forum.threads.length === 0" class="list-group-item">No threads...</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import moment from 'moment';
import useForum from './../hooks/forum.js';
import LoadingBox from './../../../components/layout/LoadingBox.vue';

const route = useRoute();
const forumHook = useForum();

const forum = ref(null);

const isLoading = computed(function () {
  return forum.value == null;
});

async function loadForum() {
  try {
    const forumResponse = await forumHook.getForum(route.params.id);
    if (forumResponse.data.success === true) {
      forum.value = forumResponse.data.data;
    }
  } catch (e) {
    console.log(e);
  }
}
loadForum();

</script>