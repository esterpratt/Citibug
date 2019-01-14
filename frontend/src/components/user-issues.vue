<template>
  <div class="user-issues">
    <h2>Your reported issues:</h2>
    <issue-list v-if="issues" :issues="issues"></issue-list>
  </div>
</template>

<script>
import issueList from "./issue-list";

export default {
  components: {
    issueList
  },

  computed: {
    issues() {
      return this.$store.getters.issues;
    }
  }
};
</script>

<style>
</style>
