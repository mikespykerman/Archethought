<template>
  <q-page class="flex flex-center">
    <div>
      <q-card class="my-card">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">Register</div>
        </q-card-section>
         <q-card-section>
          <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-md"
          >
            <div class="row">
              <div class="col q-pr-md">
                <q-input
                  outlined
                  v-model="firstName"
                  label="First Name"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please enter your first name']"
                />
              </div>
              <div class="col">
                <q-input
                  outlined
                  v-model="lastName"
                  label="Last Name"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please enter your last name']"
                />
              </div>
            </div>

            <q-input
              outlined
              type="tel"
              v-model="phone"
              label="Phone Number *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please enter a phone number']"
            />

            <q-input
              outlined
              type="password"
              v-model="password"
              label="Password *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please enter a password']"
            />

            <q-input
              outlined
              type="password"
              v-model="confirmPassword"
              label="Confirm Password *"
              lazy-rules
              :rules="[ val => val ===password || 'Passwords do not match']"
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
import { useQuasar } from 'quasar';
import { ref } from 'vue';

export default {
  name: 'SignIn',
  setup() {
    const $q = useQuasar();

    const firstName = ref(null);
    const lastName = ref(null);
    const email = ref(null);
    const phone = ref(null);
    const password = ref(null);
    const confirmPassword = ref(null);
    const accept = ref(false);

    return {
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword,
      accept,

      onSubmit() {
        if (accept.value !== true) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to accept the license and terms first',
          });
        } else {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted',
          });
        }
      },

      onReset() {
        email.value = null;
        password.value = null;
        accept.value = false;
      },
    };
  },
};
</script>

<style scoped>
.my-card {
  margin-top: 10%;
  width: 500px;
}
</style>
