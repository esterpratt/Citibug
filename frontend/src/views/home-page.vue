<template>
  <div class="home">
    <header>
        <transition name="fade">
            <div class="back-img" :key="backImg"
            :style="{'background-image': 'url(' + backImgSrc +')'}"></div>
        </transition>
        <div class="back-color"></div>
        <h1>Be a PAL!
            <p>Join the community,</br>
            report issues,</br>
            help solving others</br>
            and make our city</br>
            a better place!</p>
            <button @click="scrollDown"><i class="fas fa-angle-down"></i></button>
        </h1>
    </header>
    <section class="container" ref="main">
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
                        filter: {
                                    to: 4,
                                    byUser: '',
                                    byTxt: '',
                                    byStatus: 'All',
                                    byCategory: []
                                },
                         issues: []
                        },
                        {title: 'Most urgent issues',
                        filter: {sortBy: 'Severity'},
                         issues: []
                        },
                        {title: 'Recent issues',
                        filter: {sortBy: 'Recent first'},
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
      loadIssues(filter, idx) {
          this.$store.dispatch({type: 'setFilter', filter})
            .then(issues => this.issuesLists[idx].issues = issues)
      },

      scrollDown() {
          const height = this.$refs.main.offsetTop
          window.scrollBy(0, height)
      }
  },
  created() {
      this.imgInterval = setInterval(() => {
          this.backImg++
          if (this.backImg === 4) this.backImg = 1
      }, 5000)

      // get current user location
      this.$store.dispatch({type: 'getLoc'})
      .then(_ => {
          // load issues according to its filter
          this.issuesLists.forEach((list, idx) => {
              this.loadIssues(list.filter, idx)
          })
    })
  },
  
  destroyed() {
      clearInterval(this.imgInterval)
      this.$store.dispatch({type: 'setFilter', filter: {to: 18}})
  }
}
</script>

<style lang="scss">
    .fade-enter-active, .fade-leave-active {
        transition: opacity 1s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
