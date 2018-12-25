<template>
    <div class="comments-container">
        <h2>Comments</h2>
        <div class="new-comment">
            <div class="user-pic">

            </div>
            <form @submit.prevent="addComment">
                <input type="text" 
                v-model="newComment" 
                placeholder="What's on your heart">
                <button>
                    <i class="fas fa-plus"></i>
                </button>
            </form>
        </div>
        <div class="comments">
            <comment-preview
            v-for="(comment, idx) in comments"
            :key="idx"
            :comment="comment">
            </comment-preview>
        </div>
    </div>
</template>

<script>
import commentPreview from '@/components/comment-preview.vue'

export default {
    props: {
        comments: Array
    },

    components: {
        commentPreview
    },

    data() {
        return {
            newComment: '',
        }
    },

    methods: {
        addComment() {
            this.$emit('addComment', this.newComment)
            this.newComment = ''
        }
    },
}
</script>

<style>

</style>
