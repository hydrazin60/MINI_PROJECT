import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/auth.route.js";

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;
const MONGODB_URL = process.env.MONGODB_URL;
if (!MONGODB_URL) {
  console.error("MONGODB_URL is not defined in environment variables.");
  process.exit(1);
}
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1);
  });

//
app.use("/miniproject/v1/auth", router);
//  error handling
app.use((err, req, res, next) => {
  const statusCode = req.statusCode || 500;
  const message = err.message || "Internal server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
