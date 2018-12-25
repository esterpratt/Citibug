<template>
    <section class="container" v-if="issue">
        <div class="issue-details">
            <resolved-cmp :isResolved="issue.isResolved"/>
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
                    <map-view :issuePos="issue.location.pos"
                    :mapCenter="issue.location.pos"
                    :isEditable="false" />
                </div>
            </div>
        </div>
        <comments-cmp :comments="issue.comments"
        @addComment="addComment" />
    </section>
</template>

<script>
import mapView from '@/components/map-view.vue'
import resolvedCmp from '@/components/resolved-cmp.vue'
import commentsCmp from '@/components/comments-cmp.vue'

export default {
  name: 'issue-details',
  props: {

  },
  data() {
      return {
          issue: null,
      }
  },
  components: {
    mapView,
    resolvedCmp,
    commentsCmp
  },
  computed: {
      severityStatus() {
          return this.getSeverityStatus(this.issue.severity)
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
        })
  }
}
</script>
