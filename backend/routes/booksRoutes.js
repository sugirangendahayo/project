import express from "express";
import multer from "multer";
import path from "path";
import { addBook, getBooks } from "../controllers/booksController.js";

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // Store PDF files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(
      null,
      "book_" + Date.now() + path.extname(file.originalname) // Unique filename
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed"));
    }
    cb(null, true);
  },
});

const router = express.Router();

// Define routes
router.get("/", getBooks); // Route to get all books
router.post("/add", upload.single("pdf_file"), addBook); // Route to upload a book (PDF)

export default router;
