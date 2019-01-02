<template>
<!-- TODO: optimize: divide to select/input/radio cmps -->
    <section class="issue-filter">
        <form @submit.prevent="setFilter">
            <el-input class="issue-search" type="text" 
            v-model="filter.byTxt" 
            placeholder="Search Issue">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
        </form>
        <el-select class="category-filter" 
            v-model="filter.byCategory" @change="setFilter"
            multiple collapse-tags
            placeholder="Categories">
            <el-option
            v-for="item in issueCategories" :key="item" 
            :value="item">
            </el-option>
        </el-select>
        <el-radio-group class="status-filter"
        v-model="filter.byStatus" @change="setFilter">
            <el-radio-button label="All"></el-radio-button>
            <el-radio-button label="Open"></el-radio-button>
            <el-radio-button label="Resolved"></el-radio-button>
        </el-radio-group>
        <label class="issue-sort">
            <p>Sort by</p>
            <el-select v-model="filter.sortBy" @change="setFilter">
                <el-option
                    v-for="item in sortOptions" :key="item"
                    :value="item">
                </el-option>
            </el-select>
        </label>
    </section>
</template>

<script>
export default {
    data() {
        return {
            filter: {
                byUser: '',
                sortBy: 'Distance',
                byTxt: '',
                byStatus: 'All',
                byCategory: []
            },

            sortOptions: ['Distance', 'Severity', 'Recent first', 'Oldest first', 'Attention'],
        }
    },

    computed: {
        issueCategories() {
            return this.$store.getters.issueCategories
        }
    },

    methods: {
        setFilter() {
            this.$store.dispatch({type: 'setFilter', filter: this.filter})
        },
    },
}
</script>

<style>

</style>
