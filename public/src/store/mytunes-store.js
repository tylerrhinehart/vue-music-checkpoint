import vue from 'vue'
import vuex from 'vuex'
import $ from 'jquery'

var production = !window.location.host.includes('localhost')
var baseUrl = production ? '//music-checkpoint.herokuapp.com' : '//localhost:3000'

vue.use(vuex)

var store = new vuex.Store({
  state: {
    myTunes: [],
    playlists: [],
    currentPlaylist: {},
    currentList: false,
    currentSong: '',
    results: [],
    user: {},
    loggedIn: false,
  },
  mutations: {
    setResults(state, data) {
      state.results = data.results
    },
    getMyTunes(state, data) {
      state.playlists = data
    },
    login(state, user) {
      state.user = user.data
      state.loggedIn = true
    },
    logout(state) {
      state.user = {}
      state.loggedIn = false
      state.currentPlaylist = {}
      state.playlists = []
      state.currentList = false
    },
    addPlaylist(state, payload) {
      state.playlists.push(payload)
    },
    setCurrentPlaylist(state, payload) {
      state.currentPlaylist = payload
      state.currentList = true
    },
    showPlaylists(state) {
      state.currentList = false
      currentPlaylist = {}
    },
    playSong(state, payload) {
      state.currentSong = payload
      console.log(state.currentSong)
    },
    removePlaylist(state, payload) {
      state.playlists.forEach((playlist) => {
        if (playlist._id == payload) {
          state.playlists.splice(state.playlists.indexOf(playlist), 1)
        } else {
          return
        }
      })
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
      $.get(baseUrl + '/api/playlists/playlist/' + id).then((data) => {
        commit('getMyTunes', data)
      })
    },
    addToMyTunes({ commit, dispatch }, payload) {
      $.ajax({
        contentType: 'application/json',
        method: 'PUT',
        url: baseUrl + '/api/playlists/' + payload._id,
        data: JSON.stringify(payload)
      })
        .then(() => {
          commit('setCurrentPlaylist', payload)
        })
        .fail(() => logError())
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
    playSong({ commit, dispatch }, payload) {
      commit('playSong', payload)
    },
    addPlaylist({ commit, dispatch }, payload) {
      $.post(baseUrl + '/api/playlists', payload).then((playlist) => {
        commit('addPlaylist', playlist)
      })
    },
    setCurrentPlaylist({ commit, dispatch }, payload) {
      $.get(baseUrl + '/api/playlists/' + payload).then(playlist => {
        commit('setCurrentPlaylist', playlist)
      })
    },
    showPlaylists({ commit, dispatch }) {
      commit('showPlaylists')
    },
    saveOrder({ commit, dispatch }, payload) {
      $.ajax({
        contentType: 'application/json',
        method: 'PUT',
        url: baseUrl + '/api/playlists/' + payload._id,
        data: JSON.stringify(payload)
      })
        .then(() => {
          commit('setCurrentPlaylist', payload)
        })
        .fail(() => logError())
    },
    removePlaylist({ commit, dispatch }, payload) {
      $.ajax({
        contentType: 'application/json',
        method: 'DELETE',
        url: baseUrl + '/api/playlists/' + payload
      })
        .then(() => {
          commit('removePlaylist', payload)
        })
        .fail(() => logError())
    },
    signup({ commit, dispatch }, user) {
      $.post(baseUrl + '/register', user).then((user) => {
        commit('login', user)
      })
    },
    login({ commit, dispatch }, user) {
      $.post(baseUrl + '/login', user).then((user) => {
        commit('login', user);
        dispatch('getMyTunes', user.data._id);
      })
    },
    logout({ commit, dispatch }) {
      $.ajax({
        contentType: 'application/json',
        method: 'DELETE',
        url: baseUrl + '/logout'

      })
        .then(commit('logout'))
      //.fail(logError)

    },
    logError(err) {
      console.error('UMM SOMETHING BROKE: ', err)
    }
  }
})

export default store
