<template>
  <q-page class="flex flex-center">
    <div>
      <q-card class="my-card">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">Login</div>
        </q-card-section>
         <q-card-section>
          <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-md"
          >
            <q-input
              outlined
              type="email"
              v-model="email"
              label="Your email address *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please enter a valid email address']"
            />
            <q-input
              outlined
              type="password"
              v-model="password"
              label="Password *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please enter a password']"
            />

            <div>
              <q-btn label="Submit" type="submit" color="primary"/>
              <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue';
import { Notify } from 'quasar';
import { mapActions } from 'vuex';

export default {
  name: 'SignIn',
  setup() {
    const email = ref(null);
    const password = ref(null);
    const accept = ref(false);

    return {
      email,
      password,
      accept,

      onReset() {
        email.value = null;
        password.value = null;
        accept.value = false;
      },
    };
  },
  methods: {
    ...mapActions({ LogIn: 'auth/LogIn' }),
    async onSubmit() {
      const user = {
        email: this.email,
        password: this.password,
      };
      try {
        await this.LogIn(user);
        this.$router.push('/app');
      } catch (error) {
        const e = JSON.parse(error.request.responseText);
        Notify.create({
          color: 'negative',
          textColor: 'white',
          position: 'bottom-left',
          icon: 'report_problem',
          message: e.error.description,
        });
      }
    },
  },
};
</script>

<style scoped>
.my-card {
  margin-top: 10%;
  width: 500px;
}
</style>
