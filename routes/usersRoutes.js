import express from "express";
import {
  loginUser,
  getAllUsers,
  updateUser,
  signupUser,
  deleteUser,
} from "../controllers/userController.js";
const router = express.Router();

//Get all users

router.get("/", getAllUsers);

// Get user by id
router.post("/login", loginUser);

// Create a new user
router.post("/signup", signupUser);

// Update a user
router.put("/:id", updateUser);

// Delete an existing user

router.delete("/:id", deleteUser);

export default router;
