<template>
    <div class="share">
        <i class="fas fa-share" :class="severityStatus"></i>
        <span>
            {{count}} {{count=== 1? 'share' : 'shares'}}
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
