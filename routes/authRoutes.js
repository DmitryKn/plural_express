const express = require('express');
const { MongoClient } = require('mongodb');
const authRouter = express.Router();
const passport = require('passport');

module.exports = function router(nav) {
    authRouter.route('/signup').post((req, res) => {
        //create user
        const { username, password } = req.body; //Достаем данные из req.body
        const url = 'mongodb://localhost:27017';
        const dbName = 'libraryApp';
        (async function addUser() {
            //Запихиваем юзера в БД
            let client;
            try {
                client = await MongoClient.connect(url);
                console.log('Connection to db');
                const db = client.db(dbName); //подкл к конкр Базе
                const col = db.collection('users'); //подклю к коллекции
                const user = { username, password }; //создаем юзера
                const results = await col.insertOne(user);
                req.login(results.ops[0], () => {
                    //req.body == results.ops[0]
                    res.redirect('/auth/profile');
                });
            } catch (error) {
                console.log('insert user in DB failed');
            }
        })();
    });

    authRouter
        .route('/signin')
        .get((req, res) => {
            res.render('signin', {
                nav,
                title: 'Sign In',
            });
        })
        .post(
            passport.authenticate('local', {
                successRedirect: '/auth/profile',
                failureRedirect: '/',
            })
        );

    authRouter
        .route('/profile')
        .all((req, res, next) => {
            if (req.user) {
                next(); //для защиты путей
            } else {
                res.redirect('/');
            }
        })
        .get((req, res) => {
            res.json(req.user);
        });

    authRouter.route('/logout').get((req, res) => {
        req.logout();
        res.redirect('/');
    });

    return authRouter;
};
