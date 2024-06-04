import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
export const signup = async (req, res, next) => {
  const { username, email, password, address, phonenumber } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    email === "" ||
    password === "" ||
    username === ""
  ) {
    return next(errorHandler(400, "All fields are required"));
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
    next(errorHandler(300, "something went wrong"));
  }
};
export default signup;

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(errorHandler(400, "All Filds Are required"));
  }
  try {
    const valitUser = await User.findOne({ email });
    if (!valitUser) return next(errorHandler(404, "User Not Found !"));
    const validPassword = bcryptjs.compareSync(password, valitUser.password);
    if (!validPassword) return next(errorHandler(404, "Invalide Password"));
    // const token = jwt.sign({ id: valitUser._id }, process.env.JWT_SECRET);
    const token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET, {
      expiresIn: '24h', // Add an expiration time for better security
    });
    const { password: hashPassword, ...userResponse } = valitUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ message: "Login sucessful", user: userResponse });
  } catch (err) {
    console.error(err);
    next(errorHandler(500, "Internal Server Error"));
  }
};
