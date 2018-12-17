<template>
    <section class="issue-carousel">
        <carousel 
        :navigationEnabled="true"
        navigationNextLabel="<i class='fas fa-chevron-right'></i>" 
        navigationPrevLabel="<i class='fas fa-chevron-left'></i>" 
        :perPageCustom="[[0,1],[650,2],[950, 3], [1250, 4]]"
        :scrollPerPage="false"
        :mouse-drag="true">
            <slide class="slide" v-for="issue in issues" :key="issue._id">
                <issue-preview :issue="issue"></issue-preview>
            </slide>
        </carousel>
    </section>
</template>

<script>
import issuePreview from './issue-preview'

export default {
    props: {
        issues: Array,
    },

    data() {
        return {
            
        }
    },

    components: {
        issuePreview,
    }
}
</script>

<style>

</style>
