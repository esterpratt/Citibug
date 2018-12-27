<template>
    <div class="comments">
        <i class="far fa-comment" :class="severityStatus"></i>
        <span>
            {{count}} {{count === 1? 'comment' : 'comments'}}
        </span>
    </div>
</template>

<script>

export default {
    props: {
        count: Number,
        severityStatus: String
    },
}
</script>

<style>

</style>
