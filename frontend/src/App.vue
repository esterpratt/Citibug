<template>
  <div id="app">
    <nav-bar @openLogin="openLogin"></nav-bar>
    <router-view/>
    <modal-cmp :isOpen="isModalOpen" @closeModal="isModalOpen=false">
      <login-cmp></login-cmp>
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

  methods: {
    openLogin() {
      // TODO: check if login or logout (check if user exist) 
      // and continue accordinly
      // do it when app is up and prop navbar cmp
      this.isModalOpen = true;
    }
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
