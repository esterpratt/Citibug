<template>
  <nav>
    <!-- <i class="fas fa-home"></i> -->
    <router-link to="/" class="logo">munici
      <span>pal</span>
    </router-link>
    <button class="nav-btn" @click="toggleNavbar">☰</button>
    <ul :class="{open: isOpen}" @click="isOpen=false">
      <button>X</button>
      <router-link to="/" exact tag="li">Home</router-link>
      <router-link to="/issue/edit" tag="li">Report</router-link>
      <router-link
        to="/user"
        tag="li"
        v-if="isUserLoggedin"
        class="profile-link"
        @click.native="$emit('initNotification')"
      >Profile
        <div v-if="notificationNum" class="notification">{{notificationNum}}</div>
      </router-link>
      <li @click="$emit('openLogin')">{{isUserLoggedin ? 'Logout' : 'Login'}}</li>
      <router-link to="/about" tag="li">About</router-link>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    isUserLoggedin: Boolean,
    notificationNum: Number
  },

  data() {
    return {
      isOpen: false
    };
  },

  methods: {
    toggleNavbar() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>

<style>
</style>
