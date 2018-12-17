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
      },
  },
  methods: {
      
  },
  created() {
      // get current user location
      this.$store.dispatch({type: 'getLoc'})
      
      // load issues. TODO: think how to get issues after getting loc
      //                    but consider situation where user choose 
      //                    not to allow use of his location
      this.$store.dispatch({type: 'getIssues'})
  }
}
</script>
