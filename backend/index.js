import express from "express";
import "dotenv/config";
import cors from "cors";
import connectToDatabase from "./configs/db.js";
import User from "./models/userModel.js";
const app = express();
app.use(express.json());
app.use(cors());

app.post("/add", async (req, res) => {
  const { firstName, lastName, email, username, password, confirmPassword } =
    req.body;

  try {
    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      username,
      password,
      confirmPassword,
    });

    // Save the user to the database
    await newUser.save();
    res
      .status(201)
      .json({ message: "User added successfully!", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

app.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

app.listen(process.env.PORT, async (req, res) => {
  try {
    await connectToDatabase();
    console.log("PORT is listening on" + " " + process.env.PORT);
  } catch (error) {
    console.log(error);
  }
});

export default app;
