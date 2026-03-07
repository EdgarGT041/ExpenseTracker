import User from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";
const TOKEN_EXPIRES= "24h";
const createToken = (userId) => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES });
}

//REGISTER USER
export async function registerUser(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Please enter a valid email" });
    }
    if (password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    try {
        if(await User.findOne({ email })) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashed= await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashed });
        const token=createToken(newUser._id);
        res.status(201).json({ success: true, token, user: { id: newUser._id, name: newUser.name, email: newUser.email } });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" }); 
    }
}    

//LOGIN USER
export async function loginUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Please fill all the fields" });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }
        const token = createToken(user._id);
        res.status(200).json({ success: true, token, user: { id: user._id, name: user.name, email: user.email } });

        
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
}

//GET USER PROFILE

export async function getCurrentUser(req, res) {
    try {
        const user = await User.findById(req.user.id).select("name email");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.json({ success: true, user });
    
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
}

//UPDATE USER PROFILE

export async function updateUser(req, res) {
    const { name, email } = req.body;
    if (!name || !email || !validator.isEmail(email)) {
        return res.status(400).json({ success: false, message: "Please fill all the fields with valid information" });
    }

    try {
        const exist= await User.findOne({ email, _id: { $ne: req.user.id } });
        if (exist) {
            return res.status(400).json({ success: false, message: "Email already in use" });
        }
        const user = await User.findByIdAndUpdate(req.user.id, { name, email }, { new: true, runValidators: true, select: "name email" });
        res.json({ success: true, user });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
}

//CHANGE PASSWORD

export async function changePassword(req, res) {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword || newPassword.length < 8) {
        return res.status(400).json({ success: false, message: "Password is invalid or too short" });
    }

    try {
        const user = await User.findById(req.user.id).select("password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const match = await bcrypt.compare(currentPassword, user.password);
        if (!match) {
            return res.status(400).json({ success: false, message: "Current password is incorrect" });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        res.json({ success: true, message: "Password updated successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
}