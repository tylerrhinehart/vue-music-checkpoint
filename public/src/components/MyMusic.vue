<template>
    <div id="my-music">
        <div id="side-bar">
            <md-toolbar>
                <h2 class="md-title">My Playlists</h2>
            </md-toolbar>
            <md-list id="list" v-for="(playlist, i) in playlists" :key="i">
                <md-list-item @click="setCurrentPlaylist(playlist._id)">
                    <md-button @click="removePlaylist(playlist._id)" class="md-icon-button md-list-action">
                        <md-icon>remove_circle</md-icon>
                    </md-button>
                    <span>{{playlist.title}}</span>
                </md-list-item>
            </md-list>
            <form novalidate @submit.stop.prevent="addPlaylist">
                <md-input-container>
                    <label>Playlist Name</label>
                    <md-input v-model="playlistName"></md-input>
                </md-input-container>
                <md-button class="md-raised md-primary">Add Playlist</md-button>
            </form>

            <md-sidenav class="md-right" ref="rightSidenav" @open="open('Right')" @close="close('Right')">
                <md-toolbar>
                    <div class="md-toolbar-container">
                        <h3 class="md-title">{{playlist.title}}</h3>
                    </div>
                </md-toolbar>
                <draggable class="list-group" v-model="playlist.songs" @end="saveOrder">
                    <md-list v-for="(song, i) in currentPlaylist.songs" :key="i">
                        <md-list-item>
                            <md-button @click="playSong(song.previewUrl)" class="md-icon-button md-list-action playlist-play">
                                <md-icon>play_arrow</md-icon>
                            </md-button>
                            <md-button @click="removeSong(song.trackName)" class="md-icon-button md-list-action">
                                <md-icon>remove_circle</md-icon>
                            </md-button>
                            <span>{{song.trackName}}</span>
                        </md-list-item>
                    </md-list>
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
    #my-music {
        height: 60vh;
    }

    .playlist-play {
        margin-right: 0;
    }
</style>