var express = require('express');
var app = express();
var server = require('http').createServer(app);
var mongoose = require("mongoose");
var sessions = require('./authentication/sessions')
var authRoutes = require('./authentication/auth-routes')
var dbConnect = require('./config/db/mlab-config');
var bodyParser = require('body-parser')
var expressSanitizer = require('express-sanitizer');
var port = process.env.PORT || 3000;
var cors = require('cors')
var playlists = require('./routes/playlist-routes')
var songs = require('./routes/song-routes')

app.use(cors())
app.options('*', cors())
app.use(sessions)
app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressSanitizer());

app.use('/', authRoutes)
app.use('/api/playlists', playlists)
app.use('/api/songs', songs)





server.listen(port, function () {
    console.log('Server listening at port %d', port);
});