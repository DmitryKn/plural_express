const express = require('express');
const bookRouter = express.Router();

function router(nav) {
    const bookList = [
        {
            title: 'A first book',
            genre: 'Sifi',
            author: 'Kauka Boon',
            read: false,
        },
        {
            title: 'A second book',
            genre: 'Sifi',
            author: 'Kauka Boon',
            read: false,
        },
        {
            title: 'A third book',
            genre: 'Sifi',
            author: 'Kauka Boon',
            read: false,
        },
        {
            title: 'A fourth book',
            genre: 'Sifi',
            author: 'Kauka Boon',
            read: false,
        },
        {
            title: 'A fifth book',
            genre: 'Sifi',
            author: 'Kauka Boon',
            read: false,
        },
        {
            title: 'A sixth book',
            genre: 'Sifi',
            author: 'Kauka Boon',
            read: false,
        },
    ];

    //Routes
    bookRouter.route('/').get((req, res) => {
        res.render('bookList', {
            title: 'My Libraty',
            books: bookList,
            nav,
        });
    });

    bookRouter.route('/:id').get((req, res) => {
        const { id } = req.params; //req.params.id
        res.render('bookView', {
            title: 'My Libraty',
            books: bookList[id],
            nav,
        });
    });
    return bookRouter; //! важно не забыть
}

module.exports = router;
