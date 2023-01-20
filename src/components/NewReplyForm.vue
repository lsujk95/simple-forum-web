<template>
  <div class="card">
    <div class="card-body">
      <div v-if="isLoggedIn">
        <loading-box v-if="replyDuringAdd"></loading-box>
        <form v-else @submit.prevent="onFormSubmit">
          <div class="mb-3">
            <label for="replyContent" class="form-label"><h3>New Reply:</h3></label>
            <textarea class="form-control" :class="{'is-invalid': replyError}"  id="replyContent" rows="3" v-model="replyContent"></textarea>
            <div class="invalid-feedback">
              {{ replyError }}
            </div>
          </div>
          <div class="d-grid gap-2">
            <button class="btn btn-primary" type="submit">Submit</button>
          </div>
        </form>
      </div>
      <div v-else>
        <router-link :to="{name: 'login'}">Log in</router-link> or <router-link :to="{name: 'register'}">Register</router-link> to reply...
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed } from 'vue';
import { useStore } from 'vuex';
import replyService from '../services/reply.js';
import LoadingBox from './layout/LoadingBox.vue';

const props = defineProps({
  threadId: Number,
});

const emits = defineEmits(['replyAdd']);
const store = useStore();

const isLoggedIn = computed(function () {
  return store.getters.getToken != null;
});

const replyContent = ref('');
const replyError = ref(null);
const replyDuringAdd = ref(false);

async function onFormSubmit() {
  replyError.value = null;
  replyDuringAdd.value = true;

  try {
    const replyResponse = await replyService.addReply(store.getters.getToken, props.threadId, replyContent.value);
    if (replyResponse.data.success === true) {
      replyContent.value = "";
      emits('replyAdd', replyResponse.data.data);
    } else {
      replyError.value = replyResponse.data.message;
    }

    replyDuringAdd.value = false;
  } catch (error) {
    console.log(error);
  }
}
</script>

<style scoped>
h3 {
  font-size: 1.2rem !important;
}
</style>