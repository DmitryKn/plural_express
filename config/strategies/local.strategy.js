const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');

module.exports = function localStrategy() {
    passport.use(
        new Strategy(
            {
                usernameField: 'username',
                passwordField: 'password',
            },
            (username, password, done) => {
                const url = 'mongodb://localhost:27017';
                const dbName = 'libraryApp';
                (async function mongo() {
                    //Ищем юзера в DB для ауфентикации
                    let client;
                    try {
                        client = await MongoClient.connect(url);
                        console.log('Connection to db');
                        const db = client.db(dbName); //подкл к конкр Базе
                        const col = db.collection('users'); //подклю к коллекции
                        const user = await col.findOne({ username: username });
                        if (user.password === password) {
                            //сравниваем пароли
                            done(null, user); //если нашли Юзера, то норм
                        } else {
                            done(null, false); //если не нашли, то фейл
                        }
                    } catch (error) {
                        console.log('find user in DB failed');
                    }
                    client.close();
                })();
            }
        )
    );
};
