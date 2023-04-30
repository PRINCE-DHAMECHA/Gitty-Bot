import User from "../models/User.js";
import { context } from "../Utils/context.js";

const getAction = async (req, res) => {
  const { username } = req.query;
  const user = await User.find({ username });
  res.status(200).json(user);
};

const addAction = async (req, res) => {
  const { action, message, username } = req.body;
  const user = await User.findOne({ username });
  console.log(user);
  let tempAction = user.actions;
  tempAction.push({ key: action, value: message });
  const userUpdate = await User.updateOne(
    { username: user.username },
    { actions: tempAction }
  );
  res.status(200).json({ userUpdate });
};

const login = async (req, res) => {
  const { username, email, name } = req.body;
  const user = await User.create({
    name: name,
    email: email,
    username: username,
    ...context,
  });
  return res.status(200).json(user);
};

// name: "Jimy",
// email: "vasuforyou481210@gmail.com",
// username: "j-imy",
// ...context,


const updateMessage = async (req, res) => {
  const { action, message, username } = req.body;
  console.log(action, message, username);
  const user = await User.findOne({ username });
  console.log("user: ", user);

  if (user[action] || user[action] === false) {
    const updatedUser = await User.updateOne(
      { username },
      { $set: { [action]: message } }
    );
    console.log(1, updatedUser);
    return res.status(200).json(updatedUser);
  } else {
    let temp = user.actions;
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].key === action) {
        temp[i].value = message;
        break;
      }
    }
    const updatedUser = await User.updateOne({ username }, { actions: temp });
    return res.status(200).json(updatedUser);
  }
};

const deleteMessage = async (req, res) => {
  const { action, username } = req.body;
  const updateMsg = await User.updateOne(
    { username },
    {
      $pull: {
        actions: { key: action },
      },
    }
  );
  res.status(200).json({ updateMsg });
};

export { getAction, addAction, login, updateMessage, deleteMessage };
