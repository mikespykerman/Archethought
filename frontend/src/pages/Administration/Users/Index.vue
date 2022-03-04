<template>
  <q-page>
    <div class="q-pa-sm">
      <q-table
        title="Users"
        flat
        :rows="users"
        :columns="columns"
        row-key="name"
      />
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Users',
  data() {
    return {
      users: [],
      columns: [
        {
          name: 'fullName', align: 'left', label: 'Name', field: 'fullName', sortable: true,
        },
        {
          name: 'mobile', align: 'left', label: 'Mobile', field: 'mobile', sortable: true,
        },
        {
          name: 'email', align: 'left', label: 'Email', field: 'email', sortable: true,
        },
      ],
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      try {
        const res = await this.$api.get('/api/v1/users');
        this.users = res.data.data;
        console.log(res.data.data);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
