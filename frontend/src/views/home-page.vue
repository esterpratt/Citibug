<template>
  <div class="home">
    <header>
        <h1>Make our city a better place!</h1>
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
          
      }
  },
  components: {
    issueCarousel
  },
  computed: {
      issues() {
          return this.$store.getters.issues
      },
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
  }
}
</script>
