import { Router } from "express";
const router = Router();
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} from "../../controllers/usersControllers.js";

// route for /api/users endpoint for getting all the documents in the collection or adding a document to the collection
// use '/' when I want to access users
router.route('/').get(getAllUsers).post(createUser);

//route for the /api/users/:userId endpoing for getting, updating, and deleting documents by id
// use '/:userId' to access the object components insides the document
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);
//route for the /ap/user/:useriD/friend that will  add a friend to the user
// i used put because its an update on the user by id, but if error try post instead since its a new friend
router.route('/:id/friend').put(addFriend);

router.route('/:id/friend/:friendId').delete(deleteFriend);

export { router as usersRoutes};