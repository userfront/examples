<template>
  <div>
    <h1>Dashboard</h1>
    <div>
      <h3>{{ user.name }}</h3>
      <img :src="user.image" />
    </div>
    <button @click.prevent="logout">Log out</button>

    <pre><code>{{ user }}</code></pre>
  </div>
</template>

<script>
import Userfront from "@userfront/vue";

export default {
  computed: {
    user() {
      return Userfront.user;
    },
  },
  methods: {
    logout() {
      Userfront.logout();
    },
  },
};
</script>

<style scoped>
pre {
  text-align: left;
}
</style>
