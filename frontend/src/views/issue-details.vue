<template>
    <section class="container" v-if="issue">
        <div class="issue-details">
            <div class="resloved-container">
                <template v-if="issue.isResolved">
                    <i class="fas fa-times"></i>
                    <p>Re-open</p>
                </template>
                <template v-else>
                    <i class="fas fa-check"></i>
                    <p>Resolve</p>
                </template>
            </div>
            <router-link :to="'/issue/edit/' + issue._id">Edit your issue</router-link>
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
            <p class="time">Reported {{issue.reportedAt | relative-time}}</p>
            <p class="category">Category: {{issue.category}}</p>
            <div class="imgs-container">
                <img :src="issue.pic"/>
                <div class="map-container">
                    <map-cmp :issueLoc="issue.loc"></map-cmp>
                </div>
            </div>
        </div>
        <div class="comments-container">
            <h2>Comments</h2>
            <div class="new-comment">
                <div class="user-pic">

                </div>
                <form @submit.prevent="addComment">
                    <input type="text" 
                    v-model="newComment" 
                    placeholder="What's on your heart">
                    <button>
                        <i class="fas fa-plus"></i>
                    </button>
                </form>
            </div>
            <div class="comments">
                <comment-preview
                v-for="(comment, idx) in issue.comments"
                :key="idx"
                :comment="comment">
                </comment-preview>
            </div>
        </div>
    </section>
</template>

<script>
import commentPreview from '@/components/comment-preview.vue'
import mapCmp from '@/components/map-cmp.vue'

export default {
  name: 'issue-details',
  props: {

  },
  data() {
      return {
          issue: null,
          newComment: '',
      }
  },
  components: {
    commentPreview,
    mapCmp
  },
  computed: {
      severityStatus() {
          return this.getSeverityStatus(this.issue.severity)
      }
  },
  methods: {
      addComment() {
          console.log(this.comment)
          this.newComment = ''
      }
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
