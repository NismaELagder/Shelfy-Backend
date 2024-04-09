import express from "express";
import { requrireAuth } from "../middlewares/requireAuth.js";
import multer from "multer";
import path from "path";
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBookById,
  deleteBookById,
  getUserBooks,
  addBookstoFav,
  getFavBooks,
  addComment,
  getBookComments,
} from "../controllers/booksControllers.js";
import { fileURLToPath } from "url";

import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "pdfs"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
router.use(requrireAuth);
// request to get all books
router.get(
  "/",

  getAllBooks
);

//request to get one book by it's ID

router.get("/book/:id", getBookById);

// request to post a new book
router.post("/book", upload.single("file"), createBook);

//request to update a book

router.put(
  "/book/:id",
  upload.single("file"),
  updateBookById
);

router.put("/book/read/:id", addBookstoFav);
router.get("/fav", upload.single("file"), getFavBooks);
router.put("/book/:id/comments", addComment);
router.delete("/book/:id", deleteBookById);
router.get("/mybooks", getUserBooks);
router.get("/book/:id/comments", getBookComments);

export default router;
