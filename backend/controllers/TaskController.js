import jwt from "jsonwebtoken";
import TaskModel from "../Models/TaskModel.js";
import UserModel from "../Models/UserModel.js";

export const getYourTasks = async (req, res) => {
  try {
    const { token } = req.body;

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedData)
      return res
        .status(404)
        .json({ success: false, message: "Something went wrong!" });

    const userId = decodedData.userId;

    const yourTasks = await TaskModel.find({ userId });

    if (yourTasks)
      return res.status(200).json({ success: true, tasks: yourTasks });

    return res.status(404).json({ success: false, message: "No tasks!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const addTask = async (req, res) => {
  try {
    const { title, status, priority, deadline, description } =
      req.body.taskData;

    const { token } = req.body;

    if (!title || !status)
      return res
        .status(404)
        .json({ success: false, message: "Please fill the details!" });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedData)
      return res
        .status(404)
        .json({ success: false, message: "Something went wrong!" });

    const userId = decodedData?.userId;

    const user = await UserModel.findById(userId);

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "No user found!" });

    const task = new TaskModel({
      title,
      status: status ? status : "To do",
      priority: priority ? priority : "Low",
      deadline,
      description,
      userId,
    });

    await task.save();

    const tasks = await TaskModel.find({ userId });

    return res
      .status(200)
      .json({ success: true, tasks, message: "New task added!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getEditTask = async (req, res) => {
  try {
    const { token, taskId } = req.body;

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedData)
      return res
        .status(404)
        .json({ success: false, message: "Something went wrong!" });

    const userId = decodedData?.userId;

    const user = await UserModel.findById(userId);

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "No user found!" });

    const task = await TaskModel.findOne({ _id: taskId, userId });

    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Something went wrong!" });

    return res.status(200).json({ success: true, task });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, description, status, priority, deadline } =
      req.body.taskData;

    const { token, taskId } = req.body;

    if (!title || !status)
      return res
        .status(404)
        .json({ success: false, message: "Title and status are required!" });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedData)
      return res
        .status(404)
        .json({ success: false, message: "Something went wrong!" });

    const userId = decodedData?.userId;

    const user = await UserModel.findById(userId);

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "No user found!" });

    const updatedTask = await TaskModel.findOneAndUpdate(
      { _id: taskId, userId },
      { title, description, status, priority, deadline },
      { new: true }
    );

    if (updatedTask) {
      const tasks = await TaskModel.find({ userId });
      return res
        .status(200)
        .json({ success: true, message: "Task updated!", tasks });
    }

    return res
      .status(404)
      .json({ success: false, message: "Something went wrong!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { token, taskId } = req.body;

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedData)
      return res
        .status(404)
        .json({ success: false, message: "Something went wrong!" });

    const userId = decodedData?.userId;

    const user = await UserModel.findById(userId);

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "No user found!" });

    const deletedTask = await TaskModel.findOneAndDelete({
      _id: taskId,
      userId,
    });

    if (deletedTask) {
      const tasks = await TaskModel.find({ userId });

      return res
        .status(200)
        .json({ success: true, message: "Task deleted!", tasks });
    }

    return res
      .status(404)
      .json({ success: false, message: "Something went wrong!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
