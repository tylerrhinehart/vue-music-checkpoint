var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.ObjectId

var songSchema = new mongoose.Schema({
    trackName: { type: String, required: true},
    artistName: { type: String, required: true },
    collectionName: { type: String},
    previewUrl: {type: String, required: true},
    playlistPosition: {type: Number},
    userId: { type: ObjectId, ref: 'User', required: true},
    playlistId: { type: ObjectId, ref: 'Playlist', required: true}
})

var Song = mongoose.model("Song", songSchema)

module.exports = Song