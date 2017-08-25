<template>
    <div id="my-music">
        <h4>My Music</h4>
        <ul v-show="!currentList" v-for="playlist in playlists">
            <li @click="setCurrentPlaylist(playlist._id)">{{playlist.title}}</li>
        </ul>
        <ul v-show="currentList" v-for="song in currentPlaylist.songs">
            <li>{{song.trackName}}</li>
        </ul>
        <input type="text" placeholder="Playlist Name" v-model="playlistName">
        <button type="button" @click="addPlaylist">Add Playlist</button>
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
            },
            setCurrentPlaylist(id) {
                this.$store.dispatch('setCurrentPlaylist', id)
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