<template>
    <section>
        <div class="issues-list">
            <issue-preview v-for="issue in issues" 
            :key="issue._id" 
            :issue="issue">
            </issue-preview>
        </div>
    </section>
</template>

<script>
import issuePreview from '@/components/issue-preview.vue'

export default {
  props: {
      issues: Array
  },
  data() {
      return {
          
      }
  },
  components: {
    issuePreview,
  },
  computed: {
      
  },
  methods: {
      
  },
  created() {
      
  }
}
</script>
