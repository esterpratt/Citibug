<template>
    <section class="map">
        <GmapMap ref="mapRef"
        :center="center"
        :zoom="16"
        map-type-id="terrain"
        @click="setCoords">
            <GmapMarker :position="coords"
            :draggable="isEditable"
            @dragend="setCoords"/>
        </GmapMap>
        <img class="pan-container" @click="panTo"
        src="../assets/img/gps.png">
    </section>
</template>

<script>
export default {
    props: {
        mapCenter: Array,
        issueCoords: Array,
        isEditable: Boolean
    },

    data() {
        return {
            
        }
    },

    computed: {
        coords() {
            return {
                lng: this.issueCoords[0],
                lat: this.issueCoords[1]
            }
        },

        center() {
            return {
                lng: this.mapCenter[0],
                lat: this.mapCenter[1],
            }
        }
    },

    methods: {
        panTo() {
            this.$refs.mapRef.panTo(this.coords)
        },

        setCoords(ev) {
            if (this.isEditable) {
                const coords = [ev.latLng.lng(), ev.latLng.lat()]
                this.$emit('setCoords', coords)
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
