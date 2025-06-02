import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { inngest } from "../inngest/client";

export const signup = async (req, res) => {
  const { email, password, skills = [] } = req.body;
  try {
    const hashed = bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed, skills });
    // Fire Inngest Events
    await inngest.send({
      name: "user/signup",
      date: {
        email,
      },
    });
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET
    );
    res.json(user, token);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something Went Wrong", details: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = User.findOne({ email });
    if (!user) return res.status(401).json({ error: "User Not Found" });
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ error: "Something Went Wrongf" });
    }
  } catch (error) {}
};
