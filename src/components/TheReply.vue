<template>
  <div class="card">
    <div class="card-body">
      <div class="mb-2 d-flex">
        <div class="flex-fill">
          <b>{{ reply.user.name }}</b>&nbsp;
          <span class="text-muted">{{ moment(reply.createdAt).format('DD.MM.YYYY, HH:mm') }}</span>
        </div>
        <div>
          <button v-if="isOwner && !replyDuringRemove" class="btn btn-link" @click="removeReply">Remove</button>
        </div>
      </div>
      <div>{{ reply.content }}</div>
    </div>
  </div>
</template>

<script setup>
import moment from 'moment';
import { defineProps, toRef, computed, defineEmits, ref } from 'vue';
import { useStore } from 'vuex';
import replyService from "../services/reply.js";

const props = defineProps({
  reply: Object,
});

const emits = defineEmits(['replyRemove']);
const store = useStore();
const reply = toRef(props, 'reply');
const replyDuringRemove = ref(false);

const isOwner = computed(function () {
  return store.getters.getUser && store.getters.getUser.id === reply.value.userId;
});

async function removeReply() {
  replyDuringRemove.value = true;
  try {
    const replyResponse = await replyService.removeReply(store.getters.getToken, reply.value.id);
    if (replyResponse.data.success === true) {
      emits('replyRemove', reply.value.id);
    }

    replyDuringRemove.value = false;
  } catch (error) {
    console.log(error);
  }
}

</script>