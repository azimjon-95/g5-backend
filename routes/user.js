const { Router } = require('express');
const users = Router();
const { getUsers, Login, Register, deleteUser, updateUser } = require('../controls/login');
users.get('/getUsers', getUsers);
users.post('/postLogin', Login);
users.post('/createUser', Register);
users.delete('/deleteUser/:_id', deleteUser);
users.put('/updateUser/:_id', updateUser);

module.exports = { users };