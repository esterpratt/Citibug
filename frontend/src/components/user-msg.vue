<template>
    <section v-if="msg" class="user-msg" :class="msgType">
        <button @click="closeMsg">
            <i class="fas fa-times"></i>
        </button>
        <p>{{msg.txt}}</p>
    </section>
</template>

<script>
import eventBus, {USR_MSG_DISPLAY} from '@/services/busService'

export default {    
    data(){
        return {
           msg: null
        }
    },
    created() {
        eventBus.$on(USR_MSG_DISPLAY, msg => {
            this.msg = msg;
            setTimeout(this.closeMsg, 3000);
        })
        
    },
    computed:{
        msgType() {
            return {
                    success: this.msg.type === 'success',
                    error: this.msg.type === 'fail'
                };
        }
    },
    methods:{
        closeMsg(){
            this.msg = null;
        }
    }
}
</script>

<style>

</style>