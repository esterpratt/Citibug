<template>
  <section class="container user-page">
    <h1>Hello <span>{{user.name}}!</span></h1>
    <div class="routes-container">
      <div class="links">
        <router-link to="/user" exact>Messages</router-link>
        <router-link to="/user/issues">Issues</router-link>
      </div>
      <div class="route-page-container">
        <router-view></router-view>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "user-page",
  props: {},
  components: {},
  data() {
    return {};
  },
  computed: {
      user() {
          return this.$store.getters.loggedinUser
      },    
  },
  methods: {},
  created() {
    const filter = {
      byUser: this.user._id
    }
    this.$store.dispatch({type: 'setFilter', filter})
  }
};
</script>
