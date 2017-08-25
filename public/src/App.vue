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
          <div class="col-xs-12">
            <form class="form-inline">
              <div class="form-group">
                <input v-model="query" type="text" class="form-control" placeholder="Search for Music" />
                <button type="button" class="btn btn-primary" @click="getMusic">Get Music</button>
                <button v-show="loggedIn" type="button" class="btn btn-primary" @click="getMyTunes">Show My Music</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="row">
        <div v-if="showMyMusic" class="col-xs-9">
          <results></results>
        </div>
        <div v-else class="col-xs-12">
          <results></results>
        </div>
        <div v-if="loggedIn" class="col-xs-3">
          <div>
            <MyMusic></MyMusic>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import Results from './components/Results'
  import MyMusic from './components/MyMusic'
  import Navbar from './components/Navbar'

  export default {
    name: 'app',
    data() {
      return {
        query: '',
        showMyMusic: false
      }
    },
    components: {
      Results,
      MyMusic,
      Navbar
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
        return this.$store.state.loggedIn
      }
    }
  }

</script>

<style>
  #app {
    text-align: center;
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
</style>