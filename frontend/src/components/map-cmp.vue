<template>
    <section class="map">
        <button class="pan-container" @click="panTo">
            <img src="../../public/img/gps.png">
        </button>
        <GmapMap ref="mapRef"
        :center="issueLoc"
        :zoom="16"
        map-type-id="terrain"
        style="width: 500px; height: 300px">
            <GmapMarker :position="issueLoc"/>
        </GmapMap>
    </section>
</template>

<script>
export default {
    props: {
        issueLoc: Object
    },

    methods: {
        panTo() {
            this.$refs.mapRef.panTo(this.issueLoc)
        }
    }
}
</script>

<style>

</style>
