<template>
    <div id="bottom-bar">
        <md-bottom-bar>
            <audio ref="player" id="audio" controls class="audio-controls">
                <source :src="currentSong" type="audio/mp4" />
            </audio>

        </md-bottom-bar>
    </div>
</template>

<script>
    export default {
        name: 'player',
        // props: ['song'],
        data() {
            return {
                song: ''
            }
        },
        computed: {
            currentSong() {
                this.song = this.$store.state.currentSong
                return this.$store.state.currentSong
            }
        },
        mounted: function () {
            this.$watch('song', function () {
                var player = this.$refs.player
                player.src = this.currentSong
                player.load()
                player.play()
            })
        }
        // watch: {
        //     song: function () {
        //         // var player = document.getElementById('audio')
        //         var player = this.$refs.player
        //         player.src = song
        //         player.load()
        //         player.play()
        //     }
        // }
    }

</script>

<style>
    #bottom-bar {
        position: fixed;
        bottom: 0px;
        right: 10px;
        left: 10px;
        height: 4vh;
    }
    audio {
        position: absolute;
        bottom: 18px;
    }
</style>