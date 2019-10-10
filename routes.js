const express = require('express');

const router = express.Router();

router.get('/reservations/:id', (req, res) => {
    knex.select().from('reservation').where('id', req.params.id)
    .then(( reservations) => {
        res.status(200).json({reservations});
    }).catch((err) => {
        res.status(404).json({err});
    })
})

router.post('/reservations', (res, req) => {
    knex('reservation').insert({
        table_id: req.body.table_id,
        reservation_start: req.body.reservation_start,
        reservation_end: req.body.reservation_end,
        number_of_guests: req.body.number_of_guests
    }).then(() => {
        knex.select()
        .from('reservation')
        .then((reservations) => {
            res.status(201).json({reservations});
        })
    }).catch((err) => {
        res.status(404).json({err});
    })
})

router.put('/reservations/:id', (res, req) => {
    knex('reservation').where(id, req.params.id)
    .update({
        table_id: req.body.table_id,
        reservation_start: req.body.reservation_start,
        reservation_end: req.body.reservation_end,
        number_of_guests: req.body.number_of_guests
    }).then( () => {
        knex.select()
        .from('reservation')
        .then((reservations) => {
            res.status(200).json({reservations});
        })
    }).catch((err) => {
        res.status(404).json({err});
    })
})

router.delete('/reservations/:id', (res, req) => {
    knex('reservation').where(id, req.params.id)
    .del()
    .then( () => {
        knex.select()
        .from('reservation')
        .then((reservations) => {
            res.json({reservations});
        })
    }).catch((err) => {
        res.status(404).json({err})
    })
})

module.exports = router;