var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.ObjectId

var playlistSchema = new mongoose.Schema({
    title: { type: String, required: true},
    songs: { type: Array },
    userId: { type: ObjectId, ref: 'User', required: true}
})

var Playlist = mongoose.model("Playlist", playlistSchema)

module.exports = Playlist