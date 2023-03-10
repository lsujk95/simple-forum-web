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
              <div class="d-flex align-items-center">
                <div class="flex-fill">
                  <h2>{{ thread.name }}</h2>
                </div>
                <div>
                  <button v-if="isOwner" @click="toggleThreadEdit" class="btn btn-outline-primary m-0 p-2" style="line-height: 1.0 !important;">
                    <font-awesome-icon v-if="threadDuringEdit" icon="fa-solid fa-check" />
                    <font-awesome-icon v-else icon="fa-solid fa-pen" />
                  </button>
                </div>
              </div>
              <hr>
              created by <a href="#">{{ thread.user.name }}</a> at <b>{{ moment(thread.createdAt).format('DD.MM.YYYY, HH:mm') }}</b>
            </div>
          </div>
        </div>
        <div class="col-8 offset-2 mb-4">
          <div class="card">
            <div class="card-body">
              <div class="mb-2"><b>{{ thread.user.name }}</b> <span class="text-muted">{{ moment(thread.createdAt).format('DD.MM.YYYY, HH:mm') }}</span></div>
              <div v-if="showLoadingBox">
                <loading-box></loading-box>
              </div>
              <div v-if="!threadDuringEdit && !showLoadingBox">{{ thread.content }}</div>
              <div v-if="threadDuringEdit && !showLoadingBox">
                <textarea class="form-control" :class="{'is-invalid': threadEditContentError}" style="resize: none;" id="threadEditContent" rows="3" v-model="threadEditContent"></textarea>
                <div class="invalid-feedback">
                  {{ threadEditContentError }}
                </div>
              </div>
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
import {computed, ref} from 'vue';

// Icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPen, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
library.add({faPen, faCheck, faXmark});

// Moment
import moment from 'moment';

// Components
import TheReply from './../components/TheReply.vue';
import NewReplyForm from './../components/NewReplyForm.vue';

// Loading box
import LoadingBox from './../../../components/layout/LoadingBox.vue';
const isLoaded = ref(false);

// Route hook
import { useRoute } from 'vue-router';
const route = useRoute();

// Store hook
import { useStore } from 'vuex';
const store = useStore();

const isOwner = computed(function () {
  return store.getters.getUser && store.getters.getUser.id === thread.value.userId;
});

// Thread hook
import useThread from './../hooks/thread';
const threadHook = useThread();


// Thread
const thread = ref(null);

async function loadThread() {
  isLoaded.value = false;
  try {
    const threadResponse = await threadHook.getThread(route.params.id);
    if (threadResponse.success === true) {
      thread.value = threadResponse.data;
      isLoaded.value = true;
    }
  } catch (error) {
    console.log('error', error);
  }
}
loadThread();

// Thread editing
const threadDuringEdit = ref(false);
const showLoadingBox = ref(false);
const threadEditContent = ref('');
const threadEditContentError = ref('');

async function toggleThreadEdit() {
  if (threadDuringEdit.value === false) {
    threadEditContent.value = thread.value.content;
    threadDuringEdit.value = true;
  } else {
    showLoadingBox.value = true;
    try {
      let threadResponse = await threadHook.updateThread(thread.value.id, thread.value.name, threadEditContent.value);
      if (threadResponse.success === true) {
        thread.value.content = threadEditContent.value;

        showLoadingBox.value = false;
        threadDuringEdit.value = false;
      } else if (threadResponse.data != null) {
        if (threadResponse.data.content != null) {
          threadEditContentError.value = threadResponse.data.content.join(' ');
        }

        showLoadingBox.value = false;
        threadDuringEdit.value = true;
      }
    } catch (error) {
      console.log('error', error);
    }
  }
}

// Reply actions
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

</script>

<style scoped>
h2 {
  font-size: 1.6rem !important;
}
</style>