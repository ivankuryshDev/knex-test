const express = require('express');
const knex = require('./db/knex');
const router = express.Router();

router.get('/reservations/:id', (req, res) => {
    knex.select().from('reservation').where('id', req.params.id)
    .then((reservations) => {
        if(reservations.length === 0)
            res.status(404).json({err: 'Reservation not found'});
        else
            res.status(200).json({reservations});
    }).catch((err) => {
        res.status(400).json({err});
    })
})

router.post('/reservations', (req, res) => {
    let new_reservation_start = new Date(req.body.reservation_start);
    let new_reservation_end = new Date(req.body.reservation_end);

    knex.select()
        .from('reservation')
        .innerJoin('table', 'reservation.table_id', 'table.id')
        .where('table.capacity', '>=',req.body.number_of_guests)
        .where(function() {
            this
            .where(function() {
              this.where('reservation_start', '>=', new_reservation_start)
              .andWhere('reservation_start', '<=',new_reservation_end)
            })
            .orWhere(function() {
              this.where('reservation_start', '<=', new_reservation_start)
              .andWhere('reservation_start', '>=', new_reservation_start)
            })
        })
        .then((reservations) => {
            if(reservations.length !== 0)
                res.status(404).json({err: 'Reservation not found'});
        })     
        .then(() => {
            knex('reservation').insert({
                reservation_start: new_reservation_start,
                reservation_end: new_reservation_end,
                number_of_guests: req.body.number_of_guests
            }).then(() => {
                res.status(201).json({response: 'Reservation successfull created!'})
            })
        })
        
        .catch((err) => {
            res.status(400).json({err});
        })
})

router.put('/reservations/:id', (req, res) => {
    let new_reservation_start = new Date(req.body.reservation_start);
    let new_reservation_end = new Date(req.body.reservation_end);
    knex('reservation').where('id', req.params.id)
    .update({
        table_id: req.body.table_id,
        reservation_start: new_reservation_start,
        reservation_end: new_reservation_end,
        number_of_guests: req.body.number_of_guests
    }).then( () => {
        res.status(200).json({response: 'Reservation updated successfully!'});
    }).catch((err) => {
        res.status(404).json({err});
    })
})

router.delete('/reservations/:id', (req, res) => {
    knex('reservation').where('id', req.params.id)
    .del()
    .then( () => {
        res.status(200).json({response: 'Reservation deleted seccessfully!'});
    }).catch((err) => {
        res.status(404).json({err})
    })
})

module.exports = router;