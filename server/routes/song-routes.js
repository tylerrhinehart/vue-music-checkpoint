var express = require('express')
var router = express.Router()
var songs = require('../models/song')

//Standard routes get/push/put/delete 
router
    .get('/', (req, res, next) => {
        songs.find({})
            .then(songs => {
                res.send(songs)
            })
            .catch(next)
    })


    .post('/', (req, res, next) => {
        songs.create(req.body)
            .then(song => {
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
