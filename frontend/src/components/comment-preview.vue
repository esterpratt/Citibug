<template>
    <section class="comment-preview">
        <div class="user-img"></div>
        <div>
            <div>
                <p class="user-name">username</p>
                <p class="comment-time">{{comment.at | relative-time}}</p>
            </div>
            <p class="comment-txt">{{comment.txt}}</p>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        comment: Object
    }
}
</script>

<style>

</style>
