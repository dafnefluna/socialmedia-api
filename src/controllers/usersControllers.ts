import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { User,} from "../models/index.js";

// todo: write a function to get all users
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();
        const userObj = {
            users
        }
        res.json(userObj);

    } catch (error: any) {
        res.status(500).json({
            message: error.message
        })
    }
};

// todo: write a function to get a single user by its _id and populated thought and friend data

export const getUserById = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id
        const user = await User.findById(userId).populate('thoughts').populate('friends');
        console.log(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.json({user});
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

// todo: write a function that will post (or create) a new user
export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.json({user});

    } catch (err) {
            res.status(500).json(err);
    }
};

// todo: write a function that will put (or update a user) by it's _id
// if any issuse arise with routes it could the the req.params.id should be userId.
export const updateUser = async (req: Request, res: Response) => {
    try {
        // I think that my id is not matching with the model id 10/6/24
        const userId = req.params.id;
        const updateData = req.body;
        const user = await User.findByIdAndUpdate(userId, updateData, {new: true});

        if (!user) {
            return res.status(404).json({message: "User not found"});
            }
        return res.json({user});
        // do I need to wraup user in {} because it should return an object? if I get something else or errors consider this. decided to wrap on 10/6
    } catch (err) {
            return res.status(500).json(err);
    }
};

// todo: write a function to delete a user by its _id
export const deleteUser = async ( req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const user = await User.findOneAndDelete({ _id: userId });

        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        return res.json({message: 'User successfully deleted'});

    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};


// todo: write a function to POST, add a new friend to a user's friends list (this is related to another subdocument in User)

export const addFriend = async (req: Request, res: Response) => {
    try{
        console.log(req.params);
        console.log(req.body);
        // my idea: find the user that will have an friend added and update them with another user as the friend. so those would be two seperate functions? can I use the function above?
        const userId = new ObjectId(req.params.id);
        const friendId = new ObjectId(req.body.friendId);

        // make sure the friend and user are not the same id
        // friendid cannot equal user id and has to go first than the await function to ensure that it is valid
        if (!friendId || userId !== friendId) {
            return res.status(400).json({message: 'Invalid friend ID'});
        }

        // similar to the updateuser but instead of req.body its going to be req.body with friend id. 
        const user = await User.findOneAndUpdate( {_id: userId}, {$addToSet: {friends: friendId}}, {new: true});

        if (!user) {
            return res.status(404).json({message: 'User not found'})
        } 
        return res.json({user});

    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// todo: write a function to DELETE, a friend from its users friends list (this is related to anothre subdocument in User
export const deleteFriend = async ( req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const friendId = req.params.friendId;

        if (!friendId || userId !== friendId) {
            return res.status(400).json({message: 'Invalid friend ID'});
        }

        const user = await User.findOneAndUpdate({_id: userId}, {$pull: { friends: friendId }}, {new: true});

        if (!user) {
            return res.status(404).json({message: 'User not found'})
        }
        return res.json({user});

    } catch (err: any) {
        console.log(err)
        return res.status(500).json({message: err.message});
    }
};

// todo: Bonus delete a users thought when the thought is deleted 