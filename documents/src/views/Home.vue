<template>
<div>
  <div class="container">
    <div class="col-md-8 mt-5 offset-md-2">
      <p v-if="error" class="text-danger fw-bold"> {{ error }} </p>
      <h2 v-if="documents"> Playlists </h2>
      <div v-if="documents"> 
        <ListView :playlists="documents" />
        <div v-if="documents.length == 0" class="text-center mt-3">
          <p> There is no playlist </p>
          <p> <router-link :to="{name: `createplaylist`}" class="text-decoration-none fw-bold"> click here for create new playlist </router-link> </p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import getCollection from '@/composables/getCollection';
import ListView from '@/components/ListView.vue';

  export default {
    name: 'home',
    components: {
      ListView
    },
    setup () {
      const {error, documents} = getCollection("playlists");

      return { error, documents }
    }
  }
</script>
