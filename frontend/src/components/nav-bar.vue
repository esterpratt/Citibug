<template>
    <nav>
        <router-link to="/" class="logo">munici<span>pal</span></router-link>
        <ul>
            <router-link to="/" exact tag="li">Home</router-link>
            <router-link to="/about" tag="li">About</router-link>
            <router-link to="/issue/edit" tag="li">Report</router-link>
            <li @click="$emit('openLogin')">Login</li>
        </ul>
    </nav>
</template>

<script>
export default {

}
</script>

<style>

</style>
