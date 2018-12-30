<template>
    <nav>
        <router-link to="/" class="logo"><i class="fas fa-home"></i>
        munici<span>pal</span></router-link>
        <ul>
            <router-link to="/" exact tag="li">Home</router-link>
            <router-link to="/about" tag="li">About</router-link>
            <router-link to="/issue/edit" tag="li">Report</router-link>
            <router-link to="/user" tag="li" v-if="isUserLoggedin">
                Profile
            </router-link>
            <li @click="$emit('openLogin')">
                {{isUserLoggedin ? 'Logout' : 'Login'}}
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    props: {
        isUserLoggedin: Boolean
    },
}
</script>

<style>

</style>
