<template>
    <div class="modal-container" :class="status" @click="$emit('closeModal')">
        <div class="modal-inner" @click.stop>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isOpen: Boolean
    },

    computed: {
        status() {
            return {
                open: this.isOpen
            }
        }
    },

    methods: {
        
    },
}
</script>

<style>

</style>
