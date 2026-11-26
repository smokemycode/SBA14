// makes login tokens and checks them on protected routes
import "dotenv/config";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;
const expiration = "2h";

// creates a signed token holding who the user is
export function signToken({ username, email, _id }) {
	const payload = { username, email, _id };
	return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}

// guards a route: only lets the request through if a valid token is provided
export function authMiddleware(req, res, next) {
	let token = req.headers.authorization;

	if (token) token = token.split(" ").pop().trim();

	if (!token) {
		return res
			.status(401)
			.json({ message: "You must be logged in to do that." });
	}

	try {
		const { data } = jwt.verify(token, secret);
		req.user = data;
		next();
	} catch {
		return res.status(401).json({ message: "Invalid or expired token." });
	}
}
