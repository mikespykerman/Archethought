<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated border>
      <q-toolbar>
        <q-toolbar-title>
          ZeoMedical
        </q-toolbar-title>
        <div class="q-pa-md q-gutter-sm">
          <a href="/signin" class="text-subtitle1">Login</a>
          <a href="/register" class="text-subtitle1">Register</a>
        </div>
      </q-toolbar>

      <q-tabs>
        <q-route-tab
          to="/your/route"
          replace
          label="HOME"
        />
        <q-route-tab
          to="/some/other/route"
          replace
          label="ABOUT US"
        />
        <q-route-tab
          to="/some/other/route"
          replace
          label="OUR SERVICES"
        />
        <q-route-tab
          to="/some/other/route"
          replace
          label="VIDEOS"
        />
        <q-route-tab
          to="/some/other/route"
          replace
          label="FOUNDER'S BIO"
        />
        <q-route-tab
          to="/some/other/route"
          replace
          label="CONTACT"
        />
      </q-tabs>

    </q-header>

    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Landing',

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
};
</script>

<style scoped>
a {
  color: white;
  text-decoration: none;
}
</style>
