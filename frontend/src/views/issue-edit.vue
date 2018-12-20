<template>
    <h1>Welcome to issue edit!</h1>
</template>

<script>


export default {
  name: 'issue-edit',
  props: {

  },
  data() {
      return {
          issue: {

          }
      }
  },
  components: {
    
  },
  computed: {
      
  },
  methods: {
      
  },
  created() {
      const issueId = this.$route.params.issueId
      if (issueId) {
          this.$store.dispatch({type: 'getIssueById', issueId})
            .then(issue => {
                this.issue = issue
            })
      }
  }
}
</script>
