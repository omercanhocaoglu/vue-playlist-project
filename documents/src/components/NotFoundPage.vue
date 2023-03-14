<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-6 offset-md-3">
                    <h3 class="text-center fw-bolder hover">
                        Page is not found!
                    </h3>
                    <p class="text-center">
                        <router-link class="text-decoration-none  hover" :to="{name: `home` }">
                            click here for go to home
                        </router-link>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
    export default {
        setup () {
            const router = useRouter();

        }
    }
</script>

<style scoped>
.hover:hover {
    font-weight: bold;
}
</style>