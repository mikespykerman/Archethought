<template>
  <router-view />
</template>
<script>
import { defineComponent } from 'vue';
import { api } from 'boot/axios';

export default defineComponent({
  name: 'App',
  beforeCreate() {
    this.$store.dispatch('auth/init');
    const token = this.$store.getters['auth/getToken'];
    if (token) {
      console.log('token exists');
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      console.log('token does not exist');
      api.defaults.headers.common.Authorization = '';
    }
  },
});
</script>
