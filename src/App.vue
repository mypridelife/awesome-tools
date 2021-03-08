<template>
  <div id="app" v-cloak>
    <sui-menu pointing>
      <a
        is="sui-menu-item"
        v-for="name in routers"
        :active="isActive(name)"
        :key="name"
        :content="name"
        @click="select(name)"
      />
    </sui-menu>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      active: 'MoveFiles',
      routers: ['MoveFiles', 'GetLink', 'OpenLink'],
    }
  },
  watch: {
    $route() {
      this.active = this.$route.name
    },
  },
  methods: {
    isActive(name) {
      return this.active === name
    },
    select(name) {
      if (name === 'OpenLink') return
      if (this.$route.name === name) return
      this.$router.push({
        name,
      })
    },
  },
  created() {},
}
</script>

<style>
#app {
  padding: 20px;
}
[v-cloak] {
  display: none;
}
</style>
