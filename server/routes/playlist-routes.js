var express = require('express')
var router = express.Router()
var playlists = require('../models/playlist')

//Standard routes get/push/put/delete 
router
    .get('/', (req, res, next) => {
        playlists.find({})
            .then(playlists => {
                res.send(playlists)
            })
            .catch(next)
    })


    .post('/', (req, res, next) => {
        playlists.create(req.body)
            .then(playlist => {
                res.send("Success")
            }).catch(next)
    })

// ERROR HANDLER
router.use('/', (err, req, res, next) => {
    if (err) {
        res.send(418, {
            success: false,
            error: err.message
        })
    } else {
        res.send(400, {
            success: false,
            error: 'Something failed please try again later'
        })
    }
})

module.exports = router
