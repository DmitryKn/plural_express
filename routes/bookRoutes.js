const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const bookRouter = express.Router();

function router(nav) {
    bookRouter.use((req, res, next) => {
        if (req.user) {
            next(); //для защиты путей
        } else {
            res.redirect('/');
        }
    });
    //Routes
    bookRouter.route('/').get((req, res) => {
        const url = 'mongodb://localhost:27017';
        const dbName = 'myproject';
        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url);
                console.log('connected to mongo');
                const db = client.db(dbName);
                const collection = await db.collection('books');
                const books = await collection.find().toArray();
                res.render('bookList', {
                    title: 'My Libraty',
                    books, //отправляем данные в рендер
                    nav,
                });
            } catch (err) {
                console.log('db error');
            }
            client.close();
            console.log('все норм');
        })();
    });

    bookRouter
        .route('/:id') //books/single => resp
        .get((req, res) => {
            const { id } = req.params;
            const url = 'mongodb://localhost:27017';
            const dbName = 'myproject';
            (async function mongo() {
                let client;
                try {
                    client = await MongoClient.connect(url);
                    console.log('connected to mongo');
                    const db = client.db(dbName);
                    const collection = await db.collection('books');
                    const book = await collection.findOne({
                        _id: new ObjectID(id),
                    });
                    res.render('bookView', {
                        title: 'My Libraty',
                        book, //отправляем данные в рендер
                        nav,
                    });
                } catch (err) {
                    console.log('db error');
                }
                client.close();
                console.log('все норм');
            })();
        });
    return bookRouter; //! важно не забыть
}

module.exports = router;
