<template>
  <!-- TODO: optimize: divide to select/input cmps -->
  <section class="container">
    <canvas ref="canvas" id="canvas" :height="imgHeight" :width="imgWidth"></canvas>
    <section class="issue-edit" v-if="issue">
      <div class="edit-input">
        <div class="title">
          <el-input type="text" v-model="issue.title" placeholder="Title"></el-input>
        </div>
        <div class="description">
          <el-input type="textarea" v-model="issue.description"
          placeholder="Description" rows="3">
          </el-input>
        </div>
        <div class="category">
          <p>Category:</p>
          <el-select v-model="issue.category" placeholder="Select">
            <el-option v-for="item in categoryOptions" :key="item" :value="item"></el-option>
          </el-select>
        </div>
        <div class="severity">
          <p>Severity:</p>
          <vue-slider ref="slider" v-model="issue.severity"
          :max=10 :interval=0.1
          :process-style="{backgroundImage: '-webkit-linear-gradient(left, #8f9127, #eb4f02)'}"
          :tooltip-style="{backgroundColor: '#8f9127', borderColor: '#8f9127'}"
          ></vue-slider>
        </div>
      </div>
      <button v-if="issue._id" class="delete-btn" @click="isModalOpen=true">
        <i class="fas fa-trash-alt"></i>
        Delete Issue
      </button>
      <button v-else class="delete-btn" @click="setEmptyIssue">
        <i class="fas fa-eraser"></i>
        Clear Form
      </button>

      <!-- IMG -->
      <div class="img-container">
        <img :src="issue.pic" ref="img" @load="setImgSize"/>
        <video ref="video" id="video" autoplay
         :height="imgHeight" :width="imgWidth"></video>
        <div class="img-btns">
          <form v-if="!video" class="publish-form" method="POST" enctype="multipart/form-data">
            <label for="imgFile">
              <i class="fas fa-file-upload"></i>
            </label>
            <input type="file" id="imgFile" @input="previewImg">
          </form>
          <i v-else class="fas fa-arrow-left" @click="stopVideo"></i>
          <i v-if="!video" class="fas fa-camera" @click="startVideo"></i>
          <i v-else class="fas fa-circle" @click="capture"></i>
        </div>
      </div>

      <!-- MAP -->
      <div class="loc-select">
        <form @submit.prevent="getPosByAddress">
          <el-input type="text" v-model="issue.location.address" placeholder="Address"></el-input>
          <button><i class="fas fa-search"></i></button>
        </form>
        <button @click="getCurrLoc">My Location</button>
      </div>
      <!-- <div class="map-container" v-if="location.pos"> -->
      <map-view v-if="mapCenter"
        :issuePos="issue.location.pos"
        :mapCenter="mapCenter"
        :isEditable="true"
        @setPos="setPos"
      />
      <div class="edit-btns">
        <button @click="goBack">Cancel</button>
        <button @click="saveIssue">{{issue._id ? 'Save' : 'Report'}}</button>
      </div>
    </section>
    <modal-cmp :isOpen="isModalOpen" @closeModal="closeModal">
      <sure-validation :yesCB="deleteIssueCB" @closeModal="closeModal">
      </sure-validation>
    </modal-cmp>
  </section>
</template>

<script>
import modalCmp from "@/components/modal-cmp"
import sureValidation from "@/components/sure-validation"
import mapView from "@/components/map-view"
import vueSlider from 'vue-slider-component'

export default {
  name: "issue-edit",

  data() {
    return {
      issue: null,
      mapCenter: null,
      video: null,
      canvas: null,
      imgHeight: 0,
      imgWidth: 0,
      isModalOpen: false,
      deleteIssueCB: () => {
        this.closeModal()
        this.deleteIssue()
      }
    };
  },

  components: {
    modalCmp,
    sureValidation,
    mapView,
    vueSlider
  },

  computed: {
    categoryOptions() {
      return this.$store.getters.issueCategories;
    },
  },

  methods: {
    closeModal() {
      this.isModalOpen = false;
    },

    // ISSUE
    getId() {
      const issueId = this.$route.params.issueId;
      if (issueId) {
        this.$store.dispatch({ type: "getIssueById", issueId }).then(issue => {
          // TODO: copy the object?
          this.issue = issue;
          this.mapCenter = this.issue.location.pos;
        });
      } else {
        this.setEmptyIssue();
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
          address: null
        },
        pic: "https://dummyimage.com/380x250/cccccc/ffffff.png&text=Issue+Photo",
        // TODO: update the owner according to loggedInUser
        ownerId: "xyz"
      };
      this.getCurrLoc()
    },

    goBack() {
      this.$router.push(this.issue._id ? `/issue/${this.issue._id}` : '/')
    },

    saveIssue() {
      console.log('saving issue')
    },

    deleteIssue() {
      // delete issue and go to homepage
        console.log('Delete issue and show msg that issue deleted')
        this.$router.push('/')
    },

    // MAP
    getCurrLoc() {
      this.$store.dispatch({ type: "getLoc" }).then(loc => {
        this.mapCenter = loc.pos;
        this.issue.location.pos = loc.pos;
        this.issue.location.address = loc.address;
      });
    },

    getPosByAddress() {
      if (this.issue.location.address) {
        this.$store.dispatch({ type: "getPosByAddress", address: this.issue.location.address }).then(pos => {
          this.issue.location.pos = pos;
          this.mapCenter = pos;
        });
      }
    },

    setPos(pos) {
      this.issue.location.pos = pos;
      this.$store
        .dispatch({ type: "getAddressByPos", pos })
        .then(address => (this.issue.location.address = address));
    },

    // IMG
    previewImg(ev) {
      const imgPath = ev.target.files[0];
      if (imgPath) {
        this.issue.pic = URL.createObjectURL(imgPath);
        this.setImgSize()
        // cloudinaryService.uploadImg(ev.target.parentElement)
      }
    },

    startVideo() {
      this.video = this.$refs.video;
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
          this.video.srcObject = stream;
          this.video.play();
        });
      }
    },

    stopVideo() {
      this.video.srcObject.getTracks().forEach(track => track.stop());
      this.video.srcObject = null;
      this.video = null;
    },

    capture() {
      this.canvas = this.$refs.canvas;
      this.canvas.getContext("2d").drawImage(this.video, 0, 0);
      this.issue.pic = canvas.toDataURL("image/png");
      this.stopVideo();
    },

    setImgSize(ev) {
      this.imgHeight = this.$refs.img.clientHeight
      this.imgWidth = this.$refs.img.clientWidth
    }
  },

  created() {
    this.getId();
  },

  watch: {
    "$route.params.issueId": function() {
      this.getId();
    },
  }
};
</script>

<style>

</style>
