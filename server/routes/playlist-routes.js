var express = require('express')
var router = express.Router()
var playlists = require('../models/playlist')

//Standard routes get/push/put/delete 
router
    .get('/playlist/:userId', (req, res, next) => {
        playlists.findById(req.params.userId)
            .then(playlists => {
                res.send(playlists)
            })
            .catch(next)
    })

    .get('/:id', (req, res, next) => {
        playlists.findById(req.params.id)
            .then(playlist => {
                res.send(playlist)
            }).catch(next)
    })


    .post('/', (req, res, next) => {
        playlists.create(req.body)
            .then(playlist => {
                res.send(playlist)
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
