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

    // function doesOverlap(){
    //   return (event1Start >= event2Start && event1Start <= event2End ||  
    //   event2Start >= event1Start && event2Start <= event1End)
    // }

    knex('reservation')
    .select().where(function () {
        this
          .where('reservation_start', '>=', new_reservation_start)
          .andWhere('reservation_start', '<=',new_reservation_end)

          .orWhere('reservation_start', '<=', new_reservation_start)
          .andWhere('reservation_start', '>=', new_reservation_start)
      })
    .then((reservation) => {
        if(reservations.length === 0)
            res.status(404).json({err: 'Reservation not found'});
        else
            res.status(200).json({reservations});
    })
    // knex('reservation').insert({
    //     reservation_start: reservation_start,
    //     reservation_end: reservation_end,
    //     number_of_guests: req.body.number_of_guests,
    //     table_id: req.body.table_id
    // })
    .then(() => {
        knex.select()
        .from('reservation')
        .then((reservations) => {
            res.status(201).json({reservations});
        }).catch((err) => {
            res.status(404).json({err});
        })
    }).catch((err) => {
        res.status(400).json({err});
    })
})

router.put('/reservations/:id', (req, res) => {
    knex('reservation').whereIn('id', req.params.id)
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

// let event1Start = new Date('Mon Oct 14 2019 07:00:00 GMT+0300');
// let event1End = new Date('Mon Oct 14 2019 09:00:00 GMT+0300');

// let event2Start = new Date('Mon Oct 14 2019 05:00:01 GMT+0300');
// let event2End = new Date('Mon Oct 14 2019 07:00:00 GMT+0300');

// const dateRangeOverlaps = (a_start, a_end, b_start, b_end) => {
//   console.log(a_start);
//   console.log(a_start.getTime());
//   let tim = a_start.getTime() - 1000;
//   console.log(new Date(tim));
//     if (a_start <= b_start && b_start <= a_end) return true; // b starts in a
//     if (a_start <= b_end   && b_end   <= a_end) return true; // b ends in a
//     if (b_start <  a_start && a_end   <  b_end) return true; // a in b
//     return false;
// }

// function doesOverlap(){
//   return (event1Start >= event2Start && event1Start <= event2End ||  
//   event2Start >= event1Start && event2Start <= event1End)
// }

// console.log(dateRangeOverlaps(event1Start, event1End, 
// event2Start, event2End));
// console.log(doesOverlap());


// var myDate = new Date("2012-02-10T13:19:11+0000");
// var offset = myDate.getTimezoneOffset() * 60 * 1000;

// var withOffset = myDate.getTime();
// var withoutOffset = withOffset - offset;
// console.log(withOffset);
// console.log(withoutOffset);
