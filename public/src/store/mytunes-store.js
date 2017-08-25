import vue from 'vue'
import vuex from 'vuex'
import $ from 'jquery'

vue.use(vuex)

var store = new vuex.Store({
  state: {
    myTunes: [],
    playlists: [],
    currentPlaylist: {},
    currentList: false,
    results: [],
    user: {},
    loggedIn: false,
  },
  mutations: {
    setResults(state, data) {
      state.results = data.results
      console.log(data.results[0])
    },
    getMyTunes(state, data) {
      state.playlists = data
      console.log(state.playlists)
    },
    login(state, user) {
      state.user = user.data
      state.loggedIn = true
    },
    logout(state) {
      state.user = {}
      state.loggedIn = false
    },
    addPlaylist(state, payload) {
      state.playlists.push(payload)
      console.log(state.playlists)
    },
    setCurrentPlaylist(state, payload) {
      state.currentPlaylist = payload
      state.currentList = true
    }
  },
  actions: {
    getMusicByArtist({ commit, dispatch }, artist) {
      var url = '//bcw-getter.herokuapp.com/?url=';
      var url2 = 'https://itunes.apple.com/search?term=' + artist;
      var apiUrl = url + encodeURIComponent(url2);
      $.get(apiUrl).then(data => {
        commit('setResults', JSON.parse(data))
      })
    },
    getMyTunes({ commit, dispatch }, id) {
      //this should send a get request to your server to return the list of saved tunes
      $.get('//localhost:3000/api/playlists/playlist/' + id).then((data) => {
        commit('getMyTunes', data)
      })
    },
    addToMyTunes({ commit, dispatch }, track) {
      //this will post to your server adding a new track to your tunes
      $.post('//localhost:3000/api/songs', track).then(
        getMyTunes()
      )
    },
    removeTrack({ commit, dispatch }, track) {
      //Removes track from the database with delete
    },
    promoteTrack({ commit, dispatch }, track) {
      //this should increase the position / upvotes and downvotes on the track
    },
    demoteTrack({ commit, dispatch }, track) {
      //this should decrease the position / upvotes and downvotes on the track
    },
    addPlaylist({ commit, dispatch }, payload) {
      $.post('//localhost:3000/api/playlists', payload).then((playlist) => {
        commit('addPlaylist', playlist)
      })
    },
    setCurrentPlaylist({ commit, dispatch }, payload) {
      $.get('//localhost:3000/api/playlists/' + payload).then(playlist => {
        commit('setCurrentPlaylist', playlist)
      })
    },
    signup({ commit, dispatch }, user) {
      $.post('//localhost:3000/register', user).then((user) => {
        commit('login', user)
      })
    },
    login({ commit, dispatch }, user) {
      $.post('//localhost:3000/login', user).then((user) => {
        commit('login', user)
      })
    },
    logout({ commit, dispatch }) {
      $.ajax({
        contentType: 'application/json',
        method: 'DELETE',
        url: '//localhost:3000/logout'

      })
        .then(commit('logout'))
      //.fail(logError)

    }

  }
})

export default store
