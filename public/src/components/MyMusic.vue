<template>
    <div id="my-music">
        <!-- <h4>My Music</h4>
        <div v-show="!currentList" class="list-group">
            <ul v-for="playlist in playlists">
                <li class="list-group-item" @click="setCurrentPlaylist(playlist._id)">{{playlist.title}}</li>
                <i @click="removePlaylist(playlist._id)" class="material-icons">remove_circle</i>
            </ul>
        </div>
        <div v-show="currentList">
            <h4>{{playlist.title}}</h4>

            <draggable class="list-group" v-model="playlist.songs" @end="saveOrder">
                <ul v-for="song in currentPlaylist.songs">
                    <li class="list-group-item">{{song.trackName}} <i class="material-icons" @click="playSong(song.previewUrl)">play_arrow</i><i @click="removeSong(song.trackName)"
                            class="material-icons">remove_circle</i></li>
                </ul>
            </draggable>
        </div>
        <input type="text" placeholder="Playlist Name" v-model="playlistName">
        <button type="button" @click="addPlaylist">Add Playlist</button>
        <button type="button" @click="showPlaylists">Show All Playlists</button> -->
        <div id="side-bar">
            <md-toolbar>
                <h2 class="md-title">My Playlists</h2>
            </md-toolbar>
            <!-- <div class="list-group">
                <ul v-for="playlist in playlists">
                    <li class="list-group-item" @click="setCurrentPlaylist(playlist._id)">{{playlist.title}}</li>
                    <i @click="removePlaylist(playlist._id)" class="material-icons">remove_circle</i>
                </ul>
            </div> -->
            <md-list v-for="playlist in playlists">
                <md-list-item @click="setCurrentPlaylist(playlist._id)">
                    <md-button @click="removePlaylist(playlist._id)" class="md-icon-button md-list-action">
                        <md-icon>remove_circle</md-icon>
                    </md-button>
                    <span>{{playlist.title}}</span>
                </md-list-item>
            </md-list>
            <input type="text" placeholder="Playlist Name" v-model="playlistName">
            <button type="button" @click="addPlaylist">Add Playlist</button>

            <md-sidenav class="md-right" ref="rightSidenav" @open="open('Right')" @close="close('Right')">
                <md-toolbar>
                    <div class="md-toolbar-container">
                        <h3 class="md-title">{{playlist.title}}</h3>
                    </div>
                </md-toolbar>
                <draggable class="list-group" v-model="playlist.songs" @end="saveOrder">
                    <md-list v-for="song in currentPlaylist.songs">
                        <md-list-item>
                            <md-button @click="playSong(song.previewUrl)" class="md-icon-button md-list-action">
                                <md-icon>play_arrow</md-icon>
                            </md-button>
                            <md-button @click="removeSong(song.trackName)" class="md-icon-button md-list-action">
                                <md-icon>remove_circle</md-icon>
                            </md-button>
                            <span>{{song.trackName}}</span>
                        </md-list-item>
                    </md-list>
                    <!-- <ul v-for="song in currentPlaylist.songs">
                        <li class="list-group-item">{{song.trackName}} <i class="material-icons" @click="playSong(song.previewUrl)">play_arrow</i>
                            <i @click="removeSong(song.trackName)" class="material-icons">remove_circle</i>
                        </li>
                    </ul> -->
                </draggable>
                <md-button class="md-raised md-accent" @click="closeRightSidenav">Close</md-button>
            </md-sidenav>
        </div>
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
                this.toggleRightSidenav()
            },
            showPlaylists() {
                this.$store.dispatch('showPlaylists')
            },
            saveOrder() {
                this.$store.dispatch('saveOrder', this.playlist)
            },
            playSong(song) {
                this.$store.dispatch('playSong', song)
            },
            removeSong(songToRemove) {
                this.playlist.songs.forEach((song) => {
                    if (song.trackName == songToRemove) {
                        this.playlist.songs.splice(this.playlist.songs.indexOf(song), 1)
                        this.saveOrder()
                    } else {
                        return
                    }
                })
            },
            removePlaylist(id) {
                this.$store.dispatch('removePlaylist', id)
            },
            toggleLeftSidenav() {
                this.$refs.leftSidenav.toggle();
            },
            toggleRightSidenav() {
                this.$refs.rightSidenav.toggle();
            },
            closeRightSidenav() {
                this.$refs.rightSidenav.close();
            },
            open(ref) {
            },
            close(ref) {
            }
        },
        computed: {
            playlists() {
                return this.$store.state.playlists
            },
            currentPlaylist() {
                this.playlist = this.$store.state.currentPlaylist
                return this.$store.state.currentPlaylist
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
    #side-bar {
        border: 2px, solid, black;
        max-height: 40vh;
        overflow-y: auto;
    }
</style>