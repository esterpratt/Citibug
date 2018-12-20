<template>
    <section class="map">
        <button class="pan-container" @click="panTo">
            <img src="../../public/img/gps.png">
        </button>
        <GmapMap ref="mapRef"
        :center="mapCenter"
        :zoom="16"
        map-type-id="terrain"
        @click="setPos"
        style="width: 500px; height: 300px">
            <GmapMarker :position="issuePos"
            :draggable="isEditable"
            @dragend="setPos"/>
        </GmapMap>
    </section>
</template>

<script>
export default {
    props: {
        mapCenter: Object,
        issuePos: Object,
        isEditable: Boolean
    },

    data() {
        return {
            
        }
    },

    methods: {
        panTo() {
            this.$refs.mapRef.panTo(this.issuePos)
        },

        setPos(ev) {
            if (this.isEditable) {
                const pos = {lat: ev.latLng.lat(), lng: ev.latLng.lng()}
                this.$emit('setPos', pos)
            }
        },
    },

    // TODO: understand why mapCenter is not reactive 
    // only when clicking 'my location'
    watch: {
        mapCenter: function() {
            this.panTo()
        }
    }
}
</script>

<style>

</style>
