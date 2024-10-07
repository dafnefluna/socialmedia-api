import {Router} from 'express';
const router= Router();
import {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} from '../../controllers/thoughtsControllers.js';

// /api/thoughts endpoing for getiing all the documents in the collectiong and adding to them
router.route('/').get(getAllThoughts).post(createThought);

// /api/thoughts/:thoughts is the endpoint for getting, updating, and deleting documents by id
router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought);

//route for the /ap/thoughts/:thoughtiD/reactions that will  add a friend to the user
// i used post because its an update on the user by id, but if error try put instead since its a new friend
router.route('/:thoughtId/reaction').post(addReaction);

router.route('/:thoughId/reaction/:reaction').delete(removeReaction);

export { router as thoughtsRouter};

