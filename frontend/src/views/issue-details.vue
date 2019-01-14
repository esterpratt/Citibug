<template>
  <section class="container issue-details-page" v-if="issue">
    <div class="issue-details-container" ref="issueDetails">
      <div class="issue-details">
        <router-link v-if="isOwner" :to="'/issue/edit/' + issue._id">
          <i class="fas fa-edit"></i>Edit
        </router-link>
        <h2>{{issue.title}}</h2>
        <p>{{issue.description}}</p>
        <p class="category">Category: {{issue.category}}</p>
        <p class="time">Reported {{issue.reportedAt | relative-time}}</p>
        <div v-if="!isOwner" class="issue-by">
          by&thinsp;
          <span>{{(issue.user.length) ? issue.user[0].name : 'a guest'}}</span>
          <div class="user-pic">{{(issue.user.length) ? issue.user[0].emoji : '?'}}</div>
        </div>
        <p
          :class="severityStatus"
        >This issue is {{severityStatus === 'urgent' ? severityStatus+'!' : severityStatus}}</p>
      </div>
      <div class="report-resolve">
        <p
          class="report"
        >{{issue.isResolved ? 'This issue was reported as resolved' : 'This issue has been seen by '+ issue.seenCount + ' pals'}}</p>
        <div>
          <p class="quest">{{issue.isResolved ? 'Do you agree?' : 'Have you been there?'}}</p>
          <button v-if="!issue.isResolved" class="seen" @click="reportSeen">
            <i class="far fa-eye"></i>Yes, still there!
          </button>
          <button @click="toggleResolved" class="resolve" :class="resolvedStatus">
            <template v-if="issue.isResolved">
              <i class="far fa-eye"></i>No, Still There!
            </template>
            <template v-else>
              <i class="fas fa-hand-peace"></i>Yes, resolved!
            </template>
          </button>
        </div>
      </div>
      <div class="share">
        <button @click="shareIssue">
          <i class="fas fa-share"></i>Share
        </button>
      </div>
      <img class="issue-img" :src="issue.newPic" @load="setCommentsHeight">
      <map-view
        :issueCoords="issue.location.coordinates"
        :mapCenter="issue.location.coordinates"
        :isEditable="false"
      />
    </div>
    <comments-cmp
      :comments="issue.comments"
      :user="user"
      @addComment="addComment"
      :style="{height: commentsHeight}"
    />
  </section>
</template>

<script>
import mapView from "@/components/map-view";
import commentsCmp from "@/components/comments-cmp";
import seenCount from "@/components/seen-count";
import shareCount from "@/components/share-count";
import eventBus, { USR_MSG_DISPLAY } from "@/services/busService";

export default {
  name: "issue-details",
  props: {},
  data() {
    return {
      issue: null,
      isOwner: false,
      commentsHeight: 0
    };
  },
  components: {
    mapView,
    commentsCmp,
    seenCount,
    shareCount
  },
  computed: {
    severityStatus() {
      return this.getSeverityStatus(this.issue.severity);
    },
    user() {
      return this.$store.getters.loggedinUser;
    },
    resolvedStatus() {
      return {
        resolved: this.issue.isResolved,
        open: !this.issue.isResolved
      };
    }
  },
  sockets: {
    addNewComment(comment) {
      if (comment.issueId === this.issue._id) {
        this.issue.comments.unshift(comment);
      }
    },

    toggleResolved(issueId) {
      if (issueId === this.issue._id)
        this.issue.isResolved = !this.issue.isResolved;
    },

    addSeen(issueId) {
      if (issueId === this.issue._id) this.issue.seenCount++;
    }
  },
  methods: {
    addComment(comment) {
      this.$socket.emit(
        "addComment",
        {
          txt: comment,
          issueId: this.issue._id,
          ownerId: this.user ? this.user._id : ""
        },
        this.issue.ownerId
      );
    },

    reportSeen() {
      this.$socket.emit("addSeen", this.issue._id);
      eventBus.$emit(USR_MSG_DISPLAY, {
        type: "success",
        txt: `Thanks for reporting! You are a PAL!`
      });
    },

    toggleResolved() {
      this.$socket.emit("toggleResolved", {
        from: this.user ? this.user._id : "",
        issueId: this.issue._id,
        ownerId: this.issue.ownerId,
        isResolved: this.issue.isResolved
      });
      eventBus.$emit(USR_MSG_DISPLAY, {
        type: "success",
        txt: `Thanks for reporting! You are a PAL!`
      });
    },

    setCommentsHeight() {
      this.commentsHeight =
        window.innerWidth >= 586
          ? this.$refs.issueDetails.clientHeight + "px"
          : "";
    },

    shareIssue() {
      alert("Sorry, still under construction. Don't let it stop you!");
    }
  },
  created() {
    const issueId = this.$route.params.issueId;
    this.$store.dispatch({ type: "getIssueById", issueId }).then(issue => {
      this.issue = issue;
      if (this.user && this.issue.ownerId === this.user._id) {
        this.isOwner = true;
      }
    });
  },
  // if owner login while on page
  watch: {
    user: function() {
      if (this.user && this.issue.ownerId === this.user._id) {
        this.isOwner = true;
      }
    }
  }
};
</script>
