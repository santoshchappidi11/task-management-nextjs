import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import {
  getCurrentUser,
  Login,
  Register,
} from "./controllers/UserController.js";
import {
  addTask,
  deleteTask,
  getEditTask,
  getYourTasks,
  updateTask,
} from "./controllers/TaskController.js";

const PORT = process.env.PORT || 8000;
const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());
app.use(morgan("dev"));

// --------------------------------------------------------->

app.post("/register", Register);
app.post("/login", Login);
app.post("/get-your-tasks", getYourTasks);
app.post("/add-task", addTask);
app.post("/get-edit-task", getEditTask);
app.post("/update-task", updateTask);
app.post("/delete-task", deleteTask);
app.post("/get-current-user", getCurrentUser);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connected to DB"))
  .catch((error) => console.log(error, "something went wrong!"));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
});
