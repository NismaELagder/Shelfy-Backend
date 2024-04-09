import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";
import { User } from "../models/UserModel.js";
export const requrireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);
  if (!authorization)
    return res.status(401).send({
      error: "You have to be an authorized  user",
    });

  const token = await authorization?.split(" ")[1]; //Bearer xxxxxx
  try {
    const { _id } = jwt.verify(token, SECRET); // returns the token {insensitive data , token , secret}
    req.user = await User.findOne({ _id: _id });
    next();
  } catch (error) {
    return res.status(401).send({
      error: "You have to be  authorized  user",
    });
  }
};
