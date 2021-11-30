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
            res.status(500).json({ // 500 = Server error
                message: 'The users information could not be retrieved',
                error: err.message
            })
        })
})


// GET USER BY ID
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;

    Users.findById(id)
        .then( user => {
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ // 404 = Not Found
                    message: 'The user with the specified ID does not exist'
                })
            }
        })
        .catch(err => {
            res.status(500).json({ // 500 = Server error
                message: `The user information could not be retrieved`,
                error: err.message
            })
        })
})


// POST NEW USER
server.post('/api/users', async (req, res) => {
    const { body } = req;
    try {
        if (!body.name || !body.bio){
            res.status(400).json({
                message: 'Please provide name and bio for the user'
            })
        } else {
            const newUser = await Users.insert(body);
            res.status(201).json(newUser); // 201 = created
        }
    } catch (err) {
        res.status(500).json({ // 500 = Server error
            message: 'There was an error while saving the user to the database',
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
            if (!user){
                res.status(404).json({ // 404 = Not found
                    message: 'The user with the specified ID does not exist'
                })
            } else if (!body.name || !body.bio){
                res.status(400).json({
                    message: 'Please provide name and bio for the user'
                })
            } else {
                res.status(200).json(user); // 200 = Ok
            }
        })
        .catch(err => {
            res.status(500).json({ // 500 = Server error
                message: `The user information could not be modified`,
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
            res.status(404).json({ // 404 = Not found
                message: `The user with the specified ID does not exist`
            })
        }
    } catch (err) {
        res.status(500).json({ // 500 = Server error
            message: 'The user could not be removed',
            error: err.message
        });
    }
})



// ---------- EXPORT TO MODULES ---------- 
module.exports = server; // EXPORT YOUR SERVER instead of {}
