<template>
  <div id="app" v-if="!isLoading">
    <nav-bar @openLogin="openLogin" :isUserLoggedin="isUserLoggedin"></nav-bar>
    <router-view/>
    <modal-cmp :isOpen="isModalOpen" @closeModal="isModalOpen=false">
      <login-cmp @closeModal="isModalOpen=false"></login-cmp>
    </modal-cmp>
    <user-msg></user-msg>
  </div>
</template>

<script>
import userMsg from '@/components/user-msg'
import navBar from '@/components/nav-bar'
import modalCmp from '@/components/modal-cmp'
import loginCmp from '@/components/login-cmp'

export default {
  data() {
    return {
      isModalOpen: false,
      isLoading: true,
    }
  },

  components: {
    userMsg,
    navBar,
    modalCmp,
    loginCmp,
  },

  computed: {
    isUserLoggedin() {
      return !!this.$store.getters.loggedinUser
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
    this.$store.dispatch({type: 'getLoggedinUser'})
    .then(_ => {
      this.isLoading = false;
    })
  }
}

</script>