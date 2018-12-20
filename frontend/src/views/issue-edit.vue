<template>
  <section class="issue-edit" v-if="issue">
    <button v-if="issue._id">Delete</button>
    <div class="edit-details">
      <el-input type="text" v-model="issue.title" placeholder="Issue Title"></el-input>
      <el-input
        type="textarea"
        v-model="issue.description"
        placeholder="Issue Description"
        rows="3">
        </el-input>
      <div class="category">
        <p>Category:</p>
        <el-select v-model="issue.category" placeholder="Select">
          <el-option v-for="item in categoryOptions" :key="item" :value="item"></el-option>
        </el-select>
      </div>
      <div class="severity">
        <p>Severity:</p>
        <el-slider
          v-model="issue.severity"
          :max="10"
          :step="0.01"
          show-input
          :show-input-controls="false"
        ></el-slider>
      </div>
    </div>
    <div class="edit-imgs">
      <div class="edit-map">
        <div class="loc-select">
          <form @submit.prevent="getPosByAddress">
            <el-input type="text" v-model="issue.location.address"
            placeholder="Address"></el-input>
            <button>OK</button>
          </form>
          <button @click="getCurrLoc">My Location</button>
        </div>
        <div class="map-container" v-if="this.issue.location.pos">
            <map-cmp :issuePos="issue.location.pos"
            :mapCenter="mapCenter"
            :isEditable="true"
            @setPos="setPos"></map-cmp>
        </div>
      </div>
      <img-upload v-model="uploadedPic"></img-upload>
    </div>
    <div class="edit-btns">
      <button>{{issue._id ? 'Save' : 'Report'}}</button>
      <button>Cancel</button>
    </div>
  </section>
</template>

<script>
import mapCmp from '@/components/map-cmp.vue'
import imgUpload from '@/components/img-upload.vue'

export default {
  name: "issue-edit",
  props: {},

  data() {
    return {
      issue: null,
      mapCenter: null,
      uploadedPic: ''
    };
  },

  components: {
      mapCmp,
      imgUpload
  },

  computed: {
    categoryOptions() {
      return this.$store.getters.issueCategories;
    }
  },

  methods: {
    getId() {
      const issueId = this.$route.params.issueId;
      if (issueId) {
        this.$store.dispatch({ type: "getIssueById", issueId }).then(issue => {
          this.issue = issue
          this.mapCenter = this.issue.location.pos
          this.uploadedPic = this.issue.pic
        });
      } else {
          this.uploadedPic = ''
          this.setEmptyIssue()
      }
    },

    setEmptyIssue() {
        this.issue = {
          title: "",
          description: "",
          category: "",
          severity: 5,
          seenCount: 0,
          shareCount: 0,
          isResolved: false,
          location: {
              pos: null,
              address: null,
          },
        //   pic: "",
          // TODO: update the owner according to loggedInUser
          ownerId: "xyz"
        }
        this.getCurrLoc()
    },

    getCurrLoc() {
        this.$store.dispatch({type: 'getLoc'})
            .then(loc => {
                this.mapCenter = loc.pos
                this.issue.location.pos = loc.pos
                this.issue.location.address = loc.address
            })
    },

    getPosByAddress() {
        this.$store.dispatch({type: 'getPosByAddress', address: this.issue.location.address})
            .then(pos => {
                this.issue.location.pos = pos
                this.mapCenter = pos
            })
    },

    setPos(pos) {
        this.issue.location.pos = pos
        this.$store.dispatch({type: 'getAddressByPos', pos})
            .then(address => {
                this.issue.location.address = address
            })
    },
  },

  created() {
    this.getId()
  },

  watch: {
    "$route.params.issueId": function() {
      this.getId()
    }
  }
};
</script>
