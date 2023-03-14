<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <p v-if="error" class="fw-bold text-dark"> {{ error }} </p>
                    <div v-if="playlist" class="mt-5">
                        <div class="card">
                            <img :src="playlist.coverURL" class="card-img-top img-fluid" style="max-height: 300px;" alt="...">
                            <div class="card-body">
                                <h5 class="card-title fs-4"> {{ playlist.title }} </h5>
                                <p class="card-text fs-5"> {{ playlist.description }} </p>
                                <p class="card-text fs-6"> created by <strong> {{ playlist.userName }} </strong> </p>
                                <button v-if="ownerShip" @click="handleDelete" class="btn btn-primary">Delete</button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-3 d-flex justify-content-between align-items-start border p-2 rounded-3"> Songs number 
                        <span class="badge bg-primary rounded-pill"> {{ playlist.songs.length }} </span> 
                    </div>
                    <p class="border-bottom mt-4 fw-bolder border-3 border-primary"> Playlist </p>
                    <p v-if="!playlist.songs.length"> No added song here </p>
                    
                    <div v-for="song in playlist.songs" :key="song.id"> 
                            <div class="d-flex text-capitalize"> 
                                <span class="fw-bolder fs-6"> {{ song.artist }}  </span> &nbsp; - 
                                {{ song.title }}
                                <span v-if="ownerShip" @click="handleClick(song.id)" 
                                class="badge text-dark rounded-pill ms-auto userNone text-lowercase">
                                    x 
                                </span>
                            </div> 
                    </div>
                </div>

                <div class="col-md-4" v-if="ownerShip">
                    <AddSong :playlist="playlist" /> 
                </div>

                <div class="col-md-4 offset-md-2" v-if="!ownerShip">
                    <p class="text-center text-danger fw-bolder fs-5">
                        You can only add song to your playlist!
                    </p>
                </div>
            </div>
        </div>  
    </div>
</template>

<script>
import getDocument from '@/composables/getDocument';
import getUser from '@/composables/getUser';
import useDocument from '@/composables/useDocument';
import useStorage from '@/composables/useStorage';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import AddSong from '@/components/AddSong.vue';

export default {
    props: [
        "id"
    ],

    components: {
        AddSong
    },

    setup (props) {
        const { user } = getUser();
        const { error, document:playlist } = getDocument("playlists", props.id);
        const { deleteDoc, updateDoc } = useDocument("playlists", props.id);
        const { deleteImage } = useStorage();
        const router = useRouter();

        const ownerShip = computed( () => {
            return playlist.value && user.value && user.value.uid === playlist.value.userID
        } );
        const handleDelete = async () => {
        await deleteImage(playlist.value.filePath);
        await deleteDoc();
        router.push({ name: "home" });
        };
        const handleClick = async (id) => {
            const songs = playlist.value.songs.filter( (song) => song.id != id );
            await updateDoc({ songs })
        };
        
        return { error, playlist, ownerShip, handleDelete, handleClick }
    }
}
</script>

<style scoped>
.userNone {
    user-select: none;
    cursor: pointer;
}
</style>