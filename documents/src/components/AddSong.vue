<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-lg-12 mt-5">
                    <p v-if="!showForm" @click="showForm = true" class="text-primary pb-2 mb-4 border-bottom border-primary mt-1 userNone"> 
                        Add Song 
                    </p>
                    
                    <form @submit.prevent="handleSubmit">
                        <div v-if="showForm" class="card border-primary mb-3 mt-1">
                            <div class="card-header text-primary"> Add a New Song </div>
                            <div class="card-body text-primary">
                                <h5 class="card-title"> 
                                <input v-model="songTitle" type="text" class="col-8 p-1 border border-primary rounded-3" placeholder="Song Title">
                                </h5>
                                <p class="card-text"> 
                                <input v-model="artist" class="col-8 p-1 border border-primary rounded-3" placeholder="Artist" type="text"> 
                                </p>
                                <button class="btn btn-outline-primary">Add</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import useDocument from '@/composables/useDocument';
import getUser from '@/composables/getUser';
export default {
    props: [
        "playlist"
    ],
    setup (props) {
        const artist = ref("");
        const songTitle = ref("");
        const showForm = ref(false);
        const { updateDoc } = useDocument("playlists", props.playlist.id);
        const { user } = getUser();
        
        const handleSubmit = async () => {
            const newSong = {
                title: songTitle.value,
                artist: artist.value,
                id: Math.floor( Math.random() * 1000000 )
            };
            // console.log(newSong);
            await updateDoc({
                songs: [...props.playlist.songs, newSong],
            });
            artist.value = "";
            songTitle.value = "";
        };
        
        return { artist, songTitle, showForm, handleSubmit }
    }
}
</script>

<style scoped>
.userNone {
    user-select: none;
    cursor: pointer;
}
</style>