import { Schema, Types, model, type Document } from 'mongoose';

// todo: reactions interface
// instructions say username string. I chose to do schema.types.objectid for the relationship 10/5/24 at 3pm
interface IReaction extends Document {
    reactionId: Schema.Types.ObjectId,
    reactionBody: string;
    username: string,
    createdAt: Date,
}
// todo: thought interface
// instructions say username string. I chose to do schema.types.objectid for the relationship 10/5/24 at 3pm
interface IThought extends Document {
    thoughtText: string, 
    createdAt: Date,
    username:string, 
    // not an array bc only one user can make a thought
    reactions?: IReaction[], 
    // this will be an array of nested documenteds with the reactionSchema
}

// todo: reaction model
// would the reaction work better with a string username because then its not assuming the reaction is being created by the thought user
const reactionSchema = new Schema<IReaction>(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true, 
            maxlength: 128,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp: Date) => new Date(timestamp),
        }
    },
    {
        toJSON: { getters: true },
        _id: false,
    }
)

// todo: thought model 
const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String, 
            required: true,
            minlength: 1,
            maxlength: 128,
        },
        createdAt:{
            type: Date,
            default: Date.now, 
            get: (timestamp: Date) => new Date(timestamp),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: { getters: true },
    }
);

// this  will become thoughts model/table, lowercase, plurals
const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;
