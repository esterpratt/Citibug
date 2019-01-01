<template>
    <div class="comments-container">
        <h2>Comments</h2>
        <div class="new-comment">
            <div class="user-pic">{{user ? user.emoji : '?'}}</div>
            <form @submit.prevent="addComment">
                <el-input type="text" 
                    v-model="newComment" 
                    placeholder="What's on your heart">
                </el-input>
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
import commentPreview from './comment-preview'

export default {
    props: {
        comments: Array,
        user: Object
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
