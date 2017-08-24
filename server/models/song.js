var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.ObjectId

var songSchema = new mongoose.Schema({
    title: { type: String, required: true},
    Artist: { type: String, required: true },
    Album: { type: String},
    Url: {type: String, required: true},
    userId: { type: ObjectId, ref: 'User', required: true},
    playlistId: { type: ObjectId, ref: 'Playlist', required: true}
})

var Song = mongoose.model("Song", songSchema)

module.exports = Song