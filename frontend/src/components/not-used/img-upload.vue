<template>
    <div class="edit-img">
        <div class="img-btns">
            <form class="publish-form" method="POST" 
                enctype="multipart/form-data">
                <label for="imgFile">Upload Photo</label>
                <input type="file" id="imgFile" @input="previewImg"/>
            </form>
            <i class="fas fa-camera" @click="startVideo"></i>
            <button @click="capture">Snap</button>
        </div>
        <canvas ref="canvas" id="canvas" width="320" height="240"></canvas>
        <div class="img-container">
            <video ref="video" id="video" autoplay>
            </video>
            <img :src="value" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: String
    },

    data() {
        return {
            video: {},
            canvas: {},
        }
    },

    methods: {
        previewImg(ev) {
            const imgPath = ev.target.files[0]
            if (imgPath) {
                const uploadedPic = URL.createObjectURL(imgPath)
                if (uploadedPic) this.$emit('input', uploadedPic)
                // cloudinaryService.uploadImg(ev.target.parentElement)
            }
        },

        startVideo() {
            this.video = this.$refs.video;
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
                    this.video.srcObject = stream;
                    this.video.play();
                });
            }
        },

        capture() {
            this.canvas = this.$refs.canvas;
            this.canvas.getContext("2d").drawImage(this.video, 0, 0);
            this.$emit('input', canvas.toDataURL("image/png"))
            this.video.srcObject.getTracks().forEach(track => track.stop());
            this.video.srcObject = null;
        }
    },
}
</script>

<style>

</style>
