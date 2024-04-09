import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";
import { User } from "../models/UserModel.js";

const createToken = (_id) => {
  const token = jwt.sign({ _id }, SECRET, {
    expiresIn: "1d",
  });

  return token;
};

// get all website users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(201).send(users);
  } catch (error) {
    console.log("Error getting all users: ", error);
  }
};

// get a user by id
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);
    const token = createToken(user._id);
    return res.status(201).send({
      _id: user._id,
      token,
      userName: user.userName,
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

//create a new user
export const signupUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const newUser = await User.signup(
      userName,
      email,
      password
    );
    const token = createToken(newUser._id);
    return res.status(201).send({
      _id: newUser._id,
      token,
      userName: newUser.userName,
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

//update an existing user

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = User.findByIdAndUpdate(
      id,
      req.body
    );
    return res.status(200).send(updatedUser);
  } catch (error) {
    console.log("Error updating this user: ", error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    return res.status(200).send("User deleted");
  } catch (error) {
    console.log("Error deleting this user: ", error);
  }
};
