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
    <section class="container">
        <div class="carousel-container" v-for="(issuesObj, idx) in issuesLists"
        :key="idx">
            <h2>{{issuesObj.title}}</h2>
            <issue-carousel :issues="issuesObj.issues"></issue-carousel>
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
          issuesLists: [
                        {title: 'Issues near you',
                         issues: []
                        },
                        {title: 'Most urgent issues',
                         issues: []
                        },
                        {title: 'Recent issues',
                         issues: []
                        }
                        ]
      }
  },
  components: {
    issueCarousel
  },
  computed: {
      backImgSrc() {
          return `/img/homepage/${this.backImg}.jpg`
      }
  },
  methods: {
      
  },
  created() {
      this.imgInterval = setInterval(() => {
          this.backImg++
          if (this.backImg === 4) this.backImg = 1
      }, 5000)

      var filter = {
          to: 4,
          byUser: '',
          byTxt: '',
          byStatus: 'All',
          byCategory: []
      }

      // get current user location
      this.$store.dispatch({type: 'getLoc'})
      .then(_ => {
        this.$store.dispatch({type: 'setFilter', filter})
        .then(issues => {
            this.issuesLists[0].issues = issues
            this.$store.dispatch({type: 'setFilter', filter: {sortBy: 'Severity'}})
            .then(issues => {
                this.issuesLists[1].issues = issues
                this.$store.dispatch({type: 'setFilter', filter: {sortBy: 'Recent first'}})
                .then(issues => {
                    this.issuesLists[2].issues = issues
                    })
                })
            })
      })
  },
  
  destroyed() {
      clearInterval(this.imgInterval)
      this.$store.dispatch({type: 'setFilter', filter: {to: 18}})
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
