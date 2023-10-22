const router = require('express').Router();
const {getUsers, getSingleUser, createUser, updateUser, deleteUser} = require('../../controllers/users.js');
const {addFriend, deleteFriend} = require('../../controllers/friends.js');

//GET route for returning all users
router.get('/all', getUsers);
//GET route for returning single user by id
router.get('/:id', getSingleUser);
//POST route for for creating a new user, no need for auth
router.post('/create', createUser);
//PUT route to update current user by _id
router.put('/update/:id', updateUser);
//DELETE route to delete a user by _id
router.delete('/delete/:id', deleteUser);
//POST route to add a new friend to the user's friends list
router.post('/:userID/friends/:friendID', addFriend);
//DELETE route to delete a current friend from friend list
router.delete('/:userID/friends/:friendID', deleteFriend);
module.exports = router;