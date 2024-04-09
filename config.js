import dotenv from "dotenv";

dotenv.config();
export const PORT = process.env.PORT || 4000;
export const mongoDBURL = process.env.mongoDBURL;
export const SECRET = process.env.SECRET;
