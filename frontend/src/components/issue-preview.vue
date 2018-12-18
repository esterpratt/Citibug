<template>
    <section class="issue-preview" @click="openIssue">
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
            <div class="address">At {{issue.address}}</div>
            <div class="social-details">
                <div class="seen">
                    <i class="far fa-eye" :class="severityStatus"></i>
                    <span>
                        {{issue.seenCount}} seen
                    </span>
                </div>
                <div class="comments">
                    <i class="far fa-comment" :class="severityStatus"></i>
                    <span>
                        {{issue.comments.length}} {{issue.comments.length === 1? 'comment' : 'comments'}}
                    </span>
                </div>
                <div class="share">
                    <i class="fas fa-share" :class="severityStatus"></i>
                    <span>
                        {{issue.shareCount}} {{issue.shareCount === 1? 'share' : 'shares'}}
                    </span>
                </div>
            </div>
        </div>
        <div class="issue-severity" :class="severityStatus">
            {{severityStatus}}
        </div>
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