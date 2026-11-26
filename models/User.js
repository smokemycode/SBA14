// Blueprint for a user object
import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    password: {
        type: String,
        minlength: 8,
        required: function () { return !this.githubId; }, // Password is required if githubId is not provided
    },
    githubId: {
        type: String,
        unique: true,
        sparse: true, // Allow null values for githubId
    },
}, { timestamps: true });

// Hash the password before saving, but only if it's new or has been changed
userSchema.pre('save', async function () {
    if (this.password && (this.isNew || this.isModified('password'))) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

// Compare the provided password with the hashed password in the database
userSchema.methods.isCorrectPassword = async function (password) {
    if (!this.password) return false; // If there's no password (e.g., GitHub login), return false
    return bcrypt.compare(password, this.password)
};

// Hide the password field when converting the user document to JSON
userSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.password;
        return ret;
    },
});

// Create and export the User model
const User = model("User", userSchema);

export default User;