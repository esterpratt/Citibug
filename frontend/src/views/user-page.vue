<template>
    <section class="container">
        <h1>Hello user</h1>
        <div class="routes-container">
            <div class="links">
                <router-link to="/user" exact>Messages</router-link>
                <router-link to="/user/issues">Issues</router-link>  
            </div>
            <div class="route-page-container">
                <router-view></router-view>
            </div>
        </div>
    </section>
</template>

<script>


export default {
  name: 'user-page',
  props: {

  },
  data() {
      return {
          
      }
  },
  components: {
    
  },
  computed: {
      
  },
  methods: {
      
  },
  created() {
      
  }
}
</script>
