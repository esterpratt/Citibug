<template>
    <div class="join-modal">
        <h2>Would you like to login </br>and report your issue as a Pal?</h2>
        <p>Login will allow you to edit and get notifications about your issue</p>
        <div class="sure-btns">
            <button @click="$emit('saveIssue')">Report as guest</button>
            <button @click="$emit('openLogin')">Continue to login</button>
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style>

</style>
