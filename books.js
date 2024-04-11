// backend/routes/books.js
const express = require('express');
const router = express.Router();
const Book = require('../models/book');

// Search books route
router.get('/', async (req, res) => {
    const searchQuery = req.query.search;
    try {
        const books = await Book.find({
            $or: [
                { title: { $regex: searchQuery, $options: 'i' } },
                { author: { $regex: searchQuery, $options: 'i' } }
            ]
        });
        res.json(books);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to populate the database with provided books
router.post('/populate', async (req, res) => {
    try {
        const booksData = [
            { title: "Introduction to Computer Science", author: "John Smith", location: { rack: 1, column: 2, row: 3 }},
            { title: "Linear Algebra and Its Applications", author: "David C. Lay", location: { rack: 2, column: 1, row: 5 }},
            { title: "Organic Chemistry", author: "Paula Yurkanis Bruice", location: { rack: 3, column: 3, row: 2 }},
            { title: "Principles of Economics", author: "N. Gregory Mankiw", location: { rack: 4, column: 2, row: 1 }},
            { title: "Introduction to Psychology", author: "James W. Kalat", location: { rack: 5, column: 4, row: 2 }},
            { title: "The Elements of Style", author: "William Strunk Jr. and E.B. White", location: { rack: 1, column: 3, row: 4 }},
            { title: "Microbiology: An Introduction", author: "Gerard J. Tortora", location: { rack: 2, column: 2, row: 6 }},
            { title: "Fundamentals of Engineering Thermodynamics", author: "Michael J. Moran", location: { rack: 3, column: 5, row: 3 }},
            { title: "Data Structures and Algorithm Analysis in C", author: "Mark Allen Weiss", location: { rack: 4, column: 1, row: 2 }},
            { title: "Fundamentals of Financial Management", author: "Eugene F. Brigham and Joel F. Houston", location: { rack: 5, column: 3, row: 1 }}
            // Add more books related to university subjects as needed
        ];

        await Book.insertMany(booksData);
        res.json({ message: 'Books added successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
