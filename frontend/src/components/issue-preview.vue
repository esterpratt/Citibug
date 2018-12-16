<template>
    <section>
        <h1>Issue Preview:</h1>
        <img :src="issue.pic">
        <div :style="'background-color: ' + bgColor">{{issue.severity}}</div>
    </section>
</template>

<script>

export default {
  props: {
      issue: Object
  },
  data() {
      return {
          
      }
  },
  components: {

  },
  computed: {
      bgColor() {
          if (this.issue.severity < 4) {
              return 'green'
          } else if (this.issue.severity < 7) {
              return 'orange'
          } else {
              return 'red'
          }
      }
  },
  methods: {
      
  },
  created() {
      
  }
}
</script>
