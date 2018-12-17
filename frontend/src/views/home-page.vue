<template>
  <div class="home">
    <header>
        <h1>Make our city a better place!</h1>
    </header>
    <h2>
        Issues near you
    </h2>
    
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  props: {
    
  },
  data() {
      return {
          
      }
  },
  components: {
    
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
      // this.$store.dispatch({type: 'getIssues'})
  }
}
</script>
