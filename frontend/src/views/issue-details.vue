<template>
    <section class="container issue-details-page" v-if="issue">
        <div class="issue-details-container">
            <div class="issue-details">
                <!-- TODO: show only if issue owner -->
                <router-link v-if="isOwner" :to="'/issue/edit/' + issue._id">
                    <i class="fas fa-edit"></i>
                    Edit your issue
                </router-link>
                <h2>{{issue.title}}</h2>
                <p>{{issue.description}}</p>
                <p class="category">Category: {{issue.category}}</p>
                <p class="time">Reported {{issue.reportedAt | relative-time}}</p>
                <p :class="severityStatus">
                    This issue is {{severityStatus === 'urgent' ? severityStatus+'!' : severityStatus}}
                </p>
            </div>
            <resolved-cmp :isResolved="issue.isResolved"/>
            <div class="issue-report social-details">
                <div class="seen-container">
                    <seen-count :count="issue.seenCount" :severityStatus="severityStatus"/>
                    <button>Me Too</button>
                </div>
                <div class="share-container">
                    <share-count :count="issue.shareCount" :severityStatus="severityStatus"/>
                    <button>Share</button>
                </div>
            </div>
            <img class="issue-img" :src="issue.pic"/>
            <map-view :issueCoords="issue.location.coordinates"
            :mapCenter="issue.location.coordinates"
            :isEditable="false" />
        </div>
        <comments-cmp :comments="issue.comments"
        :user="user"
        @addComment="addComment" />
    </section>
</template>

<script>
import mapView from '@/components/map-view'
import resolvedCmp from '@/components/resolved-cmp'
import commentsCmp from '@/components/comments-cmp'
import seenCount from '@/components/seen-count'
import shareCount from '@/components/share-count'

export default {
  name: 'issue-details',
  props: {

  },
  data() {
      return {
          issue: null,
          isOwner: false
      }
  },
  components: {
    mapView,
    resolvedCmp,
    commentsCmp,
    seenCount,
    shareCount
  },
  computed: {
      severityStatus() {
          return this.getSeverityStatus(this.issue.severity)
      },
      user() {
          return this.$store.getters.loggedinUser
      }
  },
  methods: {
      addComment(comment) {
          console.log(comment);
      }
  },
  created() {
      const issueId = this.$route.params.issueId
      this.$store.dispatch({type: 'getIssueById', issueId})
        .then(issue => {
            this.issue = issue
            if (this.user && this.issue.ownerId === this.user._id) {
                this.isOwner = true
            }
        })
  },
  // if owner login while on page
  watch: {
      user: function() {
        if (this.user && this.issue.ownerId === this.user._id) {
            this.isOwner = true
        }
      }
  }
}
</script>
