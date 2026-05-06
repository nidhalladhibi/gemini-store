import User from "../models/User.js";

export async function getUsers(_req, res, next) {
  try {
    const users = await User.find().select("-password").sort("-createdAt");
    res.json(users);
  } catch (error) {
    next(error);
  }
}

export async function deleteUser(req, res, next) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
}
