<template>
  <section class="mail-modal">
    <form @submit.prevent="$emit('sendMail', mailOptions)">
      <section>
        <label>
          <span>To:</span>
          <input type="mail" required placeholder="Enter mail" v-model="mailOptions.to">
        </label>
        <label>
          <span>From:</span>
          <input type="text" placeholder="Your name" v-model="mailOptions.from">
        </label>
      </section>
      <div>
        <p>{{mailOptions.from}} invites you to check out this issue:</p>
        <span>{{link}}</span>
      </div>
      <button type="submit">Send</button>
    </form>
  </section>
</template>

<script>
export default {
  props: {
    link: String
  },
  data() {
    return {
        mailOptions: {
            to: "",
            from: ""
        }
    };
  }
};
</script>