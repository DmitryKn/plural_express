const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const app = express();
const port = process.env.PORT || 3000;

dotenv.config();
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

app.set('views', './src/views');
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('index', { title: 'My Libraty', list: ['a', 'b', 'c'] });
});

app.listen(3000, () => {
    console.log(`Server running. Port: ${port}, data: ${process.env.TESTDATA}`);
});
