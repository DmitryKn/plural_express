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

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
    console.log(`Server running. Port: ${port}, data: ${process.env.TESTDATA}`);
});
