<template>
  <div class="results">
    <div class="row">
      <!-- <draggable> -->
      <div class="col-xs-12 col-md-4" v-for="(song, i) in songs" :key="i">
        <div class="card thumbnail overflow">
          <img :src='song.artworkUrl100' alt="albumArt">
          <div class="card-body">
            <h4 class="title">{{song.trackName}}</h4>
            <h4 class="artist">{{song.artistName}}</h4>
            <h5 class="collection-name">{{song.collectionName}}</h5>
            <p>${{song.collectionPrice}}</p>
            <md-button @click="playSong(song.previewUrl)" class="md-icon-button md-list-action">
              <md-icon>play_arrow</md-icon>
            </md-button>
            <md-button @click="addToMyTunes(song)" class="md-icon-button md-list-action">
              <md-icon>playlist_add</md-icon>
            </md-button>
          </div>
        </div>
      </div>
      <!-- </draggable> -->
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "results",
  data() {
    return {
      song: ""
    };
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
      };
      var playlist = this.$store.state.currentPlaylist;
      playlist.songs.push(song);
      this.$store.dispatch("addToMyTunes", playlist);
    },
    playSong(song) {
      this.$store.dispatch("playSong", song);
    }
  },
  computed: {
    songs() {
      return this.$store.state.results;
    }
  },
  components: {
    draggable
  }
};
</script>


<style>
.results {
  margin-bottom: 4rem;
}
.card {
  background-image: url("https://images.pexels.com/photos/41498/pexels-photo-41498.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  height: 30rem;
}

.artist {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.collection-name {
  width: 90%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-left: auto;
  margin-right: auto;
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