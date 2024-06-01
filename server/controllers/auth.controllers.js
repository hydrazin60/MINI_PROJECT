import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
export const signup = async (req, res) => {
  const { username, email, password, address, phonenumber } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    email === "" ||
    password === "" ||
    username === ""
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const hashPassword = bcryptjs.hashSync(password, 3);
  const newUser = new User({
    username,
    email,
    password: hashPassword,
    address,
    phonenumber,
  });
  try {
    await newUser.save();
    res.status(201).json({ message: "Sign-up successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default signup;
