const router = require('express').Router();
const {getUsers, getSingleUser, createuser, updateUser, deleteUser} = require('../../controllers/users');

//GET route for returning all users
router.get('/all', getUsers);
//GET route for returning single user by id
router.get('/:id', getSingleUser);
//POST route for for creating a new user, no need for auth
router.post('/create', createuser);
//PUT route to update current user by _id
router.put('/update/:id', updateUser);
//DELETE route to delete a user by _id
router.delete('/delete/:id', deleteUser);
module.exports = router;