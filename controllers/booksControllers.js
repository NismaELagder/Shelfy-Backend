import { bookModel } from "../models/BookModel.js";

const getAllBooks = async (request, response) => {
  const books = await bookModel.find({});

  return response.status(201).send(books);
};

const getBookById = async (req, res) => {
  const { id } = req.params;
  const book = await bookModel.findById(id);
  return res.status(200).json(book);
};

const createBook = async (request, response) => {
  if (
    !request.body.title ||
    !request.body.author ||
    !request.body.publishYear ||
    !request.body.description ||
    !request.body.category ||
    !request.body.imageURL ||
    !request.file
  ) {
    return response
      .status(400)
      .send("Fill all required parameters");
  }
  const newBook = {
    ...request.body,
    file: request.file.filename,
    owner_id: request.user._id,
    readers_ids: [],
    comments: [],
  };
  const book = await bookModel.create(newBook);
  response.status(201).send(book);
};

const updateBookById = async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear ||
      !req.body.description ||
      !req.body.category ||
      !req.body.imageURL ||
      !req.file
    ) {
      return res
        .status(400)
        .send({ message: "please enter all fields" });
    } else {
      const { id } = req.params;

      const newBook = {
        ...req.body,
        file: req.file.filename,
        owner_id: req.user._id,
      };
      const updated = await bookModel.findByIdAndUpdate(
        id,
        newBook
      );
      res
        .status(200)
        .send({ message: "book updated successfully" });
    }
  } catch (error) {
    return res.status(400).send(error);
  }
};

const deleteBookById = async (req, res) => {
  try {
    const { id } = req.params;
    await bookModel.findByIdAndDelete(id);

    return res.status(201).send({
      message: "Book successfully deleted.",
    });
  } catch (err) {
    res.send(err);
  }
};

const getUserBooks = async (req, res) => {
  try {
    const userBooks = await bookModel.find({
      owner_id: req.user._id,
    });

    res.status(201).send(userBooks);
  } catch (err) {
    res.status(401).send(err);
  }
};

const addBookstoFav = async (req, res) => {
  console.log(req.originalUrl);
  try {
    const { id } = req.params;
    const book = await bookModel.findById(id);
    const bookReaders = book.readers_ids;
    let updatedReaders;
    if (
      bookReaders.length &&
      bookReaders.indexOf(req.user._id) === -1
    ) {
      updatedReaders = [...bookReaders, req.user._id];
    } else if (bookReaders.length == 0) {
      updatedReaders = [req.user._id];
    } else {
      updatedReaders = bookReaders.filter(
        (reader) => !reader.equals(req.user._id)
      );
    }
    book.readers_ids = updatedReaders;

    await bookModel.findByIdAndUpdate(id, {
      ...book,
    });
    res.status(201).send(updatedReaders);
  } catch (err) {
    console.log(err);
  }
};

const getFavBooks = async (req, res) => {
  console.log("works well");
  const userId = req.user._id;
  const books = await bookModel.find({
    "readers_ids.0": { $exists: true },
  });
  const favBooks = books.filter((book) =>
    book.readers_ids.find((element) =>
      element.equals(userId)
    )
  );

  res.status(201).send(books);
};

const addComment = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await bookModel.findById(id);
    const newComment = req.body;
    book.comments.push(newComment);
    await bookModel.findByIdAndUpdate(id, book);
    console.log(book);
    res.status(201).send(book.comments);
  } catch (err) {}
};

const getBookComments = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await bookModel.findById(id);
    res.status(201).send(book.comments);
  } catch (err) {}
};

export {
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
};
