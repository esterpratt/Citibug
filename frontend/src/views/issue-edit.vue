<template>
  <!-- TODO: optimize: divide to select/input cmps -->
  <section class="container">
    <canvas ref="canvas" id="canvas"></canvas>
    <section class="issue-edit" v-if="issue">
      <div class="edit-input">
        <div class="title">
          <el-input type="text" v-model="issue.title" placeholder="Title"></el-input>
        </div>
        <div class="description">
          <el-input type="textarea" v-model="issue.description"
          maxlength="120"
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
      <button v-if="issue._id" class="delete-btn" @click="isSureModalOpen=true">
        <i class="fas fa-trash-alt"></i>
        Delete Issue
      </button>
      <button v-else class="delete-btn" @click="setEmptyIssue">
        <i class="fas fa-eraser"></i>
        Clear Form
      </button>

      <!-- IMG -->
      <div class="img-container">
        <img :src="issue.newPic" ref="img"/>
        <video ref="video" id="video" autoplay :class="{open: !!video}"></video>
        <div class="img-btns" :class="{open: !!video}">
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
        <button @click="validateIssue">{{issue._id ? 'Save' : 'Report'}}</button>
      </div>
    </section>
    <!-- Modals -->
    <modal-cmp :isOpen="isSureModalOpen" @closeModal="closeModal('isSureModalOpen')">
      <sure-validation :yesCB="removeIssueCB" @closeModal="closeModal">
      </sure-validation>
    </modal-cmp>
    <modal-cmp :isOpen="isSaveModalOpen" @closeModal="closeModal('isSaveModalOpen')">
      <join-modal @saveIssue="saveIssue"
      @openLogin="openLogin">
      </join-modal>
    </modal-cmp>
  </section>
</template>

<script>
import modalCmp from "@/components/modal-cmp"
import sureValidation from "@/components/sure-validation"
import joinModal from "@/components/join-modal"
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
      isSureModalOpen: false,
      isSaveModalOpen: false,
      removeIssueCB: () => {
        this.closeModal('isSureModalOpen')
        this.removeIssue()
      },
      isMobile: false,
    };
  },

  components: {
    modalCmp,
    sureValidation,
    joinModal,
    mapView,
    vueSlider
  },

  computed: {
    categoryOptions() {
      return this.$store.getters.issueCategories;
    },

    isUserLoggedIn() {
      return !!this.$store.getters.loggedinUser
    },

    videoConstrain() {
      return (this.isMobile) ? { facingMode: { exact: "environment" } } : true
    }
  },

  methods: {
    closeModal(varName) {
      this[varName] = false;
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
        oldPic: "https://dummyimage.com/300x335/cccccc/ffffff.png&text=Issue+Photo",
        newPic: "https://dummyimage.com/300x335/cccccc/ffffff.png&text=Issue+Photo",
      };
      this.getCurrLoc()
    },

    goBack() {
      this.$router.push(this.issue._id ? `/issue/${this.issue._id}` : '/')
    },

    validateIssue() {
      // validate fields
      if (this.issue.title && this.issue.description && this.issue.category) {
        // if user exist save issue
        if (this.isUserLoggedIn) this.saveIssue()
        // if no user, open modal
        else this.openSaveModal()
      } else {
        eventBus.$emit(USR_MSG_DISPLAY, { type: 'fail', txt: 'Please fill in the required fields' })
      }
    },

    saveIssue() {
      this.$store.dispatch({type: 'saveIssue', issue: this.issue})
          .then(_ => {
            var txt = 'Thanks for reporting, You are a PAL!'
            if (this.issue._id) txt = 'Your issue was updated'
            eventBus.$emit(USR_MSG_DISPLAY, { type: 'success', txt })
            this.goBack()
          })
    },

    openLogin() {
      this.isSaveModalOpen = false
      this.$emit('openLogin')
    },

    openSaveModal() {
      this.isSaveModalOpen = true
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
        this.issue.location.coordinates = loc.coords
        this.issue.address = loc.address
        this.mapCenter = loc.coords
      });
    },

    getCoordsByAddress() {
      if (this.issue.address) {
        this.$store.dispatch({ type: "getCoordsByAddress", address: this.issue.address }).then(coords => {
          this.issue.location.coordinates = coords
          this.mapCenter = coords
        });
      }
    },

    setCoords(coords) {
      this.issue.location.coordinates = coords
      this.$store
        .dispatch({ type: "getAddressByCoords", coords })
        .then(address => (this.issue.address = address))
    },

    // IMG
    previewImg(ev) {
      const imgPath = ev.target.files[0]
      
      if (imgPath) {
        this.issue.picPath = imgPath
        this.issue.newPic = URL.createObjectURL(imgPath)
      }
    },

    startVideo() {
      this.video = this.$refs.video
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: this.videoConstrain }).then(stream => {
          this.video.srcObject = stream
          this.video.play()
        });
      }
    },

    stopVideo() {
      this.video.srcObject.getTracks().forEach(track => track.stop())
      this.video.srcObject = null
      this.video = null
    },

    capture() {
      const size = this.getImgSize()
      this.canvas.width = size.width;
      this.canvas.height = size.height;
      this.canvas.getContext("2d").drawImage(this.video, 0, 0, size.width, size.height);     
      canvas.toBlob(blob => {
        this.issue.picPath = blob
        this.issue.newPic = URL.createObjectURL(blob);
      }, 'image/jpeg')
      this.stopVideo()
    },

    getImgSize() {
      this.canvas = this.$refs.canvas
      let width = this.$refs.video.videoWidth
      let height = this.$refs.video.videoHeight
      const ratio = width/height
      width = this.$refs.img.clientWidth
      height = width/ratio;
      return {width, height}
    },

    checkIfMobile() {
      return !!(navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i))
    }
  },

  created() {
    this.getId()
    this.isMobile = this.checkIfMobile()
  },

  mounted() {

  },

  watch: {
    "$route.params.issueId": function() {
      this.getId()
    },
  }
};
</script>

<style>

</style>
