<template>
  <section class="msg-container">
    <p class="time">{{msg.at | formatted-time}}</p>
    <div>
      Your issue
      <router-link :to="'/issue/' + msg.issue[0]._id">{{msg.issue[0].title}}</router-link>
      <span>{{txt[msg.type]}}</span>
      by
      <span>{{(msg.from.length) ? msg.from[0].name : 'a guest'}}</span>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    msg: Object
  },
  computed: {
    txt() {
      return {
        resolve: "was marked as resolved",
        open: "was marked as open",
        comment: "has a new comment"
      };
    }
  }
};
</script>

<style>
</style>
