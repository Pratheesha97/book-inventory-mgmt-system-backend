import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "bookinventory.c9keq8a0gj45.eu-north-1.rds.amazonaws.com",
  user: "admin",
  password: "admin123",
  database: "BookInv",
});

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books(`title`, `bookDesc`, `price`, `cover`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [values], (err, data) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.send(err);
    }
    return res.json(data);
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = " DELETE FROM books WHERE id = ? ";

  db.query(q, [bookId], (err, data) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.send(err);
    }
    return res.json(data);
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE books SET `title`= ?, `bookDesc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values,bookId], (err, data) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.send(err);
    }
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});
