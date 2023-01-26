<template>
  <div class="card">
    <div class="card-body">
      <div class="mb-2 d-flex">
        <div class="flex-fill">
          <b>{{ reply.user.name }}</b>&nbsp;
          <span class="text-muted">{{ moment(reply.createdAt).format('DD.MM.YYYY, HH:mm') }}</span>
        </div>
        <div>
          <button v-if="isOwner && !replyDuringRemove && !replyDuringEditSave" class="btn btn-link reply-action m-0 p-0 mx-1" @click="toggleReplyEdit">{{ getEditButtonText }}</button>
          <button v-if="isOwner && !replyDuringRemove && !replyDuringEdit && !replyDuringEditSave" class="btn btn-link reply-action m-0 p-0" @click="removeReply">Remove</button>
        </div>
      </div>
      <div v-if="replyDuringEditSave">
        <loading-box></loading-box>
      </div>
      <div v-if="!replyDuringEdit && !replyDuringEditSave">{{ reply.content }}</div>
      <div v-if="replyDuringEdit && !replyDuringEditSave">
        <textarea class="form-control" :class="{'is-invalid': replyEditError}" style="resize: none;" id="replyContent" rows="3" v-model="replyEditContent"></textarea>
        <div class="invalid-feedback">
          {{ replyEditError }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import moment from 'moment';
import { defineProps, toRef, computed, defineEmits, ref } from 'vue';
import { useStore } from 'vuex';
import LoadingBox from './../../../components/layout/LoadingBox.vue';
import useReply from "../hooks/reply.js";

const props = defineProps({
  reply: Object,
});

const emits = defineEmits(['replyRemove']);
const store = useStore();
const replyHook = useReply();

const reply = toRef(props, 'reply');
const replyEditContent = ref('');
const replyEditError = ref(null);

const isOwner = computed(function () {
  return store.getters.getUser && store.getters.getUser.id === reply.value.userId;
});

const replyDuringEdit = ref(false);
const replyDuringEditSave = ref(false);
const getEditButtonText = computed( () => {
  return replyDuringEdit.value === true ? 'Save' : 'Edit';
})

async function toggleReplyEdit() {
  replyDuringEdit.value = !replyDuringEdit.value;
  if (replyDuringEdit.value === true) {
    replyEditContent.value = reply.value.content;
  } else {
    replyDuringEditSave.value = true;
    try {
      const replyResponse = await replyHook.updateReply(reply.value.id, replyEditContent.value);
      if (replyResponse.success === true) {
        reply.value.content = replyEditContent.value;
      } else {
        replyEditError.value = replyResponse.message;
      }
      replyDuringEditSave.value = false;
    } catch (error) {
      console.log('error', error);
    }
  }
}

const replyDuringRemove = ref(false);
async function removeReply() {
  replyDuringRemove.value = true;
  try {
    const replyResponse = await replyHook.removeReply(reply.value.id);
    if (replyResponse.success === true) {
      emits('replyRemove', reply.value.id);
    }

    replyDuringRemove.value = false;
  } catch (error) {
    console.log('error', error);
  }
}
</script>

<style scoped>
.reply-action {
  line-height: 1.0 !important;
}
</style>