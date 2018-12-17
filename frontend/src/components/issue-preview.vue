<template>
    <section class="issue-preview">
        <div v-if="issue.isResolved" class="resloved-container">
            <div class="resolved">
                <i class="fas fa-check"></i>
                <p>Issue is resolved!</p>
            </div>
        </div>
        <div class="issue-img" 
        :style="'background-image: url(' + issue.pic + ')'">
            <!-- <img :src="issue.pic"> -->
            <div class="seen-container">
                <p>{{issue.seenCount}}</p>
                <img src="../../public/img/eye.png">
                <!-- <i class="far fa-eye"></i> -->
            </div>
        </div>
        <h2>{{issue.title}}</h2>
        <div class="txt-details">
            <div class="address-n-comments">
                <div class="address">At {{issue.address}}</div>
                <div class="comments" :class="severityStatus">
                    <div>
                        <i class="far fa-comment"></i>
                        <span>
                            {{issue.comments.length ? issue.comments.length : 'No'}}
                        </span>
                    </div>
                    <p>{{issue.comments.length === 1? 'comment' : 'comments'}}</p>
                </div>
            </div>
            <div class="time">
                reported {{issue.createdAt | relative-time}}    
            </div>
            <div class="issue-severity" :class="severityStatus">
                {{severityStatus}}
            </div>
        </div>
    </section>
</template>

<script>

export default {
  props: {
      issue: Object
  },
  data() {
      return {

      }
  },
  components: {

  },
  computed: {
      severityStatus() {
          if (this.issue.severity < 4) {
              return 'mild'
          } else if (this.issue.severity < 7) {
              return 'severe'
          } else {
              return 'urgent'
          }
      }
  },
  methods: {
      
  },
  created() {
      
  }
}
</script>

<style lang="scss">

</style>