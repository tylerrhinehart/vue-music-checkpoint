var express = require('express')
var router = express.Router()
var playlists = require('../models/playlist')

//Standard routes get/push/put/delete 
router
    .get('/playlist/:userId', (req, res, next) => {
        playlists.find({ userId: req.params.userId })
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

    .put('/:id', (req, res, next) => {
        playlists.findByIdAndUpdate(req.params.id, req.body)
            .then(playlist => {
                res.send({ message: 'successfully added song' })
            }).catch(next)
    })

    .post('/', (req, res, next) => {
        playlists.create(req.body)
            .then(playlist => {
                res.send(playlist)
            }).catch(next)
    })

    .delete('/:id', (req, res, next) => {
        playlists.findByIdAndRemove(req.params.id)
            .then(playlist => {
                res.send({ message: 'Successfully Removed' })
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
