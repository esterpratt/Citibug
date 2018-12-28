<template>
    <div class="map-edit">
        <div class="loc-select">
            <form @submit.prevent="getPosByAddress">
                <el-input type="text" v-model="location.address"
                placeholder="Address"></el-input>
                <button>OK</button>
            </form>
            <button @click="getCurrLoc">My Location</button>
        </div>
        <!-- <div class="map-container" v-if="location.pos"> -->
        <map-view :issuePos="location.pos"
        :mapCenter="mapCenter"
        :isEditable="true"
        @setPos="setPos" />
        <!-- </div> -->
    </div>
</template>

<script>
import mapView from './map-view'

export default {
    props: {
        locProp: Object,
        mapCenter: Object
    },

    components: {
        mapView
    },

    data() {
        return {
            location: null
        }
    },

    methods: {
        getPosByAddress() {
            if (this.location.address) {
                this.$emit('getPosByAddress', this.location.address)
            }
        },

        getCurrLoc() {
            this.$emit('getCurrLoc')
        },

        setPos(pos) {
            this.$emit('setPos', pos)
        }
    },

    created() {
        this.location = this.locProp
    }
}
</script>

<style>

</style>
