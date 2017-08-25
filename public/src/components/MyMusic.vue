<template>
    <div id="my-music">
        <h4>My Music</h4>
        <div v-show="!currentList">
            <ul v-for="playlist in playlists">
                <li @click="setCurrentPlaylist(playlist._id)">{{playlist.title}}</li>
            </ul>
        </div>
        <div v-show="currentList">
            <h4>{{currentPlaylist.title}}</h4>
            <ul v-for="song in currentPlaylist.songs">
                <li>{{song.trackName}}</li>
            </ul>
        </div>
        <input type="text" placeholder="Playlist Name" v-model="playlistName">
        <button type="button" @click="addPlaylist">Add Playlist</button>
        <button type="button" @click="showPlaylists">Show All Playlists</button>
    </div>
</template>


<script>
    export default {
        name: 'myMusic',
        data() {
            return {
                playlistName: ''
            }
        },
        methods: {
            addPlaylist() {
                var playlist = {
                    title: this.playlistName,
                    userId: this.$store.state.user._id
                }

                this.$store.dispatch('addPlaylist', playlist)
                this.playlistName = ''
            },
            setCurrentPlaylist(id) {
                this.$store.dispatch('setCurrentPlaylist', id)
            },
            showPlaylists() {
                this.$store.dispatch('showPlaylists')
            }
        },
        computed: {
            playlists() {
                return this.$store.state.playlists
            },
            currentPlaylist() {
                return this.$store.state.currentPlaylist
            },
            currentList() {
                return this.$store.state.currentList
            }
        }
    }

</script>

<style>
    #my-music {
        border: 2px, solid, black;
    }
</style>