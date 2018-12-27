<template>
    <div class="resolved">
        <template v-if="isResolved">
            <i class="fas fa-times"></i>
            <p>Re-open</p>
        </template>
        <template v-else>
            <i class="fas fa-check"></i>
            <p>Resolve</p>
        </template>
    </div>
</template>

<script>
export default {
    props: {
        isResolved: Boolean
    },

    methods: {
        
    },
}
</script>

<style>

</style>
