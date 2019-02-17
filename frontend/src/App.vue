<template>
  <div id="app" class="app" v-if="!isLoading">
    <nav-bar
      @openLogin="openLogin"
      @initNotification="initNotification"
      :isUserLoggedin="!!loggedinUser"
      :notificationNum="notificationNum"
    ></nav-bar>
    <div class="pages-container" ref="pagesContainer">
      <router-view @openLogin="openLogin"/>
    </div>
    <modal-cmp :isOpen="isModalOpen" @closeModal="isModalOpen=false">
      <login-cmp @closeModal="isModalOpen=false"></login-cmp>
    </modal-cmp>
    <user-msg></user-msg>
  </div>
</template>

<script>
import userMsg from "@/components/user-msg";
import navBar from "@/components/nav-bar";
import modalCmp from "@/components/modal-cmp";
import loginCmp from "@/components/login-cmp";

export default {
  data() {
    return {
      isModalOpen: false,
      isLoading: true,
      notificationNum: 0
    };
  },

  components: {
    userMsg,
    navBar,
    modalCmp,
    loginCmp
  },

  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    }
  },
  sockets: {
    addNotification() {
      this.notificationNum++;
    }
  },
  methods: {
    initNotification() {
      this.notificationNum = 0;
      this.$socket.emit("initNotification", this.loggedinUser._id);
    },
    openLogin() {
      // if user exist - logout and go to homepage
      if (this.loggedinUser) {
        this.$store.dispatch({ type: "logout" });
        this.$router.push("/");
      } else {
        this.isModalOpen = true;
      }
    },
    setVh() {
      let vh = window.innerHeight * 0.01;
      // set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
  },

  created() {
    this.setVh();
    window.addEventListener("resize", this.setVh);
    this.$store.dispatch({ type: "getLoggedinUser" }).then(_ => {
      this.isLoading = false;
    });
  },

  destroyed() {
    window.removeEventListener("resize", this.setVh);
  },

  watch: {
    loggedinUser() {
      if (this.loggedinUser) {
        this.notificationNum = this.loggedinUser.msgCount;
      }
    },
    $route() {
      this.$refs.pagesContainer.scrollTo(0, 0)
    }
  }
};
</script>