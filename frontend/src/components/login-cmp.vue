<template>
    <div class="login-container">
        <div class="login">
            <h2>I am a returned PAL</h2>
            <form @submit.prevent="checkLogin">
                <p>Username *</p>
                <el-input type="text" 
                v-model="user.name" 
                placeholder="Name">
                </el-input>
                <p>Password *</p>
                <el-input type="password" 
                v-model="user.pass" 
                placeholder="Password">
                </el-input>
                <button>Log In</button>
            </form>
        </div>
        <div class="signup">
            <h2>I want to become a PAL</h2>
            <form @submit.prevent="signUp">
                <p>Username *</p>
                <el-input type="text" 
                v-model="newUser.name" 
                placeholder="Name">
                </el-input>
                <p>Password *</p>
                <el-input type="password" 
                v-model="newUser.pass" 
                placeholder="Password">
                </el-input>
                <p>Re-enter password *</p>
                <el-input type="password" 
                v-model="newUser.pass" 
                placeholder="Password">
                </el-input>
                <div class="emoji-picked">
                    <div>{{newUser.emoji}}</div>
                    <p>Pick your Palface</p>
                </div>
                <emoji-picker :value="newUser.emoji" 
                @input="newUser.emoji = $event">
                </emoji-picker>
                <button>Sign Up</button>
            </form>
        </div>
    </div>
</template>

<script>
import emojiPicker from './emoji-picker'
export default {
    props: {
        
    },

    components: {
        emojiPicker
    },

    data() {
        return {
            user: {
                name: '',
                pass: '',
            },

            newUser: {
                name: '',
                pass: '',
                pass2: '',
                emoji: '?',
            }
        }
    },

    methods: {
        checkLogin() {
            console.log('to login');
            
        },

        signUp() {
            console.log('to signup');
        }
    },
}
</script>

<style>

</style>
