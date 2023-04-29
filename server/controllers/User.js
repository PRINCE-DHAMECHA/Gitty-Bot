import User from "../models/User.js";

const getAction = async (req, res) => {
  const { userName } = req.body;
  const user = User.find({ userName });
  res.status(200).json(user);
};

const addAction = async (req, res) => {
  const { action, message, userName } = req.body;
  const user = User.findOne({ userName });
  user.actions.push({ action, message });
  const userUpdate = User.updateOne({ _id: user._id });
};

export { getAction, addAction };
