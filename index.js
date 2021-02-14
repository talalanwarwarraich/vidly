const genres = require('./routes/genres');
const home = require('./routes/home');
const express = require('express');
var app = express();

app.use(express.json());

//routes management
app.use('/', home);
app.use('/api/genres', genres);


const port = process.env.PORT || 3000;
app.listen(port);
console.log(`server is listening on port ${port}...`);