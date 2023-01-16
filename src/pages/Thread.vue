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
        <div class="col-8 offset-2 mb-4">
          <div class="card">
            <div class="card-header d-flex">
              <span class="flex-fill">{{ thread.name }}</span>
              <span class="text-muted">created at {{ moment(thread.createdAt).format('DD.MM.YYYY') }}</span>
            </div>
            <div class="card-body">
              {{ thread.content }}
            </div>
          </div>
        </div>
        <div v-for="reply in thread.replies" v-bind:key="reply.id" class="col-8 offset-2 mb-4">
          <div class="card">
            <div class="card-body">
              {{ reply.content }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import moment from 'moment';
import threadService from './../services/thread.js';

const route = useRoute();
const thread = ref(null);

const isLoading = computed(() => {
  return thread.value == null;
});

async function loadThread() {
  try {
    const threadResponse = await threadService.getThread(route.params.id);
    if (threadResponse.data.success === true) {
      thread.value = threadResponse.data.data;
    }
  } catch (e) {
    console.log(e);
  }
}
loadThread();

</script>