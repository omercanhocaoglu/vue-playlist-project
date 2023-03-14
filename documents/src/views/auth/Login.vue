<template>
    <div>
        <div class="container">
            <div class="col-md-6 text-center offset-md-3 border border-2 rounded border-primary shadow py-2 mt-5">
                <form @submit.prevent="handleSubmit">
                    <h3 class="py-1"> Log In </h3>
                    <input class="input py-1" type="email" placeholder="E-Mail" v-model="email"> <br>
                    <input class="input py-1 mt-1" type="password" placeholder="Password" v-model="password"> <br>
                    <button class="btn btn-primary py-1 mt-1"> Log In </button>
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
import useLogIn from '@/composables/useLogIn';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
    export default {
        setup () {
            const {error, logIn, isPending} = useLogIn();
            const email = ref("");
            const password = ref("");
            const router = useRouter();
            const handleSubmit = async () => {
                const res = await logIn( email.value, password.value );
                if (!error.value) {
                    // console.log("user logged in!");
                    email.value = "";
                    password.value = "";
                    router.push({name: "home"})
                }
            };

            return { error, email, password, isPending, handleSubmit }
        },
    }
</script>

<style scoped>

</style>