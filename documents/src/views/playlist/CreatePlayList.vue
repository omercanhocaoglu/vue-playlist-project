<template>
    <div>
        <div class="container">
            <div class="col-md-6 offset-md-3 mt-5">
                <form @submit.prevent="handleSubmit">
                    <h3 class=""> Create a Playlist </h3>
                    <div class="mb-3 mt-2">
                        <input type="text" required class="form-control" placeholder="Playlist Title" v-model="title">
                    </div>
                    <div class="mb-3">
                        <textarea class="form-control" rows="3" placeholder="Playlist Description" v-model="description"></textarea>
                    </div>
                    <label for="inputGroupFileAddon03" class="fw-bold">Upload a photo for playlist cover image</label>
                    <div class="input-group mb-3 mt-2">
                        <input type="file" @change="handleChange" class="form-control" id="inputGroupFile03" aria-describedby="inputGroupFileAddon03" aria-label="Upload">
                    </div>
                    <button class="btn btn-primary"> Create </button>
                    <p v-if="fileError" class="text-danger fw-bold"> {{ fileError }} </p>
                    <div v-if="isPending" role="status" class="text-center">
                        <p class="spinner-border text-primary mt-3"></p>
                        <p class="fw-bold">Loading..</p>
                    </div>
                    <!-- this place for alert message -->
                    <div v-if="alert" id="closeButton" class="alert alert-primary alert-dismissible fade show mt-1" role="alert">
                        <strong> Successful! </strong> Your playlist has been created.
                        <button type="button" @click="closeButton" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                    <p class="mt-2" v-if="goToPlaylists">
                        <router-link :to="{name:`home` }" class="text-decoration-none fw-bold">
                                click here for go to playlists page
                        </router-link>
                    </p>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import useStorage from "../../composables/useStorage";
import useCollection from '@/composables/useCollection';
import getUser from '@/composables/getUser';
import { timestamp } from '@/firebase/config';

    export default {
        setup (props) {
            const title = ref("");
            const description = ref("");
            const file = ref(null);
            const fileError = ref(null);
            const types = ["image/jpeg", "image/png"];
            const { filePath, url, uploadImage } = useStorage();
            const { error, addDoc } = useCollection("playlists");
            const { user } = getUser();
            const isPending = ref(false);
            const alert = ref(false);
            const goToPlaylists = ref(false);

            const handleSubmit = async () => {
                if (file.value) {
                    isPending.value = true;
                    await uploadImage(file.value);
                    const res = await addDoc( {
                        title: title.value,
                        description: description.value,
                        userID: user.value.uid,
                        userName: user.value.displayName,
                        coverURL: url.value,
                        filePath: filePath.value,
                        songs: [],
                        createdAt: timestamp(),
                    } );
                    if (!error.value) {
                        isPending.value = false;
                        // console.log("playlist has been created!");
                        alert.value = true;
                        goToPlaylists.value = true;
                    }
                    // console.log("image uploaded url:", url.value );
                }
                title.value = "";
                description.value = "";
            };
            const handleChange = (e) => {
                const selected = e.target.files[0];
                if ( selected && types.includes( selected.type ) ) {
                    file.value = selected;
                    fileError.value = null;
                } else {
                    file.value = null;
                    fileError.value = "Please select a proper photo!(jpeg or png)";
                }
            };
            const closeButton = () => {
                let dom = document.querySelector("#closeButton");
                dom.addEventListener("click", () => {
                    dom.remove();
                });
            };

            return { title, description, handleSubmit, handleChange, fileError, isPending, closeButton, alert, goToPlaylists, user }
        }
    }
</script>

<style scoped>

</style>