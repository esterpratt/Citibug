<template>
    <section class="issue-preview" @click="openIssue">
        <!-- TODO: merge with resolved cmp -->
        <div v-if="issue.isResolved" class="resloved-container">
            <div class="resolved">
                <i class="fas fa-check"></i>
                <p>Issue is resolved!</p>
            </div>
        </div>
        <div class="issue-img" 
        :style="'background-image: url(' + issue.pic + ')'">
            <!-- <img :src="issue.pic"> -->       
        </div>
        <div class="issue-details">
            <div class="time">
                reported {{issue.createdAt | relative-time}}    
            </div>
            <h3>{{issue.title}}</h3>
            <div class="category">{{issue.category}}</div>
            <div class="address">At {{issue.location.address}}</div>
            <div class="social-details">
                <!-- TODO: merge to one component -->
                <seen-count :count="issue.seenCount" :severityStatus="severityStatus"/>
                <comment-count :count="issue.comments.length" :severityStatus="severityStatus"/>
                <share-count :count="issue.shareCount" :severityStatus="severityStatus"/>
            </div>
        </div>
        <div class="issue-severity" :class="severityStatus">
            {{severityStatus}}
        </div>
    </section>
</template>

<script>
import seenCount from './seen-count'
import shareCount from './share-count'
import commentCount from './comment-count'

export default {
  props: {
      issue: Object
  },
  data() {
      return {

      }
  },
  components: {
      seenCount,
      shareCount,
      commentCount
  },
  computed: {
      severityStatus() {
          return this.getSeverityStatus(this.issue.severity)
      }
  },
  methods: {
      openIssue() {
          this.$router.push(`/issue/${this.issue._id}`)
      }
  },
  created() {
      
  }
}
</script>

<style lang="scss">

</style>