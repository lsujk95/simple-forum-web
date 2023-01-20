<template>
  <div class="container">
    <div v-if="!isLoaded">
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
            <div class="card-body">
              <h2>{{ thread.name }}</h2>
              <hr>
              created by <a href="#">{{ thread.user.name }}</a> at <b>{{ moment(thread.createdAt).format('DD.MM.YYYY, HH:mm') }}</b>
            </div>
          </div>
        </div>
        <div class="col-8 offset-2 mb-4">
          <div class="card">
            <div class="card-body">
              <div class="mb-2"><b>{{ thread.user.name }}</b> <span class="text-muted">{{ moment(thread.createdAt).format('DD.MM.YYYY, HH:mm') }}</span></div>
              <div>{{ thread.content }}</div>
            </div>
          </div>
        </div>
        <div v-for="reply in thread.replies" v-bind:key="reply.id" class="col-8 offset-2 mb-4">
          <the-reply :reply="reply" @reply-remove="onReplyRemove"></the-reply>
        </div>
        <div class="col-8 offset-2 mb-4">
          <new-reply-form :thread-id="thread.id" @reply-add="onReplyAdd"></new-reply-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import moment from 'moment';
import threadService from './../services/thread.js';

import TheReply from './../components/TheReply.vue';
import NewReplyForm from './../components/NewReplyForm.vue';
import LoadingBox from './../components/layout/LoadingBox.vue';

const route = useRoute();

const isLoaded = ref(false);
const thread = ref(null);

async function loadThread() {
  isLoaded.value = false;
  try {
    const threadResponse = await threadService.getThread(route.params.id);
    if (threadResponse.data.success === true) {
      thread.value = threadResponse.data.data;
      isLoaded.value = true;
    }
  } catch (e) {
    console.log(e);
  }
}

function onReplyAdd(data) {
  if (data != null) {
    thread.value.replies.push(data);
  }
}

function onReplyRemove(id) {
  if (id != null) {
    let replyIndex = thread.value.replies.findIndex((element) => element.id === id);
    if (replyIndex !== -1) {
      thread.value.replies.splice(replyIndex, 1);
    }
  }
}

loadThread();
</script>

<style scoped>
h2 {
  font-size: 1.6rem !important;
}
</style>