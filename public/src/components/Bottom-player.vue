<template>
    <audio ref="player" id="audio" controls class="audio-controls" v-if="currentSong">
        <source :src="currentSong" type="audio/mp4" />
    </audio>
</template>

<script>
export default {
  name: "player",
  // props: ['song'],
  data() {
    return {
      song: ""
    };
  },
  computed: {
    currentSong() {
      this.song = this.$store.state.currentSong;
      return this.$store.state.currentSong;
    }
  },
  mounted: function() {
    this.$watch("song", function() {
      var player = this.$refs.player;
      player.src = this.currentSong;
      player.load();
      player.play();
    });
  }
};
</script>

<style>
audio {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}
</style>