import vue from 'vue'
import vuex from 'vuex'
import $ from 'jquery'

vue.use(vuex)

var store = new vuex.Store({
  state: {
    myTunes: [],
    results: [],
    showMyMusic: false
  },
  mutations: {
    setResults(state, data){
      state.results = data.results
      console.log(data.results[0])
    },
    // getMyTunes(state) {
    //   state.showMyMusic = true
    // }
  },
  actions: {
    getMusicByArtist({commit, dispatch}, artist) {
      var url = '//bcw-getter.herokuapp.com/?url=';
      var url2 = 'https://itunes.apple.com/search?term=' + artist;
      var apiUrl = url + encodeURIComponent(url2);
      $.get(apiUrl).then(data=>{
        commit('setResults', JSON.parse(data))
      })
    },
    getMyTunes({commit, dispatch}){
      //this should send a get request to your server to return the list of saved tunes
      // commit('getMyTunes')
    },
    addToMyTunes({commit, dispatch}, track){
      //this will post to your server adding a new track to your tunes
      $.post('//localhost:3000/api/playlists', track).then(
        getMyTunes()
      )
    },
    removeTrack({commit, dispatch}, track){
      //Removes track from the database with delete
    },
    promoteTrack({commit, dispatch}, track){
      //this should increase the position / upvotes and downvotes on the track
    },
    demoteTrack({commit, dispatch}, track){
      //this should decrease the position / upvotes and downvotes on the track
    }

  }
})

export default store
