const router = require('express').Router();
const {allThoughts, singleThought, createThought, updateThought, deleteThought, addReaction, deleteReaction} = require('../../controllers/thoughts.js');

//GET route to return all thoughts
router.get('/all', allThoughts);
//GET route for a single thought
router.get('/:id', singleThought);
//POST route to create a thought
router.post('/create', createThought);
//PUT to update a thought
router.put('/update/:id', updateThought);
//delete a thought
router.delete('/delete/:id', deleteThought);
//add reaction to a thought
router.post('/:id/reactions/add', addReaction);
//delete a reation from a thought
router.delete('/:id/reactions/delete/:reactionID', deleteReaction);

module.exports = router;