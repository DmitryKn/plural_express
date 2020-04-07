const express = require('express');
const bookRouter = express.Router();

const bookList = [
    { title: 'A first book', genre: 'Sifi', author: 'Kauka Boon', read: false },
    {
        title: 'A second book',
        genre: 'Sifi',
        author: 'Kauka Boon',
        read: false,
    },
    { title: 'A third book', genre: 'Sifi', author: 'Kauka Boon', read: false },
    {
        title: 'A fourth book',
        genre: 'Sifi',
        author: 'Kauka Boon',
        read: false,
    },
    { title: 'A fifth book', genre: 'Sifi', author: 'Kauka Boon', read: false },
    { title: 'A sixth book', genre: 'Sifi', author: 'Kauka Boon', read: false },
];

//Routes
bookRouter.route('/').get((req, res) => {
    res.render('books', {
        title: 'My Libraty',
        books: bookList,
        nav: [
            { link: '/books', title: 'Books' },
            { link: '/authors', title: 'Autors' },
        ],
    });
});

bookRouter.route('/single').get((req, res) => {
    res.send('Hello single books');
});

module.exports = bookRouter;
