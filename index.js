const mysql = require('mysql');
const express = require('express');
const port = process.env.PORT || 3306;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.listen(port, function(){
    console.log("Listening on port: " + port);
})

// var mysqlConnection = mysql.createConnection({
//     host: 'remotemysql.com',
//     user: 'GYFOLxDmMa',
//     password: 'Qb3m0DjMMp',
//     port: '3306',
//     database: 'GYFOLxDmMa'
// });

// mysqlConnection.connect((err) => {
//     if(!err)
//     console.log('DB connection succeded.');
//     else
//     console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
// })