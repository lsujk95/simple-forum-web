<template>
  <div class="card">
    <div class="card-body">
      <div v-if="isLoggedIn">
        <loading-box v-if="replyDuringAdd"></loading-box>
        <form v-else @submit.prevent="onFormSubmit">
          <div class="mb-3">
            <label for="replyContent" class="form-label">New Reply:</label>
            <textarea class="form-control" :class="{'is-invalid': replyError}" style="resize: none;" id="replyContent" rows="3" v-model="replyContent"></textarea>
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

// Loading box component
import LoadingBox from './../../../components/layout/LoadingBox.vue';

// Incoming/outcoming data
const props = defineProps({
  threadId: Number,
});
const emits = defineEmits(['replyAdd']);

// Store hook
import { useStore } from 'vuex';
const storeHook = useStore();

const isLoggedIn = computed(function () {
  return storeHook.getters.getToken != null;
});

// Reply hook
import useReply from './../hooks/reply.js';
const replyHook = useReply();

// Reply creating
const replyDuringAdd = ref(false);
const replyContent = ref('');
const replyError = ref(null);

async function onFormSubmit() {
  replyError.value = null;
  replyDuringAdd.value = true;

  try {
    const replyResponse = await replyHook.createReply(props.threadId, replyContent.value);
    if (replyResponse.success === true) {
      replyContent.value = "";
      emits('replyAdd', replyResponse.data);
    } else {
      replyError.value = replyResponse.message;
    }

    replyDuringAdd.value = false;
  } catch (error) {
    console.log('error', error);
  }
}
</script>

<style scoped>
h3 {
  font-size: 1.2rem !important;
}
</style>