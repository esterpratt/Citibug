<template>
    <div class="seen">
        <i class="far fa-eye" :class="severityStatus"></i>
        <span>
            {{count}} seen
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
