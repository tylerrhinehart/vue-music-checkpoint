<template>
    <div id="my-music">
        <h4>My Music</h4>
        <div v-show="!currentList">
            <ul v-for="playlist in playlists">
                <li @click="setCurrentPlaylist(playlist._id)">{{playlist.title}}</li>
            </ul>
        </div>
        <div v-show="currentList">
            <h4>{{playlist.title}}</h4>

            <draggable class="list-group" v-model="playlist.songs">
                <ul v-for="song in playlist.songs">
                    <li class="list-group-item">{{song.trackName}}</li>
                </ul>
            </draggable>
        </div>
        <input type="text" placeholder="Playlist Name" v-model="playlistName">
        <button type="button" @click="addPlaylist">Add Playlist</button>
        <button type="button" @click="showPlaylists">Show All Playlists</button>
        <button type="button" @click="saveOrder">Save Order Change</button>

    </div>
</template>


<script>
    import draggable from 'vuedraggable'
    export default {

        name: 'myMusic',
        data() {
            return {
                playlistName: '',
                playlist: {}
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
            },
            saveOrder() {
                this.$store.dispatch('saveOrder', this.playlist)
            }
        },
        computed: {
            playlists() {
                return this.$store.state.playlists
            },
            currentPlaylist() {
                this.playlist = this.$store.state.currentPlaylist
            },
            // currentPlaylist: {
            //     get() {
            //         return this.$store.state.currentPlaylist
            //     },
            //     set(value) {
            //         console.log(value)
            //         this.$store.dispatch('setCurrentPlaylistSongs', value)
            //     }
            // },
            currentList() {
                return this.$store.state.currentList
            }
        },
        components: {
            draggable
        }
    }

</script>

<style>
    #my-music {
        border: 2px, solid, black;
    }
</style>