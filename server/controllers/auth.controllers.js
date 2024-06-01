import User from "../models/user.model.js";
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
//  "email" : "ussdekhddfr1@gmail.com",
