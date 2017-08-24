<template>
  <div class="results">
    <!-- YOU WILL PROBABLY END UP WITH SOMETHING LIKE THIS -->
    <!-- <my-tunes class="my-tunes"></my-tunes> -->
    <!-- <itunes class="itunes"></itunes> -->
    <div class="row">
      <div class="col-xs-8 col-xs-offset-2 col-sm-3" v-for="song in songs">
        <div class="card thumbnail overflow">
          <img :src='song.artworkUrl100' alt="albumArt">
          <div class="card-body">
            <h4 class="title">{{song.trackName}}</h4>
            <h4>{{song.artistName}}</h4>
            <h5>{{song.collectionName}}</h5>
            <p>${{song.collectionPrice}}</p>
            <audio controls class="audio-controls" id="${id}">
              <source :src="song.previewUrl" type="audio/mp4" />
            </audio>
            <button type="button" class="btn btn-primary" @click="addToMyTunes(song)"></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'results',
    data() {
      return {

      }
    },
    methods: {
      addToMyTunes(song) {
        this.$store.dispatch('addToMyTunes', song)
      }
    },
    computed: {
      songs() {
        return this.$store.state.results
      }
    }
  }

</script>


<style>
  /* .my-tunes{
  display: inline-block;
  min-height: 500px;
  min-width: 50%;
  background: green;
}

.itunes{
  display: inline-block;
  background: red;
  min-height: 500px;
  min-width: 45%;
} */
</style>