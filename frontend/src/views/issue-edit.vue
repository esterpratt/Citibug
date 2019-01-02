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
        <img :src="issue.newPic" ref="img" @load="setImgSize"/>
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
        <form @submit.prevent="getCoordsByAddress">
          <el-input type="text" v-model="issue.address" placeholder="Address"></el-input>
          <button><i class="fas fa-search"></i></button>
        </form>
        <button @click="getCurrLoc">My Location</button>
      </div>
      <map-view v-if="issue.location.coordinates.length"
        :issueCoords="issue.location.coordinates"
        :mapCenter="mapCenter"
        :isEditable="true"
        @setCoords="setCoords"/>
      <div class="edit-btns">
        <button @click="goBack">Cancel</button>
        <button @click="saveIssue">{{issue._id ? 'Save' : 'Report'}}</button>
      </div>
    </section>
    <modal-cmp :isOpen="isModalOpen" @closeModal="closeModal">
      <sure-validation :yesCB="removeIssueCB" @closeModal="closeModal">
      </sure-validation>
    </modal-cmp>
  </section>
</template>

<script>
import modalCmp from "@/components/modal-cmp"
import sureValidation from "@/components/sure-validation"
import mapView from "@/components/map-view"
import vueSlider from 'vue-slider-component'
import eventBus, {USR_MSG_DISPLAY} from '@/services/busService'

export default {
  name: "issue-edit",

  data() {
    return {
      issue: null,
      mapCenter: [],
      video: null,
      canvas: null,
      imgHeight: 0,
      imgWidth: 0,
      isModalOpen: false,
      removeIssueCB: () => {
        this.closeModal()
        this.removeIssue()
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
          this.issue = JSON.parse(JSON.stringify(issue))
          this.mapCenter = this.issue.location.coordinates
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
          type: 'Point',
          coordinates: [],
        },
        address: null,
        oldPic: "https://dummyimage.com/380x250/cccccc/ffffff.png&text=Issue+Photo",
        newPic: "https://dummyimage.com/380x250/cccccc/ffffff.png&text=Issue+Photo",
      };
      this.getCurrLoc()
    },

    goBack() {
      this.$router.push(this.issue._id ? `/issue/${this.issue._id}` : '/')
    },

    saveIssue() {
      if (this.issue.title && this.issue.description && this.issue.category) {
        this.$store.dispatch({type: 'saveIssue', issue: this.issue})
          .then(_ => {
            var txt;
            var path = '/';
            if (this.issue._id) {
              txt = 'Your issue was updated'
              path += `issue/${this.issue._id}`
            } else {
              txt = 'Thanks for reporting, You are a PAL!'
            }
            eventBus.$emit(USR_MSG_DISPLAY, { type: 'success', txt })
            this.$router.push(path)
          })
      } else {
        eventBus.$emit(USR_MSG_DISPLAY, { type: 'fail', txt: 'Please fill in the required fields' })
      }
    },

    removeIssue() {
      // delete issue and go to homepage
      this.$store.dispatch({type: 'removeIssue', issueId: this.issue._id})
      .then(_ => {
        eventBus.$emit(USR_MSG_DISPLAY, { type: 'fail', txt: 'Issue was deleted' })
        this.$router.push('/')
      })
    },

    // MAP
    getCurrLoc() {
      this.$store.dispatch({ type: "getLoc" }).then(loc => {
        this.issue.location.coordinates = loc.coords;
        this.issue.address = loc.address;
        this.mapCenter = loc.coords;
      });
    },

    getCoordsByAddress() {
      if (this.issue.address) {
        this.$store.dispatch({ type: "getCoordsByAddress", address: this.issue.address }).then(coords => {
          this.issue.location.coordinates = coords;
          this.mapCenter = coords;
        });
      }
    },

    setCoords(coords) {
      this.issue.location.coordinates = coords;
      this.$store
        .dispatch({ type: "getAddressByCoords", coords })
        .then(address => (this.issue.address = address));
    },

    // IMG
    previewImg(ev) {
      const imgPath = ev.target.files[0];
      
      if (imgPath) {
        this.issue.picPath = imgPath;
        this.issue.newPic = URL.createObjectURL(imgPath);
        this.setImgSize()
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
      canvas.toBlob(blob => {
        this.issue.picPath = blob;
        this.issue.newPic = URL.createObjectURL(blob);
      }, 'image/jpeg');
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
