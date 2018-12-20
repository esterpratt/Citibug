<template>
    <div class="edit-img">
        <div class="img-btns">
            <form class="publish-form" method="POST" 
            enctype="multipart/form-data">
                <label for="imgFile">Upload Photo</label>
                <input type="file" id="imgFile" @input="previewImg"/>
            </form>
            <i class="fas fa-camera"></i>
        </div>
        <img :src="value">
    </div>
</template>

<script>
export default {
    props: {
        value: String
    },

    methods: {
        previewImg(ev) {
            const imgPath = ev.target.files[0]
            if (imgPath) {
                const uploadedPic = URL.createObjectURL(imgPath)
                if (uploadedPic) this.$emit('input', uploadedPic)
                // cloudinaryService.uploadImg(ev.target.parentElement)
            }
        }
    }
}
</script>

<style>

</style>
