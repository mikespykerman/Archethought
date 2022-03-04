<template>
  <q-layout view="hHh Lpr lFf"> <!-- Be sure to play with the Layout demo on docs -->
    <q-header elevated>
      <q-toolbar class="bg-green text-white">
        <q-btn
          flat
          round
          dense
          icon="menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          ZeoMedical Administration
        </q-toolbar-title>
        <q-space />
        {{ user.fullName}}
      </q-toolbar>

    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      bordered
      class="bg-grey-2"
    >
      <q-list style="padding-top:20px">
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>

      {{ user }}
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue';
import { ref } from 'vue';
import { mapGetters } from 'vuex';

const linksList = [
  {
    title: 'Branches',
    icon: 'school',
    link: '/administration/branches',
  },
  {
    title: 'Curriculum',
    icon: 'view_module',
    link: '/administration/curriculum',
  },
  {
    title: 'Devices',
    icon: 'view_module',
    link: '/administration/devices',
  },
  {
    title: 'Users',
    icon: 'view_module',
    link: '/administration/users',
  },
];

export default {
  name: 'Administration',
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
    ...mapGetters({ stateUser: 'auth/StateUser' }),
    user() {
      console.log(this.stateUser);
      return this.stateUser;
    },
  },
};
</script>
