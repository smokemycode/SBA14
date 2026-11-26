// routes for signing up, logging in, and GitHub login
import { Router } from "express";
import User from "../models/User.js";
import { signToken } from "../utils/auth.js";

const router = Router();

// POST /api/users/register: create a local (email + password) account
router.post("/register", async (req, res) => {
	try {
        // get the username, email, and password from the request body
		const { username, email, password } = req.body;
		const existingUser = await User.findOne({ email: email?.toLowerCase() });
		if (existingUser) {
			return res
				.status(400)
				.json({ message: "A user with that email already exists." });
		}
        // create the user in the database
		const user = await User.create({ username, email, password });
		const token = signToken(user);
		res.status(201).json({ token, user });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// POST /api/users/login: check email and password and send back a JWT
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email?.toLowerCase() });
        const correctPW = user && await user.isCorrectPassword(password);
        if (!correctPW) {
            return res.status(400).json({ message: 'Incorrect email or password.' });
        }
        const token = signToken(user);
        res.json({ token, user });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;
