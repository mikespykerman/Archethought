<template>
  <q-layout view="hHh Lpr lFf">
    <q-header bordered>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          ZeoMedical App
        </q-toolbar-title>

        <div class="q-pa-md q-gutter-sm">
          <div class="text-h6" style="float:left">
            <q-avatar color="red" text-color="white" icon="directions" />
            {{ userName }}</div>
          <div class="text-white" style="overflow: hidden;font-size: 2em">
            <q-icon name="keyboard_arrow_down"/>
          </div>
            <q-menu style="float: right">
              <q-list style="min-width:100px">
                <q-item clickable v-close-popup>
                  <q-item-section>My Profile</q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section>Online Help</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable v-close-popup @click="logout" >
                  <q-item-section>Log out</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      side="left"
      :breakpoint="500"
      bordered
    >
      <q-list style="padding-top:20px">
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue';
import { mapActions, mapGetters } from 'vuex';

const linksList = [
  {
    title: 'My Tests',
    icon: 'school',
    link: 'https://quasar.dev',
  },
  {
    title: 'Curriculum',
    icon: 'view_module',
    link: 'https://github.com/quasarframework',
  },
];

import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MainLayout',
  components: {
    EssentialLink,
  },
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  computed: {
    ...mapGetters('auth', ['StateUser', 'isAuthenticated']),
    userName() {
      return this.StateUser.fullName;
    },
  },
  methods: {
    ...mapActions('auth', ['LogOut']),
    async logout() {
      await this.LogOut();
      this.userName = null;
      this.$router.push('/');
    },
  },
});
</script>
