import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { User, Thought } from "../models/index.js";

// todo: write a function to get all thoughts
export const getAllThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        const thoughtObj = {
            thoughts
        }
        res.json(thoughtObj);

    } catch (error: any) {
        res.status(500).json({
            message: error.message
        })
    }
}

// todo: write a function to get a single thought through its _id
export const getThoughtById = async (req: Request, res: Response) => {
    try {
        console.log(req.params)
        const thoughtId = req.params.thoughtId;
        const Thoughts = await Thought.findById({ _id: thoughtId });
        console.log(thoughtId);

        if (!Thoughts) {
            return res.status(404).json({ message: 'No Thoughts found' });
        }

        return res.json({ Thoughts });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}

// todo: write a function to POST or ,create, a new thought that pushes the thought into the users array field (so push to user due to its relationsip)
export const createThought = async (req: Request, res: Response) => {
    try {
        // this creates my new thought
        const newThought = await Thought.create(req.body);
        // this returns my new thought
        // res.json({ newThought });

        // find user by id and update the user with the new thought
        const userId = req.body.userId;
        const user = await User.findOneAndUpdate({ _id: userId }, { $push: { thoughts: newThought._id } }, { new: true });

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        return res.json({ newThought, user });

    } catch (err) {
        return res.status(500).json(err);
    }
}

// todo: write a function to update, or PUT, a thought by its _id
export const updateThought = async (req: Request, res: Response) => {
    try {
        const thoughtId = req.params.thoughtId;
        const updateData = req.body;

        // im using plural even its only for 1 because im getting confused with the singular thought model.
        const thoughts = await Thought.findOneAndUpdate({ _id: thoughtId }, updateData, { new: true });

        if (!thoughts) {
            return res.status(404).json({ message: "Thought not found" });
        }
        return res.json({ thoughts })

    } catch (err) {
        return res.status(500).json(err);
    }
}


//todo: write a function to delete, remove, a though by its _id

export const deleteThought = async (req: Request, res: Response) => {
    try {
        // console.log(req.params)
        const thoughtId = req.params.thoughtId;
        // console.log("_________", thoughtId);
        const thoughts = await Thought.findOneAndDelete({ _id: thoughtId });

        if (!thoughts) {
            return res.status(404).json({ message: 'No Brain Cells' });
        }
        return res.json({ message: 'Thought successfully deleted' });

    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

// todo: write a function to POST, or create a reaction stored reactions field (these are related to subdocuments in thoughts)
export const addReaction = async (req: Request, res: Response) => {
    try {

        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true });
            console.log(req.params.thoughtId);
            console.log(req.body);

        if (!thought) {
            return res.status(404).json({ message: 'No thought with this ID exists' })
        }
        res.json(thought);
        return;

    } catch (err) {
        res.status(500).json(err);
        return;
    }
}

// todo: write a function to Delete, a reaction to a reaciontID value (these are related to a sudocument in thoughts)
export const removeReaction = async (req: Request, res: Response) => {
    try {
        // const reactionId = new ObjectId(req.params._id);
        // console.log("_________", reactionId);
        const thought = await Thought.findOneAndUpdate( 
            { _id: req.params.thoughtId },
            { $pull: { reactions: new ObjectId(req.params.reactionId)}}, 
            { new: true });
            console.log(req.params.thoughtId);
            console.log(req.params.reactionId);

        if (!thought) {
            return res.status(404).json({ message: 'No thought with this id!' });
        }

        res.json(thought);
        return;
    } catch (err) {
        res.status(500).json(err);
        return;
    }
}