<template>
  <div class="results">
    <!-- YOU WILL PROBABLY END UP WITH SOMETHING LIKE THIS -->
    <!-- <my-tunes class="my-tunes"></my-tunes> -->
    <!-- <itunes class="itunes"></itunes> -->
    <div class="row">
      <!-- <draggable> -->
      <div class="col-xs-12 col-md-4" v-for="song in songs">
        <div class="card thumbnail overflow">
          <img :src='song.artworkUrl100' alt="albumArt">
          <div class="card-body">
            <h4 class="title">{{song.trackName}}</h4>
            <h4>{{song.artistName}}</h4>
            <h5>{{song.collectionName}}</h5>
            <p>${{song.collectionPrice}}</p>
            <!-- <audio controls class="audio-controls">
                <source :src="song.previewUrl" type="audio/mp4" />
              </audio> -->
            <md-button @click="playSong(song.previewUrl)" class="md-icon-button md-list-action">
              <md-icon>play_arrow</md-icon>
            </md-button>
            <md-button @click="addToMyTunes(song)" class="md-icon-button md-list-action">
              <md-icon>playlist_add</md-icon>
            </md-button>
            <!-- <i class="material-icons" @click="playSong(song.previewUrl)">play_arrow</i> -->
            <!-- <i class="material-icons" @click="addToMyTunes(song)">playlist_add</i> -->
          </div>
        </div>
      </div>
      <!-- </draggable> -->
    </div>
    <!-- <md-bottom-bar id="player">
      <audio ref="player" controls class="audio-controls">
        <source src="song" type="audio/mp4" />
      </audio>

    </md-bottom-bar> -->
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  export default {
    name: 'results',
    data() {
      return {
        song: ''
      }
    },
    methods: {
      addToMyTunes(song) {
        var song = {
          trackName: song.trackName,
          artistName: song.artistName,
          collectionName: song.collectionName,
          previewUrl: song.previewUrl,
          userId: this.$store.state.user._id,
          playlistId: this.$store.state.currentPlaylist._id
        }
        var playlist = this.$store.state.currentPlaylist
        playlist.songs.push(song)
        this.$store.dispatch('addToMyTunes', playlist)
      },
      playSong(song) {
        this.$store.dispatch('playSong', song)
        // this.song = song
        // this.$refs.player.src = this.song
        // this.$refs.player.load()
        // this.$refs.player.play()
      }
    },
    computed: {
      songs() {
        return this.$store.state.results
      }
    },
    components: {
      draggable
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

  .card {
    background-image: url("https://images.pexels.com/photos/41498/pexels-photo-41498.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb");
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
  }

  #songs {
    margin-top: 10vh;
    margin-left: 10vw;
    margin-right: 10vw;
  }

  img {
    max-width: 50%;
    max-height: 50%;
  }
</style>