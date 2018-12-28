<template>
  <div class="home">
    <header>
        <transition name="fade">
            <div class="back-img" :key="backImg"
            :style="{'background-image': 'url(' + backImgSrc +')'}"></div>
        </transition>
        <div class="back-color"></div>
        <h1>Be a PAL!<p>Make our city a better place!</p></h1>
    </header>
    <!-- TODO: optimize: loop over array -->
    <section class="container">
        <div class="carousel-container">
            <h2>Issues near you</h2>
            <issue-carousel :issues="issues"></issue-carousel>
            <router-link to="/issue">Show All Issues ></router-link>
        </div>
        <div class="carousel-container">
            <h2>Most urgent issues</h2>
            <issue-carousel :issues="issues"></issue-carousel>
            <router-link to="/issue">Show All Issues ></router-link>
        </div>
        <div class="carousel-container">
            <h2>Recent issues</h2>
            <issue-carousel :issues="issues"></issue-carousel>
            <router-link to="/issue">Show All Issues ></router-link>
        </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import issueCarousel from '@/components/issue-carousel.vue'

export default {
  name: 'home',
  props: {
    
  },
  data() {
      return {
          backImg: 1,
          imgInterval: null,
      }
  },
  components: {
    issueCarousel
  },
  computed: {
      issues() {
          return this.$store.getters.issues
      },

      backImgSrc() {
          return `/img/homepage/${this.backImg}.jpg`
      }
  },
  methods: {
      
  },
  created() {
      // get current user location
      this.$store.dispatch({type: 'getLoc'})
      // TODO: load relevant issues. 
      // TODO: think how to get issues after getting loc
      //       but consider situation where user choose 
      //       not to allow use of his location
      this.$store.dispatch({type: 'getIssues'})

      this.imgInterval = setInterval(() => {
          this.backImg++
          if (this.backImg === 4) this.backImg = 1
      }, 5000)
  },
  destroyed() {
      clearInterval(this.imgInterval)
  }
}
</script>

<style>
    .fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
    }

    .fade-enter, .fade-leave-to {
    opacity: 0;
    }
</style>
