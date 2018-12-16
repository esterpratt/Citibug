<template>
    <section>
        <h1>see all issues</h1>
        <issue-list :issues="issues"></issue-list>
    </section>
</template>

<script>
import issueList from '@/components/issue-list.vue'

export default {
  name: 'issue-page',
  props: {
    
  },
  data() {
      return {
          
      }
  },
  components: {
    issueList,
  },
  computed: {
      issues() {
          return this.$store.getters.issues
      }
  },
  methods: {
      
  },
  created() {
      this.$store.dispatch({type: 'getIssues'})
  }
}
</script>
