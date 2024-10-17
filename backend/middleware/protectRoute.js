import jwt from "jsonwebtoken";
import pool from "../db.js";

const protectRoute = async (req, res, next) => {
	const token = req.cookies.jwt;
	try {

		if (!token) {
			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		if (!decoded) {
			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
		}

		const result = await pool.query(
			"SELECT id, username, gender, profilepic FROM users WHERE id = $1",
			[decoded.userId]
		);

		if (result.rows.length === 0) {
			return res.status(404).json({ error: "User not found" });
		}

		req.user = result.rows[0];

		next();
	} catch (error) {
		console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export default protectRoute;