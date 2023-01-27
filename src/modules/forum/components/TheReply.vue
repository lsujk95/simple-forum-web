<template>
  <div>
    <base-dialog title="Remove confirmation"
                 :show="showRemoveConrifmation"
                 :show-confirm-button="true"
                 @result="onRemoveConfirmationResult"
    >
      <p>Are you sure?</p>
    </base-dialog>
    <div class="card">
      <div class="card-body">
        <div class="mb-2 d-flex">
          <div class="flex-fill">
            <b>{{ reply.user.name }}</b>&nbsp;
            <span class="text-muted">{{ moment(reply.createdAt).format('DD.MM.YYYY, HH:mm') }}</span>
          </div>
          <div>
            <button v-if="isOwner && !showLoadingBox" class="btn btn-link m-0 p-0 mx-1" style="line-height: 1.0 !important;" @click="toggleReplyEdit">{{ getEditButtonText }}</button>
            <button v-if="isOwner && !showLoadingBox && !replyDuringEdit" class="btn btn-link m-0 p-0" style="line-height: 1.0 !important;"  @click="removeReply">Remove</button>
          </div>
        </div>
        <div v-if="showLoadingBox">
          <loading-box></loading-box>
        </div>
        <div v-if="!replyDuringEdit && !showLoadingBox">{{ reply.content }}</div>
        <div v-if="replyDuringEdit && !showLoadingBox">
          <textarea class="form-control" :class="{'is-invalid': replyEditError}" style="resize: none;" id="replyContent" rows="3" v-model="replyEditContent"></textarea>
          <div class="invalid-feedback">
            {{ replyEditError }}
          </div>
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
import useReply from '../hooks/reply.js';

const props = defineProps({
  reply: Object,
});

const emits = defineEmits(['replyRemove']);
const store = useStore();
const replyHook = useReply();

const reply = toRef(props, 'reply');
const replyEditContent = ref('');
const replyEditError = ref(null);
const showLoadingBox = ref(false);

const isOwner = computed(function () {
  return store.getters.getUser && store.getters.getUser.id === reply.value.userId;
});

const replyDuringEdit = ref(false);
const getEditButtonText = computed( () => {
  return replyDuringEdit.value === true ? 'Save' : 'Edit';
})

async function toggleReplyEdit() {
  if (replyDuringEdit.value === false) {
    replyEditContent.value = reply.value.content;
    replyDuringEdit.value = true;
  } else {
    showLoadingBox.value = true;
    try {
      const replyResponse = await replyHook.updateReply(reply.value.id, replyEditContent.value);
      if (replyResponse.success === true) {
        reply.value.content = replyEditContent.value;

        showLoadingBox.value = false;
        replyDuringEdit.value = false;
      } else if (replyResponse.data != null) {
        if (replyResponse.data.content != null) {
          replyEditError.value = replyResponse.data.content.join(' ');
        }

        showLoadingBox.value = false;
        replyDuringEdit.value = true;
      }
    } catch (error) {
      console.log('error', error);
    }
  }
}

const showRemoveConrifmation = ref(false);
function removeReply() {
  showLoadingBox.value = true;
  showRemoveConrifmation.value = true;
}

async function onRemoveConfirmationResult(result) {
  showRemoveConrifmation.value = false;
  if (result === true) {
    try {
      const replyResponse = await replyHook.removeReply(reply.value.id);
      if (replyResponse.success === true) {
        emits('replyRemove', reply.value.id);
      }

      showLoadingBox.value = false;
    } catch (error) {
      console.log('error', error);
    }
  }
  showLoadingBox.value = false;
}
</script>