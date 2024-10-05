import { Schema, model, type Document } from 'mongoose';

// this is typescript
interface IUser extends Document {
    username: string,
    email: string,
    thoughts?: Schema.Types.ObjectId[],
    friends?: Schema.Types.ObjectId[],
    // these are empty arrays because users can have zero or multiple thoughts and multiple friends, and that is why it is optional
}

// the booleans are validators
// this is mongoose type checking
const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            unique: true,
            required: true, 
            trim: true, 
        },
        email: {
            type: String, 
            required: true,
            unique: true,
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: "thought",
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }]
    },
    {
        toJSON: {
            virtuals: true, 
        },
    }
);

// todo: Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
userSchema.virtual('friendCount').get(function() {
    return this.friends?.length;
})

const User = model('User', userSchema);
// this will become users model/table, lowercase and plural

export default User;