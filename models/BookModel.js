import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { required: true, type: String },
  author: { type: String, required: true },
  publishYear: { type: Number },
  category: { type: String, required: true },
  description: { type: String, required: true },
  imageURL: { type: String, required: true },
  file: {
    type: Object,
    required: true,
  },
  publisher: { type: String },
  owner_id: { type: String },
  readers_ids: { type: Array },
  comments: { type: Array },
});

export const bookModel = mongoose.model("Book", bookSchema);
