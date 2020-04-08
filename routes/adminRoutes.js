const express = require('express');
const { MongoClient } = require('mongodb');
const adminRouter = express.Router();

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

function router(nav) {
    adminRouter.route('/').get((req, res) => {
        const url = 'mongodb://localhost:27017';
        const dbName = 'myproject';
        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url);
                console.log('connected to mongo');
                const db = client.db(dbName);
                const response = await db
                    .collection('books')
                    .insertMany(bookList);
                res.json(response);
            } catch (err) {
                console.log('no server connection');
            }
            client.close();
        })();
    });
    return adminRouter;
}

module.exports = router;
