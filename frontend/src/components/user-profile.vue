<template>
    <div class="user-profile">
        <h2>Your messages:</h2>
        <div>
            <msg-list :msgs="msgs"></msg-list>
        </div>
    </div>
</template>

<script>
import msgList from './msg-list'

export default {
    name: 'user-profile',
    components: {
        msgList
    },
    computed: {
        msgs() {
            return this.$store.getters.msgs
        }
    },
    created() {
        this.$store.dispatch({type: 'getMsgs'})
    }
}
</script>

<style>

</style>
