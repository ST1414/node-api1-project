// BUILD YOUR SERVER HERE
// ---------- IMPORTS ---------- 
const express = require('express'); // Check node_modules folder looking for express
const users = require('./users/model'); // These functions are call the database

// ---------- INSTANCE OF EXPRESS APP ---------- 
const server = express();

// ---------- GLOBAL MIDDLEWARE ---------- 
server.use( express.json() );




module.exports = server; // EXPORT YOUR SERVER instead of {}
