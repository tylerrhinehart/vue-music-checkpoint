<template>
  <div id="app">
    <div class="container-fluid">
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
                <button type="button" class="btn btn-primary" @click="getMyTunes">Show My Music</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <results></results>
      </div>
      <div v-if="showMyMusic">
        <MyMusic></MyMusic>
      </div>
    </div>
  </div>
</template>

<script>
  import Results from './components/Results'
  import MyMusic from './components/MyMusic'

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
      MyMusic
    },
    methods: {
      getMusic() {
        this.$store.dispatch('getMusicByArtist', this.query)
        this.query = ''
      },
      getMyTunes() {
        this.$store.dispatch('getMyTunes')
        this.showMyMusic = !this.showMyMusic
      }
    }
  }

</script>

<style>
#app {
  text-align: center;
}
</style>