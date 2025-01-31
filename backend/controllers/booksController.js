import db from "../configs/db.config.js";

const addBook = async (req, res) => {
  try {
    const addBookQuery =
      "INSERT INTO books (title, author, category, price, pdf_file) VALUES (?)";

    // Check if a PDF file is uploaded
    if (!req.file) {
      return res.status(400).json({ Error: "No PDF file uploaded" });
    }

    const pdfPath = `/uploads/${req.file.filename}`; // Store relative path of the uploaded PDF

    const Data = [
      req.body.title,
      req.body.author,
      req.body.category,
      req.body.price,
      pdfPath,
    ];

    db.query(addBookQuery, [Data], (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ Error: "Inserting data error in books table" });
      }
      return res.status(201).json({ Status: "Book uploaded successfully" });
    });
  } catch (error) {
    res.status(500).json({ Error: "Server error" });
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await new Promise((resolve, reject) => {
      db.query("SELECT * FROM books", (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });

    if (books.length === 0) {
      return res.status(404).json({ error: "No books found." });
    }

    res.status(200).json({ books });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Failed to fetch books." });
  }
};

export { addBook, getBooks };
