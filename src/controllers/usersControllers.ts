import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { User, Thought } from "../models/index";

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
}

// todo: write a function to get a single user by its _id and populated thought and friend data

export const getUserById = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).populate('thoughts').populate('friends');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.json(user);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}

// todo: write a function that will post (or create) a new user
export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
            res.status(500).json(err);
    }
}

// todo: write a function that will put (or update a user) by it's _id
// if any issuse arise with routes it could the the req.params.id should be userId.
export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;
        const user = await User.findByIdAndUpdate(userId, updateData, {new: true});

        if (!user) {
            return res.status(404).json({message: "User not found"});
            }
        return res.json(user);
        // do I need to wraup user in {} because it should return an object? if I get something else or errors consider this.
    } catch (err) {
            return res.status(500).json(err);
    }
}

// todo: write a function to delete a user by its _id


// todo: write a function to POST, add a new friend to a user's friends list (this is related to another subdocument in User)
// todo: write a function to DELETE, a friend from its users friends list (this is related to anothre subdocument in User
