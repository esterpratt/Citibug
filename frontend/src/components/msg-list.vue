<template>
    <section class="msg-list">
        <msg-preview v-for="msg in msgs" :key="msg._id" :msg="msg"></msg-preview>
    </section>
</template>

<script>
import msgPreview from './msg-preview'

export default {
    props: {
        msgs: Array
    },
    components: {
        msgPreview
    }
}
</script>

<style>

</style>
