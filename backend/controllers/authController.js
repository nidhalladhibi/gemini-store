import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email already used" });
    const user = await User.create({ name, email, password });
    res.status(201).json({ user: sanitizeUser(user), token: generateToken(user) });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) return res.status(401).json({ message: "Invalid credentials" });
    res.json({ user: sanitizeUser(user), token: generateToken(user) });
  } catch (error) {
    next(error);
  }
}

export async function me(req, res) {
  res.json(req.user);
}

export async function updateProfile(req, res, next) {
  try {
    const user = await User.findById(req.user._id);
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) user.password = req.body.password;
    const saved = await user.save();
    res.json({ user: sanitizeUser(saved), token: generateToken(saved) });
  } catch (error) {
    next(error);
  }
}

function sanitizeUser(user) {
  return { _id: user._id, name: user.name, email: user.email, role: user.role };
}
