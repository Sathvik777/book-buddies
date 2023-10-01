import express, { json } from 'express';
const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(json());

// Temporary in-memory storage for books (replace with a database in production)
const books = [];

// Routes

app.get('/health', (req, res) => {
    res.send('Hello World!')
})

// Get all books
app.get('/books', (req, res) => {
    // check id in req
    // if id exists, return book with that id
    // else return all books
    if (req.query.id) {
        const book = books.find((book) => book.id === req.query.id);
        res.json(book);
    } if (req.query.q) {
        const book = books.find((book) => book.title.includes(req.query.q));
        res.json(book);
    } else {
        res.json(books);
    }
});

// Create a new book
app.post('/books', (req, res) => {
    const newBook = req.body;
    books.push(newBook);
    res.status(201).json(newBook);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
