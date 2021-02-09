const Joi = require('joi');
const express = require('express');
var app = express();

app.use(express.json());

const apiEndPoint = '/api/genres';
const apiEndPointWithId = `${apiEndPoint}/:id`;

const genreCollection = [
    {
        id: 1,
        name: 'Action'
    },
    {
        id: 2,
        name: 'Horror'
    },
    {
        id: 3,
        name: 'Comedy'
    },
    {
        id: 4,
        name: 'Adventure'
    }
]

//base url of application
app.get('/', (req, res) => {
    res.send('You application is running. don\'t worry');
});

//get generes
app.get(apiEndPoint, (req, res) => {
    res.send(genreCollection);
});

//post new genre
app.post(apiEndPoint, (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.message);

    const genre = {
        id: genreCollection.length + 1,
        name: req.body.name
    };
    genreCollection.push(genre);
    res.send(genre);
})

//update existing genre
app.put(apiEndPointWithId, (req, res) => {
    const genre = genreCollection.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send(`There was no genre for id ${req.params.id}`);

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.message);

    genre.name = req.body.name;
    const index = genreCollection.indexOf(genre);
    genreCollection[index] = genre;
    res.send(genre);
})

//delete existing genre
app.delete(apiEndPointWithId, (req, res) => {
    const genre = genreCollection.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send(`There was no genre for id ${req.params.id}`);

    const index = genreCollection.indexOf(genre);
    genreCollection.splice(index, 1);
    res.send(genre);
})

function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().required().min(3)
    })
    return schema.validate(genre);
}



const port = process.env.PORT || 3000;
app.listen(port);
console.log(`server is listening on port ${port}...`);