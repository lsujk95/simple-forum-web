<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-6 offset-3">
        <div class="card">
          <div class="card-body">
            <form @submit.prevent="onFormSubmit">
              <div class="mb-3">
                <label class="form-label" for="name">Name</label>
                <input class="form-control" :class="{'is-invalid': nameError}" type="text" id="name" v-model="name"/>
                <div class="invalid-feedback">
                  {{ nameError }}
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label" for="email">Email</label>
                <input class="form-control" :class="{'is-invalid': emailError}" type="email" id="email" v-model="email"/>
                <div class="invalid-feedback">
                  {{ emailError }}
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label" for="password">Password</label>
                <input class="form-control" :class="{'is-invalid': passwordError}" type="password" id="password" v-model="password"/>
                <div class="invalid-feedback">
                  {{ passwordError }}
                </div>
              </div>
              <div class="d-grid gap-2">
                <button class="btn btn-primary" type="submit">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const name = ref('');
const nameError = ref(null);

const email = ref('');
const emailError = ref(null);

const password = ref('');
const passwordError = ref(null);

async function onFormSubmit() {
  nameError.value = null;
  emailError.value = null;
  passwordError.value = null;

  try {
    const response = await store.dispatch('register', {
      name: name.value,
      email: email.value,
      password: password.value,
    });

    if (response.success) {
      await router.push('/');
    } else {
      if (response.data != null) {
        if (response.data.name != null) {
          emailError.value = response.data.name.join(' ');
        }
        if (response.data.email != null) {
          emailError.value = response.data.email.join(' ');
        }
        if (response.data.password != null) {
          passwordError.value = response.data.password.join(' ');
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
}
</script>