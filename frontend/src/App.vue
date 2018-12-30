<template>
  <div id="app">
    <nav-bar @openLogin="openLogin" :isUserLoggedin="isUserLoggedin"></nav-bar>
    <router-view/>
    <modal-cmp :isOpen="isModalOpen" @closeModal="isModalOpen=false">
      <login-cmp @closeModal="isModalOpen=false"></login-cmp>
    </modal-cmp>
  </div>
</template>

<script>
import navBar from '@/components/nav-bar'
import modalCmp from '@/components/modal-cmp'
import loginCmp from '@/components/login-cmp'

export default {
  data() {
    return {
      isModalOpen: false
    }
  },

  components: {
    navBar,
    modalCmp,
    loginCmp,
  },

  computed: {
    isUserLoggedin() {
      return this.$store.getters.isUserLoggedin
    }
  },

  methods: {
    openLogin() {
      // if user exist - logout and go to homepage
      if (this.isUserLoggedin) {
        this.$store.dispatch({type: 'logout'})
        this.$router.push('/')
      } else {
        this.isModalOpen = true;
      }
    }
  },

  created() {
    this.$store.dispatch({type: 'getLoggedInUser'})
  }
}

</script>

<style lang="scss">
// #app {
//   font-family: 'Avenir', Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }
// #nav {
//   padding: 30px;
//   a {
//     font-weight: bold;
//     color: #2c3e50;
//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
