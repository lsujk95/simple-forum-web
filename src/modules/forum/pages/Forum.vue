<template>
  <div>
    <base-dialog title="Create a new thread"
                 :show="showThreadCreateDialog"
                 :show-confirm-button="true"
                 :hide-buttons="showThreadCreateSpinner"
                 confirmation-button-text="Create"
                 @result="onThreadCreateResult"
    >
      <div v-if="showThreadCreateSpinner">
        <loading-box></loading-box>
      </div>
      <form v-else>
        <div class="mb-3">
          <input class="form-control" :class="{'is-invalid': threadNameError}" type="text" id="threadName" placeholder="Thread Name" v-model="threadName"/>
          <div class="invalid-feedback">
            {{ threadNameError }}
          </div>
        </div>
        <div class="mb-3 w-100">
          <textarea class="form-control" :class="{'is-invalid': threadContentError}" style="resize: none;" id="threadContent" rows="3" placeholder="Thread Content" v-model="threadContent"></textarea>
          <div class="invalid-feedback">
            {{ threadContentError }}
          </div>
        </div>
      </form>
    </base-dialog>
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
              <div class="card-header d-flex">
                <div class="flex-fill">{{ forum.name }}</div>
                <div>
                  <button class="btn btn-link m-0 p-0" style="line-height: 1.0 !important;" @click="createForum">Add</button>
                </div>
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
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import moment from 'moment';
import useForum from './../hooks/forum.js';
import useThread from './../hooks/thread.js';
import LoadingBox from './../../../components/layout/LoadingBox.vue';

const route = useRoute();
const forumHook = useForum();
const threadHook = useThread();

const forum = ref(null);

const isLoading = computed(function () {
  return forum.value == null;
});

async function loadForum() {
  try {
    const forumResponse = await forumHook.getForum(route.params.id);
    if (forumResponse.success === true) {
      forum.value = forumResponse.data;
    }
  } catch (error) {
    console.log('error', error);
  }
}
loadForum();

const threadName = ref("");
const threadNameError = ref(null);

const threadContent = ref("");
const threadContentError = ref(null);

const showThreadCreateDialog = ref(false);
const showThreadCreateSpinner = ref(false);
function createForum() {
  showThreadCreateDialog.value = true;
}

async function onThreadCreateResult(result) {
  showThreadCreateSpinner.value = true;
  threadNameError.value = null;
  threadContentError.value = null;

  if (result === true) {
    try {
      const threadResponse = await threadHook.createThread(threadName.value, threadContent.value, forum.value.id);
      if (threadResponse.success === true) {
        forum.value.threads.push(threadResponse.data);
        showThreadCreateDialog.value = false;
      } else if (threadResponse.data != null) {
        if (threadResponse.data.name != null) {
          threadNameError.value = threadResponse.data.name.join(' ');
        }
        if (threadResponse.data.content != null) {
          threadContentError.value = threadResponse.data.content.join(' ');
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  } else {
    showThreadCreateDialog.value = false;
  }

  showThreadCreateSpinner.value = false;
}

</script>