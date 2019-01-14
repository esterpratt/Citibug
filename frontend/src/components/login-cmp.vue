<template>
  <div class="login-container">
    <div class="login">
      <h2>I am a returned PAL</h2>
      <form @submit.prevent="login">
        <p>Username *</p>
        <el-input type="text" v-model="user.name" placeholder="Name"></el-input>
        <p>Password *</p>
        <el-input type="password" v-model="user.pass" placeholder="Password"></el-input>
        <button>Log In</button>
      </form>
    </div>
    <div class="signup">
      <h2>I want to become a PAL</h2>
      <form @submit.prevent="checkValidation">
        <p>Username *</p>
        <el-input type="text" v-model="newUser.name" placeholder="Name"></el-input>
        <p>Password *</p>
        <el-input type="password" v-model="newUser.pass" placeholder="Password"></el-input>
        <p>Re-enter password *</p>
        <el-input type="password" v-model="rePass" placeholder="Password"></el-input>
        <div class="emoji-picked">
          <div>{{newUser.emoji}}</div>
          <p>Pick your Palface</p>
        </div>
        <emoji-picker :value="newUser.emoji" @input="newUser.emoji = $event"></emoji-picker>
        <button>Sign Up</button>
      </form>
    </div>
  </div>
</template>

<script>
import emojiPicker from "./emoji-picker";
import eventBus, { USR_MSG_DISPLAY } from "@/services/busService";

export default {
  props: {},

  components: {
    emojiPicker
  },

  data() {
    return {
      user: {
        name: "",
        pass: ""
      },

      newUser: {
        name: "",
        pass: "",
        emoji: "?"
      },

      rePass: ""
    };
  },

  methods: {
    login() {
      // if not empty
      if (this.user.name && this.user.pass) {
        this.$store
          .dispatch({ type: "login", user: this.user })
          .then(name => {
            this.initFields();
            const nameCapitalized =
              name.charAt(0).toUpperCase() + name.slice(1);
            eventBus.$emit(USR_MSG_DISPLAY, {
              type: "success",
              txt: `Welcome back ${nameCapitalized}!`
            });
            this.$emit("closeModal");
          })
          .catch(err => {
            eventBus.$emit(USR_MSG_DISPLAY, { type: "fail", txt: err.message });
          });
      } else {
        eventBus.$emit(USR_MSG_DISPLAY, {
          type: "fail",
          txt: "Please fill in the required fields"
        });
      }
    },

    checkValidation() {
      // if not empty
      if (this.newUser.name && this.newUser.pass) {
        // TODO: check if password is valid using regex
        // if not - show msg that password is not valid
        if (this.newUser.pass === this.rePass) {
          this.signUp();
        } else {
          eventBus.$emit(USR_MSG_DISPLAY, {
            type: "fail",
            txt: "Passwords don't match"
          });
        }
      } else {
        eventBus.$emit(USR_MSG_DISPLAY, {
          type: "fail",
          txt: "Please fill in the required fields"
        });
      }
    },

    signUp() {
      this.$store
        .dispatch({ type: "signup", user: this.newUser })
        .then(name => {
          this.initFields();
          const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);
          eventBus.$emit(USR_MSG_DISPLAY, {
            type: "success",
            txt: `Welcome ${nameCapitalized}!`
          });
          this.$emit("closeModal");
        })
        .catch(err => {
          eventBus.$emit(USR_MSG_DISPLAY, { type: "fail", txt: err.message });
        });
    },

    initFields() {
      this.user = {
        name: "",
        pass: ""
      };

      this.newUser = {
        name: "",
        pass: "",
        emoji: "?"
      };

      this.rePass = "";
    }
  }
};
</script>

<style>
</style>
