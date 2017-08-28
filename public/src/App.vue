<template>
  <div id="app">
    <div class="container-fluid">
      <navbar></navbar>
      <div class="header">
        <div class="row">
          <div class="col-xs-12">
            <h1>Find Your Flavor</h1>
          </div>
        </div>
        <div class="row search-form">
          <div class="col-xs-12 col-md-6 col-md-offset-3">
            <!-- <form class="form-inline" @submit.prevent="getMusic">
              <div class="form-group">
                <input id="search-input" v-model="query" type="text" class="form-control" placeholder="Search for Music" />
                <button type="button" class="btn btn-primary">Get Music</button>
                <md-button class="md-raised md-primary">Search</md-button>
                <md-button class="md-raised md-primary" v-show="loggedIn" type="button" @click="getMyTunes">My Playlists</md-button>
                <button v-show="loggedIn" type="button" class="btn btn-primary" @click="getMyTunes">My Playlists</button>
              </div>
            </form> -->
            <form novalidate class="form-inline" @submit.stop.prevent="getMusic">
              <md-input-container>
                <label>Search for Music</label>
                <md-input id="search-input" v-model="query"></md-input>
              </md-input-container>
              <md-button type="submit" class="md-raised md-primary">Search</md-button>
              <md-button class="md-raised md-primary" v-show="loggedIn" type="button" @click="getMyTunes">My Playlists</md-button>
            </form>
          </div>
        </div>
      </div>
      <div class="row">
        <div v-if="showMyMusic" class="col-xs-6 col-md-9">
          <results></results>
        </div>
        <div v-else class="col-xs-12">
          <results></results>
        </div>
        <div v-show="showMyMusic" class="col-xs-6 col-md-3">
          <MyMusic></MyMusic>
        </div>
      </div>
      <player></player>
    </div>
  </div>
  </div>
</template>

<script>
  import Results from './components/Results'
  import MyMusic from './components/MyMusic'
  import Navbar from './components/Navbar'
  import Player from './components/Bottom-player'

  export default {
    name: 'app',
    data() {
      return {
        query: '',
        showMyMusic: false,
      }
    },
    components: {
      Results,
      MyMusic,
      Navbar,
      Player
    },
    methods: {
      getMusic() {
        this.$store.dispatch('getMusicByArtist', this.query)
        this.query = ''
      },
      getMyTunes() {
        this.$store.dispatch('getMyTunes', this.$store.state.user._id)
        this.showMyMusic = !this.showMyMusic
      }
    },
    computed: {
      loggedIn() {
        this.showMyMusic = this.$store.state.loggedIn
        return this.$store.state.loggedIn
      },
      currentSong() {
        return this.$store.state.currentSong
      }
    }
  }

</script>

<style>
  #app {
    text-align: center;
    overflow: hidden
  }

  h1 {
    font-size: 6rem;
  }

  .header {
    margin-top: 30vh;
    margin-bottom: 3vh;
  }

  body {
    background-image: url("https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb");
    background-position-x: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    text-align: center;
  }

  .overflow {
    width: 90%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-left: auto;
    margin-right: auto;
  }

  #search-input {
    background-color: rgba(200, 200, 200, 0.1);
    text-align: center;
    height: 5vh;
    font-size: 4rem;
  }
</style>