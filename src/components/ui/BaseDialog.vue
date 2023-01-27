<template>
  <teleport to="body">
    <div v-if="show" class="backdrop">
      <transition name="dialog">
        <dialog open v-if="show">
          <div class="card text-center">
            <div class="card-header">
              <b>{{ title }}</b>
            </div>
            <div class="card-body">
              <slot></slot>
              <div v-if="!hideButtons" class="d-flex flex-row">
                <button class="btn btn-primary w-100" v-if="showConfirmButton" @click="confirmDialog">{{ confirmationButtonText }}</button>
                <div v-if="showConfirmButton" class="px-2"></div>
                <button class="btn btn-primary w-100" @click="closeDialog">Close</button>
              </div>
            </div>
          </div>
        </dialog>
      </transition>
    </div>
  </teleport>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
  showConfirmButton: {
    type: Boolean,
    required: false,
    default: false,
  },
  confirmationButtonText: {
    type: String,
    required: false,
    default: "Confirm",
  },
  hideButtons: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emits = defineEmits(['result']);

function confirmDialog() {
  emits('result', true);
}

function closeDialog() {
  emits('result', false);
}
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10;
}

dialog {
  position: fixed;
  top: 30vh;
  left: 50%;
  transform: translate(-50%, -50%);

  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: white;


}
</style>