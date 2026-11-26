// Blueprint for a private bookmark that belongs to a user
import { Schema, model } from 'mongoose';

// This defines the structure of a bookmark 
const bookmarkSchema = new Schema({
	title: {
		type: String,
		required: true,
		trim: true,
	},
    url: {
        type: String,
        required: true,
        trim: true,
        match: [/^https?:\/\/.+/, 'URL must start with http:// or https://'],
    },
    description: {
        type: String,
        trim: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

const Bookmark = model('Bookmark', bookmarkSchema);

export default Bookmark;
