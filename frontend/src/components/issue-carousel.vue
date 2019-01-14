<template>
  <section class="issue-carousel">
    <carousel
      :navigationEnabled="true"
      navigationNextLabel="<i class='fas fa-chevron-right carousel-arrow'></i>"
      navigationPrevLabel="<i class='fas fa-chevron-left carousel-arrow'></i>"
      :navigationClickTargetSize="0"
      :perPageCustom="[[0,1],[680,2],[1080, 3]]"
      :scrollPerPage="false"
      :mouse-drag="true"
    >
      <slide class="slide" v-for="issue in issues" :key="issue._id">
        <issue-preview :issue="issue"></issue-preview>
      </slide>
    </carousel>
  </section>
</template>

<script>
import issuePreview from "./issue-preview";

export default {
  props: {
    issues: Array
  },

  data() {
    return {};
  },

  components: {
    issuePreview
  }
};
</script>

<style>
</style>
