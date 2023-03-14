<template>
    <div>
        <div class="container">
          <div class="row d-none d-md-block">
            <div class="col-sm-12">
                <nav class="nav d-flex mt-2 pb-2 mb-4 border-bottom border-primary border-2">
                <router-link :to="{name: `home`}" class="text-decoration-none"> 
                    <a class="nav-link active text-dark hover rounded" aria-current="page" href="#">
                        <i class="fa-solid fa-music fa-xl"></i>
                        <span class="ms-1">The PlayList App</span>
                    </a> 
                </router-link>
                <router-link v-if="user" :to="{name: `createplaylist`}" class="text-decoration-none" >
                     <a class="nav-link active text-dark hover rounded" aria-current="page" href="#"> Create Playlist </a> 
                </router-link>
                <router-link v-if="!user" :to="{name: `login`}" class="text-decoration-none" >
                     <a class="nav-link active text-dark hover rounded" aria-current="page" href="#"> Log In </a> 
                </router-link>
                <router-link v-if="!user" :to="{name: `signup`}" class="text-decoration-none rounded-pill" > 
                    <a class="nav-link active text-dark hover rounded" aria-current="page" href="#"> Sign Up </a> 
                </router-link>
                <span v-if="user" class="py-2 ms-auto userNone me-sm-5"> Hello! <strong> {{ user.displayName }} </strong> </span>
                <button v-if="user" @click="handleLogOut" class="btn btn-outline-primary ms-1"> Log Out </button>
            </nav>
            </div>
          </div>
          <!-- there is a place below only visible on sm -->
          <div class="row d-md-none">
            <div class="col-sm-12">
                <nav class="nav d-flex mt-2 pb-2 mb-4">
                <router-link :to="{name: `home`}" class="text-decoration-none"> 
                    <a class="nav-link active text-dark hover rounded" aria-current="page" href="#">
                        <i class="fa-solid fa-music fa-xl"></i>
                        <span class="ms-1">The PlayList App</span>
                    </a> 
                </router-link>
                <router-link v-if="user" :to="{name: `createplaylist`}" class="text-decoration-none" >
                     <a class="nav-link active text-dark hover rounded" aria-current="page" href="#"> Create Playlist </a> 
                </router-link>
                <router-link v-if="!user" :to="{name: `login`}" class="text-decoration-none" >
                     <a class="nav-link active text-dark hover rounded" aria-current="page" href="#"> Log In </a> 
                </router-link>
                <router-link v-if="!user" :to="{name: `signup`}" class="text-decoration-none rounded-pill" > 
                    <a class="nav-link active text-dark hover rounded" aria-current="page" href="#"> Sign Up </a> 
                </router-link>
            </nav>
            </div>

            <div class="col-sm-12 text-center">
                <span v-if="user" class="py-2 ms-auto userNone me-sm-5"> Hello! <strong> {{ user.displayName }} </strong> </span>
                <button v-if="user" @click="handleLogOut" class="btn btn-outline-primary ms-1"> Log Out </button>
            </div>
          </div>
        </div>      
    </div>
</template>


<script>
import useLogOut from '@/composables/useLogOut';
import getUser from '@/composables/getUser';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
    export default {
        setup () {
            const {error, logOut, isPending} = useLogOut();
            const { user } = getUser();
            const router = useRouter();
            const handleLogOut = async () => {
                await logOut();
                if (!error.value) {
                    // console.log("logged out!");
                    router.push({ name: "login" });
                }
            };

            return { handleLogOut, isPending, user };
        },
    };
</script>

<style scoped>
.hover:hover {
    background-color:  #0d6efd;
    font-weight: bold;
}

.userNone {
    user-select: none;
}
</style>
