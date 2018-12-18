<template>
    <section class="container" v-if="issue">
        <h2>{{issue.title}}</h2>
        <p>{{issue.description}}</p>
        <div class="seen">
            <span>Seen by: {{issue.seenCount}}</span>
            <button>Me Too</button>
        </div>
        <div class="shared">
            <span>Shared by: {{issue.shareCount}}</span>
            <button>Share</button>
        </div>
        <p :class="severityStatus">
            This issue is {{severityStatus === 'urgent' ? severityStatus+'!' : severityStatus}}
        </p>
    </section>
</template>

<script>

export default {
  name: 'issue-details',
  props: {

  },
  data() {
      return {
          issue: null
      }
  },
  components: {
    
  },
  computed: {
      severityStatus() {
          return this.getSeverityStatus(this.issue.severity)
      }
  },
  methods: {
      
  },
  created() {
      const issueId = this.$route.params.issueId
      this.$store.dispatch({type: 'getIssueById', issueId})
        .then(issue => {
            this.issue = issue
        })
  }
}
</script>
