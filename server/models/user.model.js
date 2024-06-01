import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    username: {
      type: String,
      require: true,
    },
    address: {
      type: String,
    },
    phonenumber: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
