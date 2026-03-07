import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";

export async function authMiddleware(req, res, next) {
    //grab token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Not authorized or token missing" });
    }
    const token = authHeader.split(" ")[1];
    //verify token
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(payload.userId).select("-password");
        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }
        req.user = user; //attach user to request
        next(); //proceed to next middleware or route handler
    } catch (error) {
        console.log("JWT verification failed:", error);
        return res.status(401).json({ success: false, message: "Invalid token or expired" });
    }
}