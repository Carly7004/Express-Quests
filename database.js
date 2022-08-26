require('dotenv').config();

const mysql = require('mysql2/promise')

const database = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

// const users = mysql.createPool({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// })

// users.getConnection()
// .then(() => {
//     console.log('user table conneted')
// }).catch((err) => {
//     console.log('table not connected')
// })

// Basic connection to database
database.getConnection()
.then(() => {
    console.log('Can now connect to database')
}).catch((err) => {
    console.log(err)
})

// to listen to changes on your database when you query it from here
// run your database js file with nodemon

// database.query("select * from movies")
// .then((result) => {
//     console.log(result)
// }).catch((err) => {
//     console.log(err)
// })

//using array destructuring 

// database
//   .query("select * from movies")
//   .then(([movies]) => {
//     console.log(movies);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

module.exports = database;





