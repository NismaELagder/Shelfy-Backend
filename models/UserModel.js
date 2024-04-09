import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    unique: true,
    required: true,
  },
});

userSchema.statics.signup = async function (
  userName,
  email,
  password
) {
  // check if user entered email , password, and userName
  if (!email || !password || !userName)
    throw Error("All fields are required");

  // check email validation
  if (!validator.isEmail(email))
    throw new Error("Invalid Email");

  //check whether password is strong enough or not
  if (!validator.isStrongPassword(password))
    throw Error("Password isn't strong enough.");

  // Check if email is unique
  const emailExists = await this.findOne({ email });
  if (emailExists) {
    throw new Error("Email already in use");
  }

  // Check if userName is unique
  const userNameExists = await this.findOne({ userName });
  if (userNameExists) {
    throw new Error("userName already in use");
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({
    userName,
    email,
    password: hash,
  });
  return user;
};

userSchema.statics.login = async function (
  email,
  password
) {
  // check if user entered email , password, and userName
  if (!email || !password) {
    console.log(email, password);
    throw new Error("All fields are required");
  }
  // Check if email is unique
  const user = await this.findOne({ email });
  if (user) {
    const passwordExistence = await bcrypt.compare(
      password,
      user.password
    );

    if (passwordExistence) return user;
  }
  throw new Error("Invalid user");
};

export const User = new mongoose.model("User", userSchema);
