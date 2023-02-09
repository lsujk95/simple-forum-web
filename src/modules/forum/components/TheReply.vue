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
        <div class="mb-2 d-flex align-items-center">
          <div class="flex-fill">
            <b class="">{{ reply.user.name }}</b>&nbsp;
            <span class=" text-muted">{{ moment(reply.createdAt).format('DD.MM.YYYY, HH:mm') }}</span>
          </div>
          <div>
            <button v-if="isOwner && !showLoadingBox" class="btn btn-outline-primary m-0 mx-1 p-2" style="line-height: 1.0 !important;" @click="toggleReplyEdit">
              <font-awesome-icon v-if="replyDuringEdit" icon="fa-solid fa-check" />
              <font-awesome-icon v-else icon="fa-solid fa-pen" />
            </button>
            <button v-if="isOwner && !showLoadingBox && !replyDuringEdit" class="btn btn-outline-primary m-0 p-2" style="line-height: 1.0 !important;"  @click="removeReply">
              <font-awesome-icon icon="fa-solid fa-xmark" />
            </button>
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
import { defineProps, toRef, defineEmits, ref, computed } from 'vue';

// Icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPen, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
library.add({faPen, faCheck, faXmark});

// Moment
import moment from 'moment';

// Loading box
import LoadingBox from './../../../components/layout/LoadingBox.vue';
const showLoadingBox = ref(false);

// Incoming/outcoming data
const props = defineProps({
  reply: Object,
});
const reply = toRef(props, 'reply');
const emits = defineEmits(['replyRemove']);

// Store hook
import { useStore } from 'vuex';
const storeHook = useStore();

const isOwner = computed(function () {
  return storeHook.getters.getUser && storeHook.getters.getUser.id === reply.value.userId;
});

// Reply hook
import useReply from '../hooks/reply.js';
const replyHook = useReply();

// Reply editing
const replyDuringEdit = ref(false);
const replyEditContent = ref('');
const replyEditError = ref(null);

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

// Reply removing
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