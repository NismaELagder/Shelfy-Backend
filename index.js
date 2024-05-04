import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoutes.js";
import usersRoute from "./routes/usersRoutes.js";
import cors from "cors";
const app = express();
app.use(express.json()); // Middleware parse body to json

app.use(cors());
app.use("/pdfs", express.static("pdfs"));

app.use("/books", booksRoute);
app.use("/users", usersRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    app.listen(PORT, () => {
      console.log("App is working well");
    });
  })
  .catch((error) => {
    console.log(error);
  });
