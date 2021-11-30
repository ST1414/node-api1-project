// BUILD YOUR SERVER HERE
// ---------- IMPORTS ---------- 
const express = require('express'); // Check node_modules folder looking for express
const Users = require('./users/model'); // These functions are call the database


// ---------- INSTANCE OF EXPRESS APP ---------- 
const server = express();


// ---------- GLOBAL MIDDLEWARE ---------- 
server.use( express.json() );


// ---------- END POINTS ---------- 


// GET All USERS
server.get('/api/users/', (req, res) => {
    Users.find()
        .then( users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error getting all users',
                error: err.message
            })
        })
})


// GET USER BY ID
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;

    Users.findById(id)
        .then( user => {
            res.json(user)
        })
        .catch(err => {
            res.status(500).json({
                message: `Error getting user ID ${id}`,
                error: err.message
            })
        })
})


// POST NEW USER
server.post('/api/users/', async (req, res) => {
    const { body } = req;
    try {
        if (!body.name || !body.bio){
            res.status(400).json({
                message: 'Name and bio are required'
            })
        } else {
            const newUser = await Users.insert(body);
            res.status(201).json(newUser);
        }
    } catch (err) {
        res.status(500).json({
            message: 'Error posting new user',
            error: err.message
        })
    }
})


// UPDATE USER BY ID (PUT)
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { body } = req;

    Users.update(id, body)
        .then( user => {
            if (!body.name || !body.bio){
                res.status(400).json({
                    message: 'Name and bio are required.'
                })
            } else {
                res.json(user)
            }
        })
        .catch(err => {
            res.status(500).json({
                message: `Error updating user.`,
                error: err.message
            })
        })
})


// DELETE USER BY ID
server.delete('/api/users/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const deletedUser = await Users.remove(id);
        if (deletedUser){
            res.json(deletedUser)
        } else {
            res.status(404).json({
                message: `User id ${id} does not exist.`
            })
        }
    } catch (err) {
        res.status(500).json({
            message: 'Error deleting user.',
            error: err.message
        });
    }
})



// ---------- EXPORT TO MODULES ---------- 
module.exports = server; // EXPORT YOUR SERVER instead of {}
