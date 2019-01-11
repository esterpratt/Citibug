<template>
    <section class="container">
        <issue-filter></issue-filter>
        <issue-list :issues="issues"></issue-list>
    </section>
</template>

<script>
import issueList from '@/components/issue-list.vue'
import issueFilter from '@/components/issue-filter.vue'

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
    issueFilter,
  },
  computed: {
      issues() {
          return this.$store.getters.issues
      },
  },
  methods: {
      
  },
  created() {
      // scroll to top of the screen
      window.scrollTo(0, 0)
      this.$store.dispatch({type: 'getLoc'})
        .then(_ => {
            this.$store.dispatch({type: 'getIssues'})
        })  
  }
}
</script>
