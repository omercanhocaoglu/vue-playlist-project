<template>
    <div>
        <div class="container">
            <div class="col-md-6 text-center offset-md-3 border border-2 rounded border-primary shadow py-2 mt-5">
                <form @submit.prevent="handleSubmit">
                    <h3 class="py-1"> Sign up </h3>
                    <input class="input py-1" type="email" placeholder="E-Mail" v-model="email"> <br>
                    <input class="input py-1 mt-1" type="text" placeholder="User Name" v-model="displayName"> <br>
                    <input class="input py-1 mt-1" type="password" placeholder="Password" v-model="password"> <br>
                    <button class="btn btn-primary py-1 mt-1"> Sign Up </button>
                    <p v-if="error" class="text-danger fw-bold mt-1"> {{ error }} </p> <br>
                    <div v-if="isPending" role="status">
                        <p class="spinner-border text-primary mt-1"></p>
                        <p class="fw-bold">Loading..</p>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import useSignUp from '@/composables/useSignUp';
import { ref } from 'vue';
    
export default {
    setup () {
        const { error, signUp, isPending } = useSignUp();
        const displayName = ref("");
        const email = ref("");
        const password = ref("");
        const handleSubmit = async () => {
            const res = await signUp(email.value, password.value, displayName.value);
            if (!error.value) {
                // console.log("sign up!");
                email.value = ""; 
                displayName.value = ""; 
                password.value = ""; 
            };
        }

        return { error, displayName, email, password, handleSubmit, isPending }
    }       
}
</script>

<style scoped>

</style>