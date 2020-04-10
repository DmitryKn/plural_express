const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const nav = [
    { link: '/books', title: 'Books' },
    { link: '/authors', title: 'Autors' },
];
const bookRouter = require('./routes/bookRoutes')(nav);
const adminRouter = require('./routes/adminRoutes')(nav);
const authRouter = require('./routes/authRoutes')(nav);

//APP config
const app = express();

dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'mySecret' }));
require('./config/passport')(app);
app.use(express.static(path.join('public')));
app.use(
    '/css',
    express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css'))
);
app.use(
    '/js',
    express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js'))
);
app.use(
    '/js',
    express.static(path.join(__dirname, 'node_modules/jquery/dist/'))
);

//View Engine
app.set('views', './src/views');
app.set('view engine', 'ejs');

//Endpoints
app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.get('/', (req, res) => {
    res.render('index', {
        title: 'My Libraty',
        user: req.user,
        nav: [
            { link: '/books', title: 'Books' },
            { link: '/authors', title: 'Autors' },
        ],
    });
});

app.listen(3000, () => {
    console.log(`Server running. Port: ${port}, data: ${process.env.TESTDATA}`);
});
